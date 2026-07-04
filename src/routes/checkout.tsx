import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useXmenCart } from "@/lib/vault-cart";
import { Lock } from "lucide-react";
import { XLogo } from "@/components/XmenIcons";
import { toast } from "sonner";
import { formatINR } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Deploy — Checkout | Viral Vault" }] }),
  component: Checkout,
});

function Checkout() {
  const { detailed, subtotal, clear, count } = useXmenCart();
  const navigate = useNavigate();
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 14;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const stockIssues = detailed.filter(({ product, qty }) => qty > product.stock || product.stock <= 0);
  const canCheckout = stockIssues.length === 0;

  if (count === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-xmen-display text-3xl">Nothing to deploy.</h1>
        <Link to="/shop" className="mt-6 inline-block rounded-full border border-xmen-red px-5 py-2 font-xmen-display text-xs uppercase tracking-[0.3em] text-xmen-red">
          To the Armory
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// secure channel</div>
        <h1 className="mt-2 font-xmen-display text-4xl sm:text-6xl tracking-tight">Deploy squad.</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!canCheckout) {
            const names = stockIssues.map((s) => s.product.name).join(", ");
            toast.error("Order blocked — stock issue", { description: `${names} exceeds Vault inventory. Adjust your cart.` });
            navigate({ to: "/cart" });
            return;
          }
          const id = `XM-${Math.floor(Math.random() * 99999).toString().padStart(5, "0")}`;
          toast.success("Cerebro received your transmission");
          const t = total;
          clear();
          navigate({ to: "/order-success", search: { id, total: t } as any });
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
              <Field label="City" required defaultValue="Mumbai" />
              <Field label="Postal code" required />
            </div>
            <Field label="Country" required defaultValue="India" />
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

        <aside className="h-fit rounded-2xl border border-xmen-line bg-white p-6" style={{ boxShadow: "0 30px 60px -30px rgba(200,32,42,0.25)" }}>
          <div className="flex items-center gap-2">
            <XLogo className="h-5 w-5 text-xmen-red" />
            <h2 className="font-xmen-display text-sm uppercase tracking-[0.3em] text-xmen-red">Mission Roster</h2>
          </div>
          <ul className="mt-5 space-y-3 border-y border-xmen-line py-5">
            {detailed.map(({ product, qty, lineTotal }) => (
              <li key={product.slug} className="flex items-center gap-3 text-sm">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-xmen-line bg-white">
                  <img src={product.image} alt="" className="xm-product-img h-full w-full object-contain p-1" />
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-xmen-red px-1 text-[10px] font-bold text-white">{qty}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate font-xmen-display text-sm">{product.name}</div>
                  <div className="text-[11px] text-xmen-ink-soft">{product.category}</div>
                </div>
                <div className="font-xmen-mono text-sm whitespace-nowrap">{formatINR(lineTotal)}</div>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-xmen-ink-soft">Subtotal</dt><dd className="font-xmen-mono">{formatINR(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-xmen-ink-soft">Blackbird</dt><dd className="font-xmen-mono">{shipping === 0 ? "FREE" : formatINR(shipping)}</dd></div>
            <div className="flex justify-between"><dt className="text-xmen-ink-soft">Tax</dt><dd className="font-xmen-mono">{formatINR(tax)}</dd></div>
          </dl>
          <div className="my-4 h-px bg-xmen-line" />
          <div className="flex items-baseline justify-between">
            <span className="font-xmen-display text-sm uppercase tracking-[0.3em]">Total</span>
            <span className="font-xmen-display text-3xl text-xmen-red">{formatINR(total)}</span>
          </div>
          <button type="submit" className="mt-6 w-full rounded-full bg-xmen-red px-6 py-4 font-xmen-display text-xs uppercase tracking-[0.3em] text-white hover:bg-xmen-ink">
            Deploy the Blackbird
          </button>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-xmen-line bg-white p-6">
      <h2 className="font-xmen-display text-sm uppercase tracking-[0.3em] text-xmen-red">{title}</h2>
      <div className="mt-5 space-y-3">{children}</div>
    </section>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="block font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">{label}</span>
      <input {...props} className="mt-1 w-full rounded-xl px-4 py-3 font-xmen-mono text-sm" />
    </label>
  );
}
