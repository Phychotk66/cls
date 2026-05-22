import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { ok: false, error: "All fields required" },
        { status: 400 }
      );
    }

    await db.insert(contactMessages).values({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact save error:", error);
    return NextResponse.json(
      { ok: false, error: "Database error" },
      { status: 500 }
    );
  }
}
