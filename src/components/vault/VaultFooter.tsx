import { Link } from "@tanstack/react-router";
import { VaultLogo } from "./VaultLogo";
import { WWStar, WWWing } from "./VaultIcons";

export function VaultFooter() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t-4 border-[var(--vv-gold)] bg-[var(--vv-ink)] text-[var(--vv-cream)]">
      {/* Wing flourishes */}
      <div className="pointer-events-none absolute -top-6 left-0 w-1/3 text-[var(--vv-gold)] opacity-30">
        <WWWing className="h-16 w-full" />
      </div>
      <div className="pointer-events-none absolute -top-6 right-0 w-1/3 text-[var(--vv-gold)] opacity-30">
        <WWWing className="h-16 w-full" flip />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <VaultLogo className="h-12 w-12" />
            <div className="leading-tight">
              <div className="font-vault-heroic text-xl uppercase tracking-[0.2em]">Viral Vault</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[var(--vv-gold)]">Forged on Themyscira</div>
            </div>
          </div>
          <p className="mt-6 max-w-sm font-vault-serif text-[15px] italic leading-relaxed text-[var(--vv-cream-soft)]">
            "The kitchen is the heart of the home — and the heart deserves armor of gold."
          </p>
          <div className="mt-6 flex items-center gap-2 text-[var(--vv-gold)]">
            <WWStar className="h-3 w-3" />
            <WWStar className="h-3 w-3" />
            <WWStar className="h-3 w-3" />
            <WWStar className="h-3 w-3" />
            <WWStar className="h-3 w-3" />
          </div>
        </div>
        <div>
          <div className="font-vault-heroic text-[11px] uppercase tracking-[0.3em] text-[var(--vv-gold)]">The Armory</div>
          <ul className="mt-5 space-y-3 text-sm text-[var(--vv-cream-soft)]">
            <li><Link to="/vault/shop" className="hover:text-[var(--vv-gold)]">All appliances</Link></li>
            <li><Link to="/vault" className="hover:text-[var(--vv-gold)]">New arrivals</Link></li>
            <li><Link to="/vault" className="hover:text-[var(--vv-gold)]">Champions' picks</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-vault-heroic text-[11px] uppercase tracking-[0.3em] text-[var(--vv-gold)]">The Council</div>
          <ul className="mt-5 space-y-3 text-sm text-[var(--vv-cream-soft)]">
            <li><Link to="/vault/about" className="hover:text-[var(--vv-gold)]">Our mythos</Link></li>
            <li><a className="hover:text-[var(--vv-gold)]">Shipping</a></li>
            <li><a className="hover:text-[var(--vv-gold)]">Warranty oath</a></li>
            <li><a className="hover:text-[var(--vv-gold)]">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[color-mix(in_oklab,var(--vv-gold)_30%,transparent)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-[11px] uppercase tracking-[0.25em] text-[var(--vv-cream-soft)] sm:flex-row sm:px-6 lg:px-8">
          <div>© {new Date().getFullYear()} Viral Vault</div>
          <div className="flex items-center gap-2 text-[var(--vv-gold)]">
            <WWStar className="h-3 w-3" />
            <span>Truth · Honor · Craft</span>
            <WWStar className="h-3 w-3" />
          </div>
        </div>
      </div>
    </footer>
  );
}
