import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getVaultProduct, vaultProducts } from "@/lib/vault-products";
import { useVaultCart } from "@/lib/vault-cart";
import { VaultProductCard } from "@/components/vault/VaultProductCard";
import { Star, Minus, Plus, Truck, ShieldCheck, RotateCcw, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/vault/products/$slug")({
  loader: ({ params }) => {
    const product = getVaultProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Product — Viral Vault" }] };
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Viral Vault` },
        { name: "description", content: product.tagline },
        { property: "og:title", content: product.name },
        { property: "og:description", content: product.tagline },
        { property: "og:type", content: "product" },
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

  const related = vaultProducts.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 4);

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1 text-xs text-neutral-500">
          <Link to="/vault" className="hover:text-neutral-900">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/vault/shop" className="hover:text-neutral-900">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-neutral-900">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden rounded-3xl bg-neutral-100">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/5] h-full w-full object-cover sm:aspect-[5/4]"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`overflow-hidden rounded-xl bg-neutral-100 ${i === 0 ? "ring-1 ring-neutral-900" : ""}`}>
                <img src={product.image} alt="" className="aspect-square w-full object-cover opacity-90" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-5">
          <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">{product.category}</div>
          <h1 className="mt-2 font-vault-display text-4xl leading-tight text-neutral-900 sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-[15px] text-neutral-600">{product.tagline}</p>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-neutral-900 text-neutral-900" />
              ))}
            </div>
            <span className="text-xs text-neutral-500">{product.rating} · {product.reviews.toLocaleString()} reviews</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <div className="font-vault-display text-3xl text-neutral-900">${product.price}</div>
            {product.compareAt && (
              <div className="text-base text-neutral-400 line-through">${product.compareAt}</div>
            )}
            {product.compareAt && (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                Save ${product.compareAt - product.price}
              </span>
            )}
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-neutral-700">{product.description}</p>

          {/* Qty + CTA */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="inline-flex items-center rounded-full border border-neutral-300 bg-white">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-11 w-11 place-items-center text-neutral-700 hover:text-neutral-900"
                aria-label="Decrease"
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="min-w-8 text-center text-sm font-medium tabular-nums">{qty}</div>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="grid h-11 w-11 place-items-center text-neutral-700 hover:text-neutral-900"
                aria-label="Increase"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => {
                add(product.slug, qty);
                toast.success(`${product.name} added to bag`, { description: `Qty ${qty}` });
              }}
              className="flex-1 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Add to bag · ${product.price * qty}
            </button>
          </div>
          <Link
            to="/vault/checkout"
            className="mt-3 block w-full rounded-full border border-neutral-900 bg-white py-3 text-center text-sm font-medium text-neutral-900 hover:bg-neutral-50"
          >
            Buy it now
          </Link>

          {/* Service strip */}
          <div className="mt-8 grid grid-cols-3 gap-3 border-t border-neutral-200 pt-6 text-[11px] text-neutral-600">
            <div className="flex flex-col items-center text-center gap-1.5">
              <Truck className="h-4 w-4 text-neutral-900" /> Free shipping over $75
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-neutral-900" /> 2-year warranty
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <RotateCcw className="h-4 w-4 text-neutral-900" /> 60-day returns
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-10 border-t border-neutral-200">
            <div className="flex gap-6 border-b border-neutral-200">
              {([
                ["features", "Features"],
                ["specs", "Specs"],
                ["shipping", "Shipping"],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={[
                    "border-b-2 py-3 text-sm",
                    tab === key ? "border-neutral-900 text-neutral-900" : "border-transparent text-neutral-500 hover:text-neutral-900",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="py-6 text-sm text-neutral-700">
              {tab === "features" && (
                <ul className="space-y-2">
                  {product.features.map((f: string) => (
                    <li key={f} className="flex gap-2.5">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-neutral-900" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}
              {tab === "specs" && (
                <dl className="divide-y divide-neutral-200">
                  {product.specs.map((s: { label: string; value: string }) => (
                    <div key={s.label} className="grid grid-cols-2 py-2.5">
                      <dt className="text-neutral-500">{s.label}</dt>
                      <dd className="text-neutral-900">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {tab === "shipping" && (
                <div className="space-y-3 leading-relaxed">
                  <p>Free standard shipping on orders over $75. Express available at checkout.</p>
                  <p>Most orders ship within 24 hours from our New Jersey warehouse.</p>
                  <p>60-day returns, no restocking fees — even if you've used it.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-vault-display text-2xl text-neutral-900 sm:text-3xl">Pairs well with</h2>
            <Link to="/vault/shop" className="text-sm text-neutral-600 hover:text-neutral-900">View all →</Link>
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
