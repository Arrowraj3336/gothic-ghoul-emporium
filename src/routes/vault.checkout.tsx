import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { BatLogo } from "@/components/BatLogo";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Dark Decor" }] }),
  component: Checkout,
});

function Checkout() {
  const { detailed, subtotal, clear, count } = useCart();
  const [done, setDone] = useState(false);
  const navigate = useNavigate();
  const shipping = subtotal >= 200 || subtotal === 0 ? 0 : 19;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (count === 0 && !done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-display text-3xl">Nothing to checkout.</h1>
        <Link to="/shop" className="mt-6 inline-block border-b border-signal pb-1 font-display text-xs uppercase tracking-[0.3em] text-signal">
          To the Armory
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-32 text-center animate-rise-in">
        <CheckCircle2 className="mx-auto h-16 w-16 text-signal" />
        <h1 className="mt-6 font-display text-4xl">Order received in the night.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          A confirmation has been signaled to your inbox. The bat-courier has been dispatched.
        </p>
        <div className="mx-auto mt-8 inline-flex items-center gap-3 border border-border bg-card/40 px-6 py-3 font-mono text-xs">
          <span className="text-muted-foreground">ORDER</span>
          <span className="text-signal">#GH-{Math.floor(Math.random() * 99999).toString().padStart(5, "0")}</span>
        </div>
        <div className="mt-10">
          <Link to="/" className="border border-signal bg-signal px-7 py-4 font-display text-xs uppercase tracking-[0.3em] text-primary-foreground hover:shadow-signal">
            Return to the Manor
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">// SECURE CHANNEL</div>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Checkout</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Signal received");
          setTimeout(() => { setDone(true); clear(); navigate({ to: "/checkout" }); }, 600);
        }}
        className="grid gap-10 lg:grid-cols-[1fr_400px]"
      >
        <div className="space-y-8">
          <Section title="Contact">
            <Field label="Email" type="email" required placeholder="bruce@wayne.enterprises" />
          </Section>

          <Section title="Shipping Address">
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" required />
              <Field label="Last name" required />
            </div>
            <Field label="Address" required />
            <div className="grid grid-cols-2 gap-3">
              <Field label="City" required defaultValue="Gotham" />
              <Field label="Postal code" required />
            </div>
            <Field label="Country" required defaultValue="United States" />
          </Section>

          <Section title="Payment">
            <Field label="Card number" required placeholder="•••• •••• •••• ••••" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Expiry" required placeholder="MM / YY" />
              <Field label="CVC" required placeholder="•••" />
            </div>
            <div className="flex items-center gap-2 pt-2 text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
              <Lock className="h-3 w-3" /> Encrypted via Wayne Enterprises secure channel
            </div>
          </Section>
        </div>

        {/* Summary */}
        <aside className="h-fit border border-border bg-card/40 p-6">
          <div className="flex items-center gap-2">
            <BatLogo className="h-4 w-8 text-signal" />
            <h2 className="font-display text-xs uppercase tracking-[0.3em] text-signal">Order Summary</h2>
          </div>
          <ul className="mt-5 space-y-3 border-y border-border py-5">
            {detailed.map(({ product, qty, lineTotal }) => (
              <li key={product.slug} className="flex items-center gap-3 text-sm">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-border">
                  <img src={product.image} alt="" className="h-full w-full object-cover" />
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-signal px-1 text-[10px] font-bold text-primary-foreground">{qty}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate font-display text-sm">{product.name}</div>
                  <div className="text-[11px] text-muted-foreground">{product.collection}</div>
                </div>
                <div className="font-mono text-sm">${lineTotal.toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-mono">${subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="font-mono">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd className="font-mono">${tax.toFixed(2)}</dd></div>
          </dl>
          <div className="my-4 h-px bg-border" />
          <div className="flex items-baseline justify-between">
            <span className="font-display text-xs uppercase tracking-[0.3em]">Total</span>
            <span className="font-display text-2xl text-signal text-glow">${total.toFixed(2)}</span>
          </div>
          <button type="submit" className="mt-6 w-full border border-signal bg-signal px-6 py-4 font-display text-xs uppercase tracking-[0.3em] text-primary-foreground hover:shadow-signal">
            Light the Signal
          </button>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-border bg-card/40 p-6">
      <h2 className="font-display text-xs uppercase tracking-[0.3em] text-signal">{title}</h2>
      <div className="mt-5 space-y-3">{children}</div>
    </section>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        {...props}
        className="mt-1 w-full border border-border bg-background px-4 py-3 font-mono text-sm placeholder:text-muted-foreground/60 focus:border-signal focus:outline-none"
      />
    </label>
  );
}
