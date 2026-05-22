import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings, bookingLines } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, code, userId, email, guestName, date, time, lines, total } = body;

    // Insert booking
    await db.insert(bookings).values({
      id,
      code,
      userId: userId === "guest" ? null : userId,
      email,
      guestName,
      date,
      time,
      total: String(total),
      status: "confirmed",
    }).onConflictDoNothing();

    // Insert booking lines
    if (lines && lines.length > 0) {
      const PRICES: Record<string, number> = {
        standard: 10,
        child: 3,
        family: 22,
        guided: 18,
      };
      await db.insert(bookingLines).values(
        lines.map((l: { type: string; qty: number }) => ({
          bookingId: id,
          ticketType: l.type as "standard" | "child" | "family" | "guided",
          qty: l.qty,
          unitPrice: String(PRICES[l.type] ?? 0),
        }))
      ).onConflictDoNothing();
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Booking save error:", error);
    return NextResponse.json({ ok: false, error: "Database error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const allBookings = await db.select().from(bookings).orderBy(bookings.createdAt);
    const allLines = await db.select().from(bookingLines);

    const merged = allBookings.map((b) => ({
      ...b,
      lines: allLines
        .filter((l) => l.bookingId === b.id)
        .map((l) => ({ type: l.ticketType, qty: l.qty })),
    }));

    return NextResponse.json({ bookings: merged });
  } catch (error) {
    console.error("Booking fetch error:", error);
    return NextResponse.json({ bookings: [] }, { status: 500 });
  }
}
