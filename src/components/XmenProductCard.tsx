import { Link } from "@tanstack/react-router";
import type { VaultProduct } from "@/lib/vault-products";
import { useXmenCart } from "@/lib/vault-cart";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

export function XmenProductCard({ product, index = 0 }: { product: VaultProduct; index?: number }) {
  const { add } = useXmenCart();
  return (
    <div className="group relative animate-fade-in" style={{ animationDelay: `${index * 70}ms` }}>
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden xm-frame transition-transform duration-300 group-hover:-translate-x-[3px] group-hover:-translate-y-[3px]">
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-12 w-12 xm-halftone-yellow opacity-70" />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-2 top-2 z-10 border-2 border-xmen-ink bg-xmen-yellow px-2 py-0.5 font-xmen-mono text-[9px] uppercase tracking-widest text-xmen-ink">
            {product.category}
          </div>
          {product.badge && (
            <div className="absolute right-2 bottom-2 z-10 border-2 border-xmen-ink bg-xmen-red px-2 py-0.5 font-xmen-display text-[10px] uppercase tracking-widest text-white">
              {product.badge}
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 z-10 translate-y-3 px-2 pb-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                add(product.slug);
                toast.success(`${product.name} acquired`, { description: "Stored in the X-Vault." });
              }}
              className="flex w-full items-center justify-center gap-2 border-2 border-xmen-ink bg-white px-3 py-2 font-xmen-display text-[10px] uppercase tracking-[0.25em] text-xmen-ink hover:bg-xmen-yellow"
            >
              <ShoppingBag className="h-3 w-3" /> Acquire
            </button>
          </div>
        </div>
      </Link>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-xmen-display text-base leading-tight tracking-wide truncate">
            <Link to="/products/$slug" params={{ slug: product.slug }} className="hover:text-xmen-red">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-[11px] text-xmen-ink-soft">{product.tagline}</p>
        </div>
        <span className="font-xmen-display text-lg text-xmen-red whitespace-nowrap">${product.price}</span>
      </div>
    </div>
  );
}
