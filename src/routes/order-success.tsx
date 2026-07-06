import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Package, ShieldCheck, Truck } from "lucide-react";
import { xfx } from "@/lib/xmen-fx";
import { formatINR } from "@/lib/utils";
import { xmenCast } from "@/lib/xmen-cast";

export const Route = createFileRoute("/order-success")({
  head: () => ({ meta: [{ title: "Mission Complete — Viral Vault" }, { name: "robots", content: "noindex" }] }),
  component: OrderSuccess,
  validateSearch: (s: Record<string, unknown>) => ({
    total: typeof s.total === "number" ? s.total : 0,
    id: typeof s.id === "string" ? s.id : "",
  }),
});

/**
 * Realistic Cerebro-style order confirmation:
 * PHASE 1 (0-1s):   Scan grid + concentric radar sweep locks on your order.
 * PHASE 2 (1-2s):   Character portrait ensemble fades in (real X-Men PNGs)
 *                   with a shield-lock forming over the center.
 * PHASE 3 (2-3s):   Shield unlocks, "AUTHORISED" hologram type-in.
 * PHASE 4 (3s+):    Overlay lifts, reveals the confirmation card underneath.
 * Reduced-motion: skip the cinematic and go straight to the summary card.
 */
function OrderSuccess() {
  const { total, id } = Route.useSearch();
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);
  const [reduced, setReduced] = useState(false);
  const cast = xmenCast.slice(0, 6);

  useEffect(() => {
    if (!id) { navigate({ to: "/" }); return; }
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) { setReduced(true); setPhase(4); return; }
    xfx.success();
    const t1 = setTimeout(() => setPhase(1), 50);
    const t2 = setTimeout(() => setPhase(2), 1000);
    const t3 = setTimeout(() => setPhase(3), 2000);
    const t4 = setTimeout(() => setPhase(4), 3200);
    return () => { [t1, t2, t3, t4].forEach(clearTimeout); };
  }, [id, navigate]);

  return (
    <div className="relative min-h-[85vh] overflow-hidden">
      {phase < 4 && !reduced && (
        <div
          className="fixed inset-0 z-[210] overflow-hidden bg-white"
          role="status"
          aria-live="polite"
          aria-label="Confirming your order"
        >
          {/* Radar grid + sweep */}
          <div className={`xm-cx-grid ${phase >= 1 ? "is-on" : ""}`} />
          <div className={`xm-cx-sweep ${phase >= 1 ? "is-on" : ""}`} />

          {/* Character ensemble */}
          <div className={`xm-cx-cast ${phase >= 2 ? "is-on" : ""}`}>
            {cast.map((c, i) => (
              <img
                key={c.slug}
                src={c.img}
                alt=""
                className={`xm-cx-cast-item xm-cx-cast-item--${i + 1}`}
                loading="eager"
                decoding="async"
              />
            ))}
          </div>

          {/* Central shield lock */}
          <div className={`xm-cx-shield ${phase >= 2 ? "is-locking" : ""} ${phase >= 3 ? "is-unlocked" : ""}`}>
            <svg viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <linearGradient id="cx-shield-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c8202a" />
                  <stop offset="100%" stopColor="#7a0e16" />
                </linearGradient>
              </defs>
              <path d="M100 6 L184 36 L184 108 Q184 160 100 194 Q16 160 16 108 L16 36 Z"
                    fill="none" stroke="#0b0d10" strokeWidth="4" />
              <path d="M100 6 L184 36 L184 108 Q184 160 100 194 Q16 160 16 108 L16 36 Z"
                    fill="url(#cx-shield-fill)" className="xm-cx-shield-fill" />
              <path d="M55 55 L95 95 L55 135 L70 150 L100 118 L130 150 L145 135 L105 95 L145 55 L130 40 L100 72 L70 40 Z"
                    fill="#ffffff" className="xm-cx-shield-x" />
            </svg>
          </div>

          {/* Hologram text */}
          <div className={`xm-cx-holo ${phase >= 3 ? "is-on" : ""}`}>
            <div className="xm-cx-holo-tag">Cerebro Uplink · Secure</div>
            <div className="xm-cx-holo-title">AUTHORISED</div>
            <div className="xm-cx-holo-sub">Mission {id} · Blackbird dispatched</div>
          </div>
        </div>
      )}

      {/* Confirmation card underneath */}
      <div className="mx-auto max-w-3xl px-4 py-24 sm:py-32 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-xmen-line bg-white shadow-[0_20px_40px_-20px_rgba(200,32,42,0.4)]">
            <CheckCircle2 className="h-8 w-8 text-xmen-red" />
          </div>
          <div className="mt-6 font-xmen-mono text-[10px] uppercase tracking-[0.4em] text-xmen-red">
            Order confirmed
          </div>
          <h1 className="mt-3 font-xmen-display text-4xl sm:text-6xl tracking-tight">
            Mission complete.
          </h1>
          <p className="mt-4 mx-auto max-w-md text-sm text-xmen-ink-soft">
            Cerebro logged your order and the Blackbird is loading up. You'll get a
            tracking email within an hour.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-md rounded-3xl border border-xmen-line bg-white p-6 shadow-[0_20px_60px_-30px_rgba(11,13,16,0.25)]">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-ink-soft">Mission ID</div>
              <div className="mt-1 font-xmen-display text-2xl text-xmen-red">{id}</div>
            </div>
            {total > 0 && (
              <div className="text-right">
                <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-ink-soft">Total</div>
                <div className="mt-1 font-xmen-display text-2xl">{formatINR(total)}</div>
              </div>
            )}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            {[
              { Icon: Package, label: "Packed", note: "today" },
              { Icon: Truck, label: "In transit", note: "1-3 days" },
              { Icon: ShieldCheck, label: "Warranty", note: "5-year" },
            ].map(({ Icon, label, note }) => (
              <div key={label} className="rounded-2xl border border-xmen-line bg-xmen-paper-soft p-3">
                <Icon className="mx-auto h-4 w-4 text-xmen-red" />
                <div className="mt-2 font-xmen-mono text-[9px] uppercase tracking-widest text-xmen-ink">{label}</div>
                <div className="mt-0.5 font-xmen-mono text-[9px] text-xmen-ink-soft">{note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          <Link
            to="/shop"
            className="rounded-full border border-xmen-line px-6 py-3 font-xmen-display text-[11px] uppercase tracking-[0.3em] hover:border-xmen-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2"
          >
            Continue shopping
          </Link>
          <Link
            to="/"
            className="rounded-full bg-xmen-red px-6 py-3 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white hover:bg-xmen-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
