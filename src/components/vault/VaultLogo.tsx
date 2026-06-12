/**
 * Viral Vault — minimal Dr. Doom mask monogram.
 * Retro-minimal: single dark-green line on white, two eye slits and a
 * three-bar mouth grille. Reads as a face mask first, monogram second.
 */
export function VaultLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Hood / mask silhouette */}
      <path
        d="M11 11 C 16 6, 32 6, 37 11 L 38 34 C 35 41, 30 44, 24 44 C 18 44, 13 41, 10 34 Z"
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      {/* Eye slits — angular */}
      <path d="M15 20 L 21 18.5 L 21 22.5 L 15 22.5 Z" fill="currentColor" />
      <path d="M33 20 L 27 18.5 L 27 22.5 L 33 22.5 Z" fill="currentColor" />
      {/* Mouth grille */}
      <rect x="18" y="29" width="12" height="1.4" fill="currentColor" />
      <rect x="19" y="32" width="10" height="1.4" fill="currentColor" />
      <rect x="20.5" y="35" width="7" height="1.4" fill="currentColor" />
    </svg>
  );
}
