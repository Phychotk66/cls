import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  uuid,
  numeric,
  pgEnum,
} from "drizzle-orm/pg-core";

export const ticketTypeEnum = pgEnum("ticket_type", [
  "standard",
  "child",
  "family",
  "guided",
]);

export const bookingStatusEnum = pgEnum("booking_status", [
  "confirmed",
  "used",
  "cancelled",
]);

export const langEnum = pgEnum("lang", ["en", "es", "de"]);

/* ─── Users ─────────────────────────────────────────────────── */
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull().default(""),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  verified: boolean("verified").notNull().default(false),
  verifyCode: text("verify_code"),
  language: langEnum("language").notNull().default("en"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ─── Bookings ──────────────────────────────────────────────── */
export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull().unique(),
  userId: text("user_id"), // nullable for guests
  email: text("email").notNull(),
  guestName: text("guest_name").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: bookingStatusEnum("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* ─── Booking Lines ─────────────────────────────────────────── */
export const bookingLines = pgTable("booking_lines", {
  id: uuid("id").defaultRandom().primaryKey(),
  bookingId: uuid("booking_id")
    .notNull()
    .references(() => bookings.id, { onDelete: "cascade" }),
  ticketType: ticketTypeEnum("ticket_type").notNull(),
  qty: integer("qty").notNull(),
  unitPrice: numeric("unit_price", { precision: 8, scale: 2 }).notNull(),
});

/* ─── Audio Guide Sessions ──────────────────────────────────── */
export const audioSessions = pgTable("audio_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id"),
  beaconId: text("beacon_id").notNull(),
  station: integer("station").notNull(),
  language: langEnum("language").notNull().default("en"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

/* ─── Contact Messages ──────────────────────────────────────── */
export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
