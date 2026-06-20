export function XLogo({ className = "" }: { className?: string }) {
  // Refined futuristic X — thin double-stroke with center diamond
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="29.5" stroke="currentColor" strokeWidth="1.25" opacity="0.6" />
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <path d="M13 13 L51 51" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M51 13 L13 51" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <rect x="29" y="29" width="6" height="6" transform="rotate(45 32 32)" fill="currentColor" />
    </svg>
  );
}

export function CerebroIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="32" cy="32" r="22" />
      <circle cx="32" cy="32" r="14" />
      <circle cx="32" cy="32" r="6" />
      <circle cx="32" cy="32" r="1.5" fill="currentColor" />
      <path d="M32 2v8M32 54v8M2 32h8M54 32h8" strokeLinecap="round" />
    </svg>
  );
}

export function ClawsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M18 58 L22 6" />
      <path d="M30 60 L34 4" />
      <path d="M42 58 L46 6" />
    </svg>
  );
}

export function VisorIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M4 16 Q32 4 60 16" />
      <path d="M4 16 Q32 28 60 16" />
      <circle cx="32" cy="16" r="2.5" fill="currentColor" />
    </svg>
  );
}

export function LightningBolt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 64" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20 0 L4 36 L14 36 L8 64 L28 24 L18 24 L24 0 Z" />
    </svg>
  );
}

/** Magneto helmet silhouette */
export function HelmetIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M14 46 C14 26 22 14 32 14 C42 14 50 26 50 46" />
      <path d="M14 46 L50 46" />
      <path d="M24 14 L24 6 M40 14 L40 6" strokeLinecap="round" />
      <circle cx="26" cy="34" r="2" fill="currentColor" />
      <circle cx="38" cy="34" r="2" fill="currentColor" />
    </svg>
  );
}

/** Phoenix wings emblem */
export function PhoenixIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 64" className={className} fill="currentColor" aria-hidden="true">
      <path d="M40 8 L48 24 L62 14 L56 30 L72 28 L58 38 L70 50 L52 44 L52 60 L40 50 L28 60 L28 44 L10 50 L22 38 L8 28 L24 30 L18 14 L32 24 Z" opacity="0.95" />
    </svg>
  );
}

/** Telepathy ripple — Professor X */
export function TelepathyIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="32" cy="32" r="4" fill="currentColor" />
      <circle cx="32" cy="32" r="11" opacity="0.7" />
      <circle cx="32" cy="32" r="18" opacity="0.45" />
      <circle cx="32" cy="32" r="25" opacity="0.22" />
    </svg>
  );
}

/** Storm lightning + cloud */
export function StormIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 28 C10 28 6 24 8 18 C10 12 18 12 20 16 C22 10 32 10 34 16 C38 12 48 14 48 22 C54 22 56 28 52 32 L16 32 C12 32 12 28 14 28 Z" />
      <path d="M28 34 L22 48 L30 48 L26 60" fill="currentColor" stroke="none" />
    </svg>
  );
}
