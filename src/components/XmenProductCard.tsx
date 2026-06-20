import { Link } from "@tanstack/react-router";
import type { VaultProduct } from "@/lib/vault-products";
import { useXmenCart } from "@/lib/vault-cart";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { getCharacter } from "@/lib/xmen-characters";

export function XmenProductCard({ product, index = 0 }: { product: VaultProduct; index?: number }) {
  const { add } = useXmenCart();
  const ch = getCharacter(product.slug);
  return (
    <div
      className="group relative animate-fade-in"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-sm border border-xmen-line bg-white transition-all duration-500 group-hover:-translate-y-1"
          style={{
            // subtle character-tinted soft glow on hover
            boxShadow: `0 1px 0 rgba(11,13,16,0.04), 0 14px 30px -16px ${ch.ring}`,
          }}
        >
          {/* corner brackets */}
          <span className="pointer-events-none absolute left-2 top-2 z-10 h-3 w-3 border-l border-t border-xmen-ink/60" />
          <span className="pointer-events-none absolute right-2 top-2 z-10 h-3 w-3 border-r border-t border-xmen-ink/60" />
          <span className="pointer-events-none absolute left-2 bottom-2 z-10 h-3 w-3 border-l border-b border-xmen-ink/60" />
          <span className="pointer-events-none absolute right-2 bottom-2 z-10 h-3 w-3 border-r border-b border-xmen-ink/60" />

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />

          {/* character chip */}
          <div
            className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-xmen-mono text-[9px] uppercase tracking-[0.22em] backdrop-blur"
            style={{ background: "rgba(255,255,255,0.78)", borderColor: ch.ring, color: ch.color }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: ch.color }} />
            {ch.codename}
          </div>

          {product.badge && (
            <div className="absolute right-3 top-3 z-10 rounded-full bg-xmen-ink/90 px-2.5 py-1 font-xmen-mono text-[9px] uppercase tracking-[0.22em] text-white backdrop-blur">
              {product.badge}
            </div>
          )}

          {/* hover acquire */}
          <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              onClick={(e) => {
                e.preventDefault();
                add(product.slug);
                toast.success(`${product.name} acquired`, { description: `${ch.codename} approves.` });
              }}
              className="flex w-full items-center justify-center gap-2 rounded-sm bg-xmen-ink px-3 py-2.5 font-xmen-display text-[10px] uppercase tracking-[0.28em] text-white transition hover:bg-xmen-red"
            >
              <ShoppingBag className="h-3 w-3" /> Acquire
            </button>
          </div>
        </div>
      </Link>

      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-xmen-mono text-[9px] uppercase tracking-[0.24em]" style={{ color: ch.color }}>
            {product.category}
          </div>
          <h3 className="mt-1 font-xmen-display text-[15px] leading-snug tracking-tight truncate">
            <Link to="/products/$slug" params={{ slug: product.slug }} className="hover:text-xmen-red">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-[11px] text-xmen-ink-soft truncate">{product.tagline}</p>
        </div>
        <span className="font-xmen-display text-base text-xmen-ink whitespace-nowrap">
          ${product.price}
        </span>
      </div>
    </div>
  );
}
