import { Link } from "@tanstack/react-router";
import type { VaultProduct } from "@/lib/vault-products";
import { useXmenCart } from "@/lib/vault-cart";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { getCharacter } from "@/lib/xmen-characters";
import { formatINR } from "@/lib/utils";

export function XmenProductCard({ product, index = 0 }: { product: VaultProduct; index?: number }) {
  const { add } = useXmenCart();
  const ch = getCharacter(product.slug);
  return (
    <div className="group relative animate-fade-in" style={{ animationDelay: `${index * 70}ms` }}>
      <Link to="/products/$slug" params={{ slug: product.slug }} className="block">
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-xmen-line bg-white transition-all duration-500 group-hover:-translate-y-1.5"
          style={{ boxShadow: `0 1px 0 rgba(11,13,16,0.04), 0 20px 44px -22px ${ch.ring}, 0 40px 80px -60px ${ch.ring}` }}
        >
          {/* soft radial character tint */}
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{ background: `radial-gradient(ellipse at 50% 100%, ${ch.colorSoft}, transparent 65%)` }}
          />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="xm-product-img h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-[1.05]"
          />

          {/* character chip */}
          <div
            className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-xmen-mono text-[9px] uppercase tracking-[0.22em] backdrop-blur"
            style={{ background: "rgba(255,255,255,0.85)", borderColor: ch.ring, color: ch.color }}
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
              className="flex w-full items-center justify-center gap-2 rounded-full bg-xmen-ink px-3 py-2.5 font-xmen-display text-[10px] uppercase tracking-[0.28em] text-white transition hover:bg-xmen-red"
            >
              <ShoppingBag className="h-3 w-3" /> Acquire
            </button>
          </div>
        </div>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3 px-1">
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
        <span className="font-xmen-display text-sm text-xmen-ink whitespace-nowrap">
          {formatINR(product.price)}
        </span>
      </div>
    </div>
  );
}
