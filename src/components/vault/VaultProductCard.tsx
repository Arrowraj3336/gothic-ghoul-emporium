import { Link } from "@tanstack/react-router";
import type { VaultProduct } from "@/lib/vault-products";
import { useVaultCart } from "@/lib/vault-cart";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function VaultProductCard({ product, index = 0 }: { product: VaultProduct; index?: number }) {
  const { add } = useVaultCart();
  return (
    <div className="group relative animate-rise-in" style={{ animationDelay: `${index * 60}ms` }}>
      <Link to="/vault/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--vv-green-soft)] ring-1 ring-[var(--vv-green-line)] transition-all duration-500 group-hover:ring-[var(--vv-green)]">
          {/* Minimal green corner ticks */}
          <span className="pointer-events-none absolute left-2 top-2 z-10 h-3 w-3 border-l border-t border-[var(--vv-green)]" />
          <span className="pointer-events-none absolute right-2 top-2 z-10 h-3 w-3 border-r border-t border-[var(--vv-green)]" />
          <span className="pointer-events-none absolute bottom-2 left-2 z-10 h-3 w-3 border-b border-l border-[var(--vv-green)]" />
          <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-3 w-3 border-b border-r border-[var(--vv-green)]" />

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />

          {product.badge && (
            <div className="absolute left-3 top-3 z-20 bg-[var(--vv-green)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
              {product.badge}
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              add(product.slug);
              toast.success(`${product.name} sealed in the reliquary`);
            }}
            aria-label={`Add ${product.name}`}
            className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-[var(--vv-green)] text-white opacity-0 transition-all duration-300 hover:bg-[var(--vv-green-deep)] group-hover:opacity-100"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.28em] text-[var(--vv-ink-soft)]">{product.category}</div>
          <h3 className="mt-1 font-vault-heroic text-[14px] uppercase tracking-[0.1em] leading-tight text-[var(--vv-ink)] truncate">
            <Link to="/vault/products/$slug" params={{ slug: product.slug }} className="hover:text-[var(--vv-green)]">
              {product.name}
            </Link>
          </h3>
        </div>
        <div className="text-right">
          <div className="font-vault-heroic text-[15px] font-semibold text-[var(--vv-green)]">${product.price}</div>
          {product.compareAt && (
            <div className="text-[11px] text-[var(--vv-ink-soft)] line-through">${product.compareAt}</div>
          )}
        </div>
      </div>
    </div>
  );
}
