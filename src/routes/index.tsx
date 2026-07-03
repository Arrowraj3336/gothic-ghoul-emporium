import { createFileRoute, Link } from "@tanstack/react-router";
import { XmenProductCard } from "@/components/XmenProductCard";
import { ArrowRight, Shield, Truck, Zap, Sparkles } from "lucide-react";
import { XLogo, CerebroIcon } from "@/components/XmenIcons";
import { getCharacter } from "@/lib/xmen-characters";
import { useProducts } from "@/lib/xmen-products-store";
import { formatINR } from "@/lib/utils";

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
  const products = useProducts();
  const featured = products.slice(0, 4);
  const drops = products.slice(4, 8);
  const hero = products[0];
  if (!hero) return null;
  const heroCh = getCharacter(hero.slug);

  return (
    <div>
      {/* HERO ============================================================ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,32,42,0.08),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(31,58,147,0.06),transparent_55%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:py-32 lg:px-8">
          <div>
            <div className="xm-chip xm-chip-red">
              <span className="h-1.5 w-1.5 rounded-full bg-xmen-red animate-pulse" />
              Issue Nº 01 · Cerebro online
            </div>
            <h1 className="mt-6 font-xmen-display text-5xl leading-[1.02] tracking-[-0.03em] sm:text-7xl lg:text-[6.25rem]">
              Gear for the <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-xmen-red">gifted few.</span>
                <span className="absolute inset-x-0 bottom-2 h-3 rounded-full bg-xmen-red/10 blur-sm" />
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-xmen-ink-soft sm:text-lg">
              Viral Vault is the Xavier Institute's collection of kitchen &amp; home gear.
              Each piece is dispatched under the codename of an X-Man — designed
              for the ones who cook, brew and build a little differently.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-xmen-ink px-6 py-3.5 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white transition hover:bg-xmen-red"
              >
                Enter the Armory
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-xmen-line px-6 py-3.5 font-xmen-display text-[11px] uppercase tracking-[0.3em] hover:border-xmen-ink"
              >
                Read the Mythos
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">
              <span className="inline-flex items-center gap-2"><Shield className="h-3 w-3" /> 5-yr warranty</span>
              <span className="inline-flex items-center gap-2"><Truck className="h-3 w-3" /> Free ₹12,500+ shipping</span>
              <span className="inline-flex items-center gap-2"><Zap className="h-3 w-3" /> Same-day dispatch</span>
            </div>
          </div>

          {/* Hero product spotlight */}
          <Link
            to="/products/$slug"
            params={{ slug: hero.slug }}
            className="group relative block"
          >
            <div
              className="relative aspect-square overflow-hidden rounded-[2.5rem] border border-xmen-line bg-white transition-all duration-500 group-hover:-translate-y-2"
              style={{ boxShadow: `0 40px 80px -40px ${heroCh.ring}, 0 20px 50px -30px rgba(11,13,16,0.15)` }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: `radial-gradient(ellipse at 50% 90%, ${heroCh.colorSoft}, transparent 60%)` }}
              />
              <img
                src={hero.image}
                alt={hero.name}
                className="xm-product-img absolute inset-0 h-full w-full object-contain p-10 transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-xmen-mono text-[10px] uppercase tracking-widest backdrop-blur"
                style={{ background: "rgba(255,255,255,0.9)", borderColor: heroCh.ring, color: heroCh.color }}>
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: heroCh.color }} />
                Headliner · {heroCh.codename}
              </div>
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-xmen-line bg-white/85 p-4 backdrop-blur">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-xmen-mono text-[9px] uppercase tracking-widest text-xmen-ink-soft">{hero.category}</div>
                    <div className="mt-0.5 font-xmen-display text-lg truncate">{hero.name}</div>
                  </div>
                  <div className="font-xmen-display text-xl text-xmen-red whitespace-nowrap">{formatINR(hero.price)}</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* FEATURED ========================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// current issue</div>
            <h2 className="mt-1 font-xmen-display text-3xl sm:text-5xl tracking-tight">The Featured Squad</h2>
          </div>
          <Link to="/shop" className="font-xmen-display text-[11px] uppercase tracking-[0.3em] text-xmen-ink-soft hover:text-xmen-red">
            See the full roster →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-4">
          {featured.map((p, i) => <XmenProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </section>

      {/* MANIFESTO ======================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-xmen-line bg-white p-8 sm:p-14 lg:p-20">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-xmen-red/5 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-[#1f3a93]/5 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <CerebroIcon className="h-16 w-16 text-xmen-red" />
              <div className="mt-4 font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// the doctrine</div>
              <h3 className="mt-2 font-xmen-display text-3xl sm:text-4xl tracking-tight">Built for the extraordinary.</h3>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                { Icon: Sparkles, title: "Curated arsenal", body: "Every piece is codenamed and vetted by the Institute." },
                { Icon: Shield, title: "Five-year covenant", body: "Warranty long enough to outlast a Sentinel." },
                { Icon: Zap, title: "Blackbird dispatch", body: "Same-day from Westchester to your doorstep." },
              ].map(({ Icon, title, body }) => (
                <div key={title} className="rounded-2xl border border-xmen-line bg-white p-5">
                  <Icon className="h-5 w-5 text-xmen-red" />
                  <div className="mt-3 font-xmen-display text-sm uppercase tracking-[0.2em]">{title}</div>
                  <p className="mt-1 text-xs text-xmen-ink-soft">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEW DROPS ======================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// new recruits</div>
            <h2 className="mt-1 font-xmen-display text-3xl sm:text-5xl tracking-tight">Fresh from Cerebro</h2>
          </div>
          <Link to="/shop" className="font-xmen-display text-[11px] uppercase tracking-[0.3em] text-xmen-ink-soft hover:text-xmen-red">
            View armory →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-4">
          {drops.map((p, i) => <XmenProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </section>

      {/* NEWSLETTER ====================================================== */}
      <section className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
        <XLogo className="mx-auto h-10 w-10 text-xmen-red" />
        <h3 className="mt-6 font-xmen-display text-3xl sm:text-5xl tracking-tight">Join the Institute.</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-xmen-ink-soft">
          Monthly briefings, exclusive recruits, and the occasional Konami transmission.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-md gap-2">
          <input type="email" placeholder="charles@xavier.institute" className="flex-1 rounded-full px-5 py-3 font-xmen-mono text-sm" />
          <button className="rounded-full bg-xmen-red px-5 py-3 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white hover:bg-xmen-ink">
            Enlist
          </button>
        </form>
        <div className="mt-6 font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">
          ↑↑↓↓←→←→BA · you know what to do
        </div>
      </section>
    </div>
  );
}
