/**
 * Viral Vault — Custom typographic mark.
 * Hex-shield emblem containing a stylised "VV" formed by two intersecting
 * diagonals (echoing the X-Men insignia), with a gold arc underscoring the
 * shield. Rendered inline SVG so it inherits color and scales crisply.
 */
export function XmenLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center gap-2.5 ${className}`} data-xm-logo>
      <span className="relative grid h-10 w-10 place-items-center">
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
          <defs>
            <linearGradient id="vv-shield" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b0d10" />
              <stop offset="100%" stopColor="#1a1d22" />
            </linearGradient>
            <linearGradient id="vv-arc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d4a017" />
              <stop offset="100%" stopColor="#f2c94c" />
            </linearGradient>
          </defs>
          {/* Hex shield */}
          <path
            d="M24 2 L44 12 L44 34 L24 46 L4 34 L4 12 Z"
            fill="url(#vv-shield)"
            stroke="#c8202a"
            strokeWidth="1.5"
          />
          {/* Interlocked VV */}
          <path
            d="M11 15 L20 33 L24 25 L28 33 L37 15"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Red spark at intersection */}
          <circle cx="24" cy="25" r="2.2" fill="#c8202a" />
          {/* Gold underline arc */}
          <path
            d="M12 40 Q 24 43 36 40"
            fill="none"
            stroke="url(#vv-arc)"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-xmen-display text-[13px] uppercase tracking-[0.32em] text-xmen-ink">
          Viral
        </span>
        <span className="mt-0.5 font-xmen-display text-[13px] uppercase tracking-[0.32em] text-xmen-red">
          Vault<span className="text-xmen-ink-soft">·</span><span className="text-[10px] tracking-[0.4em] text-xmen-ink-soft">X</span>
        </span>
      </span>
    </div>
  );
}
