"use client";
import { useApp } from "@/contexts/AppContext";
import { Button, Eyebrow } from "@/components/ui";
import { IMAGES } from "@/lib/media";

const ZONES = [
  {
    name: "Jardín Alto",
    title: "The Upper Terrace",
    desc: "Forestier's masterstroke — a geometric Andalusian patio with reflecting pool, cypress walls and citrus trees, framing dramatic views of the gorge.",
    dot: "bg-[#1f6f4a]",
    img: IMAGES.gardenAlhambra,
  },
  {
    name: "Jardín Medio",
    title: "The Middle Garden",
    desc: "Cascading staircases, fragrant jasmine arbours and tiled fountains in the spirit of the Generalife at the Alhambra.",
    dot: "bg-[#c9a84c]",
    img: IMAGES.gardenSeville,
  },
  {
    name: "Jardín Bajo",
    title: "The Lower Garden",
    desc: "A wilder, almost cliff-side paradise of bougainvillea, palms and rosemary, perched precariously above the Guadalevín river.",
    dot: "bg-[#1d3a8a]",
    img: IMAGES.gardenCordoba,
  },
];

export default function GardensPage() {
  const { t, navigate } = useApp();

  return (
    <div className="min-h-screen pt-20">
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.gardenAlhambra})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f0e0c]/85 via-[#1f6f4a]/40 to-[#0f0e0c]/85" />
        <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-start justify-center px-4 py-20 sm:px-6 sm:py-28">
          <div className="flex items-center gap-0 mb-6">
            <span className="h-1 w-12 bg-[#1f6f4a]" />
            <span className="h-1 w-12 bg-[#c9a84c]" />
            <span className="h-1 w-12 bg-[#1d3a8a]" />
          </div>
          <Eyebrow>The Hanging Gardens</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl font-light leading-none text-[#faf6ee] sm:text-6xl lg:text-7xl">
            A Paradise<br />Above the Gorge
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#faf6ee]/75">
            Designed by Jean-Claude Nicolas Forestier between 1912 and 1914,
            the gardens of Casa del Rey Moro are among Europe&apos;s earliest
            hanging gardens — three terraces of Andalusian splendour cascading
            down the face of El Tajo.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => navigate("/tickets")}
              className="bg-[#c9a84c] text-[#0f0e0c] hover:bg-[#a07c28]"
            >
              Visit the Gardens →
            </Button>
            <button
              onClick={() => navigate("/gallery")}
              className="rounded-md border border-[#faf6ee]/30 px-7 py-3.5 text-[11px] font-medium uppercase tracking-widest text-[#faf6ee]/80 hover:bg-[#faf6ee]/10 transition"
            >
              View Gallery
            </button>
          </div>
        </div>
      </section>

      {/* ── Forestier intro ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div className="lg:col-span-7">
            <div className="relative aspect-[5/4] overflow-hidden rounded-xl">
              <img
                src={IMAGES.gardenCordoba}
                alt="Forestier garden terraces"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0f0e0c]/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="h-2.5 w-2.5 rotate-45 bg-[#1f6f4a] inline-block" />
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-[#c9a84c]">
                  1912 – 1914
                </p>
                <h3 className="mt-1 font-serif text-2xl text-[#faf6ee]">
                  Forestier&apos;s Vision
                </h3>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Eyebrow>The Architect</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-primary sm:text-5xl">
              Jean-Claude Nicolas Forestier
            </h2>
            <div className="hairline my-6" />
            <p className="text-secondary leading-relaxed">
              The French landscape architect — friend of Le Corbusier, designer
              of the Bagatelle rose garden in Paris and the Maria Luisa Park in
              Seville — was commissioned by Trinidad von Scholtz-Herménsdorff,
              Duchess of Parcent, to transform the cliffside above the
              Guadalevín into a hanging paradise.
            </p>
            <p className="mt-4 text-secondary leading-relaxed">
              Drawing inspiration from the Generalife at the Alhambra,
              Forestier married Islamic geometry, Mediterranean planting and
              dramatic Andalusian topography into one of his most personal
              works — and one of Europe&apos;s earliest examples of
              cliff-edge garden design.
            </p>
          </div>
        </div>
      </section>

      {/* ── Three zones ── */}
      <section className="bg-arabesque py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Three Terraces</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-light text-primary">
              A Cascade of Gardens
            </h2>
            <div className="hairline mx-auto mt-4 w-32" />
          </div>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {ZONES.map((z, i) => (
              <article
                key={z.name}
                className="group surface-card overflow-hidden rounded-xl border shadow-card transition hover:shadow-elegant"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={z.img}
                    alt={z.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c]/55 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className={`h-3 w-3 rotate-45 ${z.dot}`} />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#faf6ee]">
                      Zone {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-[11px] uppercase tracking-widest text-[#a07c28]">
                    {z.name}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl text-primary">{z.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">
                    {z.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quote / atmosphere ── */}
      <section className="bg-[#0f0e0c] py-24 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex justify-center gap-2 mb-6">
            <span className="h-2.5 w-2.5 rotate-45 bg-[#1d3a8a] inline-block" />
            <span className="h-2.5 w-2.5 rotate-45 bg-[#8e1d2c] inline-block" />
            <span className="h-2.5 w-2.5 rotate-45 bg-[#1f6f4a] inline-block" />
          </div>
          <blockquote className="font-serif text-3xl font-light leading-relaxed text-[#faf6ee] sm:text-4xl">
            &ldquo;The garden is a meditation upon the gorge — a paradise
            suspended above the abyss.&rdquo;
          </blockquote>
          <p className="mt-6 text-xs uppercase tracking-widest text-[#c9a84c]">
            — Jean-Claude Nicolas Forestier
          </p>
        </div>
      </section>

      {/* ── Visit CTA ── */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="surface-card rounded-xl border p-6 shadow-elegant sm:p-10 text-center">
          <Eyebrow>Best Time to Visit</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl text-primary">
            Spring &amp; Autumn — peak bloom
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-secondary">
            From April to June, jasmine and rose are at their peak. October
            brings golden light through the cypress walls. Summer mornings are
            cool and shaded.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="bg-[#0f0e0c] text-[#faf6ee] hover:bg-[#1f6f4a]"
              onClick={() => navigate("/tickets")}
            >
              Book Your Visit →
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/water-mine")}>
              Explore the Mine
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
