import { createFileRoute, Link } from "@tanstack/react-router";
import { vaultProducts, vaultCategories } from "@/lib/vault-products";
import { XmenProductCard } from "@/components/XmenProductCard";
import { ArrowRight, Shield, Truck, Sparkles, Zap } from "lucide-react";
import { XLogo, CerebroIcon, TelepathyIcon, PhoenixIcon, StormIcon, HelmetIcon } from "@/components/XmenIcons";
import { getCharacter } from "@/lib/xmen-characters";

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
  const hero = vaultProducts[0];
  const heroCh = getCharacter(hero.slug);

  return (
    <div>
      {/* HERO ============================================================ */}
      <section className="relative overflow-hidden">
        {/* ambient layers */}
        <div className="absolute inset-0 xm-hex opacity-80" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,32,42,0.07),transparent_60%)]" />
        <XLogo className="pointer-events-none absolute -right-24 top-1/2 hidden h-[560px] w-[560px] -translate-y-1/2 text-xmen-red/[0.06] md:block xm-spin-slow" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20 lg:py-32 lg:px-8">
          <div>
            <div className="xm-chip xm-chip-red">
              <span className="h-1.5 w-1.5 rounded-full bg-xmen-red animate-pulse" />
              Issue Nº 01 · Cerebro online
            </div>
            <h1 className="mt-6 font-xmen-display text-5xl leading-[1.02] tracking-[-0.02em] sm:text-7xl lg:text-[6.5rem]">
              Gear for the <br />
              <span className="text-xmen-red">gifted few.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-xmen-ink-soft sm:text-lg">
              Viral Vault is the Xavier Institute of home appliances — precision-built
              tools for cooks with abilities the world isn't ready for yet.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/shop" className="xm-btn xm-btn-red">
                Enter the Armory <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link to="/about" className="xm-btn xm-btn-ghost">
                Read the Mythos
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-xmen-line pt-6 max-w-md">
              {[
                { n: "47", l: "Mutant SKUs" },
                { n: "12k", l: "Subscribers" },
                { n: "4.9", l: "Star Rating" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-xmen-display text-3xl text-xmen-ink">{s.n}</div>
                  <div className="mt-1 font-xmen-mono text-[10px] uppercase tracking-[0.24em] text-xmen-ink-soft">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual — futuristic editorial card */}
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden xm-frame xm-frame-red rounded-sm">
              <img src={hero.image} alt={hero.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

              <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 font-xmen-mono text-[10px] uppercase tracking-[0.24em] text-xmen-ink backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: heroCh.color }} />
                Cover · {heroCh.codename}
              </div>

              <div className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between gap-3">
                <div>
                  <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-white/85">
                    {hero.category}
                  </div>
                  <div className="mt-1 font-xmen-display text-xl tracking-tight text-white drop-shadow">
                    {hero.name}
                  </div>
                </div>
                <div className="rounded-full bg-white/95 px-3 py-1.5 font-xmen-display text-sm text-xmen-ink">
                  ${hero.price}
                </div>
              </div>
            </div>
            {/* floating insignia */}
            <div className="absolute -left-5 -bottom-5 hidden h-20 w-20 sm:grid place-items-center rounded-full xm-glass xm-float">
              <CerebroIcon className="h-9 w-9 text-xmen-red" />
            </div>
            <div className="absolute -right-3 top-10 hidden h-14 w-14 sm:grid place-items-center rounded-full xm-glass">
              <XLogo className="h-7 w-7 text-xmen-ink" />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS ====================================================== */}
      <section className="border-y border-xmen-line bg-xmen-paper-soft">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {[
            { icon: Shield, label: "5-Yr Warranty", sub: "Adamantium-grade builds" },
            { icon: Truck, label: "Free Shipping", sub: "On orders over $150" },
            { icon: Sparkles, label: "Hand-Tuned", sub: "Calibrated in the Danger Room" },
            { icon: Zap, label: "Cerebro Tested", sub: "Vetted by Beast & Forge" },
          ].map(({ icon: Icon, label, sub }, i) => (
            <div
              key={label}
              className={`flex items-center gap-4 px-5 py-7 sm:px-7 ${i > 0 ? "md:border-l border-xmen-line" : ""} ${i >= 2 ? "border-t md:border-t-0 border-xmen-line" : ""} ${i === 1 ? "border-l border-xmen-line md:border-l" : ""}`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-xmen-line text-xmen-red">
                <Icon className="h-4 w-4" />
              </span>
              <div>
                <div className="font-xmen-display text-sm tracking-tight">{label}</div>
                <div className="mt-0.5 text-[11px] text-xmen-ink-soft">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED ========================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 sm:mb-12">
          <div>
            <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">
              Chapter 01 — Featured
            </div>
            <h2 className="mt-3 font-xmen-display text-4xl tracking-[-0.01em] sm:text-5xl">
              First-class gear.
            </h2>
          </div>
          <Link to="/shop" className="group inline-flex items-center gap-2 font-xmen-display text-xs uppercase tracking-[0.3em] text-xmen-ink hover:text-xmen-red">
            View all <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <XmenProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* CATEGORIES — dark cinematic band ================================ */}
      <section className="relative overflow-hidden border-y border-xmen-line bg-[#0b0d10] py-20 sm:py-28">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "22px 22px" }} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,32,42,0.18),transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <XLogo className="mx-auto h-14 w-14 text-xmen-red xm-float" />
          <h2 className="mt-6 font-xmen-display text-4xl tracking-[-0.01em] text-white sm:text-6xl">
            Four squads. One Institute.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/65">
            Each category trains in its own corner of the Danger Room.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {vaultCategories.map((c) => (
              <Link
                key={c}
                to="/shop"
                className="rounded-full border border-white/25 px-4 py-2 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white transition hover:border-xmen-red hover:text-xmen-red"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DROPS ============================================================ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">
            Chapter 02 — New mutations
          </div>
          <h2 className="mt-3 font-xmen-display text-4xl tracking-[-0.01em] sm:text-5xl">
            Freshly awakened.
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-3 lg:grid-cols-4">
          {drops.map((p, i) => (
            <XmenProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* MANIFESTO — refined, no brutalism =============================== */}
      <section className="relative overflow-hidden border-y border-xmen-line bg-xmen-paper-soft">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-xmen-red/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-[#1f3a93]/5 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:py-28 sm:px-6 lg:px-8 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// Manifesto</div>
            <h2 className="mt-3 font-xmen-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-6xl">
              You're not a customer. <span className="text-xmen-red">You're a mutant.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base text-xmen-ink/80 leading-relaxed">
              Every Viral Vault piece is engineered for the unfair advantage.
              Pour faster than Quicksilver. Plate sharper than Cyclops. Whip cream
              with the patience of Xavier. The kitchen is the new Danger Room.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 border-b border-xmen-ink pb-1 font-xmen-display text-xs uppercase tracking-[0.3em] text-xmen-ink hover:text-xmen-red hover:border-xmen-red">
              Read the full mythos <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="relative grid place-items-center">
            <div className="relative grid h-80 w-80 place-items-center rounded-full border border-xmen-line bg-white xm-glow-red sm:h-96 sm:w-96">
              <XLogo className="h-40 w-40 text-xmen-red sm:h-52 sm:w-52" />
              <HelmetIcon className="absolute -left-6 -top-6 h-14 w-14 text-[#6b3fa0] xm-float" />
              <PhoenixIcon className="absolute -right-8 -bottom-4 h-16 w-20 text-[#ff5b1f]" />
              <TelepathyIcon className="absolute right-2 -top-6 h-12 w-12 text-[#1f3a93]" />
              <StormIcon className="absolute -left-4 bottom-2 h-12 w-12 text-[#4cc9ff]" />
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER ======================================================= */}
      <section className="bg-xmen-paper">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:py-28 text-center sm:px-6 lg:px-8">
          <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">
            // Cerebro Broadcast
          </div>
          <h2 className="mt-3 font-xmen-display text-4xl tracking-[-0.01em] sm:text-5xl">
            Join the Institute.
          </h2>
          <p className="mt-3 text-sm text-xmen-ink-soft">
            First word on every drop, restock and Danger-Room sale.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              placeholder="your@mutant.email"
              className="flex-1 px-4 py-3 font-xmen-mono text-sm"
            />
            <button className="xm-btn xm-btn-red">Enlist</button>
          </form>
          <p className="mt-6 font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft/70">
            Hidden powers — try the keys <kbd className="rounded border border-xmen-line px-1.5 py-0.5">X</kbd>{" "}
            <kbd className="rounded border border-xmen-line px-1.5 py-0.5">M</kbd>{" "}
            <kbd className="rounded border border-xmen-line px-1.5 py-0.5">W</kbd>{" "}
            <kbd className="rounded border border-xmen-line px-1.5 py-0.5">J</kbd>{" "}
            <kbd className="rounded border border-xmen-line px-1.5 py-0.5">P</kbd>{" "}
            <kbd className="rounded border border-xmen-line px-1.5 py-0.5">S</kbd>{" "}
            <kbd className="rounded border border-xmen-line px-1.5 py-0.5">C</kbd>
            {" "}· or the Konami code anywhere.
          </p>
        </div>
      </section>
    </div>
  );
}
