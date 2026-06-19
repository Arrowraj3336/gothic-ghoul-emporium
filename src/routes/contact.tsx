import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { CerebroIcon } from "@/components/XmenIcons";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Cerebro — Contact Viral Vault" },
      { name: "description", content: "Get in touch with the Institute. Press, partnerships, custom commissions — Cerebro reads every message." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-[60vh] xm-hex opacity-70" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <CerebroIcon className="mx-auto h-14 w-14 text-xmen-red xm-float" />
          <div className="mt-6 font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// CEREBRO ONLINE</div>
          <h1 className="mt-3 font-xmen-display text-5xl sm:text-7xl">REACH THE INSTITUTE.</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-xmen-ink-soft">
            Questions, custom commissions, press, or a transmission for Professor X — Cerebro reads every signal.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              { Icon: Mail, label: "Email", value: "cerebro@viral.vault" },
              { Icon: Phone, label: "Hotline", value: "+1 (555) 197-6321" },
              { Icon: MapPin, label: "Institute", value: "Greymalkin Ln, Westchester, NY" },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex gap-4 border-2 border-xmen-ink bg-white p-5 xm-frame">
                <div className="grid h-10 w-10 shrink-0 place-items-center border-2 border-xmen-ink bg-xmen-yellow text-xmen-ink">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">{label}</div>
                  <div className="mt-1 font-xmen-display text-lg">{value}</div>
                </div>
              </div>
            ))}
            <div className="border-2 border-xmen-ink bg-xmen-yellow p-5">
              <div className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-red">// CEREBRO HOURS</div>
              <div className="mt-3 space-y-1 font-xmen-mono text-xs text-xmen-ink">
                <div className="flex justify-between"><span>MON — FRI</span><span>09:00 — 19:00</span></div>
                <div className="flex justify-between"><span>SAT — SUN</span><span>BY APPOINTMENT</span></div>
                <div className="flex justify-between text-xmen-red"><span>X-EMERGENCY</span><span>24 / 7</span></div>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Signal received.", { description: "The Professor will be in touch." });
            }}
            className="border-2 border-xmen-ink bg-white p-6 sm:p-8 xm-frame xm-frame-red"
          >
            <h2 className="font-xmen-display text-3xl">SEND A TRANSMISSION</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Your codename" required />
              <Field label="Email" type="email" required />
            </div>
            <Field label="Subject" required className="mt-4" />
            <label className="mt-4 block">
              <span className="block font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">Message</span>
              <textarea
                required
                rows={6}
                placeholder="Cerebro is listening."
                className="mt-1 w-full px-4 py-3 font-xmen-mono text-sm"
              />
            </label>
            <button
              disabled={sent}
              className="mt-6 w-full border-2 border-xmen-ink bg-xmen-red px-6 py-4 font-xmen-display text-xs uppercase tracking-[0.3em] text-white transition hover:bg-xmen-yellow hover:text-xmen-ink disabled:opacity-60"
            >
              {sent ? "Signal Received" : "Transmit to Cerebro"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({ label, className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="block font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">{label}</span>
      <input {...props} className="mt-1 w-full px-4 py-3 font-xmen-mono text-sm" />
    </label>
  );
}
