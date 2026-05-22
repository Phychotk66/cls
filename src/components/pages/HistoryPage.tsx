"use client";
import { useApp } from "@/contexts/AppContext";
import { Button, Eyebrow } from "@/components/ui";
import { IMAGES } from "@/lib/media";

const TIMELINE = [
  {
    year: "14th C.",
    title: "La Mina: Water Mine Carved",
    desc: "During the Nasrid rule of Ronda (then known as Medina Izn-Rand Onda), a secret water mine was carved through 100 metres of solid rock, descending 231 steps to the Guadalevín river. It supplied the city during Christian sieges.",
    dot: "bg-[#1d3a8a]",
    accent: "border-[#1d3a8a]",
  },
  {
    year: "1485",
    title: "Reconquista: Fall of Ronda",
    desc: "Ferdinand II of Aragon conquered Ronda, ending Moorish rule. The house passed through various noble families, preserving its Moorish architectural character beneath successive renovations.",
    dot: "bg-[#8e1d2c]",
    accent: "border-[#8e1d2c]",
  },
  {
    year: "1876",
    title: "Acquired by the Duchess of Parcent",
    desc: "Trinidad von Scholtz-Herménsdorff, Duchess of Parcent, purchased the house and began a major restoration, commissioning French landscape architect Jean-Claude Nicolas Forestier to design the hanging gardens.",
    dot: "bg-[#1f6f4a]",
    accent: "border-[#1f6f4a]",
  },
  {
    year: "1912–1914",
    title: "Forestier's Gardens Created",
    desc: "Jean-Claude Nicolas Forestier — who also worked on the Alhambra gardens and the Exposition Ibéro-Américaine of 1929 — designed the terraced gardens cascading down the gorge face in the spirit of Moorish garden traditions.",
    dot: "bg-[#c9a84c]",
    accent: "border-[#c9a84c]",
  },
  {
    year: "1931",
    title: "Declared Bien de Interés Cultural",
    desc: "The Spanish State recognised Casa del Rey Moro as a Bien de Interés Cultural (Cultural Heritage Site), protecting its architectural fabric, gardens and underground water mine in perpetuity.",
    dot: "bg-[#1d3a8a]",
    accent: "border-[#1d3a8a]",
  },
  {
    year: "Today",
    title: "Open to Visitors",
    desc: "Casa del Rey Moro welcomes visitors from around the world to explore its three distinct heritage layers: the neo-Mudéjar palace, the Forestier hanging gardens, and the Nazarí water mine descending to the Guadalevín river.",
    dot: "bg-[#1f6f4a]",
    accent: "border-[#1f6f4a]",
  },
];

export default function HistoryPage() {
  const { t, navigate } = useApp();

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative bg-[#0f0e0c] py-24 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: `url(${IMAGES.bridgeAlt})` }}
        />
        <div className="relative mx-auto max-w-3xl px-6">
          <Eyebrow>{t("history.title")}</Eyebrow>
          <h1 className="mt-4 font-serif text-5xl font-light text-[#faf6ee] md:text-6xl">
            Eight Centuries of Heritage
          </h1>
          <p className="mt-6 text-[#faf6ee]/65 leading-relaxed max-w-2xl mx-auto">
            {t("history.subtitle")}
          </p>
          <div className="mt-8 flex justify-center items-center gap-3">
            <span className="h-3 w-3 rotate-45 bg-[#1d3a8a] inline-block" />
            <span className="h-3 w-3 rotate-45 bg-[#8e1d2c] inline-block" />
            <span className="h-3 w-3 rotate-45 bg-[#1f6f4a] inline-block" />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-0 h-full w-px bg-gradient-to-b from-[#1d3a8a] via-[#c9a84c] to-[#1f6f4a] md:left-1/2 md:-ml-px" />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-0 flex h-6 w-6 shrink-0 items-center justify-center md:left-1/2 md:-ml-3">
                  <span className={`h-3 w-3 rotate-45 ${item.dot} ring-2 ring-[#faf6ee] ring-offset-1`} />
                </div>

                {/* Content */}
                <div
                  className={`ml-10 w-full md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "md:pr-8 md:text-right" : "md:ml-[calc(50%+2rem)] md:pl-0"
                  }`}
                >
                  <div
                    className={`rounded-lg border-l-2 ${item.accent} bg-white p-6 shadow-card`}
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#c9a84c]">
                      {item.year}
                    </span>
                    <h3 className="mt-2 font-serif text-xl text-[#0f0e0c]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#7c7060]">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="bg-arabesque py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Eyebrow>Heritage Elements</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-light text-[#0f0e0c]">
              Three Pillars of History
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                image: IMAGES.palaceCourt,
                dot: "bg-[#1d3a8a]",
                title: "The Palace",
                period: "18th Century",
                desc: "The neo-Mudéjar palace blends Islamic geometric ornamentation with European architectural refinement, featuring ornate tilework, carved plasterwork and tranquil inner courtyards.",
              },
              {
                image: IMAGES.mineStairs,
                dot: "bg-[#8e1d2c]",
                title: "La Mina",
                period: "14th Century",
                desc: "The Nazarí water mine descends 231 steps through solid rock to the Guadalevín river — an extraordinary feat of medieval engineering that kept the Moorish city supplied during sieges.",
              },
              {
                image: IMAGES.gardenAlhambra,
                dot: "bg-[#1f6f4a]",
                title: "The Gardens",
                period: "1912–1914",
                desc: "Jean-Claude Nicolas Forestier's hanging gardens cascade down the face of El Tajo gorge in terraces, honouring the Moorish tradition of garden-as-paradise.",
              },
            ].map((p) => (
              <div key={p.title} className="rounded-lg overflow-hidden border border-[#e2d5c0] bg-white shadow-card">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c]/50 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rotate-45 ${p.dot} inline-block`} />
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#7c7060]">
                      {p.period}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-2xl text-[#0f0e0c]">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#7c7060]">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0f0e0c] py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-serif text-4xl font-light text-[#faf6ee]">
            Experience It In Person
          </h2>
          <p className="mt-4 text-[#faf6ee]/60">
            Book your visit and walk through eight centuries of Moorish, palace and garden heritage.
          </p>
          <Button
            size="lg"
            className="mt-8 bg-[#c9a84c] text-[#0f0e0c] hover:bg-[#a07c28]"
            onClick={() => navigate("/tickets")}
          >
            {t("hero.cta")} →
          </Button>
        </div>
      </section>
    </div>
  );
}
