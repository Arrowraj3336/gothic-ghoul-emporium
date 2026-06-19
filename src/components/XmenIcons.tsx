export function XLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3.5" />
      <path d="M12 12 L52 52" stroke="currentColor" strokeWidth="7" strokeLinecap="square" />
      <path d="M52 12 L12 52" stroke="currentColor" strokeWidth="7" strokeLinecap="square" />
    </svg>
  );
}

export function CerebroIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="32" cy="32" r="18" />
      <circle cx="32" cy="32" r="10" />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
      <path d="M32 4v10M32 50v10M4 32h10M50 32h10" />
    </svg>
  );
}

export function ClawsIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
      <path d="M16 56 L20 8" />
      <path d="M28 56 L32 8" />
      <path d="M40 56 L44 8" />
      <path d="M12 44 L48 44" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

export function VisorIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M4 16 Q32 4 60 16" />
      <path d="M4 16 Q32 28 60 16" />
      <circle cx="32" cy="16" r="3" fill="currentColor" />
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
