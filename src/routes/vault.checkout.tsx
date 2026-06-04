import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useVaultCart } from "@/lib/vault-cart";
import { Check, Lock, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/vault/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Viral Vault" }] }),
  component: VaultCheckoutPage,
});

function VaultCheckoutPage() {
  const { detailed, subtotal, clear } = useVaultCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [done, setDone] = useState(false);

  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 9;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 3) {
      setDone(true);
      clear();
      toast.success("Order placed", { description: "A confirmation is on its way." });
      setTimeout(() => navigate({ to: "/vault" }), 3000);
    } else {
      setStep((s) => (s + 1) as 1 | 2 | 3);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-32 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-50 text-emerald-700">
          <Check className="h-6 w-6" />
        </div>
        <h1 className="mt-6 font-vault-display text-4xl text-neutral-900">Order placed.</h1>
        <p className="mt-3 text-sm text-neutral-600">A confirmation has been sent to your inbox. Returning you to the vault.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Checkout</div>
        <h1 className="mt-2 font-vault-display text-4xl text-neutral-900 sm:text-5xl">Almost there.</h1>
      </header>

      <div className="mb-8 flex items-center gap-2 text-xs text-neutral-500">
        {(["Contact", "Shipping", "Payment"] as const).map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span className={[
              "grid h-6 w-6 place-items-center rounded-full border text-[11px]",
              step > i + 1 ? "border-neutral-900 bg-neutral-900 text-white" : step === i + 1 ? "border-neutral-900 text-neutral-900" : "border-neutral-300",
            ].join(" ")}>{i + 1}</span>
            <span className={step === i + 1 ? "text-neutral-900" : ""}>{label}</span>
            {i < 2 && <ChevronRight className="h-3 w-3" />}
          </div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <form onSubmit={onSubmit} className="space-y-5 lg:col-span-2">
          {step === 1 && (
            <Section title="Contact">
              <Field label="Email" type="email" required />
              <Field label="Phone" type="tel" />
            </Section>
          )}
          {step === 2 && (
            <Section title="Shipping address">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" required />
                <Field label="Last name" required />
              </div>
              <Field label="Address" required />
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="City" required />
                <Field label="State" required />
                <Field label="ZIP" required />
              </div>
            </Section>
          )}
          {step === 3 && (
            <Section title="Payment">
              <Field label="Card number" placeholder="1234 5678 9012 3456" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Expiry" placeholder="MM / YY" required />
                <Field label="CVC" placeholder="123" required />
              </div>
              <Field label="Name on card" required />
              <div className="flex items-center gap-2 rounded-xl bg-neutral-50 px-4 py-3 text-xs text-neutral-600">
                <Lock className="h-3.5 w-3.5" /> Secure 256-bit encryption — your card is never stored.
              </div>
            </Section>
          )}

          <div className="flex items-center justify-between pt-2">
            {step > 1 ? (
              <button type="button" onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)} className="text-sm text-neutral-500 hover:text-neutral-900">
                ← Back
              </button>
            ) : (
              <Link to="/vault/cart" className="text-sm text-neutral-500 hover:text-neutral-900">← Back to bag</Link>
            )}
            <button type="submit" className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-700">
              {step === 3 ? `Pay $${total}` : "Continue"}
            </button>
          </div>
        </form>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
            <h2 className="font-vault-display text-lg text-neutral-900">Your order</h2>
            <ul className="mt-4 space-y-3">
              {detailed.map(({ product, qty, lineTotal }) => (
                <li key={product.slug} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-neutral-900 text-[10px] font-medium text-white">{qty}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="truncate text-sm text-neutral-900">{product.name}</div>
                    <div className="text-xs text-neutral-500">${product.price}</div>
                  </div>
                  <div className="text-sm font-medium text-neutral-900">${lineTotal}</div>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-2 border-t border-neutral-200 pt-4 text-sm">
              <Row label="Subtotal" value={`$${subtotal}`} />
              <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping}`} />
              <Row label="Tax" value={`$${tax}`} />
              <div className="flex justify-between border-t border-neutral-200 pt-3 text-base font-medium">
                <dt>Total</dt>
                <dd>${total}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8">
      <h2 className="font-vault-display text-lg text-neutral-900">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-neutral-600">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-neutral-600">{label}</dt>
      <dd className="text-neutral-900">{value}</dd>
    </div>
  );
}
