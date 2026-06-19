import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { BatSignalSky } from "@/components/BatSignal";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/vault/contact")({
  head: () => ({
    meta: [
      { title: "Signal Us — Contact Dark Decor" },
      { name: "description", content: "Get in touch with the Dark Decor team. Light the bat-signal and we'll answer." },
      { property: "og:title", content: "Contact — Dark Decor" },
      { property: "og:description", content: "Light the signal. We answer after dusk." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="relative">
      <BatSignalSky className="absolute inset-x-0 top-0 h-[60vh] opacity-50" />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-signal">// LIGHT THE SIGNAL</div>
          <h1 className="mt-3 font-display text-5xl sm:text-7xl">Reach the Manor.</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Questions, custom commissions, press, or a vigilante missive — we read every transmission after dusk.
          </p>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Info */}
          <div className="space-y-6">
            {[
              { Icon: Mail, label: "Email", value: "signal@gotham.haus" },
              { Icon: Phone, label: "Phone", value: "+1 (555) 010-1939" },
              { Icon: MapPin, label: "Workshop", value: "Pier 19, Lower Gotham, NJ" },
            ].map(({ Icon, label, value }) => (
              <div key={label} className="flex gap-4 border border-border bg-card/40 p-5">
                <div className="grid h-10 w-10 shrink-0 place-items-center border border-signal/40 text-signal">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
                  <div className="mt-1 font-display text-base">{value}</div>
                </div>
              </div>
            ))}
            <div className="border border-border bg-card/40 p-5">
              <div className="font-mono text-[10px] uppercase tracking-widest text-signal">// HOURS</div>
              <div className="mt-3 space-y-1 font-mono text-xs text-muted-foreground">
                <div className="flex justify-between"><span>MON — FRI</span><span>16:00 — 02:00</span></div>
                <div className="flex justify-between"><span>SAT — SUN</span><span>BY APPOINTMENT</span></div>
                <div className="flex justify-between text-signal"><span>SIGNAL</span><span>ALWAYS ON</span></div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Signal received.", { description: "We'll answer after dusk." });
            }}
            className="border border-border bg-card/40 p-8"
          >
            <h2 className="font-display text-2xl">Send a Transmission</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Your name" required />
              <Field label="Email" type="email" required />
            </div>
            <Field label="Subject" required className="mt-4" />
            <label className="mt-4 block">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Message</span>
              <textarea
                required
                rows={6}
                placeholder="Speak freely. The night is listening."
                className="mt-1 w-full border border-border bg-background px-4 py-3 font-mono text-sm placeholder:text-muted-foreground/60 focus:border-signal focus:outline-none"
              />
            </label>
            <button
              disabled={sent}
              className="mt-6 w-full border border-signal bg-signal px-6 py-4 font-display text-xs uppercase tracking-[0.3em] text-primary-foreground transition hover:shadow-signal disabled:opacity-60"
            >
              {sent ? "Signal Received" : "Light the Signal"}
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
      <span className="block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        {...props}
        className="mt-1 w-full border border-border bg-background px-4 py-3 font-mono text-sm placeholder:text-muted-foreground/60 focus:border-signal focus:outline-none"
      />
    </label>
  );
}
