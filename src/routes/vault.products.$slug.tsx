import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getVaultProduct, vaultProducts } from "@/lib/vault-products";
import { useVaultCart } from "@/lib/vault-cart";
import { VaultProductCard } from "@/components/vault/VaultProductCard";
import { Star, Minus, Plus, Truck, ShieldCheck, RotateCcw, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { ArcaneSigil, DoomBlasters } from "@/components/vault/VaultIcons";

export const Route = createFileRoute("/vault/products/$slug")({
  loader: ({ params }) => {
    const product = getVaultProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Relic — Viral Vault" }] };
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Viral Vault` },
        { name: "description", content: product.tagline },
        { property: "og:title", content: product.name },
        { property: "og:description", content: product.tagline },
        { property: "og:type", content: "product" },
        { property: "og:image", content: product.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: product.image },
      ],
    };
  },
  component: VaultProductPage,
});

function VaultProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useVaultCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"features" | "specs" | "shipping">("features");
  const [activeThumb, setActiveThumb] = useState(0);

  const related = vaultProducts
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="relative">
      {/* Ambient sigil */}
      <div className="pointer-events-none absolute -right-40 top-20 hidden text-[var(--vv-green)] opacity-[0.05] lg:block">
        <ArcaneSigil className="vv-sigil h-[520px] w-[520px]" />
      </div>

      {/* Breadcrumbs */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 text-[11px] uppercase tracking-[0.22em] text-[var(--vv-ink-soft)]">
          <Link to="/vault" className="hover:text-[var(--vv-green)]">Court</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/vault/shop" className="hover:text-[var(--vv-green)]">Armory</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[var(--vv-green)]">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden border border-[var(--vv-green-line)] bg-white vv-grain">
            <img
              key={activeThumb}
              src={product.image}
              alt={product.name}
              className="aspect-[4/5] h-full w-full object-cover animate-fade-in sm:aspect-[5/4]"
            />
            <span className="pointer-events-none absolute left-3 top-3 z-10 h-6 w-6 border-l border-t border-[var(--vv-green)]" />
            <span className="pointer-events-none absolute right-3 top-3 z-10 h-6 w-6 border-r border-t border-[var(--vv-green)]" />
            <span className="pointer-events-none absolute bottom-3 left-3 z-10 h-6 w-6 border-b border-l border-[var(--vv-green)]" />
            <span className="pointer-events-none absolute bottom-3 right-3 z-10 h-6 w-6 border-b border-r border-[var(--vv-green)]" />

            {product.badge && (
              <div className="absolute left-4 top-4 z-20 bg-[var(--vv-green)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
                {product.badge}
              </div>
            )}
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                aria-label={`View ${i + 1}`}
                className={[
                  "relative overflow-hidden bg-white transition",
                  activeThumb === i
                    ? "ring-2 ring-[var(--vv-green)]"
                    : "ring-1 ring-[var(--vv-green-line)] hover:ring-[var(--vv-green)]",
                ].join(" ")}
              >
                <img src={product.image} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[var(--vv-green)]">
            <span className="inline-block h-px w-6 bg-[var(--vv-green)]" />
            {product.category} · Sealed by Doom
          </div>
          <h1 className="mt-2 font-vault-display text-4xl leading-tight text-[var(--vv-ink)] sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 font-vault-serif text-[16px] italic text-[var(--vv-ink-soft)]">{product.tagline}</p>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center gap-0.5 text-[var(--vv-green)]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--vv-ink-soft)]">
              {product.rating} · {product.reviews.toLocaleString()} subjects
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <div className="font-vault-display text-3xl text-[var(--vv-green)]">${product.price}</div>
            {product.compareAt && (
              <>
                <div className="text-base text-[var(--vv-ink-soft)] line-through">${product.compareAt}</div>
                <span className="border border-[var(--vv-green)] bg-[var(--vv-green-soft)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--vv-green)]">
                  Save ${product.compareAt - product.price}
                </span>
              </>
            )}
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-[var(--vv-ink)]">{product.description}</p>

          {/* Qty + CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="inline-flex items-center border border-[var(--vv-green-line)] bg-white">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-12 w-12 place-items-center text-[var(--vv-ink-soft)] hover:bg-[var(--vv-green-soft)] hover:text-[var(--vv-green)]"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="min-w-10 text-center text-sm font-medium tabular-nums">{qty}</div>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-12 w-12 place-items-center text-[var(--vv-ink-soft)] hover:bg-[var(--vv-green-soft)] hover:text-[var(--vv-green)]"
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => {
                add(product.slug, qty);
                toast.success(`${product.name} sealed in the reliquary`, { description: `× ${qty}` });
              }}
              className="flex-1 bg-[var(--vv-green)] px-6 py-3 font-vault-heroic text-[12px] uppercase tracking-[0.28em] text-white transition hover:bg-[var(--vv-green-deep)]"
            >
              Claim · ${product.price * qty}
            </button>
          </div>
          <Link
            to="/vault/checkout"
            className="mt-3 block w-full border border-[var(--vv-green)] bg-white py-3 text-center font-vault-heroic text-[12px] uppercase tracking-[0.28em] text-[var(--vv-green)] hover:bg-[var(--vv-green)] hover:text-white"
          >
            Submit tribute now
          </Link>

          {/* Service strip */}
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-[var(--vv-green-line)] pt-6 text-[10px] uppercase tracking-[0.22em] text-[var(--vv-ink-soft)]">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <Truck className="h-4 w-4 text-[var(--vv-green)]" /> Free over $75
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <ShieldCheck className="h-4 w-4 text-[var(--vv-green)]" /> 2-year decree
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <RotateCcw className="h-4 w-4 text-[var(--vv-green)]" /> 60-day return
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-10 border-t border-[var(--vv-green-line)]">
            <div className="flex gap-6 border-b border-[var(--vv-green-line)]">
              {(
                [
                  ["features", "Conjurings"],
                  ["specs", "Codex"],
                  ["shipping", "Dispatch"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={[
                    "border-b-2 py-3 font-vault-heroic text-[11px] uppercase tracking-[0.25em] transition",
                    tab === key
                      ? "border-[var(--vv-green)] text-[var(--vv-green)]"
                      : "border-transparent text-[var(--vv-ink-soft)] hover:text-[var(--vv-green)]",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="py-6 text-sm text-[var(--vv-ink)]">
              {tab === "features" && (
                <ul className="space-y-2">
                  {product.features.map((f: string) => (
                    <li key={f} className="flex gap-2.5">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--vv-green)]" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              {tab === "specs" && (
                <dl className="divide-y divide-[var(--vv-green-line)]">
                  {product.specs.map((s: { label: string; value: string }) => (
                    <div key={s.label} className="grid grid-cols-2 py-2.5">
                      <dt className="text-[var(--vv-ink-soft)]">{s.label}</dt>
                      <dd className="text-[var(--vv-ink)]">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {tab === "shipping" && (
                <div className="space-y-3 leading-relaxed">
                  <p>Free imperial dispatch on tributes over $75. Express courier at checkout.</p>
                  <p>Most relics ride within 24 hours from the Latverian keep.</p>
                  <p>60-day return, no questions. Even if Doom has held it.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-3">
            <div className="flex items-center gap-3 text-[var(--vv-green)]">
              <DoomBlasters className="h-7 w-16" />
              <h2 className="font-vault-display text-2xl text-[var(--vv-ink)] sm:text-3xl">From the same guild</h2>
            </div>
            <Link
              to="/vault/shop"
              className="text-[11px] uppercase tracking-[0.22em] text-[var(--vv-ink-soft)] hover:text-[var(--vv-green)]"
            >
              View armory →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p, i) => (
              <VaultProductCard product={p} key={p.slug} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
