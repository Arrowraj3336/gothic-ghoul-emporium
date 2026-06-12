import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Viral Vault homepage loader.
 * White stage → Dr. Doom silhouette levitating with cloak sway → a green focus
 * laser races in from the right edge to the center → the screen flashes green →
 * the homepage is revealed.
 *
 * Plays ONCE per session, only on the first visit to /vault homepage
 * (not on /vault/shop, /vault/cart, etc., and not on subsequent client-side
 * navigations back to /vault).
 */
export function VaultTransition() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only on the vault homepage
    if (path !== "/vault" && path !== "/vault/") return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Show once per browser session
    try {
      if (sessionStorage.getItem("vv-intro-played") === "1") return;
      sessionStorage.setItem("vv-intro-played", "1");
    } catch {}

    setVisible(true);
    const t = setTimeout(() => setVisible(false), 3500);
    return () => clearTimeout(t);
  }, [path]);

  if (!visible) return null;

  return (
    <div
      className="vault-loader-root pointer-events-none fixed inset-0 z-[200] overflow-hidden"
      aria-hidden="true"
    >
      {/* Doom silhouette, levitating center */}
      <div className="vt-doom absolute inset-0 grid place-items-center">
        <div className="vt-doom-inner relative h-[min(70vh,540px)] w-[min(70vh,540px)]">
          <DoomFigure className="h-full w-full text-[#0f3d26]" />
        </div>
      </div>

      {/* Incoming green focus laser — from right edge to dead center */}
      <div className="absolute inset-0 grid place-items-center">
        <div
          className="vt-laser h-[6px] w-1/2"
          style={{ background: "linear-gradient(90deg, rgba(15,61,38,0) 0%, #14563a 30%, #2a8c5e 70%, #ffffff 100%)" }}
        />
      </div>
      <div className="absolute inset-0 grid place-items-center">
        <div
          className="vt-laser-core h-2 w-2 rounded-full"
          style={{ background: "#fff", boxShadow: "0 0 20px 8px #2a8c5e, 0 0 80px 30px rgba(15,61,38,0.7)" }}
        />
      </div>

      {/* Green flash sweep at impact */}
      <div className="vt-flash absolute inset-0" />
    </div>
  );
}

/** Hooded Doom — minimal vector silhouette with a flowing cloak. */
function DoomFigure({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 320" className={className} fill="none" aria-hidden="true">
      {/* Cloak — sways via parent transform */}
      <g className="vt-cloak">
        <path
          d="M40 110 C 30 180, 10 240, 24 320 L 60 320 C 60 250, 80 200, 96 170 Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M200 110 C 210 180, 230 240, 216 320 L 180 320 C 180 250, 160 200, 144 170 Z"
          fill="currentColor"
          opacity="0.92"
        />
        <path
          d="M70 120 C 65 200, 60 270, 70 320 L 170 320 C 180 270, 175 200, 170 120 Z"
          fill="currentColor"
          opacity="0.7"
        />
        {/* Cloak inner folds */}
        <path
          d="M90 160 C 92 220, 95 280, 100 320"
          stroke="#ffffff"
          strokeWidth="1"
          opacity="0.18"
          fill="none"
        />
        <path
          d="M150 160 C 148 220, 145 280, 140 320"
          stroke="#ffffff"
          strokeWidth="1"
          opacity="0.18"
          fill="none"
        />
      </g>

      {/* Body / chest plate */}
      <path
        d="M85 130 L 155 130 L 162 220 L 78 220 Z"
        fill="currentColor"
      />
      {/* Belt */}
      <rect x="80" y="210" width="80" height="8" fill="#ffffff" opacity="0.25" />
      {/* Sash buckle */}
      <circle cx="120" cy="214" r="5" fill="#ffffff" opacity="0.4" />

      {/* Hood */}
      <path
        d="M70 60 C 80 30, 160 30, 170 60 L 175 140 C 160 160, 80 160, 65 140 Z"
        fill="currentColor"
      />

      {/* Mask faceplate */}
      <path
        d="M90 75 C 96 65, 144 65, 150 75 L 150 130 C 145 145, 130 152, 120 152 C 110 152, 95 145, 90 130 Z"
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      {/* Eye slits */}
      <path d="M100 95 L 114 92 L 114 102 L 100 102 Z" fill="currentColor" />
      <path d="M140 95 L 126 92 L 126 102 L 140 102 Z" fill="currentColor" />
      {/* Mouth grille */}
      <rect x="108" y="120" width="24" height="2" fill="currentColor" />
      <rect x="110" y="126" width="20" height="2" fill="currentColor" />
      <rect x="113" y="132" width="14" height="2" fill="currentColor" />

      {/* Arms — folded, regal */}
      <path
        d="M82 138 L 60 200 L 78 210 L 95 158 Z"
        fill="currentColor"
      />
      <path
        d="M158 138 L 180 200 L 162 210 L 145 158 Z"
        fill="currentColor"
      />
    </svg>
  );
}
