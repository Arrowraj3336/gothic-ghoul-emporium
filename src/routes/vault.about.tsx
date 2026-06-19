import { createFileRoute } from "@tanstack/react-router";
import { BatLogo } from "@/components/BatLogo";
import hero from "@/assets/hero-gotham.jpg";

export const Route = createFileRoute("/vault/about")({
  head: () => ({
    meta: [
      { title: "Origin — About Dark Decor" },
      { name: "description", content: "The origin story of Dark Decor: hand-finished dark home decor for those who prefer the night." },
      { property: "og:title", content: "Our Origin — Dark Decor" },
      { property: "og:description", content: "Where Dark Decor came from, and why we work only after dusk." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background" />
        <div className="relative mx-auto max-w-4xl px-4 py-32 text-center sm:px-6">
          <BatLogo className="mx-auto h-10 w-20 text-signal animate-float-slow" />
          <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-signal">// CHAPTER ZERO</div>
          <h1 className="mt-3 font-display text-5xl sm:text-7xl">An Origin in the Dark.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Dark Decor was founded in a converted warehouse in Lower Gotham, by three designers who
            were tired of beige. We make pieces for the rooms the sun forgets.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { num: "01", title: "Material Honesty", body: "Cast iron is cast iron. Brass is brass. Nothing pretending to be something it isn't." },
            { num: "02", title: "Small Batches", body: "Every collection is limited. When it's gone, it's gone into the night for good." },
            { num: "03", title: "Built for Shadow", body: "Designed to look their best at dusk, by candlelight, in the silence after midnight." },
          ].map((p) => (
            <div key={p.num} className="border border-border bg-card/40 p-8">
              <div className="font-display text-5xl text-signal/40">{p.num}</div>
              <h3 className="mt-4 font-display text-xl">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">// THE CHRONOLOGY</div>
          <h2 className="mt-3 font-display text-3xl sm:text-5xl">Five years in the dark.</h2>
          <ol className="mt-12 space-y-10 border-l border-border pl-8">
            {[
              { year: "2019", title: "The Cape Foundry", body: "Founded by three industrial designers in a converted Gotham warehouse." },
              { year: "2021", title: "First Cape Crusader Collection", body: "Our debut series of cast-iron lighting and matte ceramics sells out in 11 days." },
              { year: "2023", title: "Arkham & Vigilante", body: "Two new collections expand the catalog into mirrors, glass, and heavy textiles." },
              { year: "2025", title: "Wayne Manor Capsule", body: "A flagship furnishing collaboration with a certain anonymous benefactor." },
            ].map((e) => (
              <li key={e.year} className="relative">
                <span className="absolute -left-[37px] grid h-4 w-4 place-items-center rounded-full border border-signal bg-background">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                </span>
                <div className="font-mono text-[11px] uppercase tracking-widest text-signal">{e.year}</div>
                <div className="mt-1 font-display text-xl">{e.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{e.body}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <p className="font-display text-2xl italic text-foreground/80 sm:text-3xl">
          “We don't sell home decor.<br /> We sell the room you become at night.”
        </p>
        <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          — The Founders, Dark Decor
        </div>
      </section>
    </div>
  );
}
