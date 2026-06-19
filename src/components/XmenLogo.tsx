import { XLogo } from "./XmenIcons";

export function XmenLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <XLogo className="h-9 w-9 text-xmen-red" />
      <span className="ml-2 font-xmen-display text-2xl leading-none tracking-[0.18em]">
        <span className="text-xmen-ink">VIRAL</span>
        <span className="mx-1 inline-block h-2 w-2 -translate-y-1 bg-xmen-yellow" />
        <span className="text-xmen-red">VAULT</span>
      </span>
    </div>
  );
}
