"use client";
import { useApp, TICKET_PRICES, type TicketType } from "@/contexts/AppContext";
import { Button, Eyebrow, Badge } from "@/components/ui";

const TIMES = ["10:00", "11:00", "12:00", "13:00", "16:00", "17:00", "18:00"];

const PRODUCTS: {
  type: TicketType;
  titleKey: string;
  descKey: string;
  accent: string;
  dotColor: string;
  badge?: string;
  badgeColor?: "ink" | "gold" | "green" | "red" | "blue";
}[] = [
  {
    type: "standard",
    titleKey: "tickets.standard",
    descKey: "tickets.standardDesc",
    accent: "border-[#1d3a8a]",
    dotColor: "bg-[#1d3a8a]",
  },
  {
    type: "child",
    titleKey: "tickets.child",
    descKey: "tickets.childDesc",
    accent: "border-[#8e1d2c]",
    dotColor: "bg-[#8e1d2c]",
  },
  {
    type: "family",
    titleKey: "tickets.family",
    descKey: "tickets.familyDesc",
    accent: "border-[#1f6f4a]",
    dotColor: "bg-[#1f6f4a]",
    badge: "Popular",
    badgeColor: "green",
  },
  {
    type: "guided",
    titleKey: "tickets.guided",
    descKey: "tickets.guidedDesc",
    accent: "border-[#c9a84c]",
    dotColor: "bg-[#c9a84c]",
    badge: "Expert",
    badgeColor: "gold",
  },
];

export default function TicketsPage() {
  const {
    t,
    cart,
    setQty,
    cartTotal,
    cartCount,
    bookingDate,
    setBookingDate,
    bookingTime,
    setBookingTime,
    navigate,
  } = useApp();

  const qtyFor = (type: TicketType) =>
    cart.find((l) => l.type === type)?.qty ?? 0;

  return (
    <div className="bg-arabesque min-h-screen pt-24">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>Reservations</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-light text-primary md:text-5xl">
            {t("tickets.title")}
          </h1>
          <p className="mt-4 text-secondary">{t("tickets.subtitle")}</p>
          <div className="hairline mx-auto mt-6 w-32" />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {/* Products */}
          <div className="lg:col-span-2 grid gap-5 sm:grid-cols-2">
            {PRODUCTS.map((p) => {
              const qty = qtyFor(p.type);
              return (
                <article
                  key={p.type}
                  className={`relative flex flex-col rounded-lg border-2 surface-card p-6 shadow-card transition hover:shadow-elegant ${
                    qty > 0 ? p.accent : "border-subtle"
                  }`}
                >
                  {p.badge && (
                    <div className="absolute right-4 top-4">
                      <Badge color={p.badgeColor}>{p.badge}</Badge>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rotate-45 ${p.dotColor} inline-block`} />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#7c7060]">
                      {t("tickets.from")} €{TICKET_PRICES[p.type]}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl text-[#0f0e0c] dark:text-white">
                    {t(p.titleKey)}
                  </h3>
                  <p className="mt-2 text-sm text-[#7c7060] leading-relaxed flex-1">
                    {t(p.descKey)}
                  </p>

                  <div className="mt-4 flex items-baseline gap-1 border-t border-subtle pt-4">
                    <span className="font-serif text-3xl text-primary">
                      €{TICKET_PRICES[p.type]}
                    </span>
                    <span className="text-xs text-secondary">/ ticket</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-secondary">
                      {t("tickets.select")}
                    </span>
                    <QtyControl
                      value={qty}
                      onChange={(v) => setQty(p.type, v)}
                    />
                  </div>
                </article>
              );
            })}
          </div>

          {/* Summary sidebar */}
          <aside className="lg:sticky lg:top-28 self-start rounded-lg border surface-card p-6 shadow-elegant">
            <h3 className="font-serif text-2xl text-primary">
              {t("booking.title")}
            </h3>
            <div className="hairline mt-4" />

            {/* Date */}
            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-widest text-[#7c7060]">
                  {t("booking.date")}
                </span>
                <input
                  type="date"
                  value={bookingDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full rounded-md border border-[#e2d5c0] bg-white px-3.5 py-2.5 text-sm text-[#0f0e0c] outline-none focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/25"
                />
              </label>

              {/* Time */}
              <div>
                <span className="mb-2 block text-[11px] font-medium uppercase tracking-widest text-[#7c7060]">
                  {t("booking.time")}
                </span>
                <div className="flex flex-wrap gap-2">
                  {TIMES.map((tm) => (
                    <button
                      key={tm}
                      onClick={() => setBookingTime(tm)}
                      className={`rounded-md border px-3 py-1.5 text-xs transition ${
                        bookingTime === tm
                          ? "border-[#c9a84c] bg-[#f4ede0] font-semibold text-[#0f0e0c]"
                          : "border-[#e2d5c0] text-[#7c7060] hover:border-[#c9a84c]/60"
                      }`}
                    >
                      {tm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="hairline mt-6" />

            {/* Cart lines */}
            <h4 className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-[#7c7060]">
              {t("booking.summary")}
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              {cart.length === 0 && (
                <li className="rounded-md bg-[#f4ede0] px-3 py-2.5 text-xs text-[#7c7060]">
                  {t("booking.empty")}
                </li>
              )}
              {cart.map((l) => (
                <li key={l.type} className="flex items-center justify-between">
                  <span className="text-[#0f0e0c] dark:text-white">
                    {l.qty} × {t(`tickets.${l.type}`)}
                  </span>
                  <span className="font-medium text-[#0f0e0c] dark:text-white">
                    €{(l.qty * TICKET_PRICES[l.type]).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex items-baseline justify-between border-t border-[#e2d5c0] pt-4">
              <span className="text-[11px] uppercase tracking-widest text-[#7c7060]">
                {t("booking.total")}
              </span>
              <span className="font-serif text-3xl text-[#0f0e0c] dark:text-white">
                €{cartTotal.toFixed(2)}
              </span>
            </div>

            <Button
              className="mt-5 w-full bg-[#0f0e0c] text-[#faf6ee] hover:bg-[#1d3a8a]"
              size="lg"
              disabled={cartCount === 0}
              onClick={() => navigate("/checkout")}
            >
              {t("booking.checkout")} →
            </Button>

            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-[#7c7060]">
              <LockIcon /> Secured · 256-bit SSL
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function QtyControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center rounded-md border border-[#e2d5c0]">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="h-9 w-9 text-[#7c7060] hover:bg-[#f4ede0] transition"
      >
        −
      </button>
      <span className="w-10 text-center text-sm font-semibold text-[#0f0e0c] dark:text-white">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="h-9 w-9 text-[#7c7060] hover:bg-[#f4ede0] transition"
      >
        +
      </button>
    </div>
  );
}

function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
