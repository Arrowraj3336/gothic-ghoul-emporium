import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";


/**
 * X-Mansion gate loader — v3 (fast, GPU-only).
 * Two black diagonal panels slice in as an X, a red seam ignites,
 * an X insignia strokes on, then a radial flash reveals the page.
 * Total runtime ≈ 900ms. Runs once per session on home, on every product page.
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
      if (sessionStorage.getItem("xmen-home-loaded-v3")) return;
      sessionStorage.setItem("xmen-home-loaded-v3", "1");
    }

    setActive(true);
    const t = setTimeout(() => setActive(false), 950);
    return () => clearTimeout(t);
  }, [path]);

  if (!active) return null;

  return (
    <div className="xm-gate2" aria-hidden="true">
      <div className="xm-gate2-panel xm-gate2-nw" />
      <div className="xm-gate2-panel xm-gate2-ne" />
      <div className="xm-gate2-panel xm-gate2-sw" />
      <div className="xm-gate2-panel xm-gate2-se" />
      <div className="xm-gate2-seam xm-gate2-seam-a" />
      <div className="xm-gate2-seam xm-gate2-seam-b" />
      <svg className="xm-gate2-mark" viewBox="0 0 120 120" aria-hidden="true">
        <path
          d="M18 18 L52 52 L18 86 L34 102 L60 76 L86 102 L102 86 L68 52 L102 18 L86 2 L60 28 L34 2 Z"
          fill="none" stroke="#c8202a" strokeWidth="3" strokeLinejoin="round"
          pathLength={1}
        />
      </svg>
      <div className="xm-gate2-flash" />
    </div>
  );
}
