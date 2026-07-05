/**
 * Site-wide comic-style X-Men silhouette accents laid into page backgrounds.
 * Very subtle — small, translucent, spread across the viewport so they hint
 * at squad presence without stealing the eye. Purely decorative.
 *
 * Performance: fixed layer, single SVG, no JS, GPU-friendly opacity/transform.
 * a11y: aria-hidden. Suppressed via prefers-reduced-motion styles in CSS.
 */

type Props = { variant?: "home" | "pdp" | "cart" };

export function XmenSquadBackdrop({ variant = "home" }: Props) {
  return (
    <div className={`xm-squad-back xm-squad-${variant}`} aria-hidden="true">
      {/* Wolverine claw slash — top-left */}
      <svg className="xm-squad-piece xm-squad-claw" viewBox="0 0 200 200">
        <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M20 40 L 180 180" />
          <path d="M50 20 L 195 165" />
          <path d="M12 70 L 155 195" />
        </g>
      </svg>
      {/* X insignia orb — top-right */}
      <svg className="xm-squad-piece xm-squad-x" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" />
        <path
          d="M18 18 L45 45 L18 72 L28 82 L50 60 L72 82 L82 72 L55 45 L82 18 L72 8 L50 30 L28 8 Z"
          fill="currentColor"
        />
      </svg>
      {/* Storm lightning — right */}
      <svg className="xm-squad-piece xm-squad-bolt" viewBox="0 0 60 200">
        <path d="M35 4 L 8 100 L 26 100 L 12 196 L 52 84 L 32 84 Z" fill="currentColor" />
      </svg>
      {/* Cyclops visor — mid-left */}
      <svg className="xm-squad-piece xm-squad-visor" viewBox="0 0 200 40">
        <path d="M6 20 Q 100 -6 194 20 Q 100 34 6 20 Z" fill="currentColor" />
        <rect x="30" y="14" width="140" height="10" fill="rgba(255,255,255,0.65)" />
      </svg>
      {/* Silhouette caped hero — bottom-left */}
      <svg className="xm-squad-piece xm-squad-cape" viewBox="0 0 120 160">
        <g fill="currentColor">
          <circle cx="60" cy="24" r="16" />
          <path d="M34 44 L 86 44 L 96 100 L 74 106 L 74 152 L 46 152 L 46 106 L 24 100 Z" />
          <path d="M30 48 L 6 130 L 22 138 L 40 60 Z M 90 48 L 114 130 L 98 138 L 80 60 Z" opacity=".6" />
        </g>
      </svg>
      {/* Halftone dot cluster */}
      <svg className="xm-squad-piece xm-squad-dots" viewBox="0 0 200 200">
        <defs>
          <pattern id="xmdots" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.4" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#xmdots)" />
      </svg>
    </div>
  );
}
