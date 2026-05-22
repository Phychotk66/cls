import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import {
  verifyEmailTemplate,
  passwordResetTemplate,
  passwordChangedTemplate,
  bookingConfirmationTemplate,
  activationTemplate,
} from "@/lib/email-templates";

type EmailType =
  | "verify"
  | "password-reset"
  | "password-changed"
  | "booking-confirmation"
  | "activation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, to, name, code, booking } = body as {
      type: EmailType;
      to: string;
      name?: string;
      code?: string;
      booking?: {
        code: string;
        date: string;
        time: string;
        lines: { type: string; qty: number }[];
        total: number;
      };
    };

    if (!to || !type) {
      return NextResponse.json(
        { ok: false, error: "Missing 'to' or 'type'" },
        { status: 400 }
      );
    }

    let subject: string;
    let html: string;

    switch (type) {
      case "verify": {
        if (!code) return NextResponse.json({ ok: false, error: "Missing code" }, { status: 400 });
        const tpl = verifyEmailTemplate(name || "Visitor", code);
        subject = tpl.subject;
        html = tpl.html;
        break;
      }
      case "activation": {
        if (!code) return NextResponse.json({ ok: false, error: "Missing code" }, { status: 400 });
        const tpl = activationTemplate(name || "Visitor", code);
        subject = tpl.subject;
        html = tpl.html;
        break;
      }
      case "password-reset": {
        if (!code) return NextResponse.json({ ok: false, error: "Missing code" }, { status: 400 });
        const tpl = passwordResetTemplate(name || "Visitor", code);
        subject = tpl.subject;
        html = tpl.html;
        break;
      }
      case "password-changed": {
        const tpl = passwordChangedTemplate(name || "Visitor");
        subject = tpl.subject;
        html = tpl.html;
        break;
      }
      case "booking-confirmation": {
        if (!booking) return NextResponse.json({ ok: false, error: "Missing booking data" }, { status: 400 });
        const tpl = bookingConfirmationTemplate({
          name: name || "Guest",
          ...booking,
        });
        subject = tpl.subject;
        html = tpl.html;
        break;
      }
      default:
        return NextResponse.json(
          { ok: false, error: `Unknown type: ${type}` },
          { status: 400 }
        );
    }

    await sendEmail({ to, subject, html });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Send email error:", error);
    const message = error instanceof Error ? error.message : "Email send failed";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
