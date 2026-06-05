/**
 * Viral Vault — Wonder Woman inspired monogram.
 * Stylized "VV" that joins at the center to read as a W, capped with a
 * five-point Amazonian star and flanked by tiara wings.
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
        <linearGradient id="vv-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7d774" />
          <stop offset="55%" stopColor="#d4a72c" />
          <stop offset="100%" stopColor="#8a6411" />
        </linearGradient>
      </defs>

      {/* Outer tiara ring */}
      <circle cx="32" cy="32" r="29" stroke="url(#vv-gold)" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="26" stroke="url(#vv-gold)" strokeWidth="0.6" opacity="0.55" />

      {/* Tiara wings */}
      <path
        d="M8 30 C 14 24, 20 22, 26 26"
        stroke="url(#vv-gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M56 30 C 50 24, 44 22, 38 26"
        stroke="url(#vv-gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Stylized W / interlocked VV */}
      <path
        d="M14 22 L24 46 L32 30 L40 46 L50 22"
        stroke="url(#vv-gold)"
        strokeWidth="2.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />

      {/* Crowning star */}
      <path
        d="M32 8 L34.2 14.6 L41.2 14.6 L35.5 18.8 L37.7 25.4 L32 21.2 L26.3 25.4 L28.5 18.8 L22.8 14.6 L29.8 14.6 Z"
        fill="url(#vv-gold)"
      />
    </svg>
  );
}
