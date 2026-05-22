"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useApp } from "@/contexts/AppContext";
import type { Lang } from "@/contexts/AppContext";
import { Button, Eyebrow } from "@/components/ui";

/* ──────────────────────────────────────────────────────────────
   Station / Beacon data
   ────────────────────────────────────────────────────────────── */
type Beacon = {
  id: string;
  station: number;
  title: string;
  area: string;
  duration: number;
  dotColor: string;
  borderColor: string;
  desc: Record<Lang, string>;
};

const BEACONS: Beacon[] = [
  {
    id: "CRM-01",
    station: 1,
    title: "Patio Principal",
    area: "Palace entrance",
    duration: 30,
    dotColor: "bg-[#1d3a8a]",
    borderColor: "border-[#1d3a8a]",
    desc: {
      en: "Welcome to the main courtyard of Casa del Rey Moro. This elegant neo-Mudéjar space was restored in the early 20th century and serves as the ceremonial heart of the palace.",
      es: "Bienvenido al patio principal de la Casa del Rey Moro. Este elegante espacio neo-mudéjar fue restaurado a principios del siglo XX y sirve como el corazón ceremonial del palacio.",
      de: "Willkommen im Haupthof der Casa del Rey Moro. Dieser elegante neo-maurische Raum wurde im frühen 20. Jahrhundert restauriert und dient als zeremonielles Herz des Palastes.",
    },
  },
  {
    id: "CRM-02",
    station: 2,
    title: "Mirador del Tajo",
    area: "Upper terrace",
    duration: 30,
    dotColor: "bg-[#c9a84c]",
    borderColor: "border-[#c9a84c]",
    desc: {
      en: "From this vantage point you can appreciate the dramatic El Tajo gorge — a 100-metre sheer drop carved by the Guadalevín river over millennia.",
      es: "Desde este mirador se puede apreciar el dramático tajo — una caída vertical de 100 metros tallada por el río Guadalevín durante milenios.",
      de: "Von diesem Aussichtspunkt aus können Sie die dramatische El-Tajo-Schlucht bewundern — ein 100 Meter tiefer Abgrund, den der Fluss Guadalevín über Jahrtausende geformt hat.",
    },
  },
  {
    id: "CRM-03",
    station: 3,
    title: "Jardín Alto",
    area: "Forestier gardens",
    duration: 30,
    dotColor: "bg-[#1f6f4a]",
    borderColor: "border-[#1f6f4a]",
    desc: {
      en: "Designed by Jean-Claude Nicolas Forestier, these hanging gardens are contemporaries of the Generalife gardens at the Alhambra and cascade dramatically down the gorge face.",
      es: "Diseñados por Jean-Claude Nicolas Forestier, estos jardines colgantes son contemporáneos de los jardines del Generalife en la Alhambra y caen dramáticamente por la cara de la garganta.",
      de: "Diese von Jean-Claude Nicolas Forestier entworfenen Hängegärten sind Zeitgenossen der Generalife-Gärten der Alhambra und erstrecken sich dramatisch die Schlucht hinab.",
    },
  },
  {
    id: "CRM-04",
    station: 4,
    title: "La Mina · descent",
    area: "Water Mine top",
    duration: 30,
    dotColor: "bg-[#8e1d2c]",
    borderColor: "border-[#8e1d2c]",
    desc: {
      en: "Before you lies the entrance to the Nazarí water mine — La Mina. Carved in the 14th century, 231 steps descend 100 metres through solid rock to the river below.",
      es: "Ante usted se encuentra la entrada a la mina de agua nazarí — La Mina. Tallada en el siglo XIV, 231 escalones descienden 100 metros a través de roca sólida hasta el río.",
      de: "Vor Ihnen liegt der Eingang zur Nasridenmine — La Mina. Im 14. Jahrhundert in den Fels gehauen, führen 231 Stufen 100 Meter hinab zum Fluss.",
    },
  },
  {
    id: "CRM-05",
    station: 5,
    title: "Sala de la Noria",
    area: "Mid-level chamber",
    duration: 30,
    dotColor: "bg-[#7c7060]",
    borderColor: "border-[#7c7060]",
    desc: {
      en: "The wheel room housed the wooden waterwheel used to raise water from the Guadalevín river to the city above during sieges — a feat of medieval engineering.",
      es: "La sala de la noria albergaba la rueda de agua de madera utilizada para elevar agua del río Guadalevín a la ciudad durante los asedios — una proeza de la ingeniería medieval.",
      de: "Der Radraum beherbergte das hölzerne Wasserrad, mit dem während Belagerungen Wasser aus dem Guadalevín hinauf in die Stadt befördert wurde — eine Meisterleistung mittelalterlicher Ingenieurskunst.",
    },
  },
  {
    id: "CRM-06",
    station: 6,
    title: "Río Guadalevín",
    area: "River bed",
    duration: 30,
    dotColor: "bg-[#1d3a8a]",
    borderColor: "border-[#1d3a8a]",
    desc: {
      en: "You have reached the banks of the Guadalevín river. Look up to appreciate the 100-metre walls of El Tajo gorge towering above you — a perspective few visitors experience.",
      es: "Ha llegado a las orillas del río Guadalevín. Mire hacia arriba para apreciar los muros de 100 metros del Tajo que se elevan sobre usted — una perspectiva que pocos visitantes experimentan.",
      de: "Sie haben die Ufer des Guadalevín erreicht. Blicken Sie nach oben, um die 100 Meter hohen Wände der El-Tajo-Schlucht zu bewundern — eine Perspektive, die nur wenige Besucher erleben.",
    },
  },
];

