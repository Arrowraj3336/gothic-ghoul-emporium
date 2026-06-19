import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { XLogo } from "./XmenIcons";

/**
 * X-Men transition: Cerebro scan + slashing X reveal.
 * Plays once per session on the home page; replays every product page.
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
      if (sessionStorage.getItem("xmen-home-loaded")) return;
      sessionStorage.setItem("xmen-home-loaded", "1");
    }

    setActive(true);
    const t = setTimeout(() => setActive(false), 2600);
    return () => clearTimeout(t);
  }, [path]);

  if (!active) return null;

  return (
    <div className="xmen-loader pointer-events-none fixed inset-0 z-[200] overflow-hidden">
      <div className="xm-sweep absolute inset-0 xm-halftone opacity-20" />
      <div className="xm-slash absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 bg-xmen-red shadow-[0_0_30px_8px_rgba(215,25,32,0.8)]" />
      <div className="absolute inset-0 grid place-items-center">
        <div className="xm-ring h-40 w-40 rounded-full border-4 border-xmen-red" />
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <div className="xm-x relative">
          <div className="absolute inset-0 -m-10 rounded-full bg-xmen-yellow/40 blur-3xl" />
          <XLogo className="relative h-32 w-32 text-xmen-red drop-shadow-[0_0_30px_rgba(215,25,32,0.55)] sm:h-44 sm:w-44" />
        </div>
      </div>
    </div>
  );
}
