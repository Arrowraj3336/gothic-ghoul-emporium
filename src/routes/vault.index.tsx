import { createFileRoute, Link } from "@tanstack/react-router";
import { vaultProducts } from "@/lib/vault-products";
import { VaultProductCard } from "@/components/vault/VaultProductCard";
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import heroImg from "@/assets/vault-hero.jpg";
import { WWStar, WWTiara, WWLasso, WWWing } from "@/components/vault/VaultIcons";

export const Route = createFileRoute("/vault/")({
  head: () => ({
    meta: [
      { title: "Viral Vault — Heroic Kitchen Appliances" },
      { name: "description", content: "Premium kitchen appliances forged with the spirit of a champion. Coffee, cooking, prep and breakfast — armored in gold." },
      { property: "og:title", content: "Viral Vault — Armor for the Modern Kitchen" },
      { property: "og:description", content: "Kitchen appliances inspired by the heroes of Themyscira." },
    ],
  }),
  component: VaultHome,
});

function VaultHome() {
  const featured = vaultProducts.slice(0, 4);
  const more = vaultProducts.slice(4, 8);

  return (
    <div>
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden">
        {/* Wing flourishes top */}
        <div className="pointer-events-none absolute -top-2 left-0 hidden w-1/3 text-[var(--vv-gold)] opacity-40 lg:block">
          <WWWing className="h-20 w-full" />
        </div>
        <div className="pointer-events-none absolute -top-2 right-0 hidden w-1/3 text-[var(--vv-gold)] opacity-40 lg:block">
          <WWWing className="h-20 w-full" flip />
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="mx-auto flex justify-center text-[var(--vv-gold)] lg:justify-start">
                <WWTiara className="h-10 w-20" />
              </div>

              <div className="mt-6 flex items-center justify-center gap-3 text-center lg:justify-start lg:text-left">
                <span className="h-px w-10 bg-[var(--vv-gold)]" />
                <span className="font-vault-heroic text-[11px] uppercase tracking-[0.4em] text-[var(--vv-crimson)]">
                  Forged on Themyscira · MMXXVI
                </span>
                <span className="h-px w-10 bg-[var(--vv-gold)]" />
              </div>

              <h1 className="mt-6 text-center font-vault-heroic text-[44px] leading-[1.05] tracking-tight text-[var(--vv-ink)] sm:text-6xl lg:text-left lg:text-7xl">
                Armor for the
                <br />
                <span className="text-[var(--vv-crimson)]">modern</span>{" "}
                <em className="font-vault-italic font-normal text-[var(--vv-ink-soft)]">kitchen.</em>
              </h1>

              <p className="mx-auto mt-7 max-w-md text-center font-vault-serif text-[18px] italic leading-relaxed text-[var(--vv-ink-soft)] lg:mx-0 lg:text-left">
                Heroic small appliances cast in brushed steel and burnished gold —
                quietly powerful, unmistakably yours.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  to="/vault/shop"
                  className="group inline-flex items-center gap-2 bg-[var(--vv-crimson)] px-7 py-3.5 font-vault-heroic text-[12px] uppercase tracking-[0.25em] text-white shadow-[0_10px_30px_-10px_rgba(154,30,42,0.6)] ring-1 ring-[var(--vv-gold)] transition hover:bg-[var(--vv-crimson-deep)]"
                >
                  Enter the Armory
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/vault/about"
                  className="inline-flex items-center gap-2 border-2 border-[var(--vv-ink)] bg-transparent px-7 py-3 font-vault-heroic text-[12px] uppercase tracking-[0.25em] text-[var(--vv-ink)] hover:bg-[var(--vv-ink)] hover:text-[var(--vv-cream)]"
                >
                  Our Mythos
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-[var(--vv-ink-soft)] lg:justify-start">
                <div className="flex items-center gap-2">
                  <WWStar className="h-3 w-3 text-[var(--vv-gold)]" />
                  4.9 · 12,000 champions
                </div>
                <div className="hidden h-3 w-px bg-[var(--vv-gold-soft)] sm:block" />
                <div>Featured · Bon Appétit · Cup of Jo</div>
              </div>
            </div>

            {/* Hero panel — shield-framed image */}
            <div className="relative lg:col-span-6">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px]">
                {/* Outer gold halo */}
                <div className="absolute inset-0 -m-3 rounded-[2px] bg-gradient-to-br from-[var(--vv-gold)] via-[var(--vv-gold-light)] to-[var(--vv-gold)] opacity-90 blur-[2px]" />
                {/* Inner crimson bezel */}
                <div className="absolute inset-0 rounded-[2px] bg-[var(--vv-crimson)]" />
                {/* The image */}
                <div className="absolute inset-2 overflow-hidden rounded-[2px] vv-grain">
                  <img
                    src={heroImg}
                    alt="A heroic kitchen tableau with copper, gold and steel appliances"
                    className="h-full w-full object-cover"
                  />
                  {/* Corner brackets */}
                  <span className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-[var(--vv-gold)]" />
                  <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-[var(--vv-gold)]" />
                  <span className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-[var(--vv-gold)]" />
                  <span className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-[var(--vv-gold)]" />
                </div>

                {/* Spinning lasso medallion */}
                <div className="absolute -left-8 -top-8 hidden h-24 w-24 text-[var(--vv-gold)] sm:block animate-[float-slow_6s_ease-in-out_infinite]">
                  <WWLasso className="h-full w-full" />
                </div>

                {/* Floating spec card */}
                <div className="absolute -bottom-5 -right-3 max-w-[200px] bg-[var(--vv-cream)] px-4 py-3 shadow-xl ring-1 ring-[var(--vv-gold)] sm:-right-6">
                  <div className="flex items-center gap-1.5 text-[var(--vv-gold)]">
                    <WWStar className="h-3 w-3" />
                    <span className="font-vault-heroic text-[10px] uppercase tracking-[0.3em] text-[var(--vv-crimson)]">Drop 01</span>
                  </div>
                  <div className="mt-1 font-vault-heroic text-sm text-[var(--vv-ink)]">Spring '26</div>
                  <div className="mt-0.5 text-[11px] text-[var(--vv-ink-soft)]">12 pieces · live now</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Greek-key divider */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="vv-meander" />
        </div>
      </section>

      {/* ============== VALUE PROPS ============== */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden bg-[var(--vv-gold-soft)] ring-1 ring-[var(--vv-gold)] md:grid-cols-4">
          {[
            { icon: Truck, label: "Free shipping", sub: "Champions ship free" },
            { icon: ShieldCheck, label: "2-year oath", sub: "Warranty of honor" },
            { icon: RotateCcw, label: "60-day return", sub: "No questions asked" },
            { icon: WWStar, label: "12,000+ reviews", sub: "4.9 / 5 heroic" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-3 bg-[var(--vv-cream)] px-5 py-7 sm:px-7">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--vv-crimson)]" />
              <div>
                <div className="font-vault-heroic text-[12px] uppercase tracking-[0.2em] text-[var(--vv-ink)]">{label}</div>
                <div className="mt-1 text-xs text-[var(--vv-ink-soft)]">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============== FEATURED ============== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[var(--vv-crimson)]">
              <WWStar className="h-3 w-3 text-[var(--vv-gold)]" />
              <div className="font-vault-heroic text-[11px] uppercase tracking-[0.35em]">I · This Moon</div>
            </div>
            <h2 className="mt-3 font-vault-heroic text-4xl text-[var(--vv-ink)] sm:text-5xl">
              Champions of the kitchen.
            </h2>
          </div>
          <Link to="/vault/shop" className="group inline-flex items-center gap-1.5 font-vault-heroic text-[12px] uppercase tracking-[0.25em] text-[var(--vv-ink)] hover:text-[var(--vv-crimson)]">
            View armory <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <VaultProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* ============== EDITORIAL — heroic manifesto ============== */}
      <section className="relative overflow-hidden bg-[var(--vv-ink)] py-24 text-[var(--vv-cream)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, var(--vv-gold) 1px, transparent 1px), radial-gradient(circle at 70% 60%, var(--vv-crimson) 1px, transparent 1px)",
          backgroundSize: "40px 40px, 60px 60px",
        }} />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <div className="text-[var(--vv-gold)]"><WWTiara className="h-9 w-16" /></div>
            <div className="mt-4 font-vault-heroic text-[11px] uppercase tracking-[0.35em] text-[var(--vv-gold)]">
              — The Oath
            </div>
            <h2 className="mt-4 font-vault-heroic text-4xl leading-tight sm:text-5xl">
              Built to last a thousand years.
              <br />
              <em className="font-vault-italic font-normal text-[var(--vv-gold-light)]">Designed for tomorrow's table.</em>
            </h2>
            <p className="mt-6 max-w-lg font-vault-serif text-[18px] italic leading-relaxed text-[var(--vv-cream-soft)]">
              Every appliance leaves our workshop having survived five thousand cycles, the
              scrutiny of seven master craftsmen, and the unblinking eye of the gods of design.
              What you receive is not a machine. It is a vow.
            </p>
            <Link to="/vault/about" className="group mt-9 inline-flex items-center gap-2 border-b-2 border-[var(--vv-gold)] pb-1 font-vault-heroic text-[12px] uppercase tracking-[0.3em] text-[var(--vv-gold)] hover:text-[var(--vv-gold-light)]">
              Read the chronicle <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              { n: "XII", l: "Master designers" },
              { n: "V·yr", l: "Average lifespan" },
              { n: "94%", l: "Loyalist customers" },
              { n: "Ø", l: "Single-use plastic" },
            ].map((s) => (
              <div key={s.l} className="relative border border-[color-mix(in_oklab,var(--vv-gold)_45%,transparent)] bg-[color-mix(in_oklab,var(--vv-cream)_4%,transparent)] p-7 backdrop-blur">
                <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-[var(--vv-gold)]" />
                <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-[var(--vv-gold)]" />
                <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[var(--vv-gold)]" />
                <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[var(--vv-gold)]" />
                <div className="font-vault-heroic text-4xl text-[var(--vv-gold-light)]">{s.n}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-[var(--vv-cream-soft)]">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== MORE ============== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-[var(--vv-crimson)]">
            <WWStar className="h-3 w-3 text-[var(--vv-gold)]" />
            <div className="font-vault-heroic text-[11px] uppercase tracking-[0.35em]">II · From the Vault</div>
          </div>
          <h2 className="mt-3 font-vault-heroic text-4xl text-[var(--vv-ink)] sm:text-5xl">Quiet bestsellers.</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {more.map((p, i) => (
            <VaultProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* ============== NEWSLETTER ============== */}
      <section className="relative overflow-hidden border-t-4 border-[var(--vv-gold)] bg-[var(--vv-cream-deep)]">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 text-[var(--vv-gold)] opacity-[0.08]">
          <WWLasso className="h-full w-full" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex w-fit text-[var(--vv-gold)]">
            <WWTiara className="h-8 w-16" />
          </div>
          <h2 className="mt-5 font-vault-heroic text-4xl text-[var(--vv-ink)] sm:text-5xl">
            Join the legion.
          </h2>
          <p className="mt-3 font-vault-serif text-[17px] italic text-[var(--vv-ink-soft)]">
            First word on new drops, recipes, and quiet bestsellers.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 border-2 border-[var(--vv-ink)] bg-white px-5 py-3 text-sm placeholder:text-[var(--vv-ink-soft)] focus:border-[var(--vv-crimson)] focus:outline-none"
            />
            <button className="bg-[var(--vv-crimson)] px-7 py-3 font-vault-heroic text-[12px] uppercase tracking-[0.25em] text-white ring-1 ring-[var(--vv-gold)] hover:bg-[var(--vv-crimson-deep)]">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
