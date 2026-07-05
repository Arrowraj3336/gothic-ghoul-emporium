import { createFileRoute, Link } from "@tanstack/react-router";
import { XmenProductCard } from "@/components/XmenProductCard";
import { ArrowRight, Shield, Truck, Zap, Sparkles, Radar, Package, Rocket, Star } from "lucide-react";
import { XLogo, CerebroIcon } from "@/components/XmenIcons";
import { useProducts } from "@/lib/xmen-products-store";
import { xmenCharacters } from "@/lib/xmen-characters";
import { XmenHeroHeadliner } from "@/components/XmenHeroHeadliner";
import ogImage from "@/assets/xmen-og.jpg";

const SITE_URL = "https://viral-vault-new.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Viral Vault — Smart Kitchen Gear, X-Men Style" },
      { name: "description", content: "Shop everyday kitchen and home appliances styled after your favourite X-Men. Simple to use, built to last, free shipping over ₹12,500." },
      { property: "og:title", content: "Viral Vault — Smart Kitchen Gear, X-Men Style" },
      { property: "og:description", content: "Everyday kitchen gear inspired by the X-Men. Easy to use, built to last." },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}${ogImage}` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "640" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Viral Vault — Smart Kitchen Gear, X-Men Style" },
      { name: "twitter:description", content: "Everyday kitchen gear inspired by the X-Men." },
      { name: "twitter:image", content: `${SITE_URL}${ogImage}` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Home,
});

function Home() {
  const products = useProducts();
  const featured = products.slice(0, 4);
  const bestSellers = products.slice(0, 4);
  const drops = products.slice(4, 8);

  // Roster preview (shown at the end of the page now).
  const roster = Object.entries(xmenCharacters).slice(0, 6).map(([slug, ch]) => ({ slug, ...ch }));

  return (
    <div className="relative z-[1]">
      {/* HERO ============================================================ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,32,42,0.08),transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(75,30,120,0.08),transparent_55%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-16 lg:py-28 lg:px-8">
          <div>
            <div className="xm-chip xm-chip-red">
              <span className="h-1.5 w-1.5 rounded-full bg-xmen-red animate-pulse" />
              New drop live · Free shipping ₹12,500+
            </div>
            <h1 className="mt-6 font-xmen-display text-5xl leading-[1.02] tracking-[-0.03em] sm:text-7xl lg:text-[6.25rem]">
              Kitchen gear <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-xmen-red">worth the hype.</span>
                <span className="absolute inset-x-0 bottom-2 h-3 rounded-full bg-xmen-red/10 blur-sm" />
              </span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-xmen-ink-soft sm:text-lg">
              Viral Vault brings you smart, simple kitchen and home appliances —
              styled after your favourite X-Men. Easy to use, built to last, and
              ready to ship the same day.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-xmen-ink px-6 py-3.5 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white transition hover:bg-xmen-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2"
              >
                Shop the collection
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-xmen-line px-6 py-3.5 font-xmen-display text-[11px] uppercase tracking-[0.3em] hover:border-xmen-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2"
              >
                Our story
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6 font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">
              <span className="inline-flex items-center gap-2"><Shield className="h-3 w-3" /> 5-yr warranty</span>
              <span className="inline-flex items-center gap-2"><Truck className="h-3 w-3" /> Free ₹12,500+ shipping</span>
              <span className="inline-flex items-center gap-2"><Zap className="h-3 w-3" /> Same-day dispatch</span>
            </div>
          </div>

          {/* Animated comic-book headliner (falls back to /xmen-headliner.mp4 if present). */}
          <div className="relative">
            <XmenHeroHeadliner />
          </div>
        </div>
      </section>

      {/* FEATURED ========================================================= */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// featured</div>
            <h2 className="mt-1 font-xmen-display text-3xl sm:text-5xl tracking-tight">This month's picks</h2>
          </div>
          <Link to="/shop" className="font-xmen-display text-[11px] uppercase tracking-[0.3em] text-xmen-ink-soft hover:text-xmen-red">
            See everything →
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
          <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-[#4b1e78]/10 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <div>
              <CerebroIcon className="h-16 w-16 text-xmen-red" />
              <div className="mt-4 font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// why viral vault</div>
              <h3 className="mt-2 font-xmen-display text-3xl sm:text-4xl tracking-tight">Built for the extraordinary.</h3>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                { Icon: Sparkles, title: "Handpicked", body: "Every product is tested before it earns a spot." },
                { Icon: Shield, title: "5-year promise", body: "A warranty that outlasts the trend cycle." },
                { Icon: Zap, title: "Ships today", body: "Order by 3pm and it leaves the same day." },
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

      {/* BEST SELLERS (new section right after manifesto) ================= */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">
              <Star className="h-3 w-3 fill-xmen-red" /> best sellers
            </div>
            <h2 className="mt-1 font-xmen-display text-3xl sm:text-5xl tracking-tight">Loved by the squad.</h2>
            <p className="mt-2 max-w-lg text-sm text-xmen-ink-soft">Our top-rated gear this season — the pieces people keep coming back for.</p>
          </div>
          <Link to="/shop" className="font-xmen-display text-[11px] uppercase tracking-[0.3em] text-xmen-ink-soft hover:text-xmen-red">
            Shop best sellers →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-4">
          {bestSellers.map((p, i) => <XmenProductCard key={"bs-" + p.slug} product={p} index={i} />)}
        </div>
      </section>

      {/* HOW IT WORKS =================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// how it works</div>
          <h2 className="mt-1 font-xmen-display text-3xl sm:text-5xl tracking-tight">From cart to kitchen.</h2>
        </div>
        <ol className="grid gap-5 md:grid-cols-4">
          {[
            { Icon: Radar, step: "01", title: "Pick", body: "Choose from our handpicked range." },
            { Icon: Sparkles, step: "02", title: "Match", body: "Each product is styled after an X-Men member." },
            { Icon: Package, step: "03", title: "Pack", body: "Sealed and checked before it leaves the store." },
            { Icon: Rocket, step: "04", title: "Ship", body: "Delivered fast, right to your door." },
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
            <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// new arrivals</div>
            <h2 className="mt-1 font-xmen-display text-3xl sm:text-5xl tracking-tight">Fresh in the vault</h2>
          </div>
          <Link to="/shop" className="font-xmen-display text-[11px] uppercase tracking-[0.3em] text-xmen-ink-soft hover:text-xmen-red">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-8 md:grid-cols-4">
          {drops.map((p, i) => <XmenProductCard key={p.slug} product={p} index={i} />)}
        </div>
      </section>

      {/* MEET THE SQUAD — moved to the END per brief ===================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// meet the squad</div>
          <h2 className="mt-1 font-xmen-display text-3xl sm:text-5xl tracking-tight">Every product, a hero.</h2>
          <p className="mt-3 max-w-xl text-sm text-xmen-ink-soft">
            Each item in the Vault is paired with an X-Men member. Tap in to see who's yours.
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

      {/* NEWSLETTER ====================================================== */}
      <section className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
        <XLogo className="mx-auto h-10 w-10 text-xmen-red" />
        <h3 className="mt-6 font-xmen-display text-3xl sm:text-5xl tracking-tight">Join the club.</h3>
        <p className="mx-auto mt-3 max-w-md text-sm text-xmen-ink-soft">
          A short monthly email — new arrivals, member-only offers, and the odd easter egg.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-md gap-2">
          <label className="sr-only" htmlFor="nl-email">Email address</label>
          <input id="nl-email" type="email" required placeholder="you@example.com" className="flex-1 rounded-full px-5 py-3 font-xmen-mono text-sm" />
          <button className="rounded-full bg-xmen-red px-5 py-3 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white hover:bg-xmen-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2">
            Sign me up
          </button>
        </form>
        <div className="mt-6 font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">
          ↑↑↓↓←→←→BA · try it, we dare you
        </div>
      </section>
    </div>
  );
}
