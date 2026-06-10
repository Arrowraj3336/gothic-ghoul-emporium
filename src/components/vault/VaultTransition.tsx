import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { VaultLogo } from "./VaultLogo";

/**
 * Dr. Doom themed transition for the Viral Vault sub-site.
 * Two armored cloak panels (forest emerald + arcane violet) sweep in,
 * an arcane sigil rotates, a violet spark bursts, then the Doom mask blooms
 * before the panels retract.
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
    const t = setTimeout(() => setVisible(false), 1700);
    return () => clearTimeout(t);
  }, [path]);

  if (!visible) return null;

  return (
    <div
      key={playKey}
      className="vault-transition-root pointer-events-none fixed inset-0 z-[200] overflow-hidden"
      aria-hidden="true"
    >
      <div className="vt-panel vt-panel-left" />
      <div className="vt-panel vt-panel-right" />

      <div className="absolute inset-0 grid place-items-center">
        <div className="vt-burst" />
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <svg
          viewBox="0 0 200 200"
          className="vt-lasso h-[min(72vw,540px)] w-[min(72vw,540px)]"
          fill="none"
        >
          <defs>
            <linearGradient id="vt-rune-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f0cf7a" />
              <stop offset="50%" stopColor="#c8993f" />
              <stop offset="100%" stopColor="#7c4ddb" />
            </linearGradient>
          </defs>
          <circle cx="100" cy="100" r="92" stroke="url(#vt-rune-grad)" strokeWidth="1.6" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="76" stroke="url(#vt-rune-grad)" strokeWidth="1.1" strokeDasharray="2 5" opacity="0.75" />
          <circle cx="100" cy="100" r="58" stroke="url(#vt-rune-grad)" strokeWidth="0.8" strokeDasharray="6 3" opacity="0.55" />
          {[0, 90, 180, 270].map((a) => (
            <g key={a} transform={`rotate(${a} 100 100)`}>
              <path d="M100 4 L 104 14 L 96 14 Z" fill="url(#vt-rune-grad)" />
            </g>
          ))}
          <path
            d="M100 70 L106 88 L124 88 L110 100 L116 118 L100 108 L84 118 L90 100 L76 88 L94 88 Z"
            fill="none"
            stroke="url(#vt-rune-grad)"
            strokeWidth="1.4"
            opacity="0.9"
          />
        </svg>
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <div className="vt-logo">
          <VaultLogo className="h-28 w-28 drop-shadow-[0_0_40px_rgba(124,77,219,0.7)]" />
        </div>
      </div>
    </div>
  );
}
