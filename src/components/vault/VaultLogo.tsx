/**
 * Viral Vault — Dr. Doom inspired monogram.
 * A hammered-brass mask silhouette over a Latverian crest. Two interlocking
 * "V"s form the brow ridges of the mask; rivets line the cheekplate.
 */
export function VaultLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="vv-brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0cf7a" />
          <stop offset="55%" stopColor="#c8993f" />
          <stop offset="100%" stopColor="#6e4d12" />
        </linearGradient>
        <linearGradient id="vv-steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f6b4a" />
          <stop offset="100%" stopColor="#0a1410" />
        </linearGradient>
        <radialGradient id="vv-arcane" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#7c4ddb" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#7c4ddb" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="32" cy="34" r="28" fill="url(#vv-arcane)" />

      <circle cx="32" cy="32" r="29" stroke="url(#vv-brass)" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="26" stroke="url(#vv-brass)" strokeWidth="0.5" opacity="0.55" />

      {/* Hood silhouette */}
      <path
        d="M14 18 C 18 10, 46 10, 50 18 L 52 46 C 48 54, 44 58, 32 60 C 20 58, 16 54, 12 46 Z"
        fill="url(#vv-steel)"
        stroke="url(#vv-brass)"
        strokeWidth="1.2"
      />

      {/* Mask faceplate */}
      <path
        d="M19 22 C 22 18, 42 18, 45 22 L 45 44 C 42 50, 36 53, 32 53 C 28 53, 22 50, 19 44 Z"
        fill="#13231c"
        stroke="url(#vv-brass)"
        strokeWidth="1.4"
      />

      {/* Eye slits — arcane violet */}
      <path d="M23 30 L 29 28 L 29 33 L 23 33 Z" fill="#7c4ddb" />
      <path d="M41 30 L 35 28 L 35 33 L 41 33 Z" fill="#7c4ddb" />

      {/* Mouth grille — three brass slits */}
      <rect x="26" y="40" width="12" height="1.2" fill="url(#vv-brass)" />
      <rect x="27" y="43" width="10" height="1.2" fill="url(#vv-brass)" />
      <rect x="28.5" y="46" width="7" height="1.2" fill="url(#vv-brass)" />

      {/* Brow V's — interlocking "VV" reading as the brow ridges */}
      <path
        d="M20 22 L26 28 L32 22 L38 28 L44 22"
        stroke="url(#vv-brass)"
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />

      {/* Cheek rivets */}
      <circle cx="21" cy="36" r="0.9" fill="url(#vv-brass)" />
      <circle cx="43" cy="36" r="0.9" fill="url(#vv-brass)" />
      <circle cx="20.5" cy="41" r="0.7" fill="url(#vv-brass)" />
      <circle cx="43.5" cy="41" r="0.7" fill="url(#vv-brass)" />

      {/* Crowning Latverian sigil */}
      <path
        d="M32 6 L33.5 10.5 L38 10.5 L34.3 13.2 L35.7 17.7 L32 15 L28.3 17.7 L29.7 13.2 L26 10.5 L30.5 10.5 Z"
        fill="url(#vv-brass)"
      />
    </svg>
  );
}
