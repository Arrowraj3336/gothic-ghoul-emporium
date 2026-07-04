import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { xfx } from "@/lib/xmen-fx";
import { formatINR } from "@/lib/utils";

export const Route = createFileRoute("/order-success")({
  head: () => ({ meta: [{ title: "Mission Complete — Viral Vault" }, { name: "robots", content: "noindex" }] }),
  component: OrderSuccess,
  validateSearch: (s: Record<string, unknown>) => ({
    total: typeof s.total === "number" ? s.total : 0,
    id: typeof s.id === "string" ? s.id : "",
  }),
});

function OrderSuccess() {
  const { total, id } = Route.useSearch();
  const navigate = useNavigate();
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    if (!id) { navigate({ to: "/" }); return; }
    xfx.success();
    const t = setTimeout(() => setReveal(true), 2200);
    return () => clearTimeout(t);
  }, [id, navigate]);

  return (
    <div className="relative min-h-[80vh] overflow-hidden">
      {/* Cinematic sequence overlay — X-insignia burst + rings + Mission Complete */}
      {!reveal && (
        <div className="fixed inset-0 z-[210] grid place-items-center overflow-hidden bg-white" role="status" aria-live="polite" aria-label="Order confirmed, mission complete">
          <div className="xm-success-sky" />

          <div className="xm-success-x-wrap">
            <svg className="xm-success-x" viewBox="0 0 120 120" aria-hidden="true">
              <path
                d="M18 18 L52 52 L18 86 L34 102 L60 76 L86 102 L102 86 L68 52 L102 18 L86 2 L60 28 L34 2 Z"
                fill="#c8202a"
              />
            </svg>
            <div className="xm-success-ring" />
            <div className="xm-success-ring xm-success-ring-2" />
            <div className="xm-success-ring xm-success-ring-3" />
          </div>

          <div className="xm-success-text absolute inset-x-0 bottom-[18%] text-center">
            <div className="font-xmen-mono text-[11px] uppercase tracking-[0.4em] text-xmen-red">Cerebro · Confirmed</div>
            <div className="mt-3 font-xmen-display text-4xl sm:text-6xl tracking-tight text-xmen-ink">
              MISSION COMPLETE.
            </div>
          </div>
        </div>
      )}

      {/* Order summary */}
      <div className="mx-auto max-w-2xl px-4 py-24 sm:py-32 text-center animate-fade-in">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-xmen-line bg-white shadow-[0_20px_40px_-20px_rgba(200,32,42,0.4)]">
          <CheckCircle2 className="h-10 w-10 text-xmen-red" />
        </div>
        <h1 className="mt-8 font-xmen-display text-4xl sm:text-6xl tracking-tight">Squad deployed.</h1>
        <p className="mt-4 text-sm text-xmen-ink-soft max-w-md mx-auto">
          Cerebro has logged your order. The Blackbird is en route from the Westchester Institute.
        </p>
        <div className="mx-auto mt-8 inline-flex flex-col items-center gap-2 rounded-2xl border border-xmen-line bg-white px-8 py-5">
          <span className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-ink-soft">Mission ID</span>
          <span className="font-xmen-display text-2xl text-xmen-red">{id}</span>
          {total > 0 && (
            <span className="font-xmen-mono text-xs text-xmen-ink-soft">Total charged · {formatINR(total)}</span>
          )}
        </div>
        <div className="mt-10 flex justify-center gap-3">
          <Link to="/shop" className="rounded-full border border-xmen-line px-6 py-3 font-xmen-display text-[11px] uppercase tracking-[0.3em] hover:border-xmen-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2">
            Continue browsing
          </Link>
          <Link to="/" className="rounded-full bg-xmen-red px-6 py-3 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white hover:bg-xmen-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2">
            To the Institute
          </Link>
        </div>
      </div>
    </div>
  );
}
