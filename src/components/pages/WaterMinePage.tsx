"use client";
import { useApp } from "@/contexts/AppContext";
import { Button, Eyebrow } from "@/components/ui";
import { IMAGES } from "@/lib/media";

const FEATURES = [
  { icon: "📐", n: "100m", label: "Vertical descent through solid rock" },
  { icon: "🪜", n: "231", label: "Hand-carved Nazarí steps" },
  { icon: "💧", n: "14th C.", label: "Original construction" },
  { icon: "⏱️", n: "30 min", label: "Average tour length" },
];

const HIGHLIGHTS = [
  {
    title: "La Sala del Aljibe",
    desc: "The cistern chamber — where rainwater was collected and stored for the city above. Acoustic resonance creates an otherworldly atmosphere.",
    dot: "bg-[#1d3a8a]",
  },
  {
    title: "Sala de la Noria",
    desc: "The waterwheel chamber, where a wooden noria once raised water from the Guadalevín river up to the Moorish city during sieges.",
    dot: "bg-[#8e1d2c]",
  },
  {
    title: "Sala de los Secretos",
    desc: "The Whispering Room — designed so that messages spoken at one corner could be heard clearly at another, used for confidential communication.",
    dot: "bg-[#c9a84c]",
  },
  {
    title: "Río Guadalevín",
    desc: "Reach the river at the foot of El Tajo gorge, with a unique upward view of the 100-metre cliff walls towering overhead.",
    dot: "bg-[#1f6f4a]",
  },
];

export default function WaterMinePage() {
  const { t, navigate } = useApp();

  return (
    <div className="min-h-screen pt-20">
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.mineStairs})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f0e0c]/90 via-[#0f0e0c]/75 to-[#8e1d2c]/40" />
        <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-start justify-center px-4 py-20 sm:px-6 sm:py-28">
          <div className="flex items-center gap-0 mb-6">
            <span className="h-1 w-12 bg-[#8e1d2c]" />
            <span className="h-1 w-12 bg-[#c9a84c]" />
            <span className="h-1 w-12 bg-[#1d3a8a]" />
          </div>
          <Eyebrow>La Mina · Water Mine</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl font-light leading-none text-[#faf6ee] sm:text-6xl lg:text-7xl">
            Descend Eight<br />Centuries
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#faf6ee]/75">
            231 steps carved through solid rock in the 14th century — a Nazarí
            water mine that kept the Moorish city of Ronda supplied during siege.
            Today, it remains one of the most extraordinary subterranean
            monuments in all of Andalusia.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => navigate("/tickets")}
              className="bg-[#c9a84c] text-[#0f0e0c] hover:bg-[#a07c28]"
            >
              Book the Descent →
            </Button>
            <button
              onClick={() => navigate("/audio-guide")}
              className="rounded-md border border-[#faf6ee]/30 px-7 py-3.5 text-[11px] font-medium uppercase tracking-widest text-[#faf6ee]/80 hover:bg-[#faf6ee]/10 transition"
            >
              Audio Guide
            </button>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-subtle bg-arabesque py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.label} className="text-center">
              <div className="text-3xl mb-2">{f.icon}</div>
              <div className="font-serif text-3xl font-light text-[#a07c28]">{f.n}</div>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-secondary">
                {f.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Story ── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>The Hidden Lifeline</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-light leading-tight text-primary sm:text-5xl">
              A Secret Beneath the Gorge
            </h2>
            <div className="hairline my-6" />
            <p className="text-secondary leading-relaxed">
              During the 14th century, Nasrid engineers carved a hidden mine
              through 100 metres of solid limestone — a desperate solution to a
              strategic vulnerability: how to access water without leaving the
              fortified city above.
            </p>
            <p className="mt-4 text-secondary leading-relaxed">
              Christian slaves laboured in absolute darkness, hand-cutting 231
              steps in a spiral descent. At the bottom: the Guadalevín river,
              flowing through the El Tajo gorge below. A waterwheel — the
              <em> noria</em> — raised the precious cargo back up to the city.
            </p>
            <p className="mt-4 text-secondary leading-relaxed">
              When Ferdinand the Catholic besieged Ronda in 1485, this same
              mine was the city&apos;s downfall: Christian forces discovered it
              and cut the supply, forcing surrender within days.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <img
                src={IMAGES.mineStairs}
                alt="Stone stairs in the water mine"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c]/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="h-2.5 w-2.5 rotate-45 bg-[#8e1d2c] inline-block" />
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-[#c9a84c]">
                  14th Century Engineering
                </p>
                <h3 className="mt-1 font-serif text-2xl text-[#faf6ee]">
                  The Descent
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Highlights ── */}
      <section className="bg-arabesque py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Inside the Mine</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl font-light text-primary">
              Four Chambers of Wonder
            </h2>
            <div className="hairline mx-auto mt-4 w-32" />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {HIGHLIGHTS.map((h, i) => (
              <div
                key={h.title}
                className="surface-card rounded-lg border p-6 shadow-card transition hover:shadow-elegant"
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-2 shrink-0">
                    <span className={`h-3 w-3 rotate-45 ${h.dot}`} />
                    <span className="font-serif text-2xl text-[#a07c28]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-primary">{h.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-secondary">
                      {h.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Practical info ── */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="surface-card rounded-xl border p-6 shadow-elegant sm:p-10">
          <Eyebrow>Plan Your Descent</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl text-primary">
            Before You Visit
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem
              dot="bg-[#1d3a8a]"
              title="Accessibility"
              desc="Steep stairs only — not wheelchair accessible. Comfortable footwear essential."
            />
            <InfoItem
              dot="bg-[#8e1d2c]"
              title="Temperature"
              desc="Cool year-round (~16°C). A light layer recommended even in summer."
            />
            <InfoItem
              dot="bg-[#1f6f4a]"
              title="Duration"
              desc="Allow 30–45 minutes for the full descent and return climb."
            />
            <InfoItem
              dot="bg-[#c9a84c]"
              title="Lighting"
              desc="LED-lit throughout. Smartphone torch optional but not required."
            />
            <InfoItem
              dot="bg-[#1d3a8a]"
              title="Children"
              desc="Suitable for children 8+. Hand-holding recommended for younger guests."
            />
            <InfoItem
              dot="bg-[#1f6f4a]"
              title="Photography"
              desc="Permitted without flash. Tripods not allowed on the stairs."
            />
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="flex-1 bg-[#0f0e0c] text-[#faf6ee] hover:bg-[#8e1d2c]"
              onClick={() => navigate("/tickets")}
            >
              Book Your Visit →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/gardens")}
            >
              Explore the Gardens
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function InfoItem({ dot, title, desc }: { dot: string; title: string; desc: string }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rotate-45 ${dot}`} />
        <h3 className="text-[11px] font-semibold uppercase tracking-widest text-secondary">
          {title}
        </h3>
      </div>
      <p className="mt-2 text-sm text-primary leading-relaxed">{desc}</p>
    </div>
  );
}
