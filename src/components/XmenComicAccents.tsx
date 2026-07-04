/**
 * Comic-book style X-Men silhouette accents.
 * Simple decorative SVGs (halftone + bold-ink flavored) used across the site.
 * All aria-hidden — purely presentational.
 */

export function XComicHalftone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <pattern id="xht" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#xht)" />
    </svg>
  );
}

/** A caped hero silhouette, comic-ink outline. */
export function XHeroSilhouetteCape({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden="true"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <g fill="currentColor">
        <path d="M60 8 C 70 8 78 16 78 26 C 78 36 70 44 60 44 C 50 44 42 36 42 26 C 42 16 50 8 60 8 Z" />
        <path d="M36 46 C 36 46 48 44 60 44 C 72 44 84 46 84 46 L 92 96 L 76 100 L 76 150 L 44 150 L 44 100 L 28 96 Z" />
        <path d="M32 48 L 8 130 L 24 138 L 40 60 Z M 88 48 L 112 130 L 96 138 L 80 60 Z" opacity=".55" />
      </g>
    </svg>
  );
}

/** A stylised claw slash — three parallel diagonal marks. */
export function XClawSlash({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
        <path d="M10 20 L 110 140" />
        <path d="M30 10 L 118 118" />
        <path d="M4 44  L 92 150" />
      </g>
    </svg>
  );
}

/** Speech bubble with text. */
export function XComicBubble({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={"relative inline-block rounded-2xl border-2 border-black bg-white px-4 py-2 font-xmen-display text-sm uppercase tracking-widest text-black " + className}
      style={{ boxShadow: "4px 4px 0 #000" }}>
      {text}
      <span aria-hidden="true" className="absolute -bottom-3 left-6 h-3 w-4"
        style={{ background: "#fff", borderRight: "2px solid #000", borderBottom: "2px solid #000", transform: "skewX(-20deg)" }} />
    </div>
  );
}

/** A tiny X-insignia badge. */
export function XBadge({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" opacity=".12" />
      <path
        d="M5 5 L11 11 L5 17 L7 19 L12 14 L17 19 L19 17 L13 11 L19 5 L17 3 L12 8 L7 3 Z"
        fill="currentColor"
      />
    </svg>
  );
}
