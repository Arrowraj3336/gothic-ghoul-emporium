/** Dr. Doom themed decorative vectors for the Viral Vault.
 *  Export names are kept (WWStar, WWLasso, WWTiara, WWBracer, WWWing) so
 *  existing imports continue to work — each now renders a Doom motif.
 */

/** Latverian sigil — four-point star with arcane core. */
export function WWStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2 L13.5 9 L21 10 L15 13 L17 21 L12 16.5 L7 21 L9 13 L3 10 L10.5 9 Z" />
      <circle cx="12" cy="12" r="1.6" fill="#7c4ddb" />
    </svg>
  );
}

/** Arcane runic ring — the sorcery circle. */
export function WWLasso({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 4" />
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.7" />
      <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <path d="M60 14 L62 22 L58 22 Z" fill="currentColor" />
      <path d="M60 106 L62 98 L58 98 Z" fill="currentColor" />
      <path d="M14 60 L22 62 L22 58 Z" fill="currentColor" />
      <path d="M106 60 L98 62 L98 58 Z" fill="currentColor" />
      <path d="M50 56 C 52 50, 68 50, 70 56 L 70 70 C 66 76, 54 76, 50 70 Z" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
    </svg>
  );
}

/** Doom mask emblem — replaces the tiara. */
export function WWTiara({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 40" className={className} fill="none" aria-hidden="true">
      <path d="M6 36 C 14 8, 66 8, 74 36" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M14 28 L26 16 L40 28 L54 16 L66 28" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      <path d="M28 22 L33 21 L33 24 L28 24 Z" fill="currentColor" opacity="0.9" />
      <path d="M52 22 L47 21 L47 24 L52 24 Z" fill="currentColor" opacity="0.9" />
      <path d="M40 4 L41.2 7 L44 7 L41.8 8.8 L42.6 11.6 L40 10 L37.4 11.6 L38.2 8.8 L36 7 L38.8 7 Z" fill="currentColor" />
    </svg>
  );
}

/** Doom gauntlet — armored glove. */
export function WWBracer({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" aria-hidden="true">
      <rect x="14" y="20" width="32" height="30" rx="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M18 20 L18 10 M24 20 L24 7 M30 20 L30 6 M36 20 L36 7 M42 20 L42 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="30" cy="35" r="4" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="30" cy="35" r="1.5" fill="#7c4ddb" />
      <path d="M14 44 L46 44" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

/** Doom's cloak sweep — replaces the wing flourish. */
export function WWWing({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={className}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M2 8 C 30 18, 60 30, 118 52" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M2 18 C 32 26, 62 38, 110 54" stroke="currentColor" strokeWidth="1" opacity="0.7" strokeLinecap="round" />
      <path d="M2 28 C 32 34, 60 44, 100 56" stroke="currentColor" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
      <path d="M2 38 C 28 42, 56 50, 92 58" stroke="currentColor" strokeWidth="0.6" opacity="0.35" strokeLinecap="round" />
      <path d="M0 4 C 20 12, 50 14, 80 8" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
}

/** Doom mask icon — solid badge form. */
export function DoomMask({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M6 5 C 8 3, 16 3, 18 5 L 19 19 C 17 22, 14 23, 12 23 C 10 23, 7 22, 5 19 Z" />
      <path d="M8 9 L 11 8 L 11 11 L 8 11 Z" fill="#0a1410" />
      <path d="M16 9 L 13 8 L 13 11 L 16 11 Z" fill="#0a1410" />
      <rect x="9" y="15" width="6" height="0.8" fill="#0a1410" />
      <rect x="9.5" y="17" width="5" height="0.8" fill="#0a1410" />
    </svg>
  );
}

/** Arcane lightning bolt. */
export function DoomBolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M14 2 L4 14 L11 14 L9 22 L20 9 L13 9 Z" />
    </svg>
  );
}
