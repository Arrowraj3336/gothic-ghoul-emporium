import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-gotham.jpg";
import { BatSignalSky } from "@/components/BatSignal";
import { products, collections } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Shield, Truck, Sparkles, Moon } from "lucide-react";
import { BatLogo } from "@/components/BatLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gotham.Haus — Aesthetic Dark Home Decor" },
      { name: "description", content: "Hand-finished, gothic-inspired home decor. Lighting, decor, accents and furnishings for those who prefer the night." },
      { property: "og:title", content: "Gotham.Haus" },
      { property: "og:description", content: "Aesthetic home decor for those who prefer the night." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.slice(0, 4);
  const drops = products.slice(4, 8);

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate min-h-[92vh] overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <BatSignalSky className="absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent" />

        <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl animate-rise-in">
            <div className="inline-flex items-center gap-2 border border-border bg-background/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
              Winter Drop — Vol. VII
            </div>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Decor born <br /> of the <span className="text-signal text-glow">night</span>.
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Hand-finished, gothic-luxe pieces for the corners of your home that prefer the dark.
              Cast iron, smoked glass, matte obsidian, brass.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 border border-signal bg-signal px-7 py-4 font-display text-xs uppercase tracking-[0.3em] text-primary-foreground transition hover:shadow-signal"
              >
                Enter the Armory <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border border-border bg-background/60 px-7 py-4 font-display text-xs uppercase tracking-[0.3em] text-foreground backdrop-blur transition hover:border-signal hover:text-signal"
              >
                The Origin
              </Link>
            </div>
          </div>
        </div>

        {/* corner glyphs */}
        <div className="absolute left-4 top-20 hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 sm:block">
          <div>// LAT 40.7°N</div>
          <div>// LON 74.0°W</div>
          <div className="mt-1 text-signal/80">// SIGNAL ACTIVE</div>
        </div>
        <div className="absolute right-4 bottom-4 hidden font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 sm:block">
          GOTHAM.HAUS / EST. MMXIX
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border md:grid-cols-4">
          {[
            { icon: Shield, label: "Lifetime Warranty", sub: "On every cast iron piece" },
            { icon: Truck, label: "Free Shipping", sub: "On orders over $200" },
            { icon: Sparkles, label: "Hand-finished", sub: "Small batch production" },
            { icon: Moon, label: "Night-mode Only", sub: "Dark by design" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-2 px-4 py-8 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left sm:px-8">
              <Icon className="h-5 w-5 shrink-0 text-signal" />
              <div>
                <div className="font-display text-xs uppercase tracking-[0.25em]">{label}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">Chapter 01</div>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl">The Featured Cape</h2>
          </div>
          <Link to="/shop" className="group inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-signal">
            All Pieces <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* COLLECTIONS BANNER */}
      <section className="relative overflow-hidden border-y border-border bg-background py-24">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-signal/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <BatLogo className="mx-auto h-10 w-20 text-signal animate-float-slow" />
          <h2 className="mt-6 font-display text-3xl sm:text-5xl">Five Collections. One Code.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Each piece belongs to a chapter of the long night. Find the one that speaks your shadow.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {collections.map((c) => (
              <span key={c} className="border border-border bg-card px-4 py-2 font-display text-[11px] uppercase tracking-[0.25em] text-foreground/80 transition hover:border-signal hover:text-signal">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* NEW DROPS */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">Chapter 02</div>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl">Latest Drops</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {drops.map((p, i) => (
            <ProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 noise" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">// MANIFESTO</div>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl">We don't fear the dark. <br/>We <span className="text-signal">furnish</span> it.</h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              Gotham.Haus was founded on a single idea: that elegance lives in shadow.
              Every piece in our catalog is hand-finished in small batches, cast in materials
              chosen for their weight and silence. No mass production. No bright primaries. No mercy
              for the mediocre.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 border-b border-signal pb-1 font-display text-xs uppercase tracking-[0.3em] text-signal">
              Read the full origin <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square border border-border bg-card p-10 shadow-elevated">
              <BatLogo className="h-full w-full text-signal/90 animate-float-slow" />
            </div>
            <div className="absolute -inset-4 -z-10 bg-signal/10 blur-3xl" />
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">// THE BAT-SIGNAL</div>
          <h2 className="mt-3 font-display text-2xl sm:text-4xl">Subscribe to the night.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            First access to drops, restocks, and the occasional vigilante missive.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              placeholder="your@gotham.email"
              className="flex-1 border border-border bg-background px-4 py-3 font-mono text-sm placeholder:text-muted-foreground focus:border-signal focus:outline-none"
            />
            <button className="border border-signal bg-signal px-6 py-3 font-display text-xs uppercase tracking-[0.3em] text-primary-foreground hover:shadow-signal">
              Signal Me
            </button>
          </form>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
            Psst — try typing <span className="text-signal">"bat"</span> anywhere on this site.
          </p>
        </div>
      </section>
    </div>
  );
}
