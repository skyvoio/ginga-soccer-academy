import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getAuth } from "@clerk/express";
import crypto from "crypto";
import { isStripeConnected, getUncachableStripeClient } from "./stripeClient";
import { WebhookHandlers } from "./webhookHandlers";

const MemoryStoreSession = MemoryStore(session);

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
      store: new MemoryStoreSession({ checkPeriod: 86400000 }),
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
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
      if (!auth.userId) {
        return res.status(401).json({ message: "Google sign-in is incomplete" });
      }

      const username = `google_${auth.userId.slice(-16)}`;
      let user = await storage.getUserByUsername(username);
      if (!user) {
        user = await storage.createUser({
          username,
          password: hashPassword(crypto.randomBytes(32).toString("hex")),
          isAdmin: false,
        });
      }

      req.login(user, (err) => {
        if (err) return res.status(500).json({ message: "Could not create your session" });
        return res.json({ id: user.id, username: user.username });
      });
    } catch (error) {
      console.error("Google session error:", error);
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
      isAdmin: user.isAdmin,
      enrolledProgram: user.enrolledProgram ?? null,
    });
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
