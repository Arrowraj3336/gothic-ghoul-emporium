import { createFileRoute, Link } from "@tanstack/react-router";
import { useXmenCart } from "@/lib/vault-cart";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { XLogo } from "@/components/XmenIcons";
import { formatINR } from "@/lib/utils";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "X-Vault — Cart | Viral Vault" }, { name: "description", content: "Review the gear in your X-Vault." }] }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, subtotal, count, clear } = useXmenCart();
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 14;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (count === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 sm:py-32 text-center">
        <XLogo className="h-16 w-16 text-xmen-red xm-float" />
        <h1 className="mt-8 font-xmen-display text-4xl sm:text-5xl tracking-tight">The X-Vault is empty.</h1>
        <p className="mt-3 max-w-md text-sm text-xmen-ink-soft">
          Nothing's been recruited yet. Walk through the Armory and assemble your squad.
        </p>
        <Link to="/shop" className="mt-8 inline-flex items-center gap-2 rounded-full bg-xmen-red px-7 py-4 font-xmen-display text-xs uppercase tracking-[0.3em] text-white hover:bg-xmen-ink">
          Enter the Armory <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// the x-vault</div>
          <h1 className="mt-2 font-xmen-display text-4xl sm:text-6xl tracking-tight">Your squad.</h1>
        </div>
        <button onClick={clear} className="font-xmen-mono text-[11px] uppercase tracking-widest text-xmen-ink-soft hover:text-xmen-red">
          Disband all
        </button>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="rounded-2xl border border-xmen-line bg-white divide-y divide-xmen-line">
          {detailed.map(({ product, qty, lineTotal }) => (
            <li key={product.slug} className="flex gap-4 p-5">
              <Link to="/products/$slug" params={{ slug: product.slug }} className="block w-24 shrink-0 sm:w-28">
                <div className="aspect-square overflow-hidden rounded-xl border border-xmen-line bg-white">
                  <img src={product.image} alt={product.name} className="xm-product-img h-full w-full object-contain p-2" />
                </div>
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-red">{product.category}</div>
                    <Link to="/products/$slug" params={{ slug: product.slug }}>
                      <h3 className="mt-1 font-xmen-display text-lg hover:text-xmen-red">{product.name}</h3>
                    </Link>
                  </div>
                  <div className="font-xmen-display text-lg text-xmen-red whitespace-nowrap">{formatINR(lineTotal)}</div>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center rounded-full border border-xmen-line bg-white">
                    <button onClick={() => setQty(product.slug, qty - 1)} className="grid h-9 w-9 place-items-center rounded-l-full hover:bg-xmen-paper-soft"><Minus className="h-3 w-3" /></button>
                    <div className="grid h-9 w-9 place-items-center border-x border-xmen-line font-xmen-mono text-xs">{qty}</div>
                    <button onClick={() => setQty(product.slug, qty + 1)} className="grid h-9 w-9 place-items-center rounded-r-full hover:bg-xmen-paper-soft"><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => remove(product.slug)} className="grid h-9 w-9 place-items-center rounded-full text-xmen-ink-soft hover:bg-xmen-paper-soft hover:text-xmen-red">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-xmen-line bg-white p-6" style={{ boxShadow: "0 30px 60px -30px rgba(200,32,42,0.25)" }}>
          <h2 className="font-xmen-display text-sm uppercase tracking-[0.3em] text-xmen-red">Mission Briefing</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-xmen-ink-soft">Subtotal</dt><dd className="font-xmen-mono">{formatINR(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-xmen-ink-soft">Blackbird Shipping</dt><dd className="font-xmen-mono">{shipping === 0 ? "FREE" : formatINR(shipping)}</dd></div>
            <div className="flex justify-between"><dt className="text-xmen-ink-soft">Tax (est.)</dt><dd className="font-xmen-mono">{formatINR(tax)}</dd></div>
          </dl>
          <div className="my-5 h-px bg-xmen-line" />
          <div className="flex items-baseline justify-between">
            <span className="font-xmen-display text-sm uppercase tracking-[0.3em]">Total</span>
            <span className="font-xmen-display text-3xl text-xmen-red">{formatINR(total)}</span>
          </div>
          {subtotal < 150 && (
            <p className="mt-3 font-xmen-mono text-[11px] uppercase tracking-widest text-xmen-ink-soft">
              Add {formatINR(150 - subtotal)} for free Blackbird shipping
            </p>
          )}
          <Link to="/checkout" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-xmen-red px-6 py-4 font-xmen-display text-xs uppercase tracking-[0.3em] text-white hover:bg-xmen-ink">
            <ShoppingBag className="h-3.5 w-3.5" /> Deploy Squad
          </Link>
          <Link to="/shop" className="mt-3 block text-center font-xmen-mono text-[11px] uppercase tracking-widest text-xmen-ink-soft hover:text-xmen-red">
            ← Keep browsing
          </Link>
        </aside>
      </div>
    </div>
  );
}
