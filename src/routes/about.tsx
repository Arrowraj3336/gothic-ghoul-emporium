import { createFileRoute } from "@tanstack/react-router";
import { XLogo, ClawsIcon, CerebroIcon, VisorIcon, LightningBolt } from "@/components/XmenIcons";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Mythos — About Viral Vault" },
      { name: "description", content: "The origin of Viral Vault — an X-Men-inspired storefront for tomorrow's home." },
      { property: "og:title", content: "Mythos — Viral Vault" },
      { property: "og:description", content: "How a band of cooks, engineers and gifted home-makers built the X-Vault." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="relative overflow-hidden border-b-2 border-xmen-ink">
        <div className="absolute inset-0 xm-hex opacity-60" />
        <XLogo className="pointer-events-none absolute -right-24 top-1/2 h-[460px] w-[460px] -translate-y-1/2 text-xmen-red/10" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28 text-center">
          <XLogo className="mx-auto h-14 w-14 text-xmen-red xm-float" />
          <div className="mt-6 font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// CHAPTER ZERO</div>
          <h1 className="mt-3 font-xmen-display text-5xl leading-[0.95] sm:text-7xl">A SCHOOL FOR THE GIFTED.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-xmen-ink-soft sm:text-lg">
            Viral Vault was founded by three cooks, a metallurgist and a former barista
            who could pour a perfect rosetta with her eyes closed. We build appliances for
            the people the world isn't quite ready for.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { Icon: ClawsIcon, num: "01", title: "Adamantium Builds", body: "Every chassis is over-engineered. Drop-tested, dishwasher-vetted, decade-warrantied." },
            { Icon: CerebroIcon, num: "02", title: "Cerebro Tested", body: "We psionically tune every motor. (Okay — we just use very good engineers.)" },
            { Icon: VisorIcon, num: "03", title: "Quiet Power", body: "Designed to look sharp on the counter and disappear into a calm morning routine." },
          ].map((p) => (
            <div key={p.num} className="border-2 border-xmen-ink bg-white p-8 xm-frame">
              <p.Icon className="h-9 w-9 text-xmen-red" />
              <div className="mt-4 font-xmen-display text-4xl text-xmen-red/40">{p.num}</div>
              <h3 className="mt-2 font-xmen-display text-2xl">{p.title}</h3>
              <p className="mt-3 text-sm text-xmen-ink-soft leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-xmen-ink bg-xmen-yellow">
        <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// THE CHRONOLOGY</div>
          <h2 className="mt-3 font-xmen-display text-4xl sm:text-6xl">A FEW DECADES IN THE INSTITUTE.</h2>
          <ol className="mt-12 space-y-10 border-l-2 border-xmen-ink pl-8">
            {[
              { year: "1963", title: "Issue #1 — The Founders", body: "Five gifted home-makers open a tiny test kitchen above a comic-book store." },
              { year: "1992", title: "The Animated Era", body: "Our first commercial stand mixer hits the catalog. It is still a bestseller today." },
              { year: "2000", title: "The Cinematic Run", body: "We expand into coffee and breakfast — the Atelier and Luma drop in the same season." },
              { year: "2026", title: "The Viral Vault", body: "We move online with a full X-Men-inspired storefront. Welcome to the Institute." },
            ].map((e) => (
              <li key={e.year} className="relative">
                <span className="absolute -left-[37px] grid h-4 w-4 place-items-center border-2 border-xmen-ink bg-xmen-red">
                  <span className="h-1.5 w-1.5 bg-white animate-pulse" />
                </span>
                <div className="font-xmen-mono text-[11px] uppercase tracking-widest text-xmen-red">{e.year}</div>
                <div className="mt-1 font-xmen-display text-2xl">{e.title}</div>
                <div className="mt-1 text-sm text-xmen-ink/80">{e.body}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <LightningBolt className="mx-auto h-10 w-5 text-xmen-red" />
        <p className="mt-6 font-xmen-display text-3xl leading-tight text-xmen-ink sm:text-4xl">
          "TO ME, MY APPLIANCES."
        </p>
        <div className="mt-4 font-xmen-mono text-[11px] uppercase tracking-widest text-xmen-ink-soft">
          — The Founders, Viral Vault
        </div>
      </section>
    </div>
  );
}
