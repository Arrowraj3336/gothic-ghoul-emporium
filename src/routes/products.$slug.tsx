import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import {
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  Shield,
  ChevronLeft,
  Heart,
  Share2,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { ProductTransition } from "@/components/ProductTransition";
import { toast } from "sonner";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Dark Decor` },
          { name: "description", content: loaderData.product.tagline },
          { property: "og:title", content: `${loaderData.product.name} — Dark Decor` },
          { property: "og:description", content: loaderData.product.tagline },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="font-display text-2xl sm:text-3xl">Piece not found in the catalog.</h1>
      <Link
        to="/shop"
        className="mt-6 inline-block border-b border-signal pb-1 font-display text-xs uppercase tracking-[0.3em] text-signal"
      >
        Back to Shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "specs" | "shipping">("description");

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <ProductTransition />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
          <Link to="/" className="hover:text-signal">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-signal">Shop</Link>
          <span>/</span>
          <span className="text-foreground/70">{product.category}</span>
          <span>/</span>
          <span className="text-signal">{product.name}</span>
        </nav>

        <Link
          to="/shop"
          className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-signal sm:text-[11px]"
        >
          <ChevronLeft className="h-3 w-3" /> Back
        </Link>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          {/* Image gallery */}
          <div className="animate-rise-in">
            <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card clip-frame shadow-frame">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
                width={1000}
                height={1250}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 border border-border bg-background/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest backdrop-blur">
                <span className="h-1 w-1 rounded-full bg-signal animate-pulse" />
                {product.collection}
              </div>
              <div className="absolute right-4 top-4 flex gap-2">
                <button className="grid h-9 w-9 place-items-center border border-border bg-background/80 text-foreground/80 backdrop-blur transition hover:border-signal hover:text-signal">
                  <Heart className="h-3.5 w-3.5" />
                </button>
                <button className="grid h-9 w-9 place-items-center border border-border bg-background/80 text-foreground/80 backdrop-blur transition hover:border-signal hover:text-signal">
                  <Share2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* thumbnail strip (single image — repeat as placeholders) */}
            <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  className={`relative aspect-square overflow-hidden border ${i === 0 ? "border-signal" : "border-border opacity-60 hover:opacity-100"} bg-card transition`}
                >
                  <img src={product.image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="animate-rise-in" style={{ animationDelay: "100ms" }}>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal sm:text-[11px]">
              {product.category} / {product.collection}
            </div>
            <h1 className="mt-2 font-display text-3xl leading-tight sm:text-5xl">{product.name}</h1>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground">{product.tagline}</p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-signal text-signal" : "text-border"}`}
                  />
                ))}
              </div>
              <span className="font-mono text-[11px] text-muted-foreground">
                {product.rating} · {product.reviews} reviews
              </span>
              <span className="font-mono text-[11px] text-signal">
                {product.stock > 10 ? "● In Stock" : `● Only ${product.stock} left`}
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3 border-y border-border py-5 sm:mt-8 sm:py-6">
              <span className="font-display text-3xl sm:text-4xl text-signal">${product.price}</span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground line-through">
                ${Math.round(product.price * 1.25)}
              </span>
              <span className="ml-auto border border-signal/40 bg-signal/10 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-signal">
                -20% Night Sale
              </span>
            </div>

            {/* Quantity + CTA */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="flex items-center border border-border self-start">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-12 w-12 place-items-center hover:text-signal"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <div className="grid h-12 w-12 place-items-center border-x border-border font-mono text-sm">
                  {qty}
                </div>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="grid h-12 w-12 place-items-center hover:text-signal"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                onClick={() => {
                  add(product.slug, qty);
                  toast.success(`${product.name} × ${qty} added`, {
                    description: "Sealed in matte black.",
                  });
                }}
                className="flex flex-1 items-center justify-center gap-2 border border-signal bg-signal px-6 py-3.5 font-display text-[11px] uppercase tracking-[0.35em] text-primary-foreground transition hover:shadow-signal"
              >
                <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
              </button>
            </div>

            {/* Trust */}
            <div className="mt-6 grid grid-cols-3 gap-2 border border-border bg-card/40 p-3 text-center sm:gap-3 sm:p-4">
              {[
                { Icon: Truck, label: "Free $200+" },
                { Icon: RotateCcw, label: "30-day returns" },
                { Icon: Shield, label: "Lifetime warranty" },
              ].map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-muted-foreground"
                >
                  <Icon className="h-4 w-4 text-signal" />
                  {label}
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="mt-10">
              <div className="flex flex-wrap gap-1 border-b border-border">
                {([
                  ["description", "Description"],
                  ["specs", "Specifications"],
                  ["shipping", "Shipping"],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`relative px-4 py-3 font-display text-[10px] uppercase tracking-[0.3em] transition ${
                      tab === key ? "text-signal" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                    {tab === key && (
                      <span className="absolute -bottom-px left-0 right-0 h-px bg-signal shadow-signal" />
                    )}
                  </button>
                ))}
              </div>
              <div className="pt-5 text-sm leading-relaxed text-foreground/90">
                {tab === "description" && <p>{product.description}</p>}
                {tab === "specs" && (
                  <ul className="divide-y divide-border border-y border-border">
                    {product.details.map((d: string) => (
                      <li key={d} className="flex items-center gap-3 py-3 text-sm">
                        <span className="h-1 w-1 rounded-full bg-signal" />
                        {d}
                      </li>
                    ))}
                  </ul>
                )}
                {tab === "shipping" && (
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>Free standard shipping on orders over $200. Express options at checkout.</p>
                    <p>30-day returns for unused pieces in original packaging.</p>
                    <p>Bat-courier dispatched within 48 hours from Gotham warehouse.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        <section className="mt-20 sm:mt-28">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl sm:text-3xl">From the same shadow</h2>
            <Link
              to="/shop"
              className="font-display text-[11px] uppercase tracking-[0.35em] text-muted-foreground hover:text-signal"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {related.map((p, i) => (
              <ProductCard product={p} key={p.slug} index={i} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
