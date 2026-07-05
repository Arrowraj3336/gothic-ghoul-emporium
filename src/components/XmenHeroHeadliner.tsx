import { useEffect, useState } from "react";
import { XComicBubble, XBadge } from "./XmenComicAccents";
import heroComic from "@/assets/xmen-hero-comic.png";

/**
 * Homepage headliner — a "looping comic-book video" simulated with the
 * hero comic panel plus animated CSS overlays (speech bubbles, price tags,
 * X-insignia bursts). Cheap, dependency-free, always plays. If the browser
 * has a real MP4 at /xmen-headliner.mp4 it uses that; otherwise the animated
 * comic panel is the fallback and looks like a moving panel on its own.
 *
 * Respects prefers-reduced-motion (via CSS below in styles.css).
 */
export function XmenHeroHeadliner() {
  const [videoOk, setVideoOk] = useState(false);
  useEffect(() => {
    // Try to detect the optional video file — silently ignore if missing.
    const url = "/xmen-headliner.mp4";
    fetch(url, { method: "HEAD" })
      .then((r) => setVideoOk(r.ok))
      .catch(() => setVideoOk(false));
  }, []);

  return (
    <div
      className="relative aspect-square overflow-hidden rounded-[2.5rem] border-2 border-xmen-ink bg-white"
      style={{ boxShadow: "10px 10px 0 rgba(11,13,16,1), 0 40px 80px -40px rgba(75,30,120,0.35)" }}
    >
      {/* Halftone dot texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(#0b0d10 1.2px, transparent 1.2px)",
          backgroundSize: "10px 10px",
        }}
      />

      {/* Optional real video (if present in /public). Muted, looped, playsInline. */}
      {videoOk && (
        <video
          className="absolute inset-0 z-10 h-full w-full object-cover"
          src="/xmen-headliner.mp4"
          poster={heroComic}
          autoPlay
          loop
          muted
          playsInline
          aria-label="X-Men squad selling Viral Vault gear"
        />
      )}

      {/* Fallback / always-visible comic panel */}
      {!videoOk && (
        <>
          <img
            src={heroComic}
            alt="X-Men squad presenting Viral Vault kitchen gear, comic-book style"
            className="relative z-10 h-full w-full object-contain p-4 xm-headliner-pan"
            width={1280}
            height={1280}
          />

          {/* Animated overlay layer — sale badges, X bursts, speech bubbles */}
          <div className="pointer-events-none absolute inset-0 z-20">
            {/* Rotating X-insignia burst — top right */}
            <svg className="xm-headliner-x absolute right-6 top-6 h-16 w-16 text-xmen-red" viewBox="0 0 100 100" aria-hidden="true">
              <path
                d="M12 12 L45 45 L12 78 L22 88 L55 55 L88 88 L98 78 L65 45 L98 12 L88 2 L55 35 L22 2 Z"
                fill="currentColor"
              />
            </svg>

            {/* SOLD stamp pulse — bottom right */}
            <div className="xm-headliner-stamp absolute bottom-8 right-6 rotate-[-14deg] rounded-md border-4 border-xmen-red px-3 py-1 font-xmen-display text-2xl uppercase tracking-widest text-xmen-red">
              SOLD!
            </div>

            {/* Price tag flying in — left */}
            <div className="xm-headliner-tag absolute left-6 top-1/3 flex items-center gap-1.5 rounded-full border-2 border-xmen-ink bg-xmen-yellow px-3 py-1 font-xmen-display text-[11px] uppercase tracking-widest text-xmen-ink"
              style={{ boxShadow: "3px 3px 0 rgba(11,13,16,1)" }}>
              <XBadge className="h-3 w-3" /> ₹4,999
            </div>

            {/* KAPOW starburst — bottom left */}
            <svg className="xm-headliner-pow absolute -left-2 bottom-6 h-24 w-24 text-xmen-yellow" viewBox="0 0 120 120" aria-hidden="true">
              <path
                d="M60 4 L70 34 L98 18 L82 46 L116 52 L86 62 L108 88 L74 78 L82 116 L60 88 L38 116 L46 78 L12 88 L34 62 L4 52 L38 46 L22 18 L50 34 Z"
                fill="currentColor"
                stroke="#0b0d10"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <text x="60" y="66" textAnchor="middle" className="font-xmen-display" fontSize="20" fill="#0b0d10" fontWeight="900">POW!</text>
            </svg>
          </div>

          {/* Speech bubble — animated bob top center */}
          <div className="pointer-events-none absolute inset-x-0 top-4 z-30 flex justify-center">
            <div className="xm-headliner-bubble">
              <XComicBubble text="Gear Up!" />
            </div>
          </div>

          {/* Issue badge — bottom left */}
          <div className="absolute left-4 bottom-4 z-30 inline-flex items-center gap-2 rounded-full border-2 border-xmen-ink bg-white px-3 py-1.5 font-xmen-display text-[10px] uppercase tracking-widest text-xmen-ink"
            style={{ boxShadow: "3px 3px 0 rgba(11,13,16,1)" }}>
            <XBadge className="h-3.5 w-3.5" /> Issue #01 · Now Playing
          </div>
        </>
      )}
    </div>
  );
}
