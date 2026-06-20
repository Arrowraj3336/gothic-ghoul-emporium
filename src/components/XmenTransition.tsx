import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { XLogo } from "./XmenIcons";

/**
 * X-Mansion Gate transition.
 * Four black triangular panels rush in from the corners, sealing the screen
 * into an X shape. A thin red+white seam ignites along the diagonals, the
 * X-Men insignia blooms at center, then the panels retract to reveal the page.
 *
 * Plays once per session on home, and on every product page.
 */
export function XmenTransition() {
  const [active, setActive] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const isHome = path === "/";
    const isProduct = path.startsWith("/products/");
    if (!isHome && !isProduct) return;

    if (isHome) {
      if (sessionStorage.getItem("xmen-home-loaded-v2")) return;
      sessionStorage.setItem("xmen-home-loaded-v2", "1");
    }

    setActive(true);
    const t = setTimeout(() => setActive(false), 2500);
    return () => clearTimeout(t);
  }, [path]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[200] overflow-hidden"
      aria-hidden="true"
    >
      {/* Gate panels — close into an X, then retract */}
      <div className="xm-gate-panel xm-gate-tl" />
      <div className="xm-gate-panel xm-gate-tr" />
      <div className="xm-gate-panel xm-gate-bl" />
      <div className="xm-gate-panel xm-gate-br" />

      {/* Diagonal seams that light up as the panels meet */}
      <div className="xm-gate-seam-1" />
      <div className="xm-gate-seam-2" />

      {/* Center X insignia */}
      <div className="xm-gate-mark">
        <XLogo className="h-full w-full text-[#c8202a] drop-shadow-[0_0_24px_rgba(200,32,42,0.7)]" />
      </div>

      {/* Final flash */}
      <div className="xm-gate-flash" />
    </div>
  );
}
