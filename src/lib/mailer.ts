import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const from =
    process.env.SMTP_FROM ||
    process.env.SMTP_USER ||
    "noreply@casadelreymoro.com";

  console.log(`[Mailer] Sending to=${to} from=${from} subject="${subject}"`);
  console.log(`[Mailer] SMTP_USER=${process.env.SMTP_USER ? "SET" : "MISSING"} SMTP_PASS=${process.env.SMTP_PASS ? "SET" : "MISSING"}`);

  const info = await getTransporter().sendMail({
    from,
    to,
    subject,
    html,
  });

  console.log("[Mailer] Email sent:", info.messageId);
  return info;
}
