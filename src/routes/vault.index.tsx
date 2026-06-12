import { createFileRoute, Link } from "@tanstack/react-router";
import { vaultProducts } from "@/lib/vault-products";
import { VaultProductCard } from "@/components/vault/VaultProductCard";
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import heroImg from "@/assets/vault-hero.jpg";
import { WWStar, WWTiara, ArcaneSigil, DoomBlasters } from "@/components/vault/VaultIcons";

export const Route = createFileRoute("/vault/")({
  head: () => ({
    meta: [
      { title: "Viral Vault — Magic & Science from the House of Doom" },
      { name: "description", content: "Latverian-engineered kitchen instruments. Sorcery, steel, and sovereign craft — forged in the workshops of Doom." },
      { property: "og:title", content: "Viral Vault — The Doom Collection" },
      { property: "og:description", content: "Where mysticism meets machinery. Kitchen instruments of the sovereign." },
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
        {/* Ambient sigil */}
        <div className="pointer-events-none absolute -right-40 -top-40 hidden text-[var(--vv-green)] opacity-[0.07] lg:block">
          <ArcaneSigil className="vv-sigil h-[640px] w-[640px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6 sm:pt-20 lg:px-8 lg:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 text-[var(--vv-green)]">
                <span className="h-px w-10 bg-[var(--vv-green)]" />
                <span className="font-vault-heroic text-[11px] uppercase tracking-[0.4em]">
                  By decree of Doom · MMXXVI
                </span>
              </div>

              <h1 className="mt-6 font-vault-heroic text-[40px] leading-[1.06] tracking-tight text-[var(--vv-ink)] sm:text-6xl lg:text-7xl">
                Magic. Science.
                <br />
                <em className="font-vault-italic font-normal text-[var(--vv-green)]">One sovereign craft.</em>
              </h1>

              <p className="mt-7 max-w-md font-vault-serif text-[18px] italic leading-relaxed text-[var(--vv-ink-soft)]">
                Kitchen instruments engineered in Latveria, where alchemy and
                engineering are the same discipline. Every piece sealed by Doom.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to="/vault/shop"
                  className="group inline-flex items-center gap-2 bg-[var(--vv-green)] px-7 py-3.5 font-vault-heroic text-[12px] uppercase tracking-[0.28em] text-white transition hover:bg-[var(--vv-green-deep)]"
                >
                  Enter the Armory
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/vault/about"
                  className="inline-flex items-center gap-2 border border-[var(--vv-green)] bg-white px-7 py-3 font-vault-heroic text-[12px] uppercase tracking-[0.28em] text-[var(--vv-green)] hover:bg-[var(--vv-green)] hover:text-white"
                >
                  The Doctrine
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-[var(--vv-ink-soft)]">
                <div className="flex items-center gap-2">
                  <WWStar className="h-3 w-3 text-[var(--vv-green)]" />
                  4.9 · 12,000 loyal subjects
                </div>
                <div className="hidden h-3 w-px bg-[var(--vv-green-line)] sm:block" />
                <div>As seen in · Bon Appétit · Cup of Jo</div>
              </div>
            </div>

            {/* Hero panel — minimal framed image */}
            <div className="relative lg:col-span-6">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px]">
                <div className="absolute inset-0 border border-[var(--vv-green)]" />
                <div className="absolute inset-2 overflow-hidden vv-grain bg-white">
                  <img
                    src={heroImg}
                    alt="A heroic kitchen tableau"
                    className="h-full w-full object-cover"
                  />
                  <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t border-[var(--vv-green)]" />
                  <span className="pointer-events-none absolute right-3 top-3 h-5 w-5 border-r border-t border-[var(--vv-green)]" />
                  <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b border-l border-[var(--vv-green)]" />
                  <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r border-[var(--vv-green)]" />
                </div>

                {/* Floating spec card */}
                <div className="absolute -bottom-5 -right-3 max-w-[210px] vv-plate px-4 py-3 sm:-right-6">
                  <div className="flex items-center gap-1.5 text-[var(--vv-green)]">
                    <WWStar className="h-3 w-3" />
                    <span className="font-vault-heroic text-[10px] uppercase tracking-[0.3em]">Decree 01</span>
                  </div>
                  <div className="mt-1 font-vault-heroic text-sm text-[var(--vv-ink)]">Spring '26</div>
                  <div className="mt-0.5 text-[11px] text-[var(--vv-ink-soft)]">12 instruments · live now</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="vv-meander" />
        </div>
      </section>

      {/* ============== VALUE PROPS ============== */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden bg-[var(--vv-green-line)] ring-1 ring-[var(--vv-green-line)] md:grid-cols-4">
          {[
            { icon: Truck, label: "Sovereign shipping", sub: "Free to your keep" },
            { icon: ShieldCheck, label: "2-year decree", sub: "Warranty of Doom" },
            { icon: RotateCcw, label: "60-day return", sub: "By imperial right" },
            { icon: WWStar, label: "12,000+ subjects", sub: "4.9 / 5 sovereign" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-3 bg-white px-5 py-7 sm:px-7">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--vv-green)]" />
              <div>
                <div className="font-vault-heroic text-[12px] uppercase tracking-[0.22em] text-[var(--vv-ink)]">{label}</div>
                <div className="mt-1 text-xs text-[var(--vv-ink-soft)]">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============== FEATURED ============== */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -left-40 top-20 hidden text-[var(--vv-green)] opacity-[0.05] lg:block">
          <ArcaneSigil className="vv-sigil h-[460px] w-[460px]" />
        </div>

        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[var(--vv-green)]">
              <WWStar className="h-3 w-3" />
              <div className="font-vault-heroic text-[11px] uppercase tracking-[0.35em]">I · By Decree of Doom</div>
            </div>
            <h2 className="mt-3 font-vault-heroic text-4xl text-[var(--vv-ink)] sm:text-5xl">
              Instruments of the sovereign.
            </h2>
          </div>
          <Link to="/vault/shop" className="group inline-flex items-center gap-1.5 font-vault-heroic text-[12px] uppercase tracking-[0.28em] text-[var(--vv-green)] hover:text-[var(--vv-green-deep)]">
            View armory <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <VaultProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* ============== EDITORIAL — manifesto ============== */}
      <section className="relative overflow-hidden border-y border-[var(--vv-green-line)] bg-[var(--vv-cream-deep)] py-24 text-[var(--vv-ink)]">
        <div className="pointer-events-none absolute -right-32 top-1/2 hidden -translate-y-1/2 text-[var(--vv-green)] opacity-[0.06] lg:block">
          <ArcaneSigil className="vv-sigil h-[560px] w-[560px]" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <div className="text-[var(--vv-green)]"><WWTiara className="h-9 w-16" /></div>
            <div className="mt-4 font-vault-heroic text-[11px] uppercase tracking-[0.35em] text-[var(--vv-green)]">
              — The Doctrine of Doom
            </div>
            <h2 className="mt-4 font-vault-heroic text-4xl leading-tight sm:text-5xl">
              Where sorcery meets steel.
              <br />
              <em className="font-vault-italic font-normal text-[var(--vv-green)]">Built to outlast empires.</em>
            </h2>
            <p className="mt-6 max-w-lg font-vault-serif text-[18px] italic leading-relaxed text-[var(--vv-ink-soft)]">
              Every instrument leaves the Latverian workshops having survived
              five thousand cycles, the scrutiny of seven master artificers,
              and a rune-binding sealed in the throne room. What you receive
              is not an appliance. It is a relic that happens to make breakfast.
            </p>
            <Link
              to="/vault/about"
              className="group mt-9 inline-flex items-center gap-2 border-b border-[var(--vv-green)] pb-1 font-vault-heroic text-[12px] uppercase tracking-[0.3em] text-[var(--vv-green)] hover:text-[var(--vv-green-deep)]"
            >
              Read the chronicle <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {[
              { n: "XII", l: "Master artificers" },
              { n: "V·yr", l: "Average lifespan" },
              { n: "94%", l: "Loyal subjects" },
              { n: "Ø", l: "Mortal plastic" },
            ].map((s) => (
              <div key={s.l} className="relative vv-plate p-7">
                <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-[var(--vv-green)]" />
                <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-[var(--vv-green)]" />
                <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[var(--vv-green)]" />
                <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[var(--vv-green)]" />
                <div className="font-vault-heroic text-4xl text-[var(--vv-green)]">{s.n}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-[var(--vv-ink-soft)]">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== MORE ============== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-[var(--vv-green)]">
              <WWStar className="h-3 w-3" />
              <div className="font-vault-heroic text-[11px] uppercase tracking-[0.35em]">II · From the Vault</div>
            </div>
            <h2 className="mt-3 font-vault-heroic text-4xl text-[var(--vv-ink)] sm:text-5xl">Whispered bestsellers.</h2>
          </div>
          <div className="hidden text-[var(--vv-green)] md:block">
            <DoomBlasters className="h-9 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {more.map((p, i) => (
            <VaultProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* ============== NEWSLETTER ============== */}
      <section className="relative overflow-hidden border-t border-[var(--vv-green-line)] bg-white">
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 text-[var(--vv-green)] opacity-[0.06] lg:block">
          <ArcaneSigil className="vv-sigil h-full w-full" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="mx-auto flex w-fit text-[var(--vv-green)]">
            <WWTiara className="h-8 w-16" />
          </div>
          <h2 className="mt-5 font-vault-heroic text-4xl text-[var(--vv-ink)] sm:text-5xl">
            Swear fealty.
          </h2>
          <p className="mt-3 font-vault-serif text-[17px] italic text-[var(--vv-ink-soft)]">
            First word on new decrees, conjurings, and quiet bestsellers.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 border border-[var(--vv-green-line)] bg-white px-5 py-3 text-sm text-[var(--vv-ink)] placeholder:text-[var(--vv-ink-soft)] focus:border-[var(--vv-green)] focus:outline-none"
            />
            <button className="bg-[var(--vv-green)] px-7 py-3 font-vault-heroic text-[12px] uppercase tracking-[0.28em] text-white hover:bg-[var(--vv-green-deep)]">
              Pledge
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
