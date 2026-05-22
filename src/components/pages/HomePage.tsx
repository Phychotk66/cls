"use client";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button, Eyebrow } from "@/components/ui";
import { IMAGES } from "@/lib/media";

/* ── Intersection Observer hook for scroll reveal ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const { t, navigate } = useApp();
  const [showAppPopup, setShowAppPopup] = useState(false);

  /* Show the app popup only once per session */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const shown = sessionStorage.getItem("app_popup_shown");
    if (shown) return;
    const id = window.setTimeout(() => {
      setShowAppPopup(true);
      sessionStorage.setItem("app_popup_shown", "1");
    }, 2500);
    return () => window.clearTimeout(id);
  }, []);

  const closeAppPopup = () => setShowAppPopup(false);

  return (
    <div>
      {showAppPopup && (
        <DownloadAppPopup
          onClose={closeAppPopup}
          onOpenAudioGuide={() => { closeAppPopup(); navigate("/audio-guide"); }}
        />
      )}

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.heroRonda})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f0e0c]/92 via-[#0f0e0c]/75 to-[#0f0e0c]/88" />

        <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-start justify-center px-6 pb-24 pt-32">
          {/* Tri-colour bar */}
          <div className="mb-8 flex items-center gap-0">
            <span className="h-1.5 w-16 bg-[#1d3a8a]" />
            <span className="h-1.5 w-16 bg-[#8e1d2c]" />
            <span className="h-1.5 w-16 bg-[#1f6f4a]" />
          </div>

          <div className="animate-fade-up max-w-3xl">
            <Eyebrow>{t("hero.eyebrow")}</Eyebrow>
            <h1 className="mt-6 font-serif text-5xl font-light leading-[1.0] text-[#faf6ee] sm:text-6xl md:text-7xl lg:text-8xl">
              {t("hero.title")}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#faf6ee]/70 sm:text-lg">
              {t("hero.sub")}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/tickets")}
                className="bg-[#c9a84c] text-[#0f0e0c] hover:bg-[#a07c28] font-semibold"
              >
                {t("hero.cta")} →
              </Button>
              <button
                onClick={() => navigate("/history")}
                className="rounded-md border border-[#faf6ee]/30 px-6 py-3 sm:px-8 sm:py-3.5 text-[11px] font-medium uppercase tracking-widest text-[#faf6ee]/80 transition hover:bg-[#faf6ee]/10 hover:border-[#faf6ee]/60"
              >
                {t("hero.cta2")}
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-6 border-t border-[#faf6ee]/10 pt-10">
            {[
              { value: "800", label: "Years of History", unit: "+" },
              { value: "231", label: "Steps in the Mine", unit: "" },
              { value: "3", label: "Heritage Layers", unit: "" },
            ].map((s) => (
              <div key={s.label}>
                <div className="font-serif text-3xl font-light text-[#c9a84c] sm:text-4xl">
                  {s.value}
                  <span className="text-xl sm:text-2xl">{s.unit}</span>
                </div>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-[#faf6ee]/50 sm:text-[11px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-[#faf6ee]/40">
            <span>Scroll</span>
            <div className="h-8 w-px bg-gradient-to-b from-[#faf6ee]/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── INTRO ────────────────────────────────────────────── */}
      <section className="bg-arabesque">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Conjunto Monumental</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-[#0f0e0c] dark:text-white sm:text-4xl md:text-5xl">
              {t("intro.title")}
            </h2>
            <div className="hairline mt-6" />
            <p className="mt-6 text-sm leading-relaxed text-[#7c7060]">
              Casa del Rey Moro — Bien de Interés Cultural — preserves three
              layers of Ronda&apos;s history above the El Tajo gorge: a Nazarí
              water mine, a neo-Mudéjar palace and one of the earliest hanging
              gardens by Forestier.
            </p>
            <button
              onClick={() => navigate("/history")}
              className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#a07c28] hover:text-[#0f0e0c] transition"
            >
              {t("nav.history")} →
            </button>
          </Reveal>
          <ul className="space-y-5 lg:col-span-7">
            {[
              { n: "I", text: t("intro.p1"), accent: "bg-[#1d3a8a]", label: "Water Mine" },
              { n: "II", text: t("intro.p2"), accent: "bg-[#8e1d2c]", label: "Palace" },
              { n: "III", text: t("intro.p3"), accent: "bg-[#1f6f4a]", label: "Gardens" },
            ].map((row, i) => (
              <Reveal key={row.n} delay={i * 0.12}>
                <li className="group flex items-start gap-5 rounded-xl border border-[#e2d5c0] bg-white/70 p-5 sm:p-6 shadow-card transition hover:border-[#c9a84c]/40 hover:bg-white hover:shadow-elegant dark:border-[#2a2730] dark:bg-[#1a1820]/70 dark:hover:bg-[#1a1820]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center">
                    <span className={`h-3.5 w-3.5 rotate-45 ${row.accent} shadow`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <div className="font-serif text-2xl text-primary">{row.n}.</div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-secondary">
                        {row.label}
                      </span>
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-secondary">
                      {row.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CINEMATIC VIDEO ──────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0f0e0c] text-[#faf6ee]">
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.06]"
          style={{ backgroundImage: `url(${IMAGES.heroBridge})` }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
            {/* Text column */}
            <Reveal className="lg:col-span-5">
              <Eyebrow>Experience the Monument</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl font-light leading-[1.15] text-[#faf6ee] sm:text-4xl lg:text-5xl">
                Walk Through Eight&nbsp;Centuries
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-[#faf6ee]/65">
                From the neo-Mudéjar palace to the 231-step Nazarí water mine
                and Forestier&apos;s hanging gardens — watch the full descent
                above the El Tajo gorge in this cinematic walkthrough.
              </p>
              <div className="mt-8 space-y-5">
                <VideoFeature dot="bg-[#1d3a8a]" icon={<PalaceIcon />} title="The Palace" desc="Neo-Mudéjar tilework, inner courtyards and carved plasterwork" />
                <VideoFeature dot="bg-[#8e1d2c]" icon={<MineIcon />} title="La Mina" desc="231 steps carved through solid rock to the Guadalevín river" />
                <VideoFeature dot="bg-[#1f6f4a]" icon={<GardenIcon />} title="The Gardens" desc="Forestier's hanging terraces cascading into the gorge" />
              </div>
              <div className="mt-8">
                <Button
                  size="lg"
                  onClick={() => navigate("/tickets")}
                  className="bg-gradient-to-r from-[#f5d56b] via-[#c9a84c] to-[#a07c28] text-[#0f0e0c] hover:-translate-y-0.5 shadow-[0_0_24px_rgba(201,168,76,0.25)]"
                >
                  {t("hero.cta")} →
                </Button>
              </div>
            </Reveal>

            {/* Video column */}
            <Reveal className="lg:col-span-7" delay={0.15}>
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#f5d56b]/30 via-[#c9a84c]/15 to-[#a07c28]/20 blur-sm" />
                <div className="relative overflow-hidden rounded-2xl border border-[#c9a84c]/30 bg-[#0f0e0c] shadow-[0_8px_60px_rgba(0,0,0,0.5)]">
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      className="absolute inset-0 h-full w-full"
                      src="https://www.youtube.com/embed/VdP3U6dyeoc?rel=0&modestbranding=1&color=white"
                      title="Casa del Rey Moro — Full Walkthrough"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-[#faf6ee]/10 px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rotate-45 bg-[#c9a84c]" />
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#faf6ee]/50">
                        Full Walkthrough
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rotate-45 bg-[#1d3a8a]" />
                      <span className="h-1.5 w-1.5 rotate-45 bg-[#8e1d2c]" />
                      <span className="h-1.5 w-1.5 rotate-45 bg-[#1f6f4a]" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── GALLERY PREVIEW ──────────────────────────────────── */}
      <section className="bg-[#f4ede0]/60 dark:bg-[#0a0a0c]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <div className="mb-10 flex items-end justify-between">
            <Reveal>
              <Eyebrow>Visual Journey</Eyebrow>
              <h2 className="mt-2 font-serif text-3xl font-light text-[#0f0e0c] dark:text-[#faf6ee] sm:text-4xl md:text-5xl">
                {t("nav.gallery")}
              </h2>
            </Reveal>
            <button
              onClick={() => navigate("/gallery")}
              className="hidden items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#a07c28] transition hover:text-[#0f0e0c] sm:inline-flex"
            >
              View full gallery →
            </button>
          </div>

          <Reveal delay={0.1}>
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4 md:grid-rows-2">
              <div className="col-span-2 row-span-2 overflow-hidden rounded-xl">
                <img
                  src={IMAGES.heroBridge} alt="Puente Nuevo Ronda"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105 cursor-pointer"
                  onClick={() => navigate("/gallery")}
                />
              </div>
              <div className="overflow-hidden rounded-xl">
                <img src={IMAGES.alhambraArch} alt="" className="aspect-square w-full object-cover transition duration-700 hover:scale-105 cursor-pointer" onClick={() => navigate("/gallery")} />
              </div>
              <div className="overflow-hidden rounded-xl">
                <img src={IMAGES.gardenCordoba} alt="" className="aspect-square w-full object-cover transition duration-700 hover:scale-105 cursor-pointer" onClick={() => navigate("/gallery")} />
              </div>
              <div className="overflow-hidden rounded-xl">
                <img src={IMAGES.rondaCliffs} alt="" className="aspect-square w-full object-cover transition duration-700 hover:scale-105 cursor-pointer" onClick={() => navigate("/gallery")} />
              </div>
              <div className="overflow-hidden rounded-xl relative group cursor-pointer" onClick={() => navigate("/gallery")}>
                <img src={IMAGES.rondaAerial} alt="" className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center bg-[#0f0e0c]/50 text-[#faf6ee] transition group-hover:bg-[#0f0e0c]/65">
                  <span className="text-xs font-semibold uppercase tracking-widest">View Gallery →</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TRUST & CREDENTIALS ──────────────────────────────── */}
      <section className="border-y border-[#e2d5c0] bg-white dark:border-[#2a2730] dark:bg-[#14131a]">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
          <Reveal>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 items-center">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1d3a8a]/10">
                  <span className="h-3 w-3 rotate-45 bg-[#1d3a8a]" />
                </div>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7c7060]">
                  Bien de Interés Cultural
                </p>
                <p className="mt-1 text-xs text-[#7c7060]/70">Protected since 1931</p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1f6f4a]/10">
                  <span className="h-3 w-3 rotate-45 bg-[#1f6f4a]" />
                </div>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7c7060]">
                  UNESCO Heritage Trail
                </p>
                <p className="mt-1 text-xs text-[#7c7060]/70">Andalusian heritage route</p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#c9a84c]/10">
                  <span className="h-3 w-3 rotate-45 bg-[#c9a84c]" />
                </div>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7c7060]">
                  150,000+ Visitors
                </p>
                <p className="mt-1 text-xs text-[#7c7060]/70">Annually from 80+ countries</p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#8e1d2c]/10">
                  <span className="h-3 w-3 rotate-45 bg-[#8e1d2c]" />
                </div>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7c7060]">
                  4.8★ Rating
                </p>
                <p className="mt-1 text-xs text-[#7c7060]/70">Google · TripAdvisor</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── AUDIO GUIDE PROMO ────────────────────────────────── */}
      <section className="bg-[#0f0e0c] text-[#faf6ee]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Eyebrow>{t("audio.title")}</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-light sm:text-4xl md:text-5xl">
              In-situ Digital Experience
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-[#faf6ee]/65">
              {t("audio.subtitle")}
            </p>
            <ul className="mt-8 space-y-4 text-sm">
              {[
                { label: t("audio.step1"), accent: "bg-[#1d3a8a]" },
                { label: t("audio.step2"), accent: "bg-[#8e1d2c]" },
                { label: t("audio.step3"), accent: "bg-[#1f6f4a]" },
              ].map((s, i) => (
                <li key={i} className="flex items-center gap-4">
                  <span className={`h-3 w-3 rotate-45 shrink-0 ${s.accent}`} />
                  <span className="text-[#faf6ee]/80">{s.label}</span>
                </li>
              ))}
            </ul>
            <Button
              size="lg"
              onClick={() => navigate("/audio-guide")}
              className="mt-10 bg-[#c9a84c] text-[#0f0e0c] hover:bg-[#a07c28]"
            >
              Launch Audio Guide →
            </Button>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { id: "CRM-01", title: "Patio Principal", area: "Palace entrance", accent: "border-[#1d3a8a]", dot: "bg-[#1d3a8a]" },
                { id: "CRM-02", title: "Mirador del Tajo", area: "Upper terrace", accent: "border-[#c9a84c]", dot: "bg-[#c9a84c]" },
                { id: "CRM-03", title: "Jardín Alto", area: "Forestier gardens", accent: "border-[#1f6f4a]", dot: "bg-[#1f6f4a]" },
                { id: "CRM-04", title: "La Mina", area: "Water Mine descent", accent: "border-[#8e1d2c]", dot: "bg-[#8e1d2c]" },
              ].map((s) => (
                <div
                  key={s.id}
                  className={`rounded-xl border ${s.accent} bg-[#faf6ee]/5 p-4 backdrop-blur transition hover:bg-[#faf6ee]/10`}
                >
                  <span className={`h-2.5 w-2.5 rotate-45 inline-block ${s.dot}`} />
                  <p className="mt-2 text-xs font-semibold text-[#faf6ee]">{s.title}</p>
                  <p className="mt-0.5 text-[10px] text-[#faf6ee]/50">{s.area}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TICKETS CTA ──────────────────────────────────────── */}
      <section className="bg-arabesque">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-[#0f0e0c] px-6 py-14 text-center shadow-elegant sm:px-8 sm:py-20">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${IMAGES.rondaPano})` }}
              />
              <div className="relative">
                <div className="mx-auto flex max-w-xs items-center justify-center gap-4 mb-8">
                  <span className="h-px flex-1 bg-[#faf6ee]/20" />
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rotate-45 bg-[#1d3a8a] inline-block" />
                    <span className="h-2.5 w-2.5 rotate-45 bg-[#8e1d2c] inline-block" />
                    <span className="h-2.5 w-2.5 rotate-45 bg-[#1f6f4a] inline-block" />
                  </div>
                  <span className="h-px flex-1 bg-[#faf6ee]/20" />
                </div>
                <h2 className="font-serif text-3xl font-light text-[#faf6ee] sm:text-4xl md:text-5xl">
                  Plan Your Visit
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-[#faf6ee]/65 leading-relaxed">
                  All visits must be pre-booked. Tickets from €3 per person.
                  Open daily 10:00 – 19:00.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => navigate("/tickets")}
                    className="bg-[#c9a84c] text-[#0f0e0c] hover:bg-[#a07c28]"
                  >
                    {t("hero.cta")} →
                  </Button>
                  <button
                    onClick={() => navigate("/contact")}
                    className="rounded-md border border-[#faf6ee]/30 px-6 py-3 sm:px-8 sm:py-3.5 text-[11px] font-medium uppercase tracking-widest text-[#faf6ee]/80 transition hover:bg-[#faf6ee]/10"
                  >
                    {t("nav.contact")}
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

/* ─── Video section helpers ─── */
function VideoFeature({ dot, icon, title, desc }: { dot: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#faf6ee]/5 text-[#faf6ee]/70">
        {icon}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rotate-45 ${dot}`} />
          <h4 className="text-sm font-semibold text-[#faf6ee]">{title}</h4>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-[#faf6ee]/50">{desc}</p>
      </div>
    </div>
  );
}

function PalaceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 21h18M5 21V7l7-4 7 4v14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 21v-4h6v4M9 10h.01M15 10h.01" strokeLinecap="round" />
    </svg>
  );
}

function MineIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 2v20M8 6l4-4 4 4M8 12h8M6 18h12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GardenIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M12 22V8M8 22c0-4.4 3.6-8 8-8M16 22c0-4.4-3.6-8-8-8" strokeLinecap="round" />
      <circle cx="12" cy="5" r="3" />
    </svg>
  );
}

/* ─── Download App Popup ─── */
function DownloadAppPopup({ onClose, onOpenAudioGuide }: { onClose: () => void; onOpenAudioGuide: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-[#0f0e0c]/65 px-4 pb-4 backdrop-blur-sm sm:items-center sm:pb-0"
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-app-title"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#f5df8f]/40 bg-[#0f0e0c] text-[#faf6ee] shadow-[0_24px_80px_rgba(0,0,0,0.45)] animate-fade-up">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${IMAGES.heroBridge})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0e0c] via-[#0f0e0c]/95 to-[#1d3a8a]/70" />
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-[#faf6ee]/15 text-[#faf6ee]/60 transition hover:border-[#faf6ee]/35 hover:text-[#faf6ee]"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="relative p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#f5d56b] via-[#c9a84c] to-[#a07c28] text-[#0f0e0c] shadow-[0_0_28px_rgba(201,168,76,0.35)]">
              <PhoneIcon />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9a84c]">New visitor companion</p>
              <h2 id="download-app-title" className="mt-1 font-serif text-2xl text-[#faf6ee]">Download the App</h2>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-[#faf6ee]/70">
            Carry Casa del Rey Moro in your pocket: tickets, route map,
            Bluetooth beacon audio guide, and visit alerts in one premium app.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3 rounded-xl border border-[#faf6ee]/10 bg-[#faf6ee]/5 p-3 text-center">
            <MiniMetric value="6" label="Audio stops" dot="bg-[#1d3a8a]" />
            <MiniMetric value="3" label="Languages" dot="bg-[#8e1d2c]" />
            <MiniMetric value="Offline" label="Maps" dot="bg-[#1f6f4a]" />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button onClick={onClose} className="rounded-xl border border-[#faf6ee]/15 bg-[#faf6ee]/8 px-4 py-3 text-left transition hover:border-[#c9a84c]/60 hover:bg-[#faf6ee]/12">
              <span className="block text-[10px] uppercase tracking-widest text-[#faf6ee]/45">Download on the</span>
              <span className="mt-0.5 block text-sm font-semibold text-[#faf6ee]">App Store</span>
            </button>
            <button onClick={onClose} className="rounded-xl border border-[#faf6ee]/15 bg-[#faf6ee]/8 px-4 py-3 text-left transition hover:border-[#c9a84c]/60 hover:bg-[#faf6ee]/12">
              <span className="block text-[10px] uppercase tracking-widest text-[#faf6ee]/45">Get it on</span>
              <span className="mt-0.5 block text-sm font-semibold text-[#faf6ee]">Google Play</span>
            </button>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <button onClick={onOpenAudioGuide} className="flex-1 rounded-full bg-gradient-to-r from-[#f5d56b] via-[#c9a84c] to-[#a07c28] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0f0e0c] transition hover:-translate-y-0.5">
              Open Audio Guide
            </button>
            <button onClick={onClose} className="flex-1 rounded-full border border-[#faf6ee]/15 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#faf6ee]/70 transition hover:border-[#faf6ee]/35 hover:text-[#faf6ee]">
              Continue Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniMetric({ value, label, dot }: { value: string; label: string; dot: string }) {
  return (
    <div>
      <span className={`mx-auto mb-2 block h-2 w-2 rotate-45 ${dot}`} />
      <p className="text-xs font-semibold text-[#faf6ee]">{value}</p>
      <p className="mt-0.5 text-[9px] uppercase tracking-widest text-[#faf6ee]/40">{label}</p>
    </div>
  );
}

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M11 18h2" strokeLinecap="round" />
    </svg>
  );
}
