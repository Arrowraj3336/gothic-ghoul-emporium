import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { BatLogo } from "@/components/BatLogo";

export const Route = createFileRoute("/vault/cart")({
  head: () => ({
    meta: [
      { title: "Cart — Dark Decor" },
      { name: "description", content: "Review the pieces you've gathered from the shadows." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal, count, clear } = useCart();
  const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 19;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (count === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-32 text-center">
        <BatLogo className="h-12 w-24 text-signal/60 animate-float-slow" />
        <h1 className="mt-8 font-display text-3xl sm:text-4xl">The cart sleeps in shadow.</h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground">
          Nothing has been summoned yet. Choose a piece from the Armory and the night will deliver it.
        </p>
        <Link
          to="/vault/shop"
          className="mt-8 inline-flex items-center gap-2 border border-signal bg-signal px-7 py-4 font-display text-xs uppercase tracking-[0.3em] text-primary-foreground hover:shadow-signal"
        >
          Enter the Armory <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">// CART</div>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">Your Gathered Shadows</h1>
        </div>
        <button onClick={clear} className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-destructive">
          Clear all
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-border border-y border-border">
          {detailed.map(({ product, qty, lineTotal }) => (
            <li key={product.slug} className="flex gap-4 py-6">
              <Link to="/vault/products/$slug" params={{ slug: product.slug }} className="block w-24 shrink-0 sm:w-32">
                <div className="aspect-square overflow-hidden border border-border bg-card">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-signal">{product.collection}</div>
                    <Link to="/vault/products/$slug" params={{ slug: product.slug }}>
                      <h3 className="mt-1 font-display text-base hover:text-signal">{product.name}</h3>
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="font-mono text-sm">${lineTotal.toFixed(2)}</div>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center border border-border">
                    <button onClick={() => setQty(product.slug, qty - 1)} className="grid h-9 w-9 place-items-center hover:text-signal"><Minus className="h-3 w-3" /></button>
                    <div className="grid h-9 w-9 place-items-center border-x border-border font-mono text-xs">{qty}</div>
                    <button onClick={() => setQty(product.slug, qty + 1)} className="grid h-9 w-9 place-items-center hover:text-signal"><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => remove(product.slug)} className="grid h-9 w-9 place-items-center text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Summary */}
        <aside className="h-fit border border-border bg-card/40 p-6">
          <h2 className="font-display text-xs uppercase tracking-[0.3em] text-signal">Order Signal</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-mono">${subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="font-mono">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Tax (est.)</dt><dd className="font-mono">${tax.toFixed(2)}</dd></div>
          </dl>
          <div className="my-5 h-px bg-border" />
          <div className="flex items-baseline justify-between">
            <span className="font-display text-xs uppercase tracking-[0.3em]">Total</span>
            <span className="font-display text-2xl text-signal text-glow">${total.toFixed(2)}</span>
          </div>
          {subtotal < 200 && (
            <p className="mt-3 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              Add ${(200 - subtotal).toFixed(2)} for free shipping
            </p>
          )}
          <Link
            to="/vault/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 border border-signal bg-signal px-6 py-4 font-display text-xs uppercase tracking-[0.3em] text-primary-foreground hover:shadow-signal"
          >
            <ShoppingBag className="h-3.5 w-3.5" /> Proceed to Checkout
          </Link>
          <Link to="/vault/shop" className="mt-3 block text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-signal">
            ← Keep browsing
          </Link>
        </aside>
      </div>
    </div>
  );
}
