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
import { getCharacter } from "@/lib/xmen-characters";

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
    const ch = getCharacter(product.slug);
    const url = `${SITE_URL}/products/${params.slug}`;
    const image = `${SITE_URL}${product.image}`;
    const title = `${product.name} — Viral Vault · ${ch.codename}`;
    const description = `${product.tagline} Headlined by ${ch.codename}.`;
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
      <h1 className="font-xmen-display text-3xl">Mutant not found in the Vault.</h1>
      <Link to="/shop" className="mt-6 inline-block border-b border-xmen-red pb-1 font-xmen-display text-xs uppercase tracking-[0.3em] text-xmen-red">
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
  const ch = getCharacter(product.slug);
  const related = vaultProducts.filter((p) => p.slug !== product.slug).slice(0, 4);

  // Inline per-character CSS variables drive accent colors throughout the page.
  const themeStyle: React.CSSProperties = {
    // @ts-expect-error CSS custom properties
    "--ch": ch.color,
    "--ch-soft": ch.colorSoft,
    "--ch-ring": ch.ring,
  };

  return (
    <div style={themeStyle}>
      {/* Character ribbon ============================================= */}
      <div className="relative overflow-hidden border-b border-xmen-line" style={{ background: ch.colorSoft }}>
        <div className="pointer-events-none absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${ch.color}33 1px, transparent 0)`,
          backgroundSize: "22px 22px",
        }} />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 font-xmen-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: ch.color }}>
            <span className="grid h-6 w-6 place-items-center rounded-full" style={{ background: ch.color, color: "#fff" }}>
              <XLogo className="h-3 w-3" />
            </span>
            Headlined by {ch.codename} · {ch.name}
          </div>
          <span className="hidden sm:inline font-xmen-serif italic text-sm" style={{ color: ch.color }}>
            "{ch.quote}"
          </span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1 font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft sm:text-[11px]">
          <Link to="/" className="hover:text-xmen-red">Institute</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-xmen-red">Armory</Link>
          <span>/</span>
          <span className="text-xmen-ink">{product.category}</span>
          <span>/</span>
          <span style={{ color: ch.color }}>{product.name}</span>
        </nav>

        <Link to="/shop" className="mt-4 inline-flex items-center gap-1 font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft hover:text-xmen-red">
          <ChevronLeft className="h-3 w-3" /> Back to Armory
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          {/* Gallery */}
          <div className="animate-fade-in">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-sm border bg-white"
              style={{
                borderColor: ch.ring,
                boxShadow: `0 1px 0 ${ch.ring}, 0 18px 40px -16px ${ch.ring}, 0 40px 80px -50px ${ch.ring}`,
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
                width={1000}
                height={1250}
              />
              {/* corner brackets */}
              <span className="pointer-events-none absolute left-3 top-3 z-10 h-4 w-4 border-l-2 border-t-2" style={{ borderColor: ch.color }} />
              <span className="pointer-events-none absolute right-3 top-3 z-10 h-4 w-4 border-r-2 border-t-2" style={{ borderColor: ch.color }} />
              <span className="pointer-events-none absolute left-3 bottom-3 z-10 h-4 w-4 border-l-2 border-b-2" style={{ borderColor: ch.color }} />
              <span className="pointer-events-none absolute right-3 bottom-3 z-10 h-4 w-4 border-r-2 border-b-2" style={{ borderColor: ch.color }} />

              <div
                className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-xmen-mono text-[10px] uppercase tracking-widest backdrop-blur"
                style={{ background: "rgba(255,255,255,0.85)", color: ch.color, border: `1px solid ${ch.ring}` }}
              >
                <span className="h-1 w-1 rounded-full animate-pulse" style={{ background: ch.color }} />
                {product.category}
              </div>
              <div className="absolute right-3 top-3 z-10 flex gap-2">
                <button className="grid h-9 w-9 place-items-center rounded-full border border-xmen-line bg-white/85 text-xmen-ink transition hover:text-xmen-red backdrop-blur">
                  <Heart className="h-3.5 w-3.5" />
                </button>
                <button className="grid h-9 w-9 place-items-center rounded-full border border-xmen-line bg-white/85 text-xmen-ink transition hover:text-xmen-red backdrop-blur">
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  className={`relative aspect-square overflow-hidden rounded-sm border transition ${i === 0 ? "" : "opacity-50 hover:opacity-100"}`}
                  style={{ borderColor: i === 0 ? ch.color : "rgba(11,13,16,0.10)" }}
                >
                  <img src={product.image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="inline-flex items-center gap-2 font-xmen-mono text-[10px] uppercase tracking-[0.3em] sm:text-[11px]" style={{ color: ch.color }}>
              <XLogo className="h-3.5 w-3.5" /> {product.category} · X-CLASS
            </div>
            <h1 className="mt-3 font-xmen-display text-4xl leading-[1.05] tracking-[-0.02em] sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-xmen-ink-soft">{product.tagline}</p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5"
                    style={{
                      color: ch.color,
                      fill: i < Math.round(product.rating) ? ch.color : "transparent",
                    }}
                  />
                ))}
              </div>
              <span className="font-xmen-mono text-[11px] text-xmen-ink-soft">
                {product.rating} · {product.reviews} reviews
              </span>
              <span className="font-xmen-mono text-[11px]" style={{ color: ch.color }}>
                {product.stock > 10 ? "● In Vault" : `● Only ${product.stock} left`}
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3 border-y border-xmen-line py-5 sm:mt-8 sm:py-6">
              <span className="font-xmen-display text-4xl sm:text-5xl" style={{ color: ch.color }}>
                ${product.price}
              </span>
              {product.compareAt && (
                <>
                  <span className="font-xmen-mono text-[11px] uppercase tracking-widest text-xmen-ink-soft line-through">
                    ${product.compareAt}
                  </span>
                  <span
                    className="ml-auto rounded-full px-3 py-1 font-xmen-mono text-[10px] uppercase tracking-widest text-white"
                    style={{ background: ch.color }}
                  >
                    X-Save ${product.compareAt - product.price}
                  </span>
                </>
              )}
            </div>

            {/* Character bio card */}
            <div
              className="mt-6 rounded-sm border bg-white p-4 sm:p-5"
              style={{ borderColor: ch.ring, boxShadow: `0 12px 28px -20px ${ch.ring}` }}
            >
              <div className="font-xmen-mono text-[10px] uppercase tracking-[0.28em]" style={{ color: ch.color }}>
                Field Profile
              </div>
              <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-xmen-display text-xl tracking-tight">
                  {ch.codename} <span className="text-xmen-ink-soft text-base font-normal">· {ch.name}</span>
                </h3>
              </div>
              <p className="mt-1.5 text-xs text-xmen-ink-soft">{ch.power}</p>
              <p className="mt-3 font-xmen-serif italic text-sm" style={{ color: ch.color }}>
                "{ch.quote}"
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center self-start rounded-sm border border-xmen-line bg-white">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center hover:bg-xmen-paper-soft">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <div className="grid h-12 w-12 place-items-center border-x border-xmen-line font-xmen-mono text-sm">{qty}</div>
                <button onClick={() => setQty((q) => q + 1)} className="grid h-12 w-12 place-items-center hover:bg-xmen-paper-soft">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                onClick={() => {
                  add(product.slug, qty);
                  toast.success(`${product.name} × ${qty} acquired`, { description: `${ch.codename} approves.` });
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-sm px-6 py-3.5 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white transition hover:opacity-90"
                style={{ background: ch.color, boxShadow: `0 14px 30px -12px ${ch.ring}` }}
              >
                <ShoppingBag className="h-3.5 w-3.5" /> Recruit Now
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 rounded-sm border border-xmen-line bg-white p-3 text-center sm:gap-3 sm:p-4">
              {[
                { Icon: Truck, label: "Free $150+" },
                { Icon: RotateCcw, label: "30-day returns" },
                { Icon: Shield, label: "5-yr warranty" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2 text-[9px] sm:text-[10px] font-xmen-mono uppercase tracking-widest text-xmen-ink-soft">
                  <Icon className="h-4 w-4" style={{ color: ch.color }} />
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-10">
              <div className="flex flex-wrap gap-1 border-b border-xmen-line">
                {([
                  ["description", "Description"],
                  ["specs", "Specifications"],
                  ["shipping", "Blackbird"],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className="relative px-4 py-3 font-xmen-display text-[11px] uppercase tracking-[0.3em] transition"
                    style={{ color: tab === key ? ch.color : undefined }}
                  >
                    {label}
                    {tab === key && (
                      <span
                        className="absolute -bottom-px left-0 right-0 h-px"
                        style={{ background: ch.color, boxShadow: `0 0 10px ${ch.ring}` }}
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="pt-5 text-sm leading-relaxed text-xmen-ink">
                {tab === "description" && <p>{product.description}</p>}
                {tab === "specs" && (
                  <ul className="divide-y divide-xmen-line border-y border-xmen-line">
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
            <h2 className="font-xmen-display text-3xl tracking-[-0.01em] sm:text-4xl">From the same squad</h2>
            <Link to="/shop" className="font-xmen-display text-xs uppercase tracking-[0.3em] text-xmen-ink-soft hover:text-xmen-red">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p, i) => <XmenProductCard product={p} key={p.slug} index={i} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