const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
};

/* ──────────────────────────────────────────────────────────────
   Main component
   ────────────────────────────────────────────────────────────── */
export default function AudioGuidePage() {
  const { t, lang, navigate, user } = useApp();
  const [selectedLang, setSelectedLang] = useState<Lang>(lang);
  const [activeBeaconId, setActiveBeaconId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [audioReady, setAudioReady] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);

  // HTML5 Audio ref
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSrcRef = useRef<string>("");

  /* ── Keep volume synced ── */
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  /* ── Load & play audio for a beacon ── */
  const loadAudioForBeacon = useCallback(
    (beacon: Beacon) => {
      const src = `/api/demo-audio?station=${beacon.station}&lang=${selectedLang}`;

      if (currentSrcRef.current === src && audioRef.current) {
        return;
      }

      setAudioLoading(true);
      setAudioReady(false);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeAttribute("src");
        audioRef.current.load();
      }

      const audio = new Audio(src);
      audio.preload = "auto";
      audio.volume = volume / 100;
      audioRef.current = audio;
      currentSrcRef.current = src;

      audio.addEventListener("loadedmetadata", () => {
        setDuration(Math.ceil(audio.duration));
        setAudioReady(true);
        setAudioLoading(false);
      });

      audio.addEventListener("canplaythrough", () => {
        setAudioReady(true);
        setAudioLoading(false);
      });

      audio.addEventListener("timeupdate", () => {
        setProgress(Math.floor(audio.currentTime));
      });

      audio.addEventListener("ended", () => {
        setPlaying(false);
        setProgress(0);
        // Auto-advance to next station
        const next = BEACONS.find((b) => b.station === beacon.station + 1);
        if (next) {
          setActiveBeaconId(next.id);
        }
      });

      audio.addEventListener("error", () => {
        setAudioLoading(false);
        setAudioReady(false);
      });

      audio.load();
    },
    [selectedLang, volume]
  );

  /* ── When active beacon changes, load audio ── */
  useEffect(() => {
    if (!activeBeaconId) return;
    const beacon = BEACONS.find((b) => b.id === activeBeaconId);
    if (!beacon) return;
    loadAudioForBeacon(beacon);
  }, [activeBeaconId, loadAudioForBeacon]);

  /* ── Play / pause the actual audio ── */
  useEffect(() => {
    if (!audioRef.current || !audioReady) return;
    if (playing) {
      audioRef.current.play().catch(() => {
        setPlaying(false);
      });
    } else {
      audioRef.current.pause();
    }
  }, [playing, audioReady]);

  /* ── Auto-play when audio is loaded ── */
  useEffect(() => {
    if (audioReady && activeBeaconId) {
      setPlaying(true);
    }
  }, [audioReady, activeBeaconId]);

  /* ── Persist audio session to DB ── */
  useEffect(() => {
    if (!activeBeaconId) return;
    const beacon = BEACONS.find((b) => b.id === activeBeaconId);
    if (!beacon) return;
    fetch("/api/audio-sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user?.id ?? null,
        beaconId: beacon.id,
        station: beacon.station,
        language: selectedLang,
      }),
    }).catch(() => {});
  }, [activeBeaconId, selectedLang, user]);

  /* ── Cleanup on unmount ── */
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeAttribute("src");
        audioRef.current.load();
        audioRef.current = null;
      }
    };
  }, []);

  /* ── Stop playback ── */
  const stopAll = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeAttribute("src");
      audioRef.current.load();
      audioRef.current = null;
    }
    currentSrcRef.current = "";
    setActiveBeaconId(null);
    setPlaying(false);
    setProgress(0);
    setDuration(0);
    setAudioReady(false);
  };

  /* ── Seek ── */
  const seek = (seconds: number) => {
    if (audioRef.current && audioReady) {
      audioRef.current.currentTime = seconds;
      setProgress(seconds);
    }
  };

  /* ── Select a station — plays immediately ── */
  const selectBeacon = (id: string) => {
    if (activeBeaconId === id) {
      setPlaying((p) => !p);
      return;
    }
    setPlaying(false);
    setProgress(0);
    currentSrcRef.current = "";
    setActiveBeaconId(id);
  };

  const active = BEACONS.find((b) => b.id === activeBeaconId);
  const effectiveDuration = active
    ? duration > 0
      ? duration
      : active.duration
    : 0;
  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-[#faf6ee] pt-24">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        {/* ── Header ── */}
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow>In-situ Experience</Eyebrow>
          <h1 className="mt-4 font-serif text-4xl font-light text-[#faf6ee] sm:text-5xl">
            {t("audio.title")}
          </h1>
          <p className="mt-4 text-[#faf6ee]/60">{t("audio.subtitle")}</p>
        </div>

        {/* ── Language selector ── */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex w-full max-w-md items-center rounded-lg border border-[#faf6ee]/15 bg-[#faf6ee]/5 p-1">
            {(["en", "es", "de"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => {
                  setSelectedLang(l);
                  if (activeBeaconId) {
                    setPlaying(false);
                    currentSrcRef.current = "";
                    const beacon = BEACONS.find(
                      (b) => b.id === activeBeaconId
                    );
                    if (beacon) {
                      setTimeout(() => loadAudioForBeacon(beacon), 100);
                    }
                  }
                }}
                className={`flex-1 rounded-md px-3 py-2.5 text-xs font-semibold uppercase tracking-widest transition ${
                  selectedLang === l
                    ? "bg-[#c9a84c] text-[#0f0e0c]"
                    : "text-[#faf6ee]/60 hover:text-[#faf6ee]"
                }`}
              >
                {LANG_LABELS[l]}
              </button>
            ))}
          </div>
        </div>

        {/* ── Now playing player ── */}
        {active && (
          <div className="mt-10 mx-auto max-w-2xl rounded-xl border border-[#c9a84c]/40 bg-[#faf6ee]/5 p-5 sm:p-8 animate-fade-in">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`h-3 w-3 rotate-45 ${active.dotColor} inline-block`}
                  />
                  {playing && (
                    <span className="flex items-center gap-0.5">
                      <span className="inline-block w-0.5 h-3 bg-[#c9a84c] animate-pulse rounded-full" />
                      <span className="inline-block w-0.5 h-4 bg-[#c9a84c] animate-pulse rounded-full [animation-delay:0.15s]" />
                      <span className="inline-block w-0.5 h-2 bg-[#c9a84c] animate-pulse rounded-full [animation-delay:0.3s]" />
                      <span className="inline-block w-0.5 h-3.5 bg-[#c9a84c] animate-pulse rounded-full [animation-delay:0.45s]" />
                    </span>
                  )}
                </div>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-[#c9a84c]">
                  Station {active.station} · {active.area}
                </p>
                <h2 className="mt-1 font-serif text-2xl sm:text-3xl truncate">
                  {active.title}
                </h2>
              </div>
              <button
                onClick={stopAll}
                className="shrink-0 rounded-md p-1.5 text-[#faf6ee]/40 hover:text-[#faf6ee] hover:bg-[#faf6ee]/5 transition text-xs"
                aria-label="Close player"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-[#faf6ee]/65">
              {active.desc[selectedLang]}
            </p>

            {audioLoading && (
              <div className="mt-4 flex items-center gap-2 text-xs text-[#c9a84c]">
                <span className="h-3 w-3 rounded-full border-2 border-[#c9a84c] border-t-transparent animate-spin" />
                Loading audio…
              </div>
            )}

            {/* Seekable progress bar */}
            <div className="mt-6">
              <input
                type="range"
                min={0}
                max={effectiveDuration}
                value={progress}
                onChange={(e) => seek(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#c9a84c]"
                style={{
                  background: `linear-gradient(to right, #c9a84c ${
                    (progress / Math.max(effectiveDuration, 1)) * 100
                  }%, rgba(250,246,238,0.1) ${
                    (progress / Math.max(effectiveDuration, 1)) * 100
                  }%)`,
                }}
                aria-label="Seek"
              />
              <div className="mt-2 flex justify-between text-xs text-[#faf6ee]/40">
                <span>{fmt(progress)}</span>
                <span>{fmt(effectiveDuration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {/* Restart */}
              <button
                onClick={() => seek(0)}
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-[#faf6ee]/20 text-[#faf6ee]/60 hover:text-[#faf6ee] transition flex items-center justify-center"
                aria-label="Restart"
                title="Restart"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
              </button>

              {/* Previous */}
              <button
                onClick={() => {
                  const prev = BEACONS.find((b) => b.station === active.station - 1);
                  if (prev) selectBeacon(prev.id);
                }}
                disabled={active.station === 1}
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-[#faf6ee]/20 text-[#faf6ee]/60 hover:text-[#faf6ee] disabled:opacity-30 transition flex items-center justify-center"
                aria-label="Previous station"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              {/* Play / Pause */}
              <button
                onClick={() => setPlaying((p) => !p)}
                disabled={!audioReady}
                className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#c9a84c] text-[#0f0e0c] transition hover:bg-[#a07c28] shadow-lg disabled:opacity-50"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </button>

              {/* Next */}
              <button
                onClick={() => {
                  const next = BEACONS.find((b) => b.station === active.station + 1);
                  if (next) selectBeacon(next.id);
                }}
                disabled={active.station === BEACONS.length}
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-full border border-[#faf6ee]/20 text-[#faf6ee]/60 hover:text-[#faf6ee] disabled:opacity-30 transition flex items-center justify-center"
                aria-label="Next station"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 18l8.5-6L6 6v12zM16 6h2v12h-2z" />
                </svg>
              </button>

              {/* Volume */}
              <div className="flex items-center gap-2 ml-1 sm:ml-2">
                <button
                  onClick={() => setVolume(volume === 0 ? 75 : 0)}
                  className="text-[#faf6ee]/40 hover:text-[#faf6ee] transition"
                  aria-label={volume === 0 ? "Unmute" : "Mute"}
                >
                  {volume === 0 ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-16 sm:w-20 accent-[#c9a84c]"
                  aria-label="Volume"
                />
                <span className="text-[10px] text-[#faf6ee]/30 w-6 text-right tabular-nums">
                  {volume}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── Stations grid ── */}
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-serif text-xl text-[#faf6ee]">
              {BEACONS.length} Stations
            </h3>
            {active && playing && (
              <span className="text-[10px] uppercase tracking-widest text-[#1f6f4a] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1f6f4a] animate-pulse" />
                Now Playing
              </span>
            )}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {BEACONS.map((b) => {
              const isActive = activeBeaconId === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => selectBeacon(b.id)}
                  className={`rounded-lg border-2 p-4 sm:p-5 text-left transition group cursor-pointer ${
                    isActive
                      ? `${b.borderColor} bg-[#faf6ee]/5`
                      : "border-[#faf6ee]/10 hover:border-[#faf6ee]/25 hover:bg-[#faf6ee]/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rotate-45 ${b.dotColor}`} />
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-[#faf6ee]/40">
                        {b.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {isActive && playing ? (
                        <span className="flex items-center gap-px">
                          <span className="inline-block w-0.5 h-2 bg-[#c9a84c] animate-pulse rounded-full" />
                          <span className="inline-block w-0.5 h-3 bg-[#c9a84c] animate-pulse rounded-full [animation-delay:0.15s]" />
                          <span className="inline-block w-0.5 h-1.5 bg-[#c9a84c] animate-pulse rounded-full [animation-delay:0.3s]" />
                        </span>
                      ) : (
                        <span className="opacity-0 group-hover:opacity-100 transition text-[#c9a84c]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5,3 19,12 5,21" />
                          </svg>
                        </span>
                      )}
                      <span className="text-[10px] text-[#faf6ee]/40">
                        {fmt(b.duration)}
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-3 font-serif text-lg text-[#faf6ee]">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-xs text-[#faf6ee]/50">{b.area}</p>
                  {isActive && (
                    <div className="mt-3">
                      <div className="h-0.5 w-full rounded bg-[#faf6ee]/10">
                        <div
                          className="h-full rounded bg-[#c9a84c] transition-all"
                          style={{
                            width: `${(progress / Math.max(effectiveDuration, 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── How it works ── */}
        <div className="mt-16 grid gap-8 border-t border-[#faf6ee]/10 pt-12 sm:grid-cols-2 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Choose a Station",
              desc: "Tap any station card above to start listening instantly — no setup required.",
              dot: "bg-[#1d3a8a]",
            },
            {
              step: "02",
              title: "Select Your Language",
              desc: "Switch between English, Español, or Deutsch at any time. The narration follows your choice.",
              dot: "bg-[#8e1d2c]",
            },
            {
              step: "03",
              title: "Listen & Explore",
              desc: "Audio plays through your speakers or headphones. Stations auto-advance as you walk the site.",
              dot: "bg-[#1f6f4a]",
            },
          ].map((s) => (
            <div key={s.step} className="flex gap-4">
              <span className={`h-3 w-3 rotate-45 ${s.dot} mt-1 shrink-0`} />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#c9a84c]">
                  {s.step}
                </p>
                <h3 className="mt-1 font-serif text-xl text-[#faf6ee]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-[#faf6ee]/60">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            onClick={() => navigate("/tickets")}
            className="bg-[#c9a84c] text-[#0f0e0c] hover:bg-[#a07c28]"
          >
            {t("hero.cta")} →
          </Button>
        </div>
      </section>
    </div>
  );
}
