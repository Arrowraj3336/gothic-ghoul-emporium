export function VaultLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M14 14.5 L24 33.5 L34 14.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="24" cy="24" r="1.5" fill="currentColor" />
    </svg>
  );
}
