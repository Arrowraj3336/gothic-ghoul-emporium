import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { VaultLogo } from "./VaultLogo";

/**
 * Wonder Woman themed transition for the Viral Vault sub-site.
 * Twin crimson/blue panels meet at center, a golden Lasso of Truth spins out,
 * a star bursts behind the WW monogram, then panels retract.
 */
export function VaultTransition() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [playKey, setPlayKey] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!path.startsWith("/vault")) return;
    if (typeof window !== "undefined") {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
    }
    setPlayKey((k) => k + 1);
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1600);
    return () => clearTimeout(t);
  }, [path]);

  if (!visible) return null;

  return (
    <div
      key={playKey}
      className="vault-transition-root pointer-events-none fixed inset-0 z-[200] overflow-hidden"
      aria-hidden="true"
    >
      {/* Crimson panel from left */}
      <div className="vt-panel vt-panel-left" />
      {/* Royal blue panel from right */}
      <div className="vt-panel vt-panel-right" />

      {/* Star burst behind logo */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="vt-burst" />
      </div>

      {/* Spinning Lasso of Truth */}
      <div className="absolute inset-0 grid place-items-center">
        <svg
          viewBox="0 0 200 200"
          className="vt-lasso h-[min(70vw,520px)] w-[min(70vw,520px)]"
          fill="none"
        >
          <defs>
            <linearGradient id="vt-lasso-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fde68a" />
              <stop offset="50%" stopColor="#f5c33b" />
              <stop offset="100%" stopColor="#a87514" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="88" stroke="url(#vt-lasso-grad)" strokeWidth="2" strokeDasharray="6 8" />
          <circle cx="100" cy="100" r="72" stroke="url(#vt-lasso-grad)" strokeWidth="1.2" strokeDasharray="3 6" opacity="0.7" />
          <circle cx="100" cy="100" r="56" stroke="url(#vt-lasso-grad)" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.5" />
        </svg>
      </div>

      {/* WW monogram logo bloom */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="vt-logo">
          <VaultLogo className="h-24 w-24 drop-shadow-[0_0_40px_rgba(245,195,59,0.55)]" />
        </div>
      </div>
    </div>
  );
}
