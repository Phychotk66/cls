import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, firstName, lastName, email, passwordHash, verified, language } = body;

    await db.insert(users).values({
      id,
      firstName,
      lastName,
      email,
      passwordHash,
      verified,
      language,
    }).onConflictDoUpdate({
        target: users.email,
        set: {
            firstName,
            lastName,
            passwordHash,
            verified,
            language,
        }
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("User save error:", error);
    return NextResponse.json({ ok: false, error: "Database error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    try {
        if (email) {
            const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
            return NextResponse.json({ user: user[0] || null });
        }
        const all = await db.select().from(users);
        return NextResponse.json({ users: all });
    } catch (error) {
        console.error("User fetch error:", error);
        return NextResponse.json({ users: [] }, { status: 500 });
    }
}
