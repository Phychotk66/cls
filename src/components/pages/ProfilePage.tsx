"use client";
import { useState } from "react";
import { useApp, TICKET_PRICES } from "@/contexts/AppContext";
import type { Booking } from "@/contexts/AppContext";
import { Button, Eyebrow, Badge } from "@/components/ui";

type Tab = "profile" | "bookings" | "settings";

export default function ProfilePage() {
  const { t, user, logout, navigate, bookings, updateProfile, changePassword, setLang } = useApp();
  const [tab, setTab] = useState<Tab>("profile");
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [saved, setSaved] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwOk, setPwOk] = useState(false);

  if (!user) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-40 text-center">
        <h1 className="font-serif text-3xl">Sign in to view your profile</h1>
        <div className="mt-6 flex justify-center gap-3">
          <Button className="bg-[#0f0e0c] text-[#faf6ee]" onClick={() => navigate("/login")}>
            {t("auth.signin")}
          </Button>
          <Button variant="outline" onClick={() => navigate("/signup")}>
            {t("auth.signup")}
          </Button>
        </div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    updateProfile({ firstName, lastName });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChangePw = () => {
    setPwError("");
    setPwOk(false);
    const res = changePassword(currentPw, newPw);
    if (res.ok) {
      setPwOk(true);
      setCurrentPw("");
      setNewPw("");
    } else {
      setPwError(res.error ?? "Error");
    }
  };

  return (
    <div className="bg-arabesque min-h-screen pt-24">
      <section className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <Eyebrow>{t("nav.profile")}</Eyebrow>
            <h1 className="mt-4 font-serif text-4xl font-light text-[#0f0e0c]">
              {user.firstName} {user.lastName}
            </h1>
            <p className="mt-1 text-sm text-[#7c7060]">{user.email}</p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0f0e0c] text-xl font-semibold text-[#c9a84c]">
            {user.firstName[0]}{user.lastName?.[0] ?? ""}
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex items-center gap-1 border-b border-[#e2d5c0]">
          {(["profile", "bookings", "settings"] as Tab[]).map((tab_) => (
            <button
              key={tab_}
              onClick={() => setTab(tab_)}
              className={`px-5 py-3 text-[11px] font-semibold uppercase tracking-widest transition border-b-2 -mb-px ${
                tab === tab_
                  ? "border-[#c9a84c] text-[#0f0e0c]"
                  : "border-transparent text-[#7c7060] hover:text-[#0f0e0c]"
              }`}
            >
              {tab_ === "profile" ? "Profile" : tab_ === "bookings" ? t("profile.tabBookings") : t("profile.tabSettings")}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {/* ── Profile tab ── */}
          {tab === "profile" && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-lg border border-[#e2d5c0] bg-white p-8 shadow-card">
                <h2 className="font-serif text-2xl text-[#0f0e0c]">Personal Information</h2>
                <div className="mt-6 space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      label={t("auth.firstName")}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <FormField
                      label={t("auth.lastName")}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <FormField label={t("auth.email")} value={user.email} disabled />
                  <FormField
                    label="Member since"
                    value={new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    disabled
                  />
                </div>
                <Button
                  className="mt-6 bg-[#0f0e0c] text-[#faf6ee] hover:bg-[#1d3a8a]"
                  onClick={handleSaveProfile}
                >
                  {saved ? "✓ Saved!" : "Save Changes"}
                </Button>
              </div>

              <div className="rounded-lg border border-[#e2d5c0] bg-white p-8 shadow-card">
                <h2 className="font-serif text-2xl text-[#0f0e0c]">Quick Actions</h2>
                <div className="mt-6 space-y-3">
                  <ActionCard
                    title={t("nav.tickets")}
                    desc="Browse and book tickets for your next visit"
                    onClick={() => navigate("/tickets")}
                    dot="bg-[#1d3a8a]"
                  />
                  <ActionCard
                    title={t("nav.audio")}
                    desc="Access the audio guide for your visit"
                    onClick={() => navigate("/audio-guide")}
                    dot="bg-[#1f6f4a]"
                  />
                  <ActionCard
                    title={t("nav.contact")}
                    desc="Get in touch with our team"
                    onClick={() => navigate("/contact")}
                    dot="bg-[#8e1d2c]"
                  />
                </div>
                <button
                  onClick={logout}
                  className="mt-6 text-sm text-[#8e1d2c] hover:underline"
                >
                  {t("nav.logout")}
                </button>
              </div>
            </div>
          )}

          {/* ── Bookings tab ── */}
          {tab === "bookings" && (
            <div>
              {bookings.length === 0 ? (
                <div className="text-center py-16">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e2d5c0]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl">No bookings yet</h2>
                  <p className="mt-2 text-sm text-[#7c7060]">Your confirmed bookings will appear here.</p>
                  <Button
                    className="mt-6 bg-[#0f0e0c] text-[#faf6ee]"
                    onClick={() => navigate("/tickets")}
                  >
                    {t("nav.tickets")}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((b) => (
                    <BookingCard key={b.id} booking={b} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Settings tab ── */}
          {tab === "settings" && (
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-lg border border-[#e2d5c0] bg-white p-8 shadow-card">
                <h2 className="font-serif text-2xl text-[#0f0e0c]">Change Password</h2>
                <div className="mt-6 space-y-4">
                  <FormField
                    label="Current Password"
                    type="password"
                    value={currentPw}
                    onChange={(e) => setCurrentPw(e.target.value)}
                    placeholder="••••••••"
                  />
                  <FormField
                    label="New Password"
                    type="password"
                    value={newPw}
                    onChange={(e) => setNewPw(e.target.value)}
                    placeholder="Min. 6 characters"
                  />
                  {pwError && (
                    <div className="rounded-md border border-[#8e1d2c]/30 bg-[#8e1d2c]/5 px-3 py-2 text-sm text-[#8e1d2c]">
                      {pwError}
                    </div>
                  )}
                  {pwOk && (
                    <div className="rounded-md border border-[#1f6f4a]/30 bg-[#1f6f4a]/5 px-3 py-2 text-sm text-[#1f6f4a]">
                      Password updated successfully.
                    </div>
                  )}
                </div>
                <Button
                  className="mt-6 bg-[#0f0e0c] text-[#faf6ee] hover:bg-[#1d3a8a]"
                  onClick={handleChangePw}
                >
                  Update Password
                </Button>
              </div>

              <div className="rounded-lg border border-[#e2d5c0] bg-white p-8 shadow-card">
                <h2 className="font-serif text-2xl text-[#0f0e0c]">Language Preference</h2>
                <div className="mt-6 space-y-3">
                  {(["en", "es", "de"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 text-sm transition ${
                        user.language === l
                          ? "border-[#c9a84c] bg-[#f4ede0] font-medium text-[#0f0e0c]"
                          : "border-[#e2d5c0] text-[#7c7060] hover:border-[#c9a84c]/40"
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 rotate-45 inline-block ${
                        l === "en" ? "bg-[#1d3a8a]" : l === "es" ? "bg-[#8e1d2c]" : "bg-[#1f6f4a]"
                      }`} />
                      {l === "en" ? "English" : l === "es" ? "Español" : "Deutsch"}
                      {user.language === l && (
                        <span className="ml-auto text-xs text-[#c9a84c]">✓ Active</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  const statusColors = {
    confirmed: "green" as const,
    used: "gold" as const,
    cancelled: "red" as const,
  };
  return (
    <div className="rounded-lg border border-[#e2d5c0] bg-white p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <p className="font-mono text-sm font-semibold tracking-widest text-[#0f0e0c]">
              {booking.code}
            </p>
            <Badge color={statusColors[booking.status]}>
              {booking.status}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-[#7c7060]">
            {booking.date} · {booking.time}
          </p>
        </div>
        <span className="font-serif text-2xl text-[#0f0e0c]">
          €{Number(booking.total).toFixed(2)}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {booking.lines.map((l) => (
          <span
            key={l.type}
            className="rounded-md bg-[#f4ede0] px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-[#7c7060]"
          >
            {l.qty}× {l.type}
          </span>
        ))}
      </div>
    </div>
  );
}

function ActionCard({
  title,
  desc,
  onClick,
  dot,
}: {
  title: string;
  desc: string;
  onClick: () => void;
  dot: string;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-start gap-4 rounded-md border border-[#e2d5c0] p-4 text-left transition hover:border-[#c9a84c]/40 hover:bg-[#f4ede0]/50"
    >
      <span className={`h-3 w-3 rotate-45 shrink-0 mt-1 ${dot} inline-block`} />
      <div>
        <p className="text-sm font-medium text-[#0f0e0c]">{title}</p>
        <p className="mt-0.5 text-xs text-[#7c7060]">{desc}</p>
      </div>
    </button>
  );
}

function FormField({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-medium uppercase tracking-widest text-[#7c7060]">
        {label}
      </label>
      <input
        className="w-full rounded-md border border-[#e2d5c0] bg-white px-3.5 py-2.5 text-sm text-[#0f0e0c] placeholder-[#7c7060]/50 outline-none transition focus:border-[#c9a84c] focus:ring-2 focus:ring-[#c9a84c]/25 disabled:bg-[#f4ede0] disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  );
}
