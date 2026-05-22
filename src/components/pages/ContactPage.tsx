"use client";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button, Eyebrow } from "@/components/ui";

export default function ContactPage() {
  const { t, user } = useApp();
  const [name, setName] = useState(user ? `${user.firstName} ${user.lastName}` : "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !subject || !message) {
      setError("Please fill in all fields.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError("Failed to send. Please try again.");
      }
    } catch {
      setError("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-arabesque min-h-screen pt-24">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>Get In Touch</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-light text-primary md:text-5xl">
            {t("contact.title")}
          </h1>
          <p className="mt-4 text-secondary">{t("contact.subtitle")}</p>
          <div className="hairline mx-auto mt-6 w-32" />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {/* Info cards */}
          <div className="space-y-6">
            <InfoCard
              dot="bg-[#1d3a8a]"
              title="Address"
              lines={[
                "Calle Cuesta de Santo Domingo, 9",
                "29400 Ronda, Málaga",
                "Spain",
              ]}
            />
            <InfoCard
              dot="bg-[#8e1d2c]"
              title="Opening Hours"
              lines={[
                "Daily 10:00 – 19:00",
                "Last entry 18:00",
                "Closed: 25 Dec, 1 Jan",
              ]}
            />
            <InfoCard
              dot="bg-[#1f6f4a]"
              title="Contact"
              lines={[
                "info@casadelreymoro.com",
                "+34 952 187 200",
                "Response within 24 hours",
              ]}
            />
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {sent ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-[#1f6f4a]/30 bg-[#1f6f4a]/5 px-8 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1f6f4a]/15 text-[#1f6f4a]">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="mt-5 font-serif text-2xl text-[#0f0e0c]">
                  {t("contact.success")}
                </h2>
                <p className="mt-2 text-sm text-[#7c7060]">
                  We&apos;ll reply to <span className="font-medium text-[#0f0e0c]">{email}</span> within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-lg border surface-card p-6 shadow-elegant sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label={t("contact.name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                  <FormField
                    label={t("contact.email")}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="mt-5">
                  <FormField
                    label={t("contact.subject")}
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div className="mt-5 space-y-1.5">
                  <label className="block text-[11px] font-medium uppercase tracking-widest text-secondary">
                    {t("contact.message")}
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    placeholder="Tell us about your visit requirements, group size, accessibility needs…"
                    required
                    className="w-full resize-none rounded-md border bg-[var(--input-bg)] px-3.5 py-2.5 text-sm text-primary placeholder-[#7c7060]/50 outline-none transition focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/25"
                    style={{ borderColor: "var(--input-border)" }}
                  />
                </div>

                {error && (
                  <div className="mt-4 rounded-md border border-[#8e1d2c]/30 bg-[#8e1d2c]/5 px-3 py-2 text-sm text-[#8e1d2c]">
                    {error}
                  </div>
                )}

                <div className="mt-6 flex items-center justify-between gap-4">
                  <p className="text-xs text-[#7c7060]">
                    We respond within 24 hours on business days.
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-[#0f0e0c] text-[#faf6ee] hover:bg-[#1d3a8a] shrink-0"
                    disabled={sending}
                  >
                    {sending ? "Sending…" : t("contact.send")}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ dot, title, lines }: { dot: string; title: string; lines: string[] }) {
  return (
    <div className="rounded-lg border surface-card p-6 shadow-card">
      <div className="flex items-center gap-2">
        <span className={`h-3 w-3 rotate-45 ${dot} inline-block`} />
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-secondary">
          {title}
        </h3>
      </div>
      <div className="mt-3 space-y-1">
        {lines.map((l, i) => (
          <p key={i} className="text-sm text-primary">{l}</p>
        ))}
      </div>
    </div>
  );
}

function FormField({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-medium uppercase tracking-widest text-secondary">
        {label}
      </label>
      <input
        className="w-full rounded-md border bg-[var(--input-bg)] px-3.5 py-2.5 text-sm text-primary placeholder-[#7c7060]/50 outline-none transition focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/25"
        style={{ borderColor: "var(--input-border)" }}
        {...props}
      />
    </div>
  );
}
