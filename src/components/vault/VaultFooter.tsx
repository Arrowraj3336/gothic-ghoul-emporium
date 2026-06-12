import { Link } from "@tanstack/react-router";
import { VaultLogo } from "./VaultLogo";
import { DoomBlasters } from "./VaultIcons";

export function VaultFooter() {
  return (
    <footer className="relative mt-24 border-t border-[var(--vv-green-line)] bg-white text-[var(--vv-ink)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 text-[var(--vv-green)]">
            <VaultLogo className="h-10 w-10" />
            <div className="leading-tight">
              <div className="font-vault-heroic text-lg uppercase tracking-[0.22em]">Viral Vault</div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.32em] text-[var(--vv-ink-soft)]">
                Forged in Latveria
              </div>
            </div>
          </div>
          <p className="mt-6 max-w-sm font-vault-serif text-[15px] italic leading-relaxed text-[var(--vv-ink-soft)]">
            "Magic. Science. Two languages for a single truth — and Doom speaks both."
          </p>
          <div className="mt-6 text-[var(--vv-green)]">
            <DoomBlasters className="h-8 w-20" />
          </div>
        </div>
        <div>
          <div className="font-vault-heroic text-[11px] uppercase tracking-[0.3em] text-[var(--vv-green)]">The Armory</div>
          <ul className="mt-5 space-y-3 text-sm text-[var(--vv-ink-soft)]">
            <li><Link to="/vault/shop" className="hover:text-[var(--vv-green)]">All instruments</Link></li>
            <li><Link to="/vault" className="hover:text-[var(--vv-green)]">New decrees</Link></li>
            <li><Link to="/vault" className="hover:text-[var(--vv-green)]">Sovereign's picks</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-vault-heroic text-[11px] uppercase tracking-[0.3em] text-[var(--vv-green)]">The Court</div>
          <ul className="mt-5 space-y-3 text-sm text-[var(--vv-ink-soft)]">
            <li><Link to="/vault/about" className="hover:text-[var(--vv-green)]">Our doctrine</Link></li>
            <li><a className="hover:text-[var(--vv-green)]">Sovereign shipping</a></li>
            <li><a className="hover:text-[var(--vv-green)]">Warranty decree</a></li>
            <li><a className="hover:text-[var(--vv-green)]">Petition the throne</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--vv-green-line)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-[11px] uppercase tracking-[0.25em] text-[var(--vv-ink-soft)] sm:flex-row sm:px-6 lg:px-8">
          <div>© {new Date().getFullYear()} Viral Vault · Property of Doom</div>
          <div>Magic · Science · Sovereignty</div>
        </div>
      </div>
    </footer>
  );
}
