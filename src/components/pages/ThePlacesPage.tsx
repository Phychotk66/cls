"use client";
import { useApp } from "@/contexts/AppContext";
import { Button, Eyebrow } from "@/components/ui";
import { IMAGES } from "@/lib/media";

const GALLERY = [
  {
    src: "https://images.pexels.com/photos/31538424/pexels-photo-31538424.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200",
    caption: "Trinity von Scholtz Hermensdorff, Duchess of Parcent",
    sub: "The visionary who transformed the house in 1911",
  },
  {
    src: "https://images.pexels.com/photos/31538422/pexels-photo-31538422.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200",
    caption: "The House of the Moorish King",
    sub: "Palace of the Duchess of Parcent — neo-Mudéjar façade",
  },
  {
    src: "https://images.pexels.com/photos/31538427/pexels-photo-31538427.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200",
    caption: "Azulejos",
    sub: "Glazed ceramic tilework in the neo-Mudéjar tradition",
  },
  {
    src: "https://images.pexels.com/photos/11829134/pexels-photo-11829134.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200",
    caption: "Entrance Tiles",
    sub: "Ornamental brickwork and tile decorations",
  },
  {
    src: "https://images.pexels.com/photos/11829131/pexels-photo-11829131.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200",
    caption: "Moorish Arches",
    sub: "Integrating Hispano-Muslim aesthetics with Christian art",
  },
];

