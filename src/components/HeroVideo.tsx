import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
};

/**
 * Bandwidth- and accessibility-aware background video.
 *  - Skips video entirely for prefers-reduced-motion or saveData / 2g connections.
 *  - Lazy-mounts via IntersectionObserver so the file isn't fetched until visible.
 *  - preload="metadata" keeps initial payload light.
 */
export function HeroVideo({ src, poster, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [allowVideo, setAllowVideo] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    // @ts-expect-error connection is non-standard
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const slow = conn && (conn.saveData || /2g/.test(conn.effectiveType ?? ""));
    if (reduceMotion || slow) {
      setAllowVideo(false);
      return;
    }

    const el = containerRef.current;
    if (!el || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      {/* Static fallback (gradient) — always rendered so there's no flash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.12_0.05_25/0.6),transparent_70%)]" />
      {allowVideo && shouldLoad && (
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
        />
      )}
    </div>
  );
}
