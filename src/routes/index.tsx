import { createFileRoute, Link } from "@tanstack/react-router";
import { XmenProductCard } from "@/components/XmenProductCard";
import { ArrowRight, Shield, Truck, Zap, Sparkles, Radar, Package, Rocket } from "lucide-react";
import { XLogo, CerebroIcon } from "@/components/XmenIcons";
import { XComicBubble, XBadge } from "@/components/XmenComicAccents";
import { useProducts } from "@/lib/xmen-products-store";
import { xmenCharacters } from "@/lib/xmen-characters";
import heroComic from "@/assets/xmen-hero-comic.png";
import ogImage from "@/assets/xmen-og.jpg";

const SITE_URL = "https://viral-vault-new.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Viral Vault — Gear for the Gifted" },
      { name: "description", content: "An X-Men-inspired storefront for futuristic kitchen and home gear. Engineered like Cerebro, packaged for the gifted." },
      { property: "og:title", content: "Viral Vault — Gear for the Gifted" },
      { property: "og:description", content: "Powered kitchen & home gear from the Xavier Institute for Gifted Home-Makers." },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}${ogImage}` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "640" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Viral Vault — Gear for the Gifted" },
      { name: "twitter:description", content: "Powered kitchen & home gear from the Xavier Institute for Gifted Home-Makers." },
      { name: "twitter:image", content: `${SITE_URL}${ogImage}` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Home,
});

function Home() {
  const products = useProducts();
  const featured = products.slice(0, 4);
  const drops = products.slice(4, 8);

  // Roster preview — small character grid derived from character map.
  const roster = Object.entries(xmenCharacters).slice(0, 6).map(([slug, ch]) => ({ slug, ...ch }));

  return (
    <div>
      {/* HERO ============================================================ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,32,42,0.08),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(75,30,120,0.08),transparent_55%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:py-28 lg:px-8">
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
                className="group inline-flex items-center gap-2 rounded-full bg-xmen-ink px-6 py-3.5 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white transition hover:bg-xmen-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2"
              >
                Enter the Armory
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-xmen-line px-6 py-3.5 font-xmen-display text-[11px] uppercase tracking-[0.3em] hover:border-xmen-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2"
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

          {/* Hero comic panel — team of heroes presenting the gear. */}
          <div className="relative">
            <div className="relative aspect-square overflow-hidden rounded-[2.5rem] border-2 border-xmen-ink bg-white"
              style={{ boxShadow: "10px 10px 0 rgba(11,13,16,1), 0 40px 80px -40px rgba(75,30,120,0.35)" }}>
              {/* halftone corner accents */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: "radial-gradient(#0b0d10 1.2px, transparent 1.2px)", backgroundSize: "10px 10px" }} />
              <img
                src={heroComic}
                alt="The X-Men squad presenting Viral Vault kitchen gear, comic-book style"
                className="relative z-10 h-full w-full object-contain p-4"
                width={1280}
                height={1280}
              />
              <div className="pointer-events-none absolute inset-x-0 top-4 z-20 flex justify-center">
                <XComicBubble text="Gear Up!" />
              </div>
              <div className="absolute left-4 bottom-4 z-20 inline-flex items-center gap-2 rounded-full border-2 border-xmen-ink bg-xmen-yellow px-3 py-1.5 font-xmen-display text-[10px] uppercase tracking-widest text-xmen-ink"
                style={{ boxShadow: "3px 3px 0 rgba(11,13,16,1)" }}>
                <XBadge className="h-3.5 w-3.5" /> Issue #01 · Vol. 1
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ========================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// current issue</div>
            <h2 className="mt-1 font-xmen-display text-3xl sm:text-5xl tracking-tight">The Featured Squad</h2>
          </div>
          <Link to="/shop" className="font-xmen-display text-[11px] uppercase tracking-[0.3em] text-xmen-ink-soft hover:text-xmen-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2">
            See the full roster →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-4">
          {featured.map((p, i) => <XmenProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </section>

      {/* CHARACTER ROSTER ================================================ */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// meet the squad</div>
          <h2 className="mt-1 font-xmen-display text-3xl sm:text-5xl tracking-tight">Every product, a mutant.</h2>
          <p className="mt-3 max-w-xl text-sm text-xmen-ink-soft">
            Each item in the Vault is field-tested and codenamed by a member of the Institute. Tap in.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {roster.map((r) => (
            <Link
              key={r.slug}
              to="/products/$slug"
              params={{ slug: r.slug }}
              className="group relative overflow-hidden rounded-3xl border border-xmen-line bg-white p-5 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2"
              style={{ boxShadow: `0 20px 40px -30px ${r.ring}` }}
            >
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-70 blur-xl transition group-hover:opacity-90"
                style={{ background: r.colorSoft }} />
              <div className="relative flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border-2 text-lg font-xmen-display"
                  style={{ borderColor: r.color, color: r.color, background: r.colorSoft }}>
                  {r.codename.slice(0, 1)}
                </div>
                <div>
                  <div className="font-xmen-mono text-[10px] uppercase tracking-widest" style={{ color: r.color }}>{r.codename}</div>
                  <div className="font-xmen-display text-lg">{r.name}</div>
                  <p className="mt-0.5 text-[11px] text-xmen-ink-soft line-clamp-1">{r.power}</p>
                </div>
              </div>
              <p className="mt-4 font-xmen-serif italic text-sm text-xmen-ink-soft line-clamp-2">"{r.quote}"</p>
            </Link>
          ))}
        </div>
      </section>

      {/* MANIFESTO ======================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-xmen-line bg-white p-8 sm:p-14 lg:p-20">
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-xmen-red/5 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-[#4b1e78]/10 blur-3xl" />
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

      {/* DISPATCH TIMELINE =============================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// mission flow</div>
          <h2 className="mt-1 font-xmen-display text-3xl sm:text-5xl tracking-tight">From Cerebro to your kitchen.</h2>
        </div>
        <ol className="grid gap-5 md:grid-cols-4">
          {[
            { Icon: Radar, step: "01", title: "Scan", body: "Cerebro identifies gear worthy of the Vault." },
            { Icon: Sparkles, step: "02", title: "Codename", body: "Every unit is paired with a member of the roster." },
            { Icon: Package, step: "03", title: "Prep", body: "Sealed and signed at the Westchester Institute." },
            { Icon: Rocket, step: "04", title: "Deploy", body: "The Blackbird delivers to your door." },
          ].map(({ Icon, step, title, body }) => (
            <li key={step} className="relative rounded-3xl border border-xmen-line bg-white p-6">
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-xmen-line bg-xmen-paper-soft">
                  <Icon className="h-5 w-5 text-xmen-red" />
                </div>
                <span className="font-xmen-display text-3xl text-xmen-red/25">{step}</span>
              </div>
              <div className="mt-5 font-xmen-display text-lg">{title}</div>
              <p className="mt-1 text-sm text-xmen-ink-soft">{body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* NEW DROPS ======================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// new recruits</div>
            <h2 className="mt-1 font-xmen-display text-3xl sm:text-5xl tracking-tight">Fresh from Cerebro</h2>
          </div>
          <Link to="/shop" className="font-xmen-display text-[11px] uppercase tracking-[0.3em] text-xmen-ink-soft hover:text-xmen-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2">
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
          <label className="sr-only" htmlFor="nl-email">Email address</label>
          <input id="nl-email" type="email" required placeholder="charles@xavier.institute" className="flex-1 rounded-full px-5 py-3 font-xmen-mono text-sm" />
          <button className="rounded-full bg-xmen-red px-5 py-3 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white hover:bg-xmen-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2">
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
