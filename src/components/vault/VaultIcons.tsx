/** Wonder Woman themed decorative vectors for the Viral Vault. */

export function WWStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2 L14.6 8.6 L21.6 9 L16.2 13.4 L18 20.2 L12 16.4 L6 20.2 L7.8 13.4 L2.4 9 L9.4 8.6 Z" />
    </svg>
  );
}

export function WWLasso({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden="true">
      <ellipse cx="60" cy="58" rx="46" ry="40" stroke="currentColor" strokeWidth="1.4" />
      <ellipse cx="60" cy="58" rx="38" ry="33" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      <ellipse cx="60" cy="58" rx="30" ry="26" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <path d="M14 60 C 8 70, 6 90, 16 108" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function WWTiara({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 40" className={className} fill="none" aria-hidden="true">
      <path
        d="M4 32 C 18 6, 62 6, 76 32"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4 32 L40 16 L76 32"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.55"
      />
      <path
        d="M40 6 L42 12 L48 12 L43.2 15.4 L45 21 L40 17.6 L35 21 L36.8 15.4 L32 12 L38 12 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WWBracer({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} fill="none" aria-hidden="true">
      <rect x="10" y="10" width="40" height="40" rx="4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 30 L30 14 L50 30 L30 46 Z" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="30" cy="30" r="3" fill="currentColor" />
    </svg>
  );
}

export function WWWing({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 120 60"
      className={className}
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M2 50 C 30 46, 60 30, 118 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10 52 C 36 48, 62 36, 110 18" stroke="currentColor" strokeWidth="1" opacity="0.7" strokeLinecap="round" />
      <path d="M18 54 C 40 50, 64 42, 100 28" stroke="currentColor" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
      <path d="M28 56 C 46 54, 66 48, 92 38" stroke="currentColor" strokeWidth="0.6" opacity="0.35" strokeLinecap="round" />
    </svg>
  );
}
