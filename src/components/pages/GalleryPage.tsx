"use client";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Eyebrow } from "@/components/ui";
import { IMAGES } from "@/lib/media";

const ALL_IMAGES = [
  { src: IMAGES.heroRonda, alt: "Ronda Cliffside", cat: "Ronda" },
  { src: IMAGES.heroBridge, alt: "Puente Nuevo", cat: "Ronda" },
  { src: IMAGES.bridgeAlt, alt: "Bridge Aerial", cat: "Ronda" },
  { src: IMAGES.rondaAerial, alt: "Aerial View", cat: "Ronda" },
  { src: IMAGES.rondaPano, alt: "Panorama", cat: "Ronda" },
  { src: IMAGES.rondaCliffs, alt: "El Tajo Gorge", cat: "Ronda" },
  { src: IMAGES.palaceCourt, alt: "Palace Courtyard", cat: "Palace" },
  { src: IMAGES.gardenSeville, alt: "Palace Architecture", cat: "Palace" },
  { src: IMAGES.alhambraArch, alt: "Moorish Arch", cat: "Architecture" },
  { src: IMAGES.alhambraColumns, alt: "Islamic Columns", cat: "Architecture" },
  { src: IMAGES.gardenAlhambra, alt: "Garden Overview", cat: "Gardens" },
  { src: IMAGES.gardenCordoba, alt: "Garden Terrace", cat: "Gardens" },
  { src: IMAGES.mineStairs, alt: "Mine Stairs", cat: "Mine" },
  { src: IMAGES.rondaCity, alt: "Ronda City", cat: "Ronda" },
];

const CATEGORIES = ["All", "Ronda", "Palace", "Gardens", "Mine", "Architecture"];

export default function GalleryPage() {
  const { t } = useApp();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? ALL_IMAGES
      : ALL_IMAGES.filter((img) => img.cat === activeCategory);

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="bg-[#0f0e0c] py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <Eyebrow>Visual Journey</Eyebrow>
          <h1 className="mt-4 font-serif text-5xl font-light text-[#faf6ee]">
            {t("gallery.title")}
          </h1>
          <div className="mt-6 flex justify-center items-center gap-3">
            <span className="h-3 w-3 rotate-45 bg-[#1d3a8a] inline-block" />
            <span className="h-3 w-3 rotate-45 bg-[#8e1d2c] inline-block" />
            <span className="h-3 w-3 rotate-45 bg-[#1f6f4a] inline-block" />
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="sticky top-20 z-[30] bg-[#faf6ee] border-b border-[#e2d5c0] shadow-sm dark:bg-[#0a0a0c] dark:border-[#2a2730]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 rounded-md px-4 py-2 text-[11px] font-semibold uppercase tracking-widest transition ${
                  activeCategory === cat
                    ? "bg-[#0f0e0c] text-[#faf6ee]"
                    : "text-[#7c7060] hover:text-[#0f0e0c] hover:bg-[#e2d5c0]/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {filtered.map((img, i) => (
            <div
              key={i}
              className="mb-4 break-inside-avoid overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="bg-white px-4 py-3 border border-t-0 border-[#e2d5c0] rounded-b-lg">
                <p className="text-xs text-[#7c7060]">{img.cat}</p>
                <p className="text-sm font-medium text-[#0f0e0c]">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0e0c]/95 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-6 top-6 text-[#faf6ee]/60 hover:text-[#faf6ee] transition text-xl"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full border border-[#faf6ee]/20 text-[#faf6ee]/60 hover:text-[#faf6ee] transition"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((n) => (n! > 0 ? n! - 1 : filtered.length - 1));
            }}
          >
            ←
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full border border-[#faf6ee]/20 text-[#faf6ee]/60 hover:text-[#faf6ee] transition"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((n) => (n! < filtered.length - 1 ? n! + 1 : 0));
            }}
          >
            →
          </button>
          <div
            className="max-h-[85vh] max-w-5xl px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightbox].src}
              alt={filtered[lightbox].alt}
              className="max-h-[80vh] w-auto rounded-lg object-contain shadow-2xl"
            />
            <p className="mt-3 text-center text-sm text-[#faf6ee]/60">
              {filtered[lightbox].alt} · {filtered[lightbox].cat}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
