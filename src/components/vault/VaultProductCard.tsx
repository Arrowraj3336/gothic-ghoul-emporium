import { Link } from "@tanstack/react-router";
import type { VaultProduct } from "@/lib/vault-products";
import { useVaultCart } from "@/lib/vault-cart";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function VaultProductCard({ product, index = 0 }: { product: VaultProduct; index?: number }) {
  const { add } = useVaultCart();
  return (
    <div
      className="group relative animate-rise-in"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <Link to="/vault/products/$slug" params={{ slug: product.slug }} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          {product.badge && (
            <div className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-neutral-800 shadow-sm backdrop-blur">
              {product.badge}
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              add(product.slug);
              toast.success(`${product.name} added to bag`);
            }}
            aria-label={`Add ${product.name}`}
            className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white text-neutral-900 opacity-0 shadow-lg transition-all duration-300 hover:bg-neutral-900 hover:text-white group-hover:opacity-100"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </Link>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-vault-display text-[15px] leading-tight text-neutral-900 truncate">
            <Link to="/vault/products/$slug" params={{ slug: product.slug }} className="hover:text-neutral-500">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-neutral-500">{product.category}</p>
        </div>
        <div className="text-right">
          <div className="text-[15px] font-medium text-neutral-900">${product.price}</div>
          {product.compareAt && (
            <div className="text-[11px] text-neutral-400 line-through">${product.compareAt}</div>
          )}
        </div>
      </div>
    </div>
  );
}
