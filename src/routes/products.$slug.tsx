import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { Minus, Plus, ShoppingBag, Star, Truck, RotateCcw, Shield, ChevronLeft } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
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
          { title: `${loaderData.product.name} — Gotham.Haus` },
          { name: "description", content: loaderData.product.tagline },
          { property: "og:title", content: `${loaderData.product.name} — Gotham.Haus` },
          { property: "og:description", content: loaderData.product.tagline },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-32 text-center">
      <h1 className="font-display text-3xl">Piece not found in the catalog.</h1>
      <Link to="/shop" className="mt-6 inline-block border-b border-signal pb-1 font-display text-xs uppercase tracking-[0.3em] text-signal">
        Back to the Armory
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/shop" className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-signal">
        <ChevronLeft className="h-3 w-3" /> Back to Armory
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div className="relative animate-rise-in">
          <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" width={800} height={1000} />
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 border border-border bg-background/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest backdrop-blur">
              <span className="h-1 w-1 rounded-full bg-signal animate-pulse" />
              {product.collection}
            </div>
          </div>
          <div className="absolute -inset-4 -z-10 bg-signal/5 blur-3xl" />
        </div>

        {/* Details */}
        <div className="animate-rise-in" style={{ animationDelay: "100ms" }}>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">
            {product.category} / {product.collection}
          </div>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-base text-muted-foreground">{product.tagline}</p>

          <div className="mt-5 flex items-center gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-signal text-signal" : "text-border"}`} />
              ))}
            </div>
            <span className="font-mono text-xs text-muted-foreground">
              {product.rating} · {product.reviews} reviews
            </span>
          </div>

          <div className="mt-8 flex items-baseline gap-4 border-y border-border py-6">
            <span className="font-display text-3xl">${product.price}</span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {product.stock > 10 ? "In stock" : `Only ${product.stock} left`}
            </span>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-foreground/90">{product.description}</p>

          {/* Quantity */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-12 w-12 place-items-center hover:text-signal">
                <Minus className="h-3.5 w-3.5" />
              </button>
              <div className="grid h-12 w-12 place-items-center border-x border-border font-mono text-sm">{qty}</div>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-12 w-12 place-items-center hover:text-signal">
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              onClick={() => {
                add(product.slug, qty);
                toast.success(`${product.name} × ${qty} added`, { description: "Sealed in matte black." });
              }}
              className="flex flex-1 items-center justify-center gap-2 border border-signal bg-signal px-6 py-3.5 font-display text-xs uppercase tracking-[0.3em] text-primary-foreground transition hover:shadow-signal"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
            </button>
          </div>

          {/* Specs */}
          <div className="mt-10">
            <h3 className="font-display text-xs uppercase tracking-[0.3em] text-signal">Specifications</h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {product.details.map((d) => (
                <li key={d} className="flex items-center gap-3 py-3 text-sm">
                  <span className="h-1 w-1 rounded-full bg-signal" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Trust */}
          <div className="mt-8 grid grid-cols-3 gap-3 border border-border bg-card/40 p-4 text-center">
            {[
              { Icon: Truck, label: "Free ship $200+" },
              { Icon: RotateCcw, label: "30-day returns" },
              { Icon: Shield, label: "Lifetime warranty" },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <Icon className="h-4 w-4 text-signal" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      <section className="mt-28">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl sm:text-3xl">From the same shadow</h2>
          <Link to="/shop" className="font-display text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-signal">View all</Link>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p, i) => (
            <ProductCard product={p} key={p.slug} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
