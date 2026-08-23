import nodemailer from "nodemailer";

const NOTIFICATION_RECIPIENT = "info@gingasoccer.ca";

type EmailDetails = {
  subject: string;
  text: string;
  replyTo?: string;
};

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "Email is not configured. Required secrets: SMTP_HOST, SMTP_USER, SMTP_PASS"
    );
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  });

  return transporter;
}

/**
 * Sends an internal notification. Callers should await this after saving data,
 * so notification problems can be logged without undoing a successful save.
 */
export async function sendNotificationEmail(details: EmailDetails): Promise<void> {
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  if (!from) {
    throw new Error("Email is not configured. Set SMTP_FROM or SMTP_USER");
  }

  await getTransporter().sendMail({
    from,
    to: NOTIFICATION_RECIPIENT,
    replyTo: details.replyTo,
    subject: details.subject,
    text: details.text,
  });
}

export function logEmailFailure(context: string, error: unknown): void {
  console.error(
    `[email] ${context} notification could not be sent:`,
    error instanceof Error ? error.message : error
  );
}