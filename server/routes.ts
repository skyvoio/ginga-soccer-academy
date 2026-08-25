import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertUserSchema,
  updateProfileSchema,
  insertRegistrationSchema,
  updateRegistrationSchema,
  digitalRegistrationSchema,
  contactMessageSchema,
} from "@shared/schema";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getAuth } from "@clerk/express";
import crypto from "crypto";
import { isStripeConnected, getUncachableStripeClient } from "./stripeClient";
import { WebhookHandlers } from "./webhookHandlers";
import { logEmailFailure, sendNotificationEmail } from "./email";
import { pool } from "./db";
import connectPgSimple from "connect-pg-simple";

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const testHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return hash === testHash;
}

async function seedAdminUser() {
  const existing = await storage.getUserByUsername("admin");
  if (!existing) {
    const hashedPassword = hashPassword("ginga2026");
    await storage.createUser({ username: "admin", password: hashedPassword, isAdmin: true });
    console.log("Admin user seeded: username=admin");
  }
}

function requireAuth(req: any, res: any, next: any) {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  next();
}

function requireAdmin(req: any, res: any, next: any) {
  if (!req.user) return res.status(401).json({ message: "Not authenticated" });
  if (!(req.user as any).isAdmin) {
    return res.status(403).json({ message: "Administrator access required" });
  }
  next();
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET environment variable is required");
  }

  // Stripe webhook — must be BEFORE express.json()
  app.post(
    "/api/stripe/webhook",
    (req: any, res: any, next: any) => {
      // Use raw body stored by index.ts
      next();
    },
    async (req: any, res: any) => {
      const signature = req.headers["stripe-signature"];
      if (!signature) return res.status(400).json({ error: "Missing stripe-signature" });
      try {
        const sig = Array.isArray(signature) ? signature[0] : signature;
        const payload = (req as any).rawBody as Buffer;
        await WebhookHandlers.processWebhook(payload, sig);
        res.status(200).json({ received: true });
      } catch (error: any) {
        console.error("Webhook error:", error.message);
        res.status(400).json({ error: "Webhook processing error" });
      }
    }
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new PgStore({
        pool,
        createTableIfMissing: true,
      }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !verifyPassword(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user || null);
    } catch (err) {
      done(err);
    }
  });

  await seedAdminUser();

  // ── Auth Routes ──────────────────────────────────────────────────────────────

  app.post("/api/auth/register", async (req, res) => {
    try {
      const parsed = insertUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      const username = parsed.data.username.trim();
      const password = parsed.data.password;
      const email = parsed.data.email?.trim() || undefined;

      if (username.length < 3 || username.length > 40) {
        return res.status(400).json({ message: "Username must be 3–40 characters" });
      }
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }
      if (username.toLowerCase() === "admin") {
        return res.status(400).json({ message: "Username not available" });
      }

      const existing = await storage.getUserByUsername(username) ||
        (email ? await storage.getUserByEmail(email) : undefined);
      if (existing) {
        return res.status(400).json({
          message: existing.email?.toLowerCase() === email?.toLowerCase()
            ? "An account with that email already exists"
            : "Username already taken",
        });
      }

      const hashedPassword = hashPassword(password);
      const user = await storage.createUser({ username, password: hashedPassword, email, isAdmin: false });

      req.login(user, (err) => {
        if (err) return res.status(500).json({ message: "Login failed after registration" });
        return res.json({ id: user.id, username: user.username });
      });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post("/api/auth/google/session", async (req, res) => {
    try {
      const auth = getAuth(req);
      console.error("[auth] Google bridge request", {
        clerkUserId: auth.userId || null,
        hasSessionClaims: Boolean(auth.sessionClaims),
        host: req.get("host"),
      });
      if (!auth.userId) {
        console.error("[auth] Google bridge rejected: Clerk did not provide a userId", {
          sessionClaims: auth.sessionClaims || null,
        });
        return res.status(401).json({ message: "Google sign-in is incomplete" });
      }

      const username = `google_${auth.userId.slice(-16)}`;
      let user = await storage.getUserByUsername(username);
      if (!user) {
        console.error("[auth] Google bridge creating local user", {
          clerkUserId: auth.userId,
          username,
        });
        user = await storage.createUser({
          username,
          password: hashPassword(crypto.randomBytes(32).toString("hex")),
          isAdmin: false,
        });
      } else {
        console.error("[auth] Google bridge found existing local user", {
          clerkUserId: auth.userId,
          localUserId: user.id,
          username,
        });
      }

      req.login(user, (err) => {
        if (err) {
          console.error("[auth] Google bridge Passport login failed", {
            clerkUserId: auth.userId,
            localUserId: user?.id,
            error: err,
          });
          return res.status(500).json({ message: "Could not create your session" });
        }
        console.error("[auth] Google bridge completed", {
          clerkUserId: auth.userId,
          localUserId: user?.id,
        });
        return res.json({ id: user.id, username: user.username });
      });
    } catch (error) {
      console.error("[auth] Google session bridge crashed:", error);
      return res.status(500).json({ message: "Google sign-in failed" });
    }
  });

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: "Invalid credentials" });
      req.login(user, (err) => {
        if (err) return next(err);
        return res.json({ id: user.id, username: user.username });
      });
    })(req, res, next);
  });

  app.post("/api/auth/logout", (req, res) => {
    req.logout((err) => {
      if (err) return res.status(500).json({ message: "Logout failed" });
      return res.json({ message: "Logged out" });
    });
  });

  app.get("/api/auth/user", (req, res) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    const user = req.user as any;
    return res.json({
      id: user.id,
      username: user.username,
      email: user.email ?? null,
      name: user.name ?? null,
      phone: user.phone ?? null,
      emergencyContact: user.emergencyContact ?? null,
      isAdmin: user.isAdmin,
      enrolledProgram: user.enrolledProgram ?? null,
    });
  });

  // ── User Registration and Contact Notifications ─────────────────────────────

  app.post("/api/registrations", requireAuth, async (req: any, res) => {
    try {
      const parsed = digitalRegistrationSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: "Invalid registration data",
          errors: parsed.error.flatten().fieldErrors,
        });
      }

      const d = parsed.data;
      const playerName = `${d.playerFirstName} ${d.playerLastName}`.trim();
      const today = new Date().toISOString().slice(0, 10);

      const registration = await storage.createRegistration({
        name: playerName,
        program: d.program,
        status: "Pending",
        payment: "Unpaid",
        date: today,
        userId: (req.user as any).id,
        playerFirstName: d.playerFirstName,
        playerLastName: d.playerLastName,
        playerDob: d.playerDob,
        playerGender: d.playerGender,
        medicalNotes: d.medicalNotes || undefined,
        parentFirstName: d.parentFirstName,
        parentLastName: d.parentLastName,
        parentEmail: d.parentEmail,
        parentPhone: d.parentPhone,
        parentAddress: d.parentAddress,
      });

      const user = req.user as any;

      try {
        await sendNotificationEmail({
          subject: `New registration: ${registration.program} — ${playerName}`,
          replyTo: d.parentEmail || user.email || undefined,
          text: [
            "A new registration was submitted through gingasoccer.ca.",
            "",
            "── PLAYER ─────────────────────────────",
            `Name:           ${playerName}`,
            `Date of birth:  ${d.playerDob}`,
            `Gender:         ${d.playerGender}`,
            "",
            "── MEDICAL ────────────────────────────",
            `Notes:          ${d.medicalNotes || "None"}`,
            "",
            "── PARENT / GUARDIAN ──────────────────",
            `Name:           ${d.parentFirstName} ${d.parentLastName}`,
            `Email:          ${d.parentEmail}`,
            `Phone:          ${d.parentPhone}`,
            `Address:        ${d.parentAddress}`,
            "",
            "── BOOKING ────────────────────────────",
            `Program:        ${d.program}`,
            `Date submitted: ${today}`,
            `Account:        ${user.username}`,
          ].join("\n"),
        });
      } catch (error) {
        logEmailFailure("registration", error);
      }

      return res.status(201).json(registration);
    } catch (error: any) {
      console.error("Registration submission error:", error);
      return res.status(500).json({ message: "Failed to submit registration" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    const parsed = contactMessageSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Please provide your name, a valid email, and a message",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const { name, email, subject, message } = parsed.data;
    try {
      await sendNotificationEmail({
        subject: `Contact form: ${subject}`,
        replyTo: email,
        text: [
          "A new contact form message was submitted through gingasoccer.ca.",
          "",
          `Name: ${name}`,
          `Email: ${email}`,
          `Subject: ${subject}`,
          "",
          "Message:",
          message,
        ].join("\n"),
      });
      return res.status(201).json({ success: true });
    } catch (error) {
      logEmailFailure("contact", error);
      return res.status(503).json({
        message:
          "Your message could not be sent right now. Please email info@gingasoccer.ca directly.",
      });
    }
  });

  // ── Admin User Management ───────────────────────────────────────────────────

  app.get("/api/admin/users", requireAdmin, async (_req, res) => {
    const users = await storage.getUsers();
    res.json(users.map(({ password: _password, ...user }) => user));
  });

  app.delete("/api/admin/users/:id", requireAdmin, async (req: any, res) => {
    try {
      const target = await storage.getUser(req.params.id);
      if (!target) return res.status(404).json({ message: "User not found" });
      if (target.isAdmin) return res.status(400).json({ message: "Admin users cannot be removed" });
      await storage.deleteUser(target.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to remove user" });
    }
  });

  app.post("/api/admin/users/:id/reset-password", requireAdmin, async (req: any, res) => {
    try {
      const password = typeof req.body?.password === "string" ? req.body.password : "";
      if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
      }
      const target = await storage.getUser(req.params.id);
      if (!target) return res.status(404).json({ message: "User not found" });
      await storage.updateUserPassword(target.id, hashPassword(password));
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to reset password" });
    }
  });

  // ── Profile Update ───────────────────────────────────────────────────────────

  app.put("/api/auth/user", requireAuth, async (req: any, res) => {
    try {
      const parsed = updateProfileSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid profile data", errors: parsed.error.flatten().fieldErrors });
      }

      const user = req.user as any;

      // If email is being changed, check it isn't already taken by someone else
      if (parsed.data.email && parsed.data.email.toLowerCase() !== (user.email ?? "").toLowerCase()) {
        const existing = await storage.getUserByEmail(parsed.data.email);
        if (existing && existing.id !== user.id) {
          return res.status(400).json({ message: "An account with that email already exists" });
        }
      }

      const updated = await storage.updateUserProfile(user.id, parsed.data);

      // Refresh passport session so subsequent /api/auth/user reads the new data
      req.login(updated, (err: any) => {
        if (err) return res.status(500).json({ message: "Profile updated but session refresh failed" });
        return res.json({
          id: updated.id,
          username: updated.username,
          email: updated.email ?? null,
          name: updated.name ?? null,
          phone: updated.phone ?? null,
          emergencyContact: updated.emergencyContact ?? null,
          isAdmin: updated.isAdmin,
          enrolledProgram: updated.enrolledProgram ?? null,
        });
      });
    } catch (error: any) {
      console.error("Profile update error:", error);
      return res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // ── Admin Registration Management ────────────────────────────────────────────

  app.get("/api/admin/registrations", requireAdmin, async (_req, res) => {
    try {
      const regs = await storage.getRegistrations();
      res.json(regs);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to fetch registrations" });
    }
  });

  app.post("/api/admin/registrations", requireAdmin, async (req, res) => {
    try {
      const parsed = insertRegistrationSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid registration data", errors: parsed.error.flatten().fieldErrors });
      }
      const reg = await storage.createRegistration(parsed.data);
      res.status(201).json(reg);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to create registration" });
    }
  });

  app.put("/api/admin/registrations/:id", requireAdmin, async (req: any, res) => {
    try {
      const parsed = updateRegistrationSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten().fieldErrors });
      }
      const existing = await storage.getRegistration(req.params.id);
      if (!existing) return res.status(404).json({ message: "Registration not found" });
      const updated = await storage.updateRegistration(req.params.id, parsed.data);
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to update registration" });
    }
  });

  app.delete("/api/admin/registrations/:id", requireAdmin, async (req: any, res) => {
    try {
      const existing = await storage.getRegistration(req.params.id);
      if (!existing) return res.status(404).json({ message: "Registration not found" });
      await storage.deleteRegistration(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Failed to delete registration" });
    }
  });

  // ── Stripe / Checkout Routes ─────────────────────────────────────────────────

  const programPrices: Record<string, { name: string; unitAmount: number }> = {
    p1: { name: "Justplay", unitAmount: 5650 },
    p2: { name: "Group Session", unitAmount: 5650 },
    p3: { name: "Private Session", unitAmount: 19775 },
    p4: { name: "GingaFit", unitAmount: 4520 },
    c1: { name: "PD Day Camp", unitAmount: 16950 },
    c2: { name: "Summer Camp", unitAmount: 56500 },
    c3: { name: "Christmas Camp", unitAmount: 33900 },
    r1: { name: "Full Turf Rental", unitAmount: 15000 },
    r2: { name: "3/4 Turf Rental", unitAmount: 10000 },
    r3: { name: "Mini Turf Rental", unitAmount: 7000 },
  };

  app.get("/api/stripe/status", async (_req, res) => {
    const connected = await isStripeConnected();
    res.json({ connected });
  });

  app.post("/api/checkout", requireAuth, async (req: any, res) => {
    try {
      const { programId, priceId } = req.body;
      const program = programPrices[programId];
      if (!program) {
        return res.status(400).json({ message: "Invalid program selected" });
      }

      const connected = await isStripeConnected();
      if (!connected) {
        return res.status(503).json({ message: "Payment system not yet configured. Please contact info@gingasoccer.ca to register." });
      }

      const stripe = await getUncachableStripeClient();
      const user = req.user as any;

      let customerId: string = user.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create({
          name: user.username,
          email: user.email ?? undefined,
          metadata: { userId: user.id, academy: "ginga_soccer" },
        });
        await storage.updateUserStripeCustomerId(user.id, customer.id);
        customerId = customer.id;
      }

      const baseUrl = `${req.protocol}://${req.get("host")}`;

      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ["card"],
        line_items: priceId
          ? [{ price: priceId, quantity: 1 }]
          : [{
              price_data: {
                currency: "cad",
                product_data: {
                   name: program.name,
                  metadata: { academy: "ginga_soccer", programId },
                },
                 unit_amount: program.unitAmount,
              },
              quantity: 1,
            }],
        mode: "payment",
        success_url: `${baseUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/booking`,
        metadata: {
          userId: user.id,
          programId,
          programName: program.name,
          academy: "ginga_soccer",
        },
      });

      res.json({ url: session.url });
    } catch (error: any) {
      console.error("Checkout error:", error.message);
      res.status(500).json({ message: "Failed to create checkout session" });
    }
  });

  app.get("/api/checkout/confirm", requireAuth, async (req: any, res) => {
    try {
      const { session_id, program } = req.query as { session_id: string; program: string };
      if (!session_id) {
        return res.status(400).json({ message: "Missing session_id" });
      }

      const connected = await isStripeConnected();
      if (!connected) {
        return res.status(503).json({ message: "Payment system not configured" });
      }

      const stripe = await getUncachableStripeClient();
      const session = await stripe.checkout.sessions.retrieve(session_id);

       const user = req.user as any;
       if (
         session.payment_status !== "paid" ||
         session.metadata?.userId !== user.id ||
         !session.metadata?.programName
       ) {
        return res.status(400).json({ message: "Payment not completed" });
      }

       const updated = await storage.updateUserEnrollment(
         user.id,
         session.metadata.programName,
       );
      res.json({ success: true, enrolledProgram: updated.enrolledProgram });
    } catch (error: any) {
      console.error("Confirm error:", error.message);
      res.status(500).json({ message: "Failed to confirm enrollment" });
    }
  });

  return httpServer;
}

const PgStore = connectPgSimple(session);
