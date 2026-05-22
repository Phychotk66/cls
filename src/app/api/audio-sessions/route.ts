import { NextResponse } from "next/server";
import { db } from "@/db";
import { audioSessions } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { userId, beaconId, station, language } = await req.json();

    await db.insert(audioSessions).values({
      userId: userId || null,
      beaconId,
      station,
      language: language as "en" | "es" | "de",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Audio session save error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
