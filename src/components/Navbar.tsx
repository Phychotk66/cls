"use client";
import { useState, useEffect, useRef } from "react";
import { useApp } from "@/contexts/AppContext";
import Logo from "./Logo";
import { cn } from "@/lib/utils";

const LANG_LABELS: Record<"en" | "es" | "de", { name: string; flag: string }> = {
  en: { name: "English", flag: "🇬🇧" },
  es: { name: "Español", flag: "🇪🇸" },
  de: { name: "Deutsch", flag: "🇩🇪" },
};

export default function Navbar() {
  const {
    t,
    navigate,
    route,
    user,
    logout,
    cartCount,
    lang,
    setLang,
    theme,
    toggleTheme,
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<
    "visit" | "lang" | "profile" | null
  >(null);
  const [mobileVisitOpen, setMobileVisitOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
    setMobileVisitOpen(false);
  }, [route]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const isHome = route === "/" || route === "";
  const transparentHeader = isHome && !scrolled;

  const visitLinks = [
    { href: "/the-places", label: "The Places", dot: "bg-[#c9a84c]", desc: "The neo-Mudéjar house and its noble heritage" },
    { href: "/water-mine", label: "La Mina", dot: "bg-[#8e1d2c]", desc: "Descend 231 steps to the Guadalevín river" },
    { href: "/gardens", label: "Gardens", dot: "bg-[#1f6f4a]", desc: "Forestier's hanging garden masterpiece" },
  ];

  const isVisitActive = visitLinks.some((v) => v.href === route);

  const navLinks = [
    { href: "/history", label: t("nav.history") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/audio-guide", label: t("nav.audio") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <header
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparentHeader
          ? "bg-transparent"
          : "bg-[var(--header-bg)] backdrop-blur-md shadow-md"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        {/* ── Logo ── */}
        <button
          onClick={() => navigate("/")}
          className="shrink-0 focus:outline-none"
          aria-label="Casa del Rey Moro home"
        >
          <Logo variant="light" size="sm" />
        </button>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {/* VISIT dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === "visit" ? null : "visit")}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-medium uppercase tracking-widest rounded transition-colors",
                isVisitActive || openMenu === "visit"
                  ? "text-[#c9a84c]"
                  : "text-[#faf6ee]/80 hover:text-[#faf6ee]"
              )}
              aria-expanded={openMenu === "visit"}
            >
              Visit
              <Chevron open={openMenu === "visit"} />
            </button>
            {openMenu === "visit" && (
              <div className="absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 rounded-lg border border-[#e2d5c0] bg-white shadow-elegant animate-slide-down dark:border-[#2a2730] dark:bg-[#1a1820]">
                <div className="border-b border-[#e2d5c0] px-4 py-3 dark:border-[#2a2730]">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a07c28]">
                    Plan Your Visit
                  </p>
                </div>
                <div className="p-2">
                  {visitLinks.map((v) => (
                    <button
                      key={v.href}
                      onClick={() => {
                        navigate(v.href);
                        setOpenMenu(null);
                      }}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition",
                        route === v.href
                          ? "bg-[#f4ede0] dark:bg-[#221f29]"
                          : "hover:bg-[#f4ede0]/60 dark:hover:bg-[#221f29]/60"
                      )}
                    >
                      <span className={`mt-1 h-2.5 w-2.5 rotate-45 shrink-0 ${v.dot}`} />
                      <div>
                        <p className="text-sm font-medium text-[#0f0e0c] dark:text-[#faf6ee]">
                          {v.label}
                        </p>
                        <p className="mt-0.5 text-xs text-[#7c7060] dark:text-[#b8ad9c]">
                          {v.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => navigate(l.href)}
              className={cn(
                "px-3.5 py-2 text-[11px] font-medium uppercase tracking-widest transition-colors rounded",
                route === l.href
                  ? "text-[#c9a84c]"
                  : "text-[#faf6ee]/80 hover:text-[#faf6ee]"
              )}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language dropdown (desktop) */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setOpenMenu(openMenu === "lang" ? null : "lang")}
              className="flex items-center gap-1.5 rounded-md border border-[#faf6ee]/15 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#faf6ee]/70 transition hover:text-[#faf6ee] hover:border-[#faf6ee]/30"
              aria-label="Change language"
            >
              <span className="text-sm leading-none">{LANG_LABELS[lang].flag}</span>
              <span>{lang}</span>
              <Chevron open={openMenu === "lang"} />
            </button>
            {openMenu === "lang" && (
              <div className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-[#e2d5c0] bg-white shadow-elegant animate-slide-down dark:border-[#2a2730] dark:bg-[#1a1820]">
                {(["en", "es", "de"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setLang(l);
                      setOpenMenu(null);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition first:rounded-t-lg last:rounded-b-lg",
                      lang === l
                        ? "bg-[#f4ede0] font-semibold text-[#0f0e0c] dark:bg-[#221f29] dark:text-[#faf6ee]"
                        : "text-[#7c7060] hover:bg-[#f4ede0]/60 dark:text-[#b8ad9c] dark:hover:bg-[#221f29]/60"
                    )}
                  >
                    <span className="text-base">{LANG_LABELS[l].flag}</span>
                    <span>{LANG_LABELS[l].name}</span>
                    {lang === l && (
                      <span className="ml-auto text-xs text-[#c9a84c]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[#faf6ee]/15 text-[#faf6ee]/70 transition hover:border-[#faf6ee]/30 hover:text-[#faf6ee]"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`${theme === "dark" ? "Light" : "Dark"} mode`}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Premium booking CTA */}
          <button
            onClick={() => navigate("/tickets")}
            className="group relative hidden overflow-hidden rounded-full border border-[#f5df8f]/60 bg-gradient-to-r from-[#f5d56b] via-[#c9a84c] to-[#a07c28] px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0f0e0c] shadow-[0_0_24px_rgba(201,168,76,0.28)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(201,168,76,0.45)] md:flex md:items-center md:gap-2 md:ml-1"
          >
            <span className="absolute inset-y-0 -left-10 w-8 rotate-12 bg-white/45 blur-sm transition-transform duration-700 group-hover:translate-x-44" />
            <TicketIcon />
            <span className="relative hidden xl:inline">Book Your Visit</span>
            <span className="relative xl:hidden">Book</span>
            {cartCount > 0 && (
              <span className="relative ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#0f0e0c] px-1.5 text-[10px] font-bold tracking-normal text-[#c9a84c]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile dropdown */}
          <div className="relative hidden md:block">
            <button
              onClick={() =>
                setOpenMenu(openMenu === "profile" ? null : "profile")
              }
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#faf6ee]/20 text-[#faf6ee]/80 transition hover:border-[#c9a84c] hover:text-[#c9a84c]"
              aria-label="Account menu"
            >
              {user ? (
                <span className="text-xs font-semibold">
                  {user.firstName[0]}
                  {user.lastName?.[0] ?? ""}
                </span>
              ) : (
                <UserIcon />
              )}
            </button>

            {openMenu === "profile" && (
              <div className="absolute right-0 top-12 w-56 rounded-lg border border-[#e2d5c0] bg-white shadow-elegant animate-slide-down dark:border-[#2a2730] dark:bg-[#1a1820]">
                {user ? (
                  <>
                    <div className="border-b border-[#e2d5c0] px-4 py-3 dark:border-[#2a2730]">
                      <p className="text-sm font-medium text-[#0f0e0c] dark:text-[#faf6ee]">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-[#7c7060] truncate dark:text-[#b8ad9c]">
                        {user.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <DropItem onClick={() => navigate("/profile")}>
                        {t("nav.profile")}
                      </DropItem>
                      <DropItem
                        onClick={() => navigate("/profile?tab=bookings")}
                      >
                        {t("profile.tabBookings")}
                      </DropItem>
                      <DropItem onClick={() => navigate("/profile?tab=settings")}>
                        {t("profile.tabSettings")}
                      </DropItem>
                      <div className="my-1 border-t border-[#e2d5c0] dark:border-[#2a2730]" />
                      <DropItem
                        onClick={() => {
                          logout();
                          setOpenMenu(null);
                        }}
                        className="text-[#8e1d2c]"
                      >
                        {t("nav.logout")}
                      </DropItem>
                    </div>
                  </>
                ) : (
                  <div className="py-1">
                    <DropItem onClick={() => navigate("/login")}>
                      {t("auth.signin")}
                    </DropItem>
                    <DropItem onClick={() => navigate("/signup")}>
                      {t("auth.signup")}
                    </DropItem>
                    <div className="my-1 border-t border-[#e2d5c0] dark:border-[#2a2730]" />
                    <DropItem
                      onClick={() => navigate("/forgot-password")}
                      className="text-xs"
                    >
                      Forgot password?
                    </DropItem>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 text-[#faf6ee] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span
              className={cn(
                "h-px w-5 bg-current transition-all",
                mobileOpen && "translate-y-2 rotate-45"
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-current transition-all",
                mobileOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "h-px w-5 bg-current transition-all",
                mobileOpen && "-translate-y-2 -rotate-45"
              )}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-[#faf6ee]/10 bg-[#0a0a0c] px-4 pb-6 pt-2 md:hidden animate-slide-down">
          <nav className="mt-4 space-y-1">
            {/* Mobile VISIT collapsible */}
            <button
              onClick={() => setMobileVisitOpen((o) => !o)}
              className={cn(
                "flex w-full items-center justify-between rounded-md px-4 py-3 text-left text-sm font-medium uppercase tracking-widest transition",
                isVisitActive
                  ? "bg-[#faf6ee]/5 text-[#c9a84c]"
                  : "text-[#faf6ee]/80 hover:text-[#faf6ee]"
              )}
            >
              <span>Visit</span>
              <Chevron open={mobileVisitOpen} />
            </button>
            {mobileVisitOpen && (
              <div className="ml-3 space-y-1 border-l-2 border-[#c9a84c]/30 pl-3 animate-slide-down">
                {visitLinks.map((v) => (
                  <button
                    key={v.href}
                    onClick={() => navigate(v.href)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm transition",
                      route === v.href
                        ? "text-[#c9a84c]"
                        : "text-[#faf6ee]/70 hover:text-[#faf6ee]"
                    )}
                  >
                    <span className={`h-2 w-2 rotate-45 ${v.dot}`} />
                    {v.label}
                  </button>
                ))}
              </div>
            )}

            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => navigate(l.href)}
                className={cn(
                  "block w-full rounded-md px-4 py-3 text-left text-sm font-medium uppercase tracking-widest transition",
                  route === l.href
                    ? "bg-[#faf6ee]/5 text-[#c9a84c]"
                    : "text-[#faf6ee]/70 hover:text-[#faf6ee]"
                )}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Mobile actions */}
          <div className="mt-6 space-y-3 border-t border-[#faf6ee]/10 pt-6">
            <button
              onClick={() => navigate("/tickets")}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#c9a84c] px-6 py-3 text-[11px] font-semibold uppercase tracking-widest text-[#0f0e0c]"
            >
              <TicketIcon /> Book Your Visit
              {cartCount > 0 && (
                <span className="grid h-5 min-w-5 px-1.5 place-items-center rounded-full bg-[#0f0e0c] text-[10px] font-bold text-[#c9a84c]">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full rounded-md border border-[#faf6ee]/20 px-6 py-3 text-[11px] font-medium uppercase tracking-widest text-[#faf6ee]/80"
                >
                  {t("nav.profile")} · {user.firstName}
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full text-xs text-[#faf6ee]/40 hover:text-[#faf6ee]/70 transition"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="rounded-md border border-[#faf6ee]/20 px-6 py-3 text-[11px] font-medium uppercase tracking-widest text-[#faf6ee]/80"
                >
                  {t("auth.signin")}
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="rounded-md border border-[#c9a84c]/40 px-6 py-3 text-[11px] font-medium uppercase tracking-widest text-[#c9a84c]"
                >
                  {t("auth.signup")}
                </button>
              </div>
            )}

            {/* Mobile lang + theme */}
            <div className="flex items-center justify-between gap-3 border-t border-[#faf6ee]/10 pt-4">
              <div className="flex items-center gap-2">
                {(["en", "es", "de"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={cn(
                      "flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest transition",
                      lang === l
                        ? "border-[#c9a84c] text-[#c9a84c]"
                        : "border-[#faf6ee]/15 text-[#faf6ee]/50"
                    )}
                  >
                    <span>{LANG_LABELS[l].flag}</span>
                    {l}
                  </button>
                ))}
              </div>
              <button
                onClick={toggleTheme}
                className="flex h-9 items-center gap-2 rounded-md border border-[#faf6ee]/15 px-3 text-xs text-[#faf6ee]/70 transition hover:text-[#faf6ee]"
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                <span className="text-[10px] uppercase tracking-widest">
                  {theme === "dark" ? "Light" : "Dark"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Helpers ───────────────────────────────────────────────── */
function DropItem({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "block w-full px-4 py-2 text-left text-sm text-[#0f0e0c] hover:bg-[#f4ede0] transition dark:text-[#faf6ee] dark:hover:bg-[#221f29]",
        className
      )}
    >
      {children}
    </button>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={cn("transition-transform", open && "rotate-180")}
      aria-hidden="true"
    >
      <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 9a2 2 0 012-2h16a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V9z" />
      <line x1="13" y1="5" x2="13" y2="19" strokeDasharray="2 2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" strokeLinecap="round" />
    </svg>
  );
}
