import { useEffect, useRef, useState } from "react";

/**
 * Site-wide animated background for the X-Men (Viral Vault) scope.
 * - Fixed layer, pointer-events: none, sits behind all content.
 * - Slow-drifting hex grid + faint parallax X insignias + gradient orbs.
 * - Parallax is throttled via requestAnimationFrame + scroll listener.
 * - Fully suppressed under prefers-reduced-motion.
 */
export function XmenBackground() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let y = 0;
    const onScroll = () => {
      y = window.scrollY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = layerRef.current;
        if (!el) return;
        el.style.setProperty("--xm-bg-y", `${y * 0.15}px`);
        el.style.setProperty("--xm-bg-y2", `${y * 0.35}px`);
        el.style.setProperty("--xm-bg-rot", `${y * 0.02}deg`);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [reduced]);

  return (
    <div ref={layerRef} className="xm-bg" aria-hidden="true">
      <div className="xm-bg-grid" />
      <div className="xm-bg-orb xm-bg-orb-a" />
      <div className="xm-bg-orb xm-bg-orb-b" />
      <div className="xm-bg-orb xm-bg-orb-c" />
      <svg className="xm-bg-x xm-bg-x-a" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M12 12 L45 45 L12 78 L22 88 L55 55 L88 88 L98 78 L65 45 L98 12 L88 2 L55 35 L22 2 Z" fill="currentColor" />
      </svg>
      <svg className="xm-bg-x xm-bg-x-b" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M12 12 L45 45 L12 78 L22 88 L55 55 L88 88 L98 78 L65 45 L98 12 L88 2 L55 35 L22 2 Z" fill="currentColor" />
      </svg>
      <svg className="xm-bg-x xm-bg-x-c" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M12 12 L45 45 L12 78 L22 88 L55 55 L88 88 L98 78 L65 45 L98 12 L88 2 L55 35 L22 2 Z" fill="currentColor" />
      </svg>
    </div>
  );
}
