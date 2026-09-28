import type { PoolClient } from "pg";
import { pool } from "./db";
import { verifyNotificationEmailTransport } from "./email";

type DiagnosticResult = {
  status: "PASS" | "FAIL";
  provider: string;
  configured: Record<string, boolean>;
  error?: string;
  recommendation?: string;
};

function sanitizeError(error: unknown): string {
  let message =
    error instanceof Error ? error.message : String(error ?? "Unknown error");

  const secretValues = [
    process.env.DATABASE_URL,
    process.env.SESSION_SECRET,
    process.env.CLERK_SECRET_KEY,
    process.env.SMTP_PASS,
    process.env.RESEND_API_KEY,
  ].filter((value): value is string => Boolean(value));

  for (const secret of secretValues) {
    message = message.split(secret).join("[REDACTED]");
  }

  return message
    .replace(/\b(postgres(?:ql)?:\/\/)[^@\s]+@/gi, "$1[REDACTED]@")
    .replace(/\b(smtps?:\/\/)[^@\s]+@/gi, "$1[REDACTED]@")
    .replace(/((?:password|passwd|token|secret)\s*[=:]\s*)[^,\s;]+/gi, "$1[REDACTED]");
}

async function connectToDatabase(): Promise<PoolClient> {
  return pool.connect();
}

export async function diagnoseDatabase(): Promise<DiagnosticResult> {
  const configured = Boolean(process.env.DATABASE_URL?.trim());
  if (!configured) {
    return {
      status: "FAIL",
      provider: "PostgreSQL (node-postgres / Drizzle)",
      configured: { DATABASE_URL: false },
      error: "DATABASE_URL is missing or empty.",
      recommendation: "Set DATABASE_URL in the production environment and restart the app.",
    };
  }

  let client: PoolClient | undefined;
  try {
    client = await connectToDatabase();
    await client.query("SELECT 1");
    return {
      status: "PASS",
      provider: "PostgreSQL (node-postgres / Drizzle)",
      configured: { DATABASE_URL: true },
    };
  } catch (error) {
    const message = sanitizeError(error);
    return {
      status: "FAIL",
      provider: "PostgreSQL (node-postgres / Drizzle)",
      configured: { DATABASE_URL: true },
      error: message,
      recommendation: `Check DATABASE_URL credentials, host, port, SSL settings, and production database availability. Database reported: ${message}`,
    };
  } finally {
    client?.release();
  }
}

export function diagnoseAuthentication(): DiagnosticResult {
  const sessionSecret = process.env.SESSION_SECRET?.trim() ?? "";
  const clerkPublishableKey = process.env.CLERK_PUBLISHABLE_KEY?.trim() ?? "";
  const clerkSecretKey = process.env.CLERK_SECRET_KEY?.trim() ?? "";
  const nextAuthSecret = process.env.NEXTAUTH_SECRET?.trim() ?? "";
  const nextAuthUrl = process.env.NEXTAUTH_URL?.trim() ?? "";

  const configured = {
    SESSION_SECRET: sessionSecret.length >= 32,
    CLERK_PUBLISHABLE_KEY: clerkPublishableKey.startsWith("pk_"),
    CLERK_SECRET_KEY: clerkSecretKey.startsWith("sk_"),
    NEXTAUTH_SECRET: Boolean(nextAuthSecret),
    NEXTAUTH_URL: Boolean(nextAuthUrl),
  };

  const issues: string[] = [];
  if (!sessionSecret) issues.push("SESSION_SECRET is missing.");
  else if (sessionSecret.length < 32) {
    issues.push("SESSION_SECRET must contain at least 32 characters.");
  }
  if (!clerkPublishableKey) issues.push("CLERK_PUBLISHABLE_KEY is missing.");
  else if (!clerkPublishableKey.startsWith("pk_")) {
    issues.push("CLERK_PUBLISHABLE_KEY has an invalid format; it should start with pk_.");
  }
  if (!clerkSecretKey) issues.push("CLERK_SECRET_KEY is missing.");
  else if (!clerkSecretKey.startsWith("sk_")) {
    issues.push("CLERK_SECRET_KEY has an invalid format; it should start with sk_.");
  }
  const result: DiagnosticResult = {
    status: issues.length === 0 ? "PASS" : "FAIL",
    provider: "Passport local sessions + Clerk",
    configured,
  };
  (result as DiagnosticResult & { note?: string }).note =
    "This project does not use NextAuth; NEXTAUTH_SECRET and NEXTAUTH_URL are reported for visibility but are not required.";
  if (issues.length > 0) {
    result.error = issues.join(" ");
    result.recommendation =
      `${issues.join(" ")} NEXTAUTH_SECRET and NEXTAUTH_URL are not required for this Passport + Clerk application.`;
  }
  return result;
}

export async function diagnoseEmail(): Promise<DiagnosticResult> {
  const host = process.env.SMTP_HOST?.trim() ?? "";
  const user = process.env.SMTP_USER?.trim() ?? "";
  const pass = process.env.SMTP_PASS ?? "";
  const from = process.env.SMTP_FROM?.trim() ?? "";
  const rawPort = process.env.SMTP_PORT?.trim() ?? "";
  const rawSecure = process.env.SMTP_SECURE?.trim() ?? "";
  const port = rawPort ? Number(rawPort) : 587;

  const configured = {
    SMTP_HOST: Boolean(host),
    SMTP_PORT: Number.isInteger(port) && port >= 1 && port <= 65535,
    SMTP_USER: Boolean(user),
    SMTP_PASS: Boolean(pass),
    SMTP_FROM: Boolean(from || user),
    SMTP_SECURE: !rawSecure || rawSecure === "true" || rawSecure === "false",
  };

  const issues: string[] = [];
  for (const name of ["SMTP_HOST", "SMTP_USER", "SMTP_PASS"] as const) {
    if (!configured[name]) issues.push(`${name} is missing.`);
  }
  if (!configured.SMTP_PORT) {
    issues.push("SMTP_PORT must be an integer between 1 and 65535.");
  }
  if (!configured.SMTP_FROM) {
    issues.push("SMTP_FROM is missing and SMTP_USER cannot be used as the sender.");
  }
  if (!configured.SMTP_SECURE) {
    issues.push("SMTP_SECURE must be either true or false.");
  }

  if (issues.length > 0) {
    return {
      status: "FAIL",
      provider: "Nodemailer SMTP",
      configured,
      error: issues.join(" "),
      recommendation: `${issues.join(" ")} Set or correct these production environment variables.`,
    };
  }

  try {
    await verifyNotificationEmailTransport();
    return {
      status: "PASS",
      provider: "Nodemailer SMTP",
      configured,
    };
  } catch (error) {
    const message = sanitizeError(error);
    return {
      status: "FAIL",
      provider: "Nodemailer SMTP",
      configured,
      error: message,
      recommendation: `Verify SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, and SMTP_FROM with the email provider. SMTP reported: ${message}`,
    };
  }
}

export async function buildDiagnosticReport() {
  const [database, email] = await Promise.all([
    diagnoseDatabase(),
    diagnoseEmail(),
  ]);
  const authentication = diagnoseAuthentication();

  return {
    Database: database,
    Authentication: authentication,
    Email: email,
  };
}