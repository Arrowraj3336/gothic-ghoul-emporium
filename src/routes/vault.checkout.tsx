import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useVaultCart } from "@/lib/vault-cart";
import { Check, Lock, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { VaultLogo } from "@/components/vault/VaultLogo";

type Step = 1 | 2 | 3;

export const Route = createFileRoute("/vault/checkout")({
  head: () => ({ meta: [{ title: "Submit tribute — Viral Vault" }] }),
  component: VaultCheckoutPage,
});

function VaultCheckoutPage() {
  const { detailed, subtotal, clear } = useVaultCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [done, setDone] = useState(false);

  const [form, setForm] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    card: "",
    exp: "",
    cvc: "",
    nameOnCard: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const shipping = subtotal > 75 || subtotal === 0 ? 0 : 9;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: "" }));
  };

  const validateStep = (s: Step): boolean => {
    const e: Record<string, string> = {};
    const reqEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (s === 1) {
      if (!form.email) e.email = "Required by decree.";
      else if (!reqEmail.test(form.email)) e.email = "Not a valid email.";
      if (form.phone && form.phone.replace(/\D/g, "").length < 7) e.phone = "Too short.";
    }
    if (s === 2) {
      (["firstName", "lastName", "address", "city", "state", "zip"] as const).forEach((k) => {
        if (!form[k]) e[k] = "Required.";
      });
      if (form.zip && !/^\d{5}(-\d{4})?$/.test(form.zip)) e.zip = "Invalid ZIP.";
    }
    if (s === 3) {
      const digits = form.card.replace(/\s/g, "");
      if (!digits) e.card = "Card required.";
      else if (digits.length < 13 || digits.length > 19) e.card = "Card number looks wrong.";
      if (!/^\d{2}\s*\/?\s*\d{2}$/.test(form.exp)) e.exp = "MM / YY";
      if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "3–4 digits.";
      if (!form.nameOnCard) e.nameOnCard = "Required.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) {
      toast.error("Doom requires every field. Try again.");
      return;
    }
    if (step === 3) {
      setDone(true);
      clear();
      toast.success("Tribute accepted", { description: "A sealed decree is on its way." });
      setTimeout(() => navigate({ to: "/vault" }), 3000);
    } else {
      setStep((s) => (s + 1) as Step);
    }
  };

  const progress = useMemo(() => ((step - 1) / 2) * 100, [step]);

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-32 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[var(--vv-green)] bg-white text-[var(--vv-green)]">
          <Check className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-vault-display text-4xl text-[var(--vv-ink)]">Tribute accepted.</h1>
        <p className="mt-3 font-vault-serif italic text-[var(--vv-ink-soft)]">
          A sealed decree is on its way. The throne returns you to the court.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="flex items-center gap-3 text-[var(--vv-green)]">
          <VaultLogo className="h-8 w-8" />
          <div className="text-[11px] uppercase tracking-[0.28em]">Submit tribute</div>
        </div>
        <h1 className="mt-3 font-vault-display text-4xl text-[var(--vv-ink)] sm:text-5xl">By the seal of Doom.</h1>
      </header>

      {/* Stepper */}
      <div className="mb-2 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[var(--vv-ink-soft)]">
        {(["Audience", "Dispatch", "Tribute"] as const).map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span
              className={[
                "grid h-7 w-7 place-items-center border text-[11px] font-vault-heroic",
                step > i + 1
                  ? "border-[var(--vv-green)] bg-[var(--vv-green)] text-white"
                  : step === i + 1
                  ? "border-[var(--vv-green)] text-[var(--vv-green)]"
                  : "border-[var(--vv-green-line)] text-[var(--vv-ink-soft)]",
              ].join(" ")}
            >
              {step > i + 1 ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span className={step === i + 1 ? "text-[var(--vv-green)]" : ""}>{label}</span>
            {i < 2 && <ChevronRight className="h-3 w-3" />}
          </div>
        ))}
      </div>
      <div className="mb-10 h-[2px] w-full bg-[var(--vv-green-line)]">
        <div
          className="h-full bg-[var(--vv-green)] transition-all duration-500"
          style={{ width: `${progress + 33}%` }}
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-3">
        <form onSubmit={onSubmit} className="space-y-5 lg:col-span-2" noValidate>
          {step === 1 && (
            <Section title="Audience with the throne" sub="Your address of record.">
              <Field label="Email" type="email" required value={form.email} onChange={set("email")} error={errors.email} />
              <Field label="Phone (optional)" type="tel" value={form.phone} onChange={set("phone")} error={errors.phone} />
            </Section>
          )}
          {step === 2 && (
            <Section title="Imperial dispatch" sub="Where shall Doom's couriers ride?">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name" required value={form.firstName} onChange={set("firstName")} error={errors.firstName} />
                <Field label="Last name" required value={form.lastName} onChange={set("lastName")} error={errors.lastName} />
              </div>
              <Field label="Keep / street" required value={form.address} onChange={set("address")} error={errors.address} />
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="City" required value={form.city} onChange={set("city")} error={errors.city} />
                <Field label="Province" required value={form.state} onChange={set("state")} error={errors.state} />
                <Field label="ZIP" required value={form.zip} onChange={set("zip")} error={errors.zip} />
              </div>
            </Section>
          )}
          {step === 3 && (
            <Section title="Tender of tribute" sub="Sealed against the imperial ledger.">
              <Field label="Card number" placeholder="1234 5678 9012 3456" required value={form.card} onChange={set("card")} error={errors.card} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Expiry" placeholder="MM / YY" required value={form.exp} onChange={set("exp")} error={errors.exp} />
                <Field label="CVC" placeholder="123" required value={form.cvc} onChange={set("cvc")} error={errors.cvc} />
              </div>
              <Field label="Name on card" required value={form.nameOnCard} onChange={set("nameOnCard")} error={errors.nameOnCard} />
              <div className="flex items-center gap-2 border border-[var(--vv-green-line)] bg-[var(--vv-green-soft)] px-4 py-3 text-xs text-[var(--vv-ink-soft)]">
                <Lock className="h-3.5 w-3.5 text-[var(--vv-green)]" />
                256-bit rune-binding · cards are never stored in the keep.
              </div>
            </Section>
          )}

          <div className="flex items-center justify-between pt-2">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as Step)}
                className="text-[11px] uppercase tracking-[0.22em] text-[var(--vv-ink-soft)] hover:text-[var(--vv-green)]"
              >
                ← Retreat
              </button>
            ) : (
              <Link
                to="/vault/cart"
                className="text-[11px] uppercase tracking-[0.22em] text-[var(--vv-ink-soft)] hover:text-[var(--vv-green)]"
              >
                ← Back to reliquary
              </Link>
            )}
            <button
              type="submit"
              className="bg-[var(--vv-green)] px-7 py-3 font-vault-heroic text-[12px] uppercase tracking-[0.28em] text-white hover:bg-[var(--vv-green-deep)]"
            >
              {step === 3 ? `Seal · $${total}` : "Continue"}
            </button>
          </div>
        </form>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 border border-[var(--vv-green-line)] bg-white p-6">
            <h2 className="font-vault-heroic text-[13px] uppercase tracking-[0.28em] text-[var(--vv-green)]">
              Sovereign's tally
            </h2>
            <ul className="mt-4 space-y-3">
              {detailed.map(({ product, qty, lineTotal }) => (
                <li key={product.slug} className="flex items-center gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden bg-[var(--vv-green-soft)]">
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-[var(--vv-green)] text-[10px] font-medium text-white">
                      {qty}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm text-[var(--vv-ink)]">{product.name}</div>
                    <div className="text-xs text-[var(--vv-ink-soft)]">${product.price}</div>
                  </div>
                  <div className="font-vault-heroic text-sm text-[var(--vv-green)]">${lineTotal}</div>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-2 border-t border-[var(--vv-green-line)] pt-4 text-sm">
              <Row label="Subtotal" value={`$${subtotal}`} />
              <Row label="Dispatch" value={shipping === 0 ? "Free" : `$${shipping}`} />
              <Row label="Levy" value={`$${tax}`} />
              <div className="flex justify-between border-t border-[var(--vv-green-line)] pt-3 text-base font-medium">
                <dt>Total tribute</dt>
                <dd className="font-vault-heroic text-[var(--vv-green)]">${total}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="border border-[var(--vv-green-line)] bg-white p-6 sm:p-8">
      <h2 className="font-vault-heroic text-[14px] uppercase tracking-[0.22em] text-[var(--vv-green)]">{title}</h2>
      {sub && <p className="mt-1 font-vault-serif text-sm italic text-[var(--vv-ink-soft)]">{sub}</p>}
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] uppercase tracking-[0.22em] text-[var(--vv-ink-soft)]">{label}</span>
      <input
        {...props}
        aria-invalid={!!error}
        className={[
          "w-full border bg-white px-4 py-3 text-sm text-[var(--vv-ink)] placeholder:text-[var(--vv-ink-soft)] focus:outline-none",
          error ? "border-[#a13b2a] focus:border-[#a13b2a]" : "border-[var(--vv-green-line)] focus:border-[var(--vv-green)]",
        ].join(" ")}
      />
      {error && <span className="mt-1 block text-[11px] text-[#a13b2a]">{error}</span>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-[var(--vv-ink-soft)]">{label}</dt>
      <dd className="text-[var(--vv-ink)]">{value}</dd>
    </div>
  );
}
