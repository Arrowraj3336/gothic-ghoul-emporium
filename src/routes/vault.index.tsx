import { createFileRoute, Link } from "@tanstack/react-router";
import { vaultProducts } from "@/lib/vault-products";
import { VaultProductCard } from "@/components/vault/VaultProductCard";
import { ArrowRight, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import heroImg from "@/assets/vault-hero.jpg";
import { WWStar, WWTiara, WWLasso, WWWing } from "@/components/vault/VaultIcons";

export const Route = createFileRoute("/vault/")({
  head: () => ({
    meta: [
      { title: "Viral Vault — Magic & Science from the House of Doom" },
      { name: "description", content: "Latverian-engineered kitchen instruments. Sorcery and steel — forged in the workshops of Doom." },
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
                <span className="font-vault-heroic text-[11px] uppercase tracking-[0.4em] text-[var(--vv-gold-light)]">
                  Forged in Latveria · MMXXVI
                </span>
                <span className="h-px w-10 bg-[var(--vv-gold)]" />
              </div>

              <h1 className="mt-6 text-center font-vault-heroic text-[44px] leading-[1.05] tracking-tight text-[var(--vv-ink)] sm:text-6xl lg:text-left lg:text-7xl">
                Magic. Science.
                <br />
                <span className="text-[var(--vv-gold-light)]">One</span>{" "}
                <em className="font-vault-italic font-normal text-[var(--vv-ink-soft)]">sovereign craft.</em>
              </h1>

              <p className="mx-auto mt-7 max-w-md text-center font-vault-serif text-[18px] italic leading-relaxed text-[var(--vv-ink-soft)] lg:mx-0 lg:text-left">
                Kitchen instruments cast in gunmetal and arcane brass — engineered
                in Latveria, where alchemy and engineering are the same discipline.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  to="/vault/shop"
                  className="group inline-flex items-center gap-2 bg-[var(--vv-crimson)] px-7 py-3.5 font-vault-heroic text-[12px] uppercase tracking-[0.25em] text-white shadow-[0_10px_30px_-10px_rgba(31,107,74,0.7),0_0_0_1px_rgba(124,77,219,0.25)] ring-1 ring-[var(--vv-gold)] transition hover:bg-[var(--vv-crimson-deep)]"
                >
                  Enter the Arsenal
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/vault/about"
                  className="inline-flex items-center gap-2 border-2 border-[var(--vv-gold)] bg-transparent px-7 py-3 font-vault-heroic text-[12px] uppercase tracking-[0.25em] text-[var(--vv-gold-light)] hover:bg-[var(--vv-gold)] hover:text-[var(--vv-cream-deep)]"
                >
                  The Doctrine
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-[var(--vv-ink-soft)] lg:justify-start">
                <div className="flex items-center gap-2">
                  <WWStar className="h-3 w-3 text-[var(--vv-gold)]" />
                  4.9 · 12,000 loyal subjects
                </div>
                <div className="hidden h-3 w-px bg-[var(--vv-gold-soft)] sm:block" />
                <div>As seen in · Bon Appétit · Cup of Jo</div>
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
                <div className="absolute -bottom-5 -right-3 max-w-[200px] vv-plate px-4 py-3 sm:-right-6">
                  <div className="flex items-center gap-1.5 text-[var(--vv-gold)]">
                    <WWStar className="h-3 w-3" />
                    <span className="font-vault-heroic text-[10px] uppercase tracking-[0.3em] text-[var(--vv-gold-light)]">Decree 01</span>
                  </div>
                  <div className="mt-1 font-vault-heroic text-sm text-[var(--vv-ink)]">Spring '26</div>
                  <div className="mt-0.5 text-[11px] text-[var(--vv-ink-soft)]">12 instruments · live now</div>
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
            { icon: Truck, label: "Sovereign shipping", sub: "Free to your keep" },
            { icon: ShieldCheck, label: "2-year decree", sub: "Warranty of Doom" },
            { icon: RotateCcw, label: "60-day return", sub: "By imperial right" },
            { icon: WWStar, label: "12,000+ subjects", sub: "4.9 / 5 sovereign" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-3 bg-[var(--vv-cream-soft)] px-5 py-7 sm:px-7">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[var(--vv-gold-light)]" />
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
            <div className="flex items-center gap-2 text-[var(--vv-gold-light)]">
              <WWStar className="h-3 w-3 text-[var(--vv-gold)]" />
              <div className="font-vault-heroic text-[11px] uppercase tracking-[0.35em]">I · By Decree of Doom</div>
            </div>
            <h2 className="mt-3 font-vault-heroic text-4xl text-[var(--vv-ink)] sm:text-5xl">
              Instruments of the sovereign.
            </h2>
          </div>
          <Link to="/vault/shop" className="group inline-flex items-center gap-1.5 font-vault-heroic text-[12px] uppercase tracking-[0.25em] text-[var(--vv-gold-light)] hover:text-[var(--vv-gold)]">
            View arsenal <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <VaultProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* ============== EDITORIAL — heroic manifesto ============== */}
      <section className="relative overflow-hidden bg-[var(--vv-cream-deep)] py-24 text-[var(--vv-ink)]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, var(--vv-gold) 1px, transparent 1px), radial-gradient(circle at 70% 60%, var(--vv-blue) 1px, transparent 1px)",
          backgroundSize: "40px 40px, 60px 60px",
        }} />
        {/* Subtle ambient sigil */}
        <div className="pointer-events-none absolute -right-32 top-1/2 hidden -translate-y-1/2 text-[var(--vv-gold)] opacity-[0.06] lg:block">
          <WWLasso className="h-[560px] w-[560px]" />
        </div>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <div className="text-[var(--vv-gold)]"><WWTiara className="h-9 w-16" /></div>
            <div className="mt-4 font-vault-heroic text-[11px] uppercase tracking-[0.35em] text-[var(--vv-gold)]">
              — The Doctrine of Doom
            </div>
            <h2 className="mt-4 font-vault-heroic text-4xl leading-tight sm:text-5xl">
              Where sorcery meets steel.
              <br />
              <em className="font-vault-italic font-normal text-[var(--vv-gold-light)]">Built to outlast empires.</em>
            </h2>
            <p className="mt-6 max-w-lg font-vault-serif text-[18px] italic leading-relaxed text-[var(--vv-ink-soft)]">
              Every instrument leaves the Latverian workshops having survived five
              thousand cycles, the scrutiny of seven master artificers, and a final
              rune-binding sealed in the throne room itself. What you receive is
              not an appliance. It is a relic that happens to make breakfast.
            </p>
            <Link to="/vault/about" className="group mt-9 inline-flex items-center gap-2 border-b-2 border-[var(--vv-gold)] pb-1 font-vault-heroic text-[12px] uppercase tracking-[0.3em] text-[var(--vv-gold)] hover:text-[var(--vv-gold-light)]">
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
                <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-[var(--vv-gold)]" />
                <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-[var(--vv-gold)]" />
                <span className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-[var(--vv-gold)]" />
                <span className="absolute bottom-2 right-2 h-3 w-3 border-b border-r border-[var(--vv-gold)]" />
                <div className="font-vault-heroic text-4xl text-[var(--vv-gold-light)]">{s.n}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-[var(--vv-ink-soft)]">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== MORE ============== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-[var(--vv-gold-light)]">
            <WWStar className="h-3 w-3 text-[var(--vv-gold)]" />
            <div className="font-vault-heroic text-[11px] uppercase tracking-[0.35em]">II · From the Vault</div>
          </div>
          <h2 className="mt-3 font-vault-heroic text-4xl text-[var(--vv-ink)] sm:text-5xl">Whispered bestsellers.</h2>
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
              className="flex-1 border-2 border-[var(--vv-gold-soft)] bg-[#0e1a14] px-5 py-3 text-sm text-[var(--vv-ink)] placeholder:text-[var(--vv-ink-soft)] focus:border-[var(--vv-gold)] focus:outline-none"
            />
            <button className="bg-[var(--vv-crimson)] px-7 py-3 font-vault-heroic text-[12px] uppercase tracking-[0.25em] text-white ring-1 ring-[var(--vv-gold)] hover:bg-[var(--vv-crimson-deep)]">
              Pledge
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
