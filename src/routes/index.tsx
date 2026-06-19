import { createFileRoute, Link } from "@tanstack/react-router";
import { vaultProducts, vaultCategories } from "@/lib/vault-products";
import { XmenProductCard } from "@/components/XmenProductCard";
import { ArrowRight, Shield, Truck, Sparkles, Zap } from "lucide-react";
import { XLogo, CerebroIcon, ClawsIcon, VisorIcon, LightningBolt } from "@/components/XmenIcons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Viral Vault — Gear for the Gifted" },
      { name: "description", content: "An X-Men-inspired storefront for futuristic kitchen and home gear. Engineered like Cerebro, packaged for the gifted." },
      { property: "og:title", content: "Viral Vault — Gear for the Gifted" },
      { property: "og:description", content: "Powered kitchen & home gear from the Xavier Institute for Gifted Home-Makers." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = vaultProducts.slice(0, 4);
  const drops = vaultProducts.slice(4, 8);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b-2 border-xmen-ink">
        {/* ambient hex grid */}
        <div className="absolute inset-0 xm-hex opacity-70" />
        {/* halftone diagonals */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 xm-halftone opacity-30 xm-spin-slow" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 xm-halftone-yellow opacity-40" />
        {/* big X watermark */}
        <XLogo className="pointer-events-none absolute -right-16 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 text-xmen-red/10 md:block" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:py-32 lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 border-2 border-xmen-ink bg-xmen-yellow px-3 py-1.5 font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-ink">
              <span className="h-1.5 w-1.5 bg-xmen-red animate-pulse" />
              Issue Nº 01 · Cerebro online
            </div>
            <h1 className="mt-6 font-xmen-display text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-[7.5rem]">
              GEAR <br />
              <span className="text-xmen-red">FOR THE</span> <br />
              GIFTED.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-xmen-ink-soft sm:text-lg">
              Viral Vault is the Xavier Institute of home appliances —
              precision-built tools for cooks with abilities the world isn't ready for yet.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 border-2 border-xmen-ink bg-xmen-red px-7 py-4 font-xmen-display text-xs uppercase tracking-[0.3em] text-white transition hover:bg-xmen-yellow hover:text-xmen-ink"
              >
                Enter the Armory <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border-2 border-xmen-ink bg-white px-7 py-4 font-xmen-display text-xs uppercase tracking-[0.3em] text-xmen-ink transition hover:bg-xmen-yellow"
              >
                Read the Mythos
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t-2 border-xmen-ink pt-6 max-w-md">
              {[
                { n: "47", l: "Mutant SKUs" },
                { n: "12k", l: "Subscribers" },
                { n: "★ 4.9", l: "Rating" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-xmen-display text-3xl text-xmen-red">{s.n}</div>
                  <div className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual stack — comic-panel */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full xm-frame xm-frame-red overflow-hidden">
              <img src={vaultProducts[0].image} alt={vaultProducts[0].name} className="h-full w-full object-cover" />
              <div className="absolute left-3 top-3 border-2 border-xmen-ink bg-xmen-yellow px-2 py-1 font-xmen-display text-[11px] uppercase tracking-widest">
                Issue #01 · Cover
              </div>
              <div className="absolute bottom-3 right-3 border-2 border-xmen-ink bg-white px-3 py-1.5">
                <div className="font-xmen-display text-sm uppercase tracking-widest text-xmen-red">{vaultProducts[0].name}</div>
                <div className="font-xmen-mono text-[10px] text-xmen-ink-soft">${vaultProducts[0].price}</div>
              </div>
            </div>
            {/* floating accents */}
            <div className="absolute -left-6 -bottom-6 hidden h-24 w-24 border-2 border-xmen-ink bg-xmen-yellow xm-clip sm:grid place-items-center xm-float">
              <LightningBolt className="h-10 w-5 text-xmen-ink" />
            </div>
            <div className="absolute -right-4 top-12 hidden h-16 w-16 border-2 border-xmen-ink bg-white sm:grid place-items-center">
              <CerebroIcon className="h-9 w-9 text-xmen-red" />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="border-b-2 border-xmen-ink bg-xmen-paper-soft">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x-2 divide-y-2 divide-xmen-ink md:grid-cols-4 md:divide-y-0">
          {[
            { icon: Shield, label: "5-Yr Warranty", sub: "Adamantium-grade builds" },
            { icon: Truck, label: "Free Shipping", sub: "On orders over $150" },
            { icon: Sparkles, label: "Hand-Tuned", sub: "Calibrated in the Danger Room" },
            { icon: Zap, label: "Cerebro Tested", sub: "Vetted by Beast & Forge" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-start gap-2 px-4 py-7 sm:flex-row sm:items-center sm:gap-4 sm:px-6">
              <Icon className="h-5 w-5 shrink-0 text-xmen-red" />
              <div>
                <div className="font-xmen-display text-sm uppercase tracking-[0.2em]">{label}</div>
                <div className="mt-1 text-[11px] text-xmen-ink-soft">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">
              <ClawsIcon className="h-3 w-3" /> Chapter 01 — Featured
            </div>
            <h2 className="mt-2 font-xmen-display text-4xl sm:text-6xl">FIRST-CLASS GEAR.</h2>
          </div>
          <Link to="/shop" className="group inline-flex items-center gap-2 font-xmen-display text-xs uppercase tracking-[0.3em] text-xmen-ink hover:text-xmen-red">
            View All <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <XmenProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* CATEGORIES BANNER */}
      <section className="relative overflow-hidden border-y-2 border-xmen-ink bg-xmen-ink py-16 sm:py-24">
        <div className="absolute inset-0 xm-halftone opacity-20" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <XLogo className="mx-auto h-12 w-12 text-xmen-yellow xm-float" />
          <h2 className="mt-6 font-xmen-display text-4xl text-white sm:text-6xl">FOUR SQUADS. ONE INSTITUTE.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
            Each category trains in its own corner of the Danger Room.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10">
            {vaultCategories.map((c) => (
              <Link
                key={c}
                to="/shop"
                className="border-2 border-white bg-transparent px-4 py-2 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white transition hover:bg-xmen-yellow hover:text-xmen-ink hover:border-xmen-yellow"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DROPS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">
            <VisorIcon className="h-3 w-6" /> Chapter 02 — Fresh Drops
          </div>
          <h2 className="mt-2 font-xmen-display text-4xl sm:text-6xl">NEW MUTATIONS.</h2>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-3 lg:grid-cols-4">
          {drops.map((p, i) => (
            <XmenProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative overflow-hidden border-y-2 border-xmen-ink bg-xmen-yellow">
        <div className="absolute inset-0 xm-hatch opacity-[0.04]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:py-28 sm:px-6 lg:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// MANIFESTO</div>
            <h2 className="mt-3 font-xmen-display text-4xl leading-[0.95] sm:text-6xl">
              YOU'RE NOT <br/> <span className="text-xmen-red">A CUSTOMER.</span> <br/> YOU'RE A MUTANT.
            </h2>
            <p className="mt-6 max-w-xl text-base text-xmen-ink/80 leading-relaxed">
              Every Viral Vault piece is engineered for the unfair advantage.
              Pour faster than Quicksilver. Plate sharper than Cyclops. Whip cream
              with the patience of Xavier. The kitchen is the new Danger Room.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 border-b-2 border-xmen-ink pb-1 font-xmen-display text-xs uppercase tracking-[0.3em] text-xmen-ink">
              Read the full mythos <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="relative grid place-items-center">
            <div className="relative h-72 w-72 sm:h-96 sm:w-96">
              <div className="absolute inset-0 border-4 border-xmen-ink bg-white grid place-items-center xm-frame xm-frame-red">
                <XLogo className="h-40 w-40 text-xmen-red sm:h-56 sm:w-56" />
              </div>
              <ClawsIcon className="absolute -left-8 -top-8 h-16 w-16 text-xmen-ink xm-float" />
              <LightningBolt className="absolute -right-6 -bottom-6 h-20 w-10 text-xmen-ink" />
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24 text-center sm:px-6 lg:px-8">
          <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// CEREBRO BROADCAST</div>
          <h2 className="mt-3 font-xmen-display text-4xl sm:text-5xl">JOIN THE INSTITUTE.</h2>
          <p className="mt-3 text-sm text-xmen-ink-soft">
            First word on every drop, restock, and Danger-Room sale.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              placeholder="your@mutant.email"
              className="flex-1 px-4 py-3 font-xmen-mono text-sm"
            />
            <button className="border-2 border-xmen-ink bg-xmen-red px-6 py-3 font-xmen-display text-xs uppercase tracking-[0.3em] text-white hover:bg-xmen-yellow hover:text-xmen-ink">
              Enlist
            </button>
          </form>
          <p className="mt-4 font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft/70">
            Easter egg — press <span className="border border-xmen-ink px-1.5 py-0.5 text-xmen-ink">↑↑↓↓←→←→BA</span> anywhere.
          </p>
        </div>
      </section>
    </div>
  );
}
