import { Link } from "@tanstack/react-router";
import type { VaultProduct } from "@/lib/vault-products";
import { useVaultCart } from "@/lib/vault-cart";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { WWStar } from "./VaultIcons";

export function VaultProductCard({ product, index = 0 }: { product: VaultProduct; index?: number }) {
  const { add } = useVaultCart();
  return (
    <div
      className="group relative animate-rise-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link to="/vault/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#0e1a14] ring-1 ring-[var(--vv-gold-soft)] transition-all duration-500 group-hover:ring-2 group-hover:ring-[var(--vv-gold)] group-hover:shadow-[0_20px_60px_-20px_rgba(124,77,219,0.45)]">
          {/* Gold corner brackets */}
          <span className="pointer-events-none absolute left-2 top-2 z-10 h-4 w-4 border-l-2 border-t-2 border-[var(--vv-gold)]" />
          <span className="pointer-events-none absolute right-2 top-2 z-10 h-4 w-4 border-r-2 border-t-2 border-[var(--vv-gold)]" />
          <span className="pointer-events-none absolute bottom-2 left-2 z-10 h-4 w-4 border-b-2 border-l-2 border-[var(--vv-gold)]" />
          <span className="pointer-events-none absolute bottom-2 right-2 z-10 h-4 w-4 border-b-2 border-r-2 border-[var(--vv-gold)]" />

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />

          {product.badge && (
            <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 bg-[var(--vv-crimson)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white shadow-sm">
              <WWStar className="h-2.5 w-2.5 text-[var(--vv-gold)]" />
              {product.badge}
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              add(product.slug);
              toast.success(`${product.name} added to the vault`);
            }}
            aria-label={`Add ${product.name}`}
            className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-[var(--vv-gold)] text-[var(--vv-ink)] opacity-0 shadow-lg transition-all duration-300 hover:bg-[var(--vv-crimson)] hover:text-white group-hover:opacity-100"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[var(--vv-gold-light)]">{product.category}</div>
          <h3 className="mt-1 font-vault-heroic text-[14px] uppercase tracking-[0.1em] leading-tight text-[var(--vv-ink)] truncate">
            <Link to="/vault/products/$slug" params={{ slug: product.slug }} className="hover:text-[var(--vv-gold-light)]">
              {product.name}
            </Link>
          </h3>
        </div>
        <div className="text-right">
          <div className="font-vault-heroic text-[15px] font-semibold text-[var(--vv-gold-light)]">${product.price}</div>
          {product.compareAt && (
            <div className="text-[11px] text-[var(--vv-ink-soft)] line-through">${product.compareAt}</div>
          )}
        </div>
      </div>
    </div>
  );
}
