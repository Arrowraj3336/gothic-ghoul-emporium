/** Dr. Doom themed minimal vectors for Viral Vault.
 *  Names kept (WWStar, WWLasso, WWTiara, WWBracer, WWWing) so existing
 *  imports continue to work — each renders a clean single-tone Doom motif
 *  that uses `currentColor` so it inherits the green palette.
 */

/** Latverian sigil — angular four-point star. */
export function WWStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2 L13.4 9 L21 10 L15 13 L17 21 L12 16.5 L7 21 L9 13 L3 10 L10.6 9 Z" />
    </svg>
  );
}

/** Arcane runic ring — concentric sigil circles. */
export function WWLasso({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.65" />
      <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
      <path d="M60 12 L62 22 L58 22 Z" fill="currentColor" />
      <path d="M60 108 L62 98 L58 98 Z" fill="currentColor" />
      <path d="M12 60 L22 62 L22 58 Z" fill="currentColor" />
      <path d="M108 60 L98 62 L98 58 Z" fill="currentColor" />
      <path d="M60 44 L 64 56 L 76 60 L 64 64 L 60 76 L 56 64 L 44 60 L 56 56 Z" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.7" />
    </svg>
  );
}

/** Doom mask emblem — minimal silhouette. */
export function WWTiara({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 40" className={className} fill="none" aria-hidden="true">
      <path d="M10 36 C 16 8, 64 8, 70 36" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M30 22 L 35 21 L 35 24 L 30 24 Z" fill="currentColor" />
      <path d="M50 22 L 45 21 L 45 24 L 50 24 Z" fill="currentColor" />
      <rect x="34" y="29" width="12" height="1.2" fill="currentColor" />
      <rect x="35.5" y="32" width="9" height="1.2" fill="currentColor" />
    </svg>
  );
}

/** Doom gauntlet — clean armored glove. */
export function WWBracer({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" aria-hidden="true">
      <rect x="14" y="20" width="32" height="30" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M18 20 L 18 10 M24 20 L 24 7 M30 20 L 30 6 M36 20 L 36 7 M42 20 L 42 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="30" cy="35" r="3.5" stroke="currentColor" strokeWidth="1.1" />
      <path d="M14 44 L 46 44" stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
    </svg>
  );
}

/** Doom cloak sweep. */
export function WWWing({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={className}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M2 8 C 30 18, 60 30, 118 52" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M2 18 C 32 26, 62 38, 110 54" stroke="currentColor" strokeWidth="0.9" opacity="0.65" strokeLinecap="round" />
      <path d="M2 28 C 32 34, 60 44, 100 56" stroke="currentColor" strokeWidth="0.7" opacity="0.45" strokeLinecap="round" />
      <path d="M2 38 C 28 42, 56 50, 92 58" stroke="currentColor" strokeWidth="0.55" opacity="0.3" strokeLinecap="round" />
    </svg>
  );
}

/** Doom mask icon — solid badge. */
export function DoomMask({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M6 5 C 8 3, 16 3, 18 5 L 19 19 C 17 22, 14 23, 12 23 C 10 23, 7 22, 5 19 Z" />
      <path d="M8 9 L 11 8 L 11 11 L 8 11 Z" fill="#ffffff" />
      <path d="M16 9 L 13 8 L 13 11 L 16 11 Z" fill="#ffffff" />
      <rect x="9" y="15" width="6" height="0.8" fill="#ffffff" />
      <rect x="9.5" y="17" width="5" height="0.8" fill="#ffffff" />
    </svg>
  );
}

/** Arcane bolt — minimal lightning. */
export function DoomBolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M14 2 L 4 14 L 11 14 L 9 22 L 20 9 L 13 9 Z" />
    </svg>
  );
}

/** Crossed Doom blasters — weapon accent for section dividers. */
export function DoomBlasters({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 40" className={className} fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none">
        <path d="M8 32 L 36 12 M 36 12 L 44 12 L 50 16" />
        <path d="M72 32 L 44 12 M 44 12 L 36 12 L 30 16" />
        <circle cx="8" cy="32" r="2.5" fill="currentColor" />
        <circle cx="72" cy="32" r="2.5" fill="currentColor" />
        <path d="M40 6 L 40 18" />
      </g>
    </svg>
  );
}

/** Ambient arcane sigil — large decorative background mark. */
export function ArcaneSigil({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden="true">
      <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="100" cy="100" r="74" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 5" />
      <circle cx="100" cy="100" r="54" stroke="currentColor" strokeWidth="0.5" opacity="0.7" />
      <circle cx="100" cy="100" r="34" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <path d="M100 10 L 100 190 M 10 100 L 190 100" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
      <path d="M36 36 L 164 164 M 164 36 L 36 164" stroke="currentColor" strokeWidth="0.4" opacity="0.3" />
      <path d="M100 30 L 110 70 L 150 80 L 110 90 L 100 130 L 90 90 L 50 80 L 90 70 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.85" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <g key={a} transform={`rotate(${a} 100 100)`}>
          <path d="M100 14 L 103 22 L 97 22 Z" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}
