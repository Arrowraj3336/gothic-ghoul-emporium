import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useXmenCart } from "@/lib/vault-cart";
import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { XLogo } from "@/components/XmenIcons";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Deploy — Checkout | Viral Vault" }] }),
  component: Checkout,
});

function Checkout() {
  const { detailed, subtotal, clear, count } = useXmenCart();
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 14;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (count === 0 && !done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-xmen-display text-3xl">NOTHING TO DEPLOY.</h1>
        <Link to="/shop" className="mt-6 inline-block border-b-2 border-xmen-red pb-1 font-xmen-display text-xs uppercase tracking-[0.3em] text-xmen-red">
          To the Armory
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 sm:py-32 text-center animate-fade-in">
        <div className="mx-auto grid h-20 w-20 place-items-center border-2 border-xmen-ink bg-xmen-yellow">
          <CheckCircle2 className="h-10 w-10 text-xmen-ink" />
        </div>
        <h1 className="mt-6 font-xmen-display text-4xl sm:text-5xl">SQUAD DEPLOYED.</h1>
        <p className="mt-4 text-sm text-xmen-ink-soft">
          Cerebro has logged your order. The Blackbird is en route.
        </p>
        <div className="mx-auto mt-8 inline-flex items-center gap-3 border-2 border-xmen-ink bg-white px-6 py-3 font-xmen-mono text-xs">
          <span className="text-xmen-ink-soft">MISSION</span>
          <span className="text-xmen-red">#XM-{Math.floor(Math.random() * 99999).toString().padStart(5, "0")}</span>
        </div>
        <div className="mt-10">
          <Link to="/" className="border-2 border-xmen-ink bg-xmen-red px-7 py-4 font-xmen-display text-xs uppercase tracking-[0.3em] text-white hover:bg-xmen-yellow hover:text-xmen-ink">
            Return to the Institute
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// SECURE CHANNEL</div>
        <h1 className="mt-2 font-xmen-display text-4xl sm:text-6xl">DEPLOY SQUAD.</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Cerebro received your transmission");
          setTimeout(() => { setDone(true); clear(); navigate({ to: "/checkout" }); }, 600);
        }}
        className="grid gap-8 lg:grid-cols-[1fr_400px]"
      >
        <div className="space-y-6">
          <Section title="Codename">
            <Field label="Email" type="email" required placeholder="charles@xavier.institute" />
          </Section>

          <Section title="Drop Zone">
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" required />
              <Field label="Last name" required />
            </div>
            <Field label="Address" required />
            <div className="grid grid-cols-2 gap-3">
              <Field label="City" required defaultValue="Westchester" />
              <Field label="Postal code" required />
            </div>
            <Field label="Country" required defaultValue="United States" />
          </Section>

          <Section title="Tribute">
            <Field label="Card number" required placeholder="•••• •••• •••• ••••" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Expiry" required placeholder="MM / YY" />
              <Field label="CVC" required placeholder="•••" />
            </div>
            <div className="flex items-center gap-2 pt-2 font-xmen-mono text-[11px] uppercase tracking-widest text-xmen-ink-soft">
              <Lock className="h-3 w-3" /> Encrypted through the Institute mainframe
            </div>
          </Section>
        </div>

        <aside className="h-fit border-2 border-xmen-ink bg-white p-6 xm-frame xm-frame-red">
          <div className="flex items-center gap-2">
            <XLogo className="h-6 w-6 text-xmen-red" />
            <h2 className="font-xmen-display text-sm uppercase tracking-[0.3em] text-xmen-red">Mission Roster</h2>
          </div>
          <ul className="mt-5 space-y-3 border-y-2 border-xmen-ink py-5">
            {detailed.map(({ product, qty, lineTotal }) => (
              <li key={product.slug} className="flex items-center gap-3 text-sm">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden border-2 border-xmen-ink">
                  <img src={product.image} alt="" className="h-full w-full object-cover" />
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full border border-xmen-ink bg-xmen-red px-1 text-[10px] font-bold text-white">{qty}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate font-xmen-display text-sm">{product.name}</div>
                  <div className="text-[11px] text-xmen-ink-soft">{product.category}</div>
                </div>
                <div className="font-xmen-mono text-sm">${lineTotal.toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-xmen-ink-soft">Subtotal</dt><dd className="font-xmen-mono">${subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-xmen-ink-soft">Blackbird</dt><dd className="font-xmen-mono">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</dd></div>
            <div className="flex justify-between"><dt className="text-xmen-ink-soft">Tax</dt><dd className="font-xmen-mono">${tax.toFixed(2)}</dd></div>
          </dl>
          <div className="my-4 h-[2px] bg-xmen-ink" />
          <div className="flex items-baseline justify-between">
            <span className="font-xmen-display text-sm uppercase tracking-[0.3em]">Total</span>
            <span className="font-xmen-display text-3xl text-xmen-red">${total.toFixed(2)}</span>
          </div>
          <button type="submit" className="mt-6 w-full border-2 border-xmen-ink bg-xmen-red px-6 py-4 font-xmen-display text-xs uppercase tracking-[0.3em] text-white hover:bg-xmen-yellow hover:text-xmen-ink">
            Deploy the Blackbird
          </button>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-2 border-xmen-ink bg-white p-6">
      <h2 className="font-xmen-display text-sm uppercase tracking-[0.3em] text-xmen-red">{title}</h2>
      <div className="mt-5 space-y-3">{children}</div>
    </section>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="block font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">{label}</span>
      <input {...props} className="mt-1 w-full px-4 py-3 font-xmen-mono text-sm" />
    </label>
  );
}
