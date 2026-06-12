import { createFileRoute, Link } from "@tanstack/react-router";
import { useVaultCart } from "@/lib/vault-cart";
import { Minus, Plus, X, ArrowRight } from "lucide-react";
import { VaultLogo } from "@/components/vault/VaultLogo";

export const Route = createFileRoute("/vault/cart")({
  head: () => ({ meta: [{ title: "Reliquary — Viral Vault" }] }),
  component: VaultCartPage,
});

function VaultCartPage() {
  const { detailed, setQty, remove, subtotal, count } = useVaultCart();
  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 9;
  const total = subtotal + shipping;

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-10 flex items-end justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-[var(--vv-green)]">The reliquary</div>
          <h1 className="mt-2 font-vault-display text-4xl text-[var(--vv-ink)] sm:text-5xl">
            Sealed by Doom · {count} {count === 1 ? "relic" : "relics"}
          </h1>
        </div>
        <Link to="/vault/shop" className="text-[11px] uppercase tracking-[0.22em] text-[var(--vv-ink-soft)] hover:text-[var(--vv-green)]">
          Return to the armory →
        </Link>
      </header>

      {detailed.length === 0 ? (
        <div className="border border-dashed border-[var(--vv-green-line)] bg-white py-24 text-center">
          <div className="mx-auto flex w-fit text-[var(--vv-green)] opacity-50">
            <VaultLogo className="h-14 w-14" />
          </div>
          <p className="mt-6 font-vault-serif text-[17px] italic text-[var(--vv-ink-soft)]">
            The reliquary stands empty. Doom is unimpressed.
          </p>
          <Link
            to="/vault/shop"
            className="mt-8 inline-flex items-center gap-2 bg-[var(--vv-green)] px-7 py-3 font-vault-heroic text-[12px] uppercase tracking-[0.28em] text-white hover:bg-[var(--vv-green-deep)]"
          >
            Enter the armory <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-3">
          <ul className="space-y-4 lg:col-span-2">
            {detailed.map(({ product, qty, lineTotal }) => (
              <li
                key={product.slug}
                className="flex flex-col gap-4 border border-[var(--vv-green-line)] bg-white p-4 sm:flex-row sm:items-center sm:p-5"
              >
                <div className="aspect-square w-full overflow-hidden bg-[var(--vv-green-soft)] sm:h-28 sm:w-28">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to="/vault/products/$slug"
                        params={{ slug: product.slug }}
                        className="font-vault-heroic text-[15px] uppercase tracking-[0.08em] text-[var(--vv-ink)] hover:text-[var(--vv-green)]"
                      >
                        {product.name}
                      </Link>
                      <div className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-[var(--vv-ink-soft)]">
                        {product.category}
                      </div>
                    </div>
                    <button
                      onClick={() => remove(product.slug)}
                      className="text-[var(--vv-ink-soft)] hover:text-[var(--vv-green)]"
                      aria-label="Banish"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="inline-flex items-center border border-[var(--vv-green-line)] bg-white">
                      <button
                        onClick={() => setQty(product.slug, qty - 1)}
                        className="grid h-9 w-9 place-items-center text-[var(--vv-ink-soft)] hover:bg-[var(--vv-green-soft)] hover:text-[var(--vv-green)]"
                        aria-label="Decrease"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <div className="min-w-7 text-center text-sm tabular-nums">{qty}</div>
                      <button
                        onClick={() => setQty(product.slug, qty + 1)}
                        className="grid h-9 w-9 place-items-center text-[var(--vv-ink-soft)] hover:bg-[var(--vv-green-soft)] hover:text-[var(--vv-green)]"
                        aria-label="Increase"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="font-vault-heroic text-sm text-[var(--vv-green)]">${lineTotal}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 border border-[var(--vv-green-line)] bg-white p-6">
              <h2 className="font-vault-heroic text-[13px] uppercase tracking-[0.28em] text-[var(--vv-green)]">Sovereign's tally</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[var(--vv-ink-soft)]">Subtotal</dt>
                  <dd className="text-[var(--vv-ink)]">${subtotal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--vv-ink-soft)]">Imperial dispatch</dt>
                  <dd className="text-[var(--vv-ink)]">{shipping === 0 ? "Free" : `$${shipping}`}</dd>
                </div>
                <div className="flex justify-between border-t border-[var(--vv-green-line)] pt-3 text-base font-medium">
                  <dt>Total tribute</dt>
                  <dd className="text-[var(--vv-green)]">${total}</dd>
                </div>
              </dl>
              <Link
                to="/vault/checkout"
                className="mt-6 flex w-full items-center justify-center gap-2 bg-[var(--vv-green)] px-6 py-3 font-vault-heroic text-[12px] uppercase tracking-[0.28em] text-white hover:bg-[var(--vv-green-deep)]"
              >
                Submit tribute <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-[10px] uppercase tracking-[0.22em] text-[var(--vv-ink-soft)]">
                Taxes determined at the throne.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
