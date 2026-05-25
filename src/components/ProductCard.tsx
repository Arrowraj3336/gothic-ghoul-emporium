import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  return (
    <div
      className="group relative animate-rise-in"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden border border-border bg-card">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/0 to-background/30 opacity-60 transition-opacity group-hover:opacity-30" />
          <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 border border-border bg-background/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
            <span className="h-1 w-1 rounded-full bg-signal animate-pulse" />
            {product.collection}
          </div>
          <div className="absolute inset-x-0 bottom-0 translate-y-4 px-3 pb-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                add(product.slug);
                toast.success(`${product.name} added`, {
                  description: "Sealed in matte black. Bat-courier dispatched.",
                });
              }}
              className="flex w-full items-center justify-center gap-2 border border-signal bg-background/90 px-4 py-2.5 font-display text-[10px] uppercase tracking-[0.3em] text-signal backdrop-blur transition hover:bg-signal hover:text-primary-foreground"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Acquire
            </button>
          </div>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-base leading-tight">
            <Link to="/products/$slug" params={{ slug: product.slug }} className="hover:text-signal transition-colors">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{product.category}</p>
        </div>
        <span className="font-mono text-sm tracking-wide text-foreground">${product.price}</span>
      </div>
    </div>
  );
}
