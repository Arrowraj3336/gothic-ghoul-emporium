import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getVaultProduct, vaultProducts } from "@/lib/vault-products";
import { useXmenCart } from "@/lib/vault-cart";
import { useState } from "react";
import {
  Minus, Plus, ShoppingBag, Star, Truck, RotateCcw, Shield, ChevronLeft, Heart, Share2,
} from "lucide-react";
import { XmenProductCard } from "@/components/XmenProductCard";
import { toast } from "sonner";
import { XLogo } from "@/components/XmenIcons";

const SITE_URL = "https://gothic-ghoul-emporium.lovable.app";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getVaultProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [] };
    const { product } = loaderData;
    const url = `${SITE_URL}/products/${params.slug}`;
    const image = `${SITE_URL}${product.image}`;
    const title = `${product.name} — Viral Vault`;
    const description = product.tagline;
    const ld = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      image: [image],
      description: product.description,
      sku: product.slug,
      brand: { "@type": "Brand", name: "Viral Vault" },
      category: product.category,
      aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews },
      offers: {
        "@type": "Offer",
        url,
        priceCurrency: "USD",
        price: product.price.toFixed(2),
        availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    };
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(ld) }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="font-xmen-display text-3xl">MUTANT NOT FOUND IN THE VAULT.</h1>
      <Link to="/shop" className="mt-6 inline-block border-b-2 border-xmen-red pb-1 font-xmen-display text-xs uppercase tracking-[0.3em] text-xmen-red">
        Back to Armory
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useXmenCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "specs" | "shipping">("description");
  const related = vaultProducts.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex flex-wrap items-center gap-1 font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft sm:text-[11px]">
        <Link to="/" className="hover:text-xmen-red">Institute</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-xmen-red">Armory</Link>
        <span>/</span>
        <span className="text-xmen-ink">{product.category}</span>
        <span>/</span>
        <span className="text-xmen-red">{product.name}</span>
      </nav>

      <Link to="/shop" className="mt-4 inline-flex items-center gap-1 font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft hover:text-xmen-red">
        <ChevronLeft className="h-3 w-3" /> Back to Armory
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        {/* Gallery */}
        <div className="animate-fade-in">
          <div className="relative aspect-[4/5] overflow-hidden border-2 border-xmen-ink xm-frame xm-frame-red">
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-20 w-20 xm-halftone-yellow opacity-70" />
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" width={1000} height={1250} />
            <div className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 border-2 border-xmen-ink bg-xmen-yellow px-3 py-1.5 font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink">
              <span className="h-1 w-1 rounded-full bg-xmen-red animate-pulse" />
              {product.category}
            </div>
            <div className="absolute right-3 top-3 z-10 flex gap-2">
              <button className="grid h-9 w-9 place-items-center border-2 border-xmen-ink bg-white text-xmen-ink transition hover:bg-xmen-yellow">
                <Heart className="h-3.5 w-3.5" />
              </button>
              <button className="grid h-9 w-9 place-items-center border-2 border-xmen-ink bg-white text-xmen-ink transition hover:bg-xmen-yellow">
                <Share2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button key={i} className={`relative aspect-square overflow-hidden border-2 ${i === 0 ? "border-xmen-red" : "border-xmen-ink opacity-60 hover:opacity-100"} bg-white transition`}>
                <img src={product.image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="inline-flex items-center gap-2 font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red sm:text-[11px]">
            <XLogo className="h-3.5 w-3.5" /> {product.category} · X-CLASS
          </div>
          <h1 className="mt-2 font-xmen-display text-4xl leading-tight sm:text-6xl">{product.name}</h1>
          <p className="mt-3 text-sm sm:text-base text-xmen-ink-soft">{product.tagline}</p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-xmen-red text-xmen-red" : "text-xmen-line"}`} />
              ))}
            </div>
            <span className="font-xmen-mono text-[11px] text-xmen-ink-soft">{product.rating} · {product.reviews} reviews</span>
            <span className="font-xmen-mono text-[11px] text-xmen-red">
              {product.stock > 10 ? "● In Vault" : `● Only ${product.stock} left`}
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3 border-y-2 border-xmen-ink py-5 sm:mt-8 sm:py-6">
            <span className="font-xmen-display text-4xl sm:text-5xl text-xmen-red">${product.price}</span>
            {product.compareAt && (
              <>
                <span className="font-xmen-mono text-[11px] uppercase tracking-widest text-xmen-ink-soft line-through">
                  ${product.compareAt}
                </span>
                <span className="ml-auto border-2 border-xmen-ink bg-xmen-yellow px-2 py-1 font-xmen-display text-[10px] uppercase tracking-widest text-xmen-ink">
                  X-SAVE ${product.compareAt - product.price}
                </span>
              </>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center border-2 border-xmen-ink self-start">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center hover:bg-xmen-yellow">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <div className="grid h-12 w-12 place-items-center border-x-2 border-xmen-ink font-xmen-mono text-sm">{qty}</div>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-12 w-12 place-items-center hover:bg-xmen-yellow">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              onClick={() => {
                add(product.slug, qty);
                toast.success(`${product.name} × ${qty} acquired`, { description: "Locked in the X-Vault." });
              }}
              className="flex flex-1 items-center justify-center gap-2 border-2 border-xmen-ink bg-xmen-red px-6 py-3.5 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white transition hover:bg-xmen-yellow hover:text-xmen-ink"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Recruit Now
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 border-2 border-xmen-ink bg-white p-3 text-center sm:gap-3 sm:p-4">
            {[
              { Icon: Truck, label: "Free $150+" },
              { Icon: RotateCcw, label: "30-day returns" },
              { Icon: Shield, label: "5-yr warranty" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-[9px] sm:text-[10px] font-xmen-mono uppercase tracking-widest text-xmen-ink-soft">
                <Icon className="h-4 w-4 text-xmen-red" />
                {label}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <div className="flex flex-wrap gap-1 border-b-2 border-xmen-ink">
              {([
                ["description", "Description"],
                ["specs", "Specifications"],
                ["shipping", "Blackbird"],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`relative px-4 py-3 font-xmen-display text-[11px] uppercase tracking-[0.3em] transition ${tab === key ? "text-xmen-red" : "text-xmen-ink-soft hover:text-xmen-ink"}`}
                >
                  {label}
                  {tab === key && <span className="absolute -bottom-[2px] left-0 right-0 h-[3px] bg-xmen-red" />}
                </button>
              ))}
            </div>
            <div className="pt-5 text-sm leading-relaxed text-xmen-ink">
              {tab === "description" && <p>{product.description}</p>}
              {tab === "specs" && (
                <ul className="divide-y-2 divide-xmen-ink border-y-2 border-xmen-ink">
                  {product.specs.map((s: { label: string; value: string }) => (
                    <li key={s.label} className="flex items-center justify-between py-3 text-sm">
                      <span className="font-xmen-mono text-[11px] uppercase tracking-widest text-xmen-ink-soft">{s.label}</span>
                      <span className="font-xmen-display">{s.value}</span>
                    </li>
                  ))}
                </ul>
              )}
              {tab === "shipping" && (
                <div className="space-y-3 text-sm text-xmen-ink-soft">
                  <p>Free Blackbird shipping on orders over $150. Express deployment at checkout.</p>
                  <p>30-day returns for unused gear in original packaging.</p>
                  <p>Dispatched within 48h from the Westchester Institute.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mt-20 sm:mt-28">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-xmen-display text-3xl sm:text-4xl">FROM THE SAME SQUAD</h2>
          <Link to="/shop" className="font-xmen-display text-xs uppercase tracking-[0.3em] text-xmen-ink-soft hover:text-xmen-red">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-3 lg:grid-cols-4">
          {related.map((p, i) => <XmenProductCard product={p} key={p.slug} index={i} />)}
        </div>
      </section>
    </div>
  );
}
