import { createFileRoute, Link } from "@tanstack/react-router";
import heroVideo from "../../public/hero-bg.mp4.asset.json";
import { products, collections } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Shield, Truck, Sparkles, Moon } from "lucide-react";
import { BatLogo } from "@/components/BatLogo";
import { HeroVideo } from "@/components/HeroVideo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dark Decor — Aesthetic Dark Home Decor" },
      { name: "description", content: "Hand-finished, gothic-luxe home decor. Lighting, decor, accents and furnishings for those who prefer the night." },
      { property: "og:title", content: "Dark Decor" },
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
      {/* HERO VIDEO BOX */}
      <section className="mx-auto max-w-7xl px-3 pt-6 sm:px-6 sm:pt-10 lg:px-8 lg:pt-14">
        <div className="relative isolate overflow-hidden border border-border bg-black clip-frame shadow-frame">
          {/* Background video — lazy, reduced-motion / saveData aware */}
          <HeroVideo src={heroVideo.url} className="absolute inset-0" />
          {/* dark vignette + gradient overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/30" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.02_0_0/0.7)_100%)]" />
          <div className="absolute inset-0 bg-grid-fine opacity-30" />

          {/* corner brackets */}
          <CornerBrackets />

          <div className="relative grid min-h-[78vh] place-items-center px-5 py-16 sm:min-h-[82vh] sm:px-12 sm:py-24">
            <div className="w-full max-w-3xl text-center animate-rise-in">
              <div className="mx-auto inline-flex items-center gap-2 border border-signal/30 bg-background/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-signal backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
                Vol. VII — Winter Drop Live
              </div>
              <h1 className="mt-6 font-display text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
                DECOR <br className="sm:hidden" />
                BORN OF THE <br />
                <span className="text-signal text-glow">DARK</span>.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-foreground/70 sm:mt-6 sm:text-base">
                Futuristic, hand-finished pieces in matte obsidian, smoked glass and brushed brass.
                Engineered for the corners of your home that prefer the night.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-2 border border-signal bg-signal px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.35em] text-primary-foreground transition hover:shadow-signal sm:px-7 sm:py-4"
                >
                  Enter Shop <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 border border-border bg-background/60 px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.35em] text-foreground/90 backdrop-blur transition hover:border-signal hover:text-signal sm:px-7 sm:py-4"
                >
                  The Origin
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mt-16 sm:mt-24 border-y border-border bg-card/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border md:grid-cols-4 md:divide-y-0">
          {[
            { icon: Shield, label: "Lifetime Warranty", sub: "On every cast iron piece" },
            { icon: Truck, label: "Free Shipping", sub: "On orders over $200" },
            { icon: Sparkles, label: "Hand-finished", sub: "Small batch production" },
            { icon: Moon, label: "Night-mode Only", sub: "Dark by design" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-start gap-2 px-4 py-7 sm:flex-row sm:items-center sm:gap-4 sm:px-8">
              <Icon className="h-5 w-5 shrink-0 text-signal" />
              <div>
                <div className="font-display text-[11px] uppercase tracking-[0.3em]">{label}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">Chapter 01</div>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl">Featured Pieces</h2>
          </div>
          <Link to="/shop" className="group inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.35em] text-muted-foreground hover:text-signal">
            View All <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {featured.map((p, i) => (
            <ProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* COLLECTIONS BANNER */}
      <section className="relative overflow-hidden border-y border-border bg-background py-16 sm:py-24">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-signal/40 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <BatLogo className="mx-auto h-9 w-20 text-signal animate-float-slow" />
          <h2 className="mt-6 font-display text-2xl sm:text-5xl">Five Collections. One Code.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Each piece belongs to a chapter of the long night.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10">
            {collections.map((c) => (
              <span key={c} className="border border-border bg-card px-3 py-1.5 sm:px-4 sm:py-2 font-display text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-foreground/80 transition hover:border-signal hover:text-signal">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* NEW DROPS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">Chapter 02</div>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl">Latest Drops</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {drops.map((p, i) => (
            <ProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 noise" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:py-24 sm:px-6 lg:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">// MANIFESTO</div>
            <h2 className="mt-3 font-display text-3xl sm:text-5xl">We don't fear the dark. <br/>We <span className="text-signal">furnish</span> it.</h2>
            <p className="mt-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Dark Decor was founded on a single idea: that elegance lives in shadow.
              Every piece in our catalog is hand-finished in small batches, cast in materials
              chosen for their weight and silence. No mass production. No bright primaries. No mercy
              for the mediocre.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 border-b border-signal pb-1 font-display text-[11px] uppercase tracking-[0.35em] text-signal">
              Read the full origin <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-square border border-border bg-card p-8 sm:p-10 shadow-elevated clip-frame">
              <BatLogo className="h-full w-full text-signal/90 animate-float-slow" />
            </div>
            <div className="absolute -inset-4 -z-10 bg-signal/10 blur-3xl" />
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-border bg-card/40">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20 text-center sm:px-6 lg:px-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">// THE BAT-SIGNAL</div>
          <h2 className="mt-3 font-display text-2xl sm:text-4xl">Subscribe to the night.</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            First access to drops, restocks, and the occasional vigilante missive.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              placeholder="your@dark.email"
              className="flex-1 border border-border bg-background px-4 py-3 font-mono text-sm placeholder:text-muted-foreground focus:border-signal focus:outline-none"
            />
            <button className="border border-signal bg-signal px-6 py-3 font-display text-[11px] uppercase tracking-[0.35em] text-primary-foreground hover:shadow-signal">
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

function CornerBrackets() {
  const base = "absolute h-5 w-5 border-signal/60";
  return (
    <>
      <span className={`${base} left-3 top-3 border-l border-t`} />
      <span className={`${base} right-3 top-3 border-r border-t`} />
      <span className={`${base} left-3 bottom-3 border-l border-b`} />
      <span className={`${base} right-3 bottom-3 border-r border-b`} />
    </>
  );
}
