import { XLogo } from "./XmenIcons";

export function XmenLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center ${className}`} data-xm-logo>
      <span className="relative grid h-9 w-9 place-items-center">
        <span className="absolute inset-0 rounded-full border border-xmen-line" />
        <XLogo className="relative h-7 w-7 text-xmen-red" />
      </span>
      <span className="ml-2.5 flex items-baseline font-xmen-display text-[19px] leading-none tracking-[0.08em]">
        <span className="text-xmen-ink">Viral</span>
        <span className="mx-1 inline-block h-1 w-1 translate-y-[-2px] rounded-full bg-xmen-red" />
        <span className="text-xmen-ink font-light">Vault</span>
      </span>
    </div>
  );
}
