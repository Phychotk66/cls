"use client";
import { useState } from "react";
import { useApp, TICKET_PRICES, type Booking } from "@/contexts/AppContext";
import { Button, Eyebrow } from "@/components/ui";

export default function CheckoutPage() {
  const { t, cart, cartTotal, user, confirmBooking, navigate, bookingDate, bookingTime } = useApp();

  const [email, setEmail] = useState(user?.email ?? "");
  const [name, setName] = useState(user ? `${user.firstName} ${user.lastName}` : "");
  const [card, setCard] = useState("");
  const [exp, setExp] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState<Booking | null>(null);
  const [error, setError] = useState("");

  if (cart.length === 0 && !confirmed) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-40 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e2d5c0]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          </svg>
        </div>
        <h1 className="mt-6 font-serif text-3xl">{t("booking.empty")}</h1>
        <Button className="mt-6 bg-[#0f0e0c] text-[#faf6ee]" onClick={() => navigate("/tickets")}>
          {t("nav.tickets")}
        </Button>
      </div>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@") || !name || card.replace(/\s/g, "").length < 12 || !exp || cvc.length < 3) {
      setError("Please complete all fields with valid data.");
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      const b = confirmBooking(email, name);
      setConfirmed(b);
      setProcessing(false);
    }, 1600);
  };

  if (confirmed) {
    return <Success booking={confirmed} email={email} />;
  }

  return (
    <div className="bg-arabesque min-h-screen pt-24">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <button
          onClick={() => navigate("/tickets")}
          className="text-[11px] uppercase tracking-widest text-[#7c7060] hover:text-[#0f0e0c] transition"
        >
          ← {t("common.back")}
        </button>

        <div className="mt-6 grid gap-10 lg:grid-cols-5">
          {/* Payment form */}
          <form
            onSubmit={submit}
            className="lg:col-span-3 rounded-lg border border-[#e2d5c0] bg-white p-8 shadow-elegant"
          >
            <Eyebrow>Step 2 / 2</Eyebrow>
            <h1 className="mt-4 font-serif text-3xl text-[#0f0e0c]">
              {t("checkout.title")}
            </h1>
            <p className="mt-2 text-sm text-[#7c7060]">{t("checkout.subtitle")}</p>

            <div className="mt-8 space-y-5">
              <FieldRow>
                <FormField
                  label={t("checkout.email")}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FieldRow>
              <FieldRow>
                <FormField
                  label={t("checkout.name")}
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </FieldRow>
              <FieldRow>
                <FormField
                  label={t("checkout.card")}
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  value={card}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 16);
                    setCard(cleaned.replace(/(.{4})/g, "$1 ").trim());
                  }}
                />
              </FieldRow>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label={t("checkout.expiry")}
                  placeholder="04 / 28"
                  value={exp}
                  onChange={(e) => {
                    let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                    if (v.length >= 3) v = v.slice(0, 2) + " / " + v.slice(2);
                    setExp(v);
                  }}
                />
                <FormField
                  label={t("checkout.cvc")}
                  placeholder="123"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                />
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-md border border-[#8e1d2c]/30 bg-[#8e1d2c]/5 px-3 py-2 text-sm text-[#8e1d2c]">
                {error}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              className="mt-8 w-full bg-[#0f0e0c] text-[#faf6ee] hover:bg-[#1d3a8a]"
              disabled={processing}
            >
              {processing
                ? t("checkout.processing")
                : `${t("checkout.pay")} €${cartTotal.toFixed(2)} →`}
            </Button>

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#7c7060]">
              <LockIcon /> Powered by Stripe · Card data never reaches our servers
            </div>
          </form>

          {/* Order summary */}
          <aside className="lg:col-span-2 self-start rounded-lg border border-[#e2d5c0] bg-[#0f0e0c] p-7 text-[#faf6ee] shadow-elegant">
            <h3 className="font-serif text-xl">{t("booking.summary")}</h3>
            <div className="hairline mt-3" />
            <ul className="mt-4 space-y-3 text-sm">
              {cart.map((l) => (
                <li key={l.type} className="flex items-center justify-between">
                  <span className="text-[#faf6ee]/80">
                    {l.qty} × {t(`tickets.${l.type}`)}
                  </span>
                  <span>€{(l.qty * TICKET_PRICES[l.type]).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="hairline mt-4" />
            <div className="mt-4 flex items-center justify-between text-sm text-[#faf6ee]/70">
              <span>{t("booking.date")}</span>
              <span>{bookingDate} · {bookingTime}</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between border-t border-[#faf6ee]/15 pt-3">
              <span className="text-[11px] uppercase tracking-widest text-[#c9a84c]">
                {t("booking.total")}
              </span>
              <span className="font-serif text-3xl">€{cartTotal.toFixed(2)}</span>
            </div>

            {/* Tri-colour diamonds */}
            <div className="mt-6 flex items-center gap-2">
              <span className="h-2 w-2 rotate-45 bg-[#1d3a8a] inline-block" />
              <span className="h-2 w-2 rotate-45 bg-[#8e1d2c] inline-block" />
              <span className="h-2 w-2 rotate-45 bg-[#1f6f4a] inline-block" />
              <span className="ml-2 text-[10px] uppercase tracking-widest text-[#faf6ee]/40">
                Secure Booking
              </span>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function Success({ booking, email }: { booking: Booking; email: string }) {
  const { t, navigate } = useApp();
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1f6f4a]/15 text-[#1f6f4a]">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="mt-6 font-serif text-3xl text-[#0f0e0c] md:text-4xl">
        {t("checkout.success")}
      </h1>
      <p className="mt-3 text-sm text-[#7c7060]">
        We&apos;ve emailed your tickets to{" "}
        <span className="font-medium text-[#0f0e0c]">{email}</span>.
      </p>

      <div className="mt-10 inline-block rounded-lg border border-[#e2d5c0] bg-white p-8 shadow-elegant">
        <p className="text-[10px] uppercase tracking-widest text-[#7c7060]">
          {t("profile.code")}
        </p>
        <div className="mt-2 font-mono text-2xl font-semibold tracking-[0.3em] text-[#0f0e0c]">
          {booking.code}
        </div>
        <div className="mx-auto mt-6 grid h-40 w-40 place-items-center rounded-md bg-[#0f0e0c] p-3">
          <FakeQR seed={booking.code} />
        </div>
        <p className="mt-3 text-xs text-[#7c7060]">{t("checkout.qr")}</p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          className="bg-[#0f0e0c] text-[#faf6ee]"
          onClick={() => navigate("/profile")}
        >
          {t("profile.tabBookings")}
        </Button>
        <Button variant="outline" onClick={() => navigate("/")}>
          {t("nav.home")}
        </Button>
      </div>
    </div>
  );
}

function FakeQR({ seed }: { seed: string }) {
  const N = 12;
  const cells: boolean[] = [];
  let h = 0;
  for (let i = 0; i < seed.length; i++)
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  for (let i = 0; i < N * N; i++) {
    h = (h * 1103515245 + 12345) >>> 0;
    cells.push(((h >> 16) & 1) === 1);
  }
  const isFinder = (x: number, y: number) =>
    (x < 3 && y < 3) || (x > N - 4 && y < 3) || (x < 3 && y > N - 4);
  return (
    <div
      className="grid h-full w-full"
      style={{ gridTemplateColumns: `repeat(${N}, 1fr)`, gap: 1 }}
    >
      {cells.map((on, i) => {
        const x = i % N,
          y = Math.floor(i / N);
        const corner = isFinder(x, y);
        const filled = corner
          ? !((x === 1 && y === 1) || (x === N - 2 && y === 1) || (x === 1 && y === N - 2))
          : on;
        return (
          <span
            key={i}
            style={{
              backgroundColor: filled ? "#faf6ee" : "#0f0e0c",
              aspectRatio: "1 / 1",
            }}
          />
        );
      })}
    </div>
  );
}

function FieldRow({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function FormField({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-medium uppercase tracking-widest text-[#7c7060]">
        {label}
      </label>
      <input
        className="w-full rounded-md border border-[#e2d5c0] bg-white px-3.5 py-2.5 text-sm text-[#0f0e0c] placeholder-[#7c7060]/60 outline-none transition focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/25"
        {...props}
      />
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
