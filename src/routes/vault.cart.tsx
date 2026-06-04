import { createFileRoute, Link } from "@tanstack/react-router";
import { useVaultCart } from "@/lib/vault-cart";
import { Minus, Plus, X, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/vault/cart")({
  head: () => ({ meta: [{ title: "Bag — Viral Vault" }] }),
  component: VaultCartPage,
});

function VaultCartPage() {
  const { detailed, setQty, remove, subtotal, count } = useVaultCart();
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 9;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-10 flex items-end justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Your bag</div>
          <h1 className="mt-2 font-vault-display text-4xl text-neutral-900 sm:text-5xl">Bag · {count} {count === 1 ? "item" : "items"}</h1>
        </div>
        <Link to="/vault/shop" className="text-sm text-neutral-500 hover:text-neutral-900">Continue shopping →</Link>
      </header>

      {detailed.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 py-20 text-center">
          <p className="text-sm text-neutral-600">Your bag is empty.</p>
          <Link
            to="/vault/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700"
          >
            Browse the vault <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-3">
          <ul className="space-y-4 lg:col-span-2">
            {detailed.map(({ product, qty, lineTotal }) => (
              <li
                key={product.slug}
                className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-4 sm:flex-row sm:items-center sm:p-5"
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-neutral-100 sm:h-28 sm:w-28">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link to="/vault/products/$slug" params={{ slug: product.slug }} className="font-vault-display text-base text-neutral-900 hover:text-neutral-500">
                        {product.name}
                      </Link>
                      <div className="mt-0.5 text-xs text-neutral-500">{product.category}</div>
                    </div>
                    <button onClick={() => remove(product.slug)} className="text-neutral-400 hover:text-neutral-900" aria-label="Remove">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-neutral-300 bg-white">
                      <button onClick={() => setQty(product.slug, qty - 1)} className="grid h-9 w-9 place-items-center text-neutral-600 hover:text-neutral-900" aria-label="Decrease">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <div className="min-w-7 text-center text-sm tabular-nums">{qty}</div>
                      <button onClick={() => setQty(product.slug, qty + 1)} className="grid h-9 w-9 place-items-center text-neutral-600 hover:text-neutral-900" aria-label="Increase">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="text-sm font-medium text-neutral-900">${lineTotal}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
              <h2 className="font-vault-display text-lg text-neutral-900">Order summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-neutral-600">Subtotal</dt>
                  <dd className="text-neutral-900">${subtotal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-neutral-600">Shipping</dt>
                  <dd className="text-neutral-900">{shipping === 0 ? "Free" : `$${shipping}`}</dd>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-medium">
                  <dt>Total</dt>
                  <dd>${total}</dd>
                </div>
              </dl>
              <Link
                to="/vault/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-[11px] text-neutral-500">Taxes calculated at checkout.</p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
