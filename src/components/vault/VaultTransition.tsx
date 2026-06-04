import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { VaultLogo } from "./VaultLogo";

/**
 * Clean, editorial white-theme transition for the Viral Vault sub-site.
 * Plays only when navigating between /vault routes. A pair of cream panels
 * slide in from the edges, meet at center with a logo bloom, then retract.
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
    const t = setTimeout(() => setVisible(false), 1400);
    return () => clearTimeout(t);
  }, [path]);

  if (!visible) return null;

  return (
    <div
      key={playKey}
      className="vault-transition-root pointer-events-none fixed inset-0 z-[200] overflow-hidden"
      aria-hidden="true"
    >
      <div className="vt-panel vt-panel-top" />
      <div className="vt-panel vt-panel-bottom" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="vt-logo">
          <VaultLogo className="h-16 w-16 text-neutral-900" />
        </div>
      </div>
      <div className="vt-line" />
    </div>
  );
}
