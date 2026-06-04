import { createFileRoute, Link } from "@tanstack/react-router";
import { vaultProducts } from "@/lib/vault-products";
import { VaultProductCard } from "@/components/vault/VaultProductCard";
import { ArrowRight, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import heroImg from "@/assets/vault-hero.jpg";

export const Route = createFileRoute("/vault/")({
  head: () => ({
    meta: [
      { title: "Viral Vault — Quietly viral kitchen appliances" },
      { name: "description", content: "Premium small kitchen appliances designed for modern homes. Coffee, cooking, prep and breakfast." },
      { property: "og:title", content: "Viral Vault" },
      { property: "og:description", content: "Quietly viral kitchen appliances for modern homes." },
    ],
  }),
  component: VaultHome,
});

function VaultHome() {
  const featured = vaultProducts.slice(0, 4);
  const more = vaultProducts.slice(4, 8);

  return (
    <div>
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:py-10 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] tracking-wide text-neutral-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              New for Spring · Free shipping over $75
            </div>
            <h1 className="mt-5 font-vault-display text-5xl leading-[1.02] tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
              The kitchen, <em className="font-vault-italic font-normal text-neutral-500">quietly</em> reinvented.
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-neutral-600">
              Small appliances built for the way modern homes actually cook. Considered, durable
              and beautiful enough to leave on the counter.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/vault/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
              >
                Shop the vault
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/vault/about"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-medium text-neutral-900 hover:border-neutral-900"
              >
                Our story
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-neutral-500">
              <div className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-neutral-900 text-neutral-900" />
                4.8 / 12,000+ reviews
              </div>
              <div>Featured in Bon Appétit, Cup of Jo</div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl bg-neutral-100">
              <img
                src={heroImg}
                alt="Curated minimalist kitchen with small appliances"
                width={1920}
                height={1280}
                className="aspect-[5/4] h-full w-full object-cover sm:aspect-[16/11]"
              />
              <div className="absolute bottom-4 right-4 rounded-2xl bg-white/95 px-4 py-3 text-xs shadow-lg backdrop-blur sm:bottom-6 sm:right-6">
                <div className="font-vault-display text-sm text-neutral-900">Spring '26 Drop</div>
                <div className="mt-0.5 text-neutral-500">12 new pieces · live now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-neutral-200 md:grid-cols-4">
          {[
            { icon: Truck, label: "Free shipping", sub: "On orders over $75" },
            { icon: ShieldCheck, label: "2-year warranty", sub: "On every appliance" },
            { icon: RotateCcw, label: "60-day returns", sub: "No questions asked" },
            { icon: Star, label: "12,000+ reviews", sub: "4.8 average rating" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-3 bg-white px-5 py-6 sm:px-7 sm:py-8">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-neutral-900" />
              <div>
                <div className="text-sm font-medium text-neutral-900">{label}</div>
                <div className="mt-0.5 text-xs text-neutral-500">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">01 — This week</div>
            <h2 className="mt-2 font-vault-display text-3xl text-neutral-900 sm:text-4xl">Going viral right now</h2>
          </div>
          <Link to="/vault/shop" className="group inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900">
            View all <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p, i) => (
            <VaultProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="bg-neutral-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">— Our promise</div>
            <h2 className="mt-3 font-vault-display text-4xl leading-tight text-neutral-900 sm:text-5xl">
              Engineered to last. <em className="font-vault-italic font-normal text-neutral-500">Designed to leave out.</em>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-neutral-600">
              We work with the same Italian and Japanese factories trusted by professional kitchens —
              then strip away every excess button, branding flourish and plastic seam. What's left
              is an appliance you'll want on your counter for the next ten years.
            </p>
            <Link to="/vault/about" className="mt-8 inline-flex items-center gap-1.5 border-b border-neutral-900 pb-1 text-sm text-neutral-900">
              Read our story <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: "12", l: "Industrial designers on staff" },
              { n: "5yr", l: "Average product lifespan" },
              { n: "94%", l: "Customers who recommend us" },
              { n: "0", l: "Single-use plastic in packaging" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="font-vault-display text-3xl text-neutral-900">{s.n}</div>
                <div className="mt-2 text-xs text-neutral-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MORE */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">02 — More from the vault</div>
          <h2 className="mt-2 font-vault-display text-3xl text-neutral-900 sm:text-4xl">Quiet bestsellers</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {more.map((p, i) => (
            <VaultProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="font-vault-display text-3xl text-neutral-900 sm:text-4xl">First in line for new drops.</h2>
          <p className="mt-3 text-sm text-neutral-600">No spam — just early access and the occasional recipe.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
            />
            <button className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