export default function ThePlacesPage() {
  const { t, navigate } = useApp();

  return (
    <div className="min-h-screen pt-20">
      {/* ── Hero ── */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.palaceCourt})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f0e0c]/92 via-[#0f0e0c]/75 to-[#1d3a8a]/30" />
        <div className="mx-auto flex min-h-[65vh] max-w-7xl flex-col items-start justify-end px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="flex items-center gap-0 mb-5">
            <span className="h-1 w-10 bg-[#1d3a8a]" />
            <span className="h-1 w-10 bg-[#8e1d2c]" />
            <span className="h-1 w-10 bg-[#1f6f4a]" />
          </div>
          <Eyebrow>The House · Full</Eyebrow>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-light leading-[1.05] text-[#faf6ee] sm:text-5xl lg:text-6xl">
            The origin of this construction is an 18th&nbsp;century mansion
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#faf6ee]/70 sm:text-lg">
            In 1911, the Duchess of Parcent, Trinidad von Scholtz Hermensdorff,
            acquired it and converted it into a neo-Mudéjar style house.
            Currently, it is undergoing restoration.
          </p>
        </div>
      </section>

      {/* ── Visits banner ── */}
      <section className="border-y border-subtle bg-[#0f0e0c]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 rotate-45 bg-[#c9a84c]" />
            <span className="text-sm text-[#faf6ee]/80">
              The House is currently undergoing restoration — gardens & mine remain fully open.
            </span>
          </div>
          <Button
            size="sm"
            onClick={() => navigate("/tickets")}
            className="shrink-0 bg-gradient-to-r from-[#f5d56b] via-[#c9a84c] to-[#a07c28] text-[#0f0e0c] hover:-translate-y-0.5"
          >
            Book Your Visit →
          </Button>
        </div>
      </section>

      {/* ── Main narrative ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Text column */}
          <div className="lg:col-span-7">
            <Eyebrow>History of the House</Eyebrow>
            <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-primary sm:text-4xl">
              A Sum of Several Buildings
            </h2>
            <div className="hairline my-6" />

            <div className="space-y-5 text-[15px] leading-[1.85] text-secondary">
              <p>
                What was the housing area of the Casa del Rey Moro is actually
                made up of a sum of several buildings. The main nucleus was a
                house from the beginning of the XVIII century, with the usual
                structure of the <strong className="text-primary">Andalusian houses
                of the aristocracy</strong>: it consisted of a series of rooms
                around a patio, distributed in two heights.
              </p>

              <p>
                From 1767, <strong className="text-primary">Jacinto Salvatierra</strong>{" "}
                was the first member of this noble family that owned this house:
                he ennobled it with a cover where he placed the coat of arms of
                his lineage, today destroyed. It was inherited by successive
                relatives until the beginning of the 20th century, when it was
                acquired by the American billionaire{" "}
                <strong className="text-primary">Lawrence Perin</strong>, who once
                again placed the monument in the spotlight for academics and
                those interested in the history and culture of Ronda.
              </p>

              <p>
                Shortly after in 1911,{" "}
                <strong className="text-primary">Trinidad von Scholtz
                Hermensdorff</strong>{" "}
                acquired the House of the Moorish King and completely renovated
                the housing area.
              </p>

              <p>
                Her initiative consisted in buying the neighbouring houses: she
                demolished those on the east side to create a garden; those on
                the west side she incorporated into the main nucleus, ordering
                the whole construction to be reformed in neo-Mudéjar style.
              </p>
            </div>
          </div>

          {/* Image sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 space-y-6">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-elegant">
                <img
                  src={GALLERY[1].src}
                  alt={GALLERY[1].caption}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c]/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="h-2.5 w-2.5 rotate-45 bg-[#1d3a8a] inline-block" />
                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-[#c9a84c]">
                    18th Century
                  </p>
                  <h3 className="mt-1 font-serif text-xl text-[#faf6ee]">
                    {GALLERY[1].caption}
                  </h3>
                  <p className="mt-1 text-xs text-[#faf6ee]/60">
                    {GALLERY[1].sub}
                  </p>
                </div>
              </div>

              {/* Key fact card */}
              <div className="surface-card rounded-xl border p-5 shadow-card">
                <div className="flex items-center gap-2 mb-3">
                  <span className="h-2.5 w-2.5 rotate-45 bg-[#c9a84c]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-secondary">
                    Key Facts
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="font-serif text-2xl font-light text-[#a07c28]">1767</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-widest text-muted">
                      First noble owner
                    </p>
                  </div>
                  <div>
                    <p className="font-serif text-2xl font-light text-[#a07c28]">1911</p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-widest text-muted">
                      Duchess renovation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Neo-Mudéjar section ── */}
      <section className="bg-arabesque py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            {/* Image */}
            <div className="lg:col-span-5 lg:order-2">
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-elegant">
                <img
                  src={GALLERY[2].src}
                  alt={GALLERY[2].caption}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c]/50 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="h-2.5 w-2.5 rotate-45 bg-[#8e1d2c] inline-block" />
                  <h3 className="mt-2 font-serif text-xl text-[#faf6ee]">
                    {GALLERY[2].caption}
                  </h3>
                  <p className="mt-1 text-xs text-[#faf6ee]/60">
                    {GALLERY[2].sub}
                  </p>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="lg:col-span-7 lg:order-1">
              <Eyebrow>Architectural Style</Eyebrow>
              <h2 className="mt-4 font-serif text-3xl font-light leading-tight text-primary sm:text-4xl">
                The Neo-Mudéjar Revival
              </h2>
              <div className="hairline my-6" />

              <div className="space-y-5 text-[15px] leading-[1.85] text-secondary">
                <p>
                  <strong className="text-primary">Neomudejar</strong> is one of
                  the historicist styles developed in Europe since the late
                  eighteenth century. They sought to rescue the signs of the
                  national identity of each country.
                </p>

                <p>
                  In the case of Spain, it was considered that the most
                  representative art of its history was that which{" "}
                  <strong className="text-primary">integrated the
                  Hispano-Muslim technique and aesthetics with the objectives of
                  Christian art</strong>: it was the so-called Mudéjar art,
                  which was thus recovered at the beginning of the 20th century.
                </p>

                <p>
                  In this renovated house from the initiative of the Duchess of
                  Parcent, that style is perceived in the use of the{" "}
                  <strong className="text-primary">green glazed tile</strong> to
                  cover the roofs, the brickwork with ornamental forms and the
                  use of tile decorations.
                </p>
              </div>

              {/* Feature highlights */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  { dot: "bg-[#1f6f4a]", title: "Green Glazed Tile", desc: "Covering the roofs in traditional fashion" },
                  { dot: "bg-[#1d3a8a]", title: "Ornamental Brick", desc: "Decorative forms throughout the façade" },
                  { dot: "bg-[#8e1d2c]", title: "Tile Decorations", desc: "Azulejos in the Hispano-Muslim tradition" },
                ].map((f) => (
                  <div key={f.title} className="surface-card rounded-lg border p-4 shadow-card">
                    <span className={`h-2.5 w-2.5 rotate-45 inline-block ${f.dot}`} />
                    <h4 className="mt-2 text-sm font-semibold text-primary">{f.title}</h4>
                    <p className="mt-1 text-xs text-secondary leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery grid ── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="text-center mb-12">
          <Eyebrow>Gallery</Eyebrow>
          <h2 className="mt-4 font-serif text-3xl font-light text-primary sm:text-4xl">
            The House in Detail
          </h2>
          <div className="hairline mx-auto mt-4 w-24" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((img, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl shadow-card"
            >
              <img
                src={img.src}
                alt={img.caption}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c]/70 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="font-serif text-lg text-[#faf6ee]">{img.caption}</h3>
                <p className="mt-0.5 text-xs text-[#faf6ee]/60">{img.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Three Monuments CTA ── */}
      <section className="bg-[#0f0e0c] py-20 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex justify-center gap-2 mb-6">
            <span className="h-3 w-3 rotate-45 bg-[#1d3a8a] inline-block" />
            <span className="h-3 w-3 rotate-45 bg-[#8e1d2c] inline-block" />
            <span className="h-3 w-3 rotate-45 bg-[#1f6f4a] inline-block" />
          </div>
          <h2 className="font-serif text-3xl font-light text-[#faf6ee] sm:text-4xl">
            Explore the Full Monument
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#faf6ee]/60 leading-relaxed">
            The House is one of three heritage layers. Descend the Nazarí water
            mine or stroll through Forestier&apos;s hanging gardens.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              onClick={() => navigate("/water-mine")}
              className="bg-gradient-to-r from-[#f5d56b] via-[#c9a84c] to-[#a07c28] text-[#0f0e0c] hover:-translate-y-0.5"
            >
              La Mina →
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/gardens")}
              className="border-[#faf6ee]/30 text-[#faf6ee]/80 hover:bg-[#faf6ee]/10 hover:text-[#faf6ee]"
            >
              Gardens
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/tickets")}
              className="border-[#faf6ee]/30 text-[#faf6ee]/80 hover:bg-[#faf6ee]/10 hover:text-[#faf6ee]"
            >
              {t("hero.cta")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
