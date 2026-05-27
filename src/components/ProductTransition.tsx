import { useEffect, useState } from "react";
import { BatLogo } from "./BatLogo";

/**
 * Cinematic product page transition.
 * Sequence:
 *  1. Whole screen goes black
 *  2. A yellow light ray rises from the bottom and lights the centre
 *  3. The Bat logo is revealed in the centre
 *  4. Black fog fills the screen, then slowly fades to reveal the page
 */
export function ProductTransition() {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setActive(false), 2300);
    return () => clearTimeout(t);
  }, []);

  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden pt-curtain">
      {/* Black curtain */}
      <div className="absolute inset-0 bg-background" />

      {/* Rising light ray from bottom */}
      <div
        className="pt-ray absolute left-1/2 bottom-0 h-[120vh] w-[80vw] -translate-x-1/2 opacity-0"
        style={{ background: "var(--gradient-ray)" }}
      />
      <div
        className="pt-ray absolute left-1/2 bottom-0 h-[120vh] w-[30vw] -translate-x-1/2 opacity-0 blur-2xl"
        style={{
          background:
            "linear-gradient(to top, color-mix(in oklab, var(--signal) 80%, transparent), transparent 70%)",
          animationDelay: "60ms",
        }}
      />

      {/* Bat logo reveal */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="pt-bat relative opacity-0">
          <div className="absolute inset-0 -m-16 rounded-full bg-signal/30 blur-3xl" />
          <BatLogo className="relative h-28 w-56 text-signal drop-shadow-[0_0_60px_var(--signal-glow)] sm:h-40 sm:w-80" />
        </div>
      </div>

      {/* Black fog fill + fade */}
      <div
        className="pt-fog absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.02 0 0 / 0.95) 0%, oklch(0.02 0 0) 70%)",
        }}
      />
    </div>
  );
}
