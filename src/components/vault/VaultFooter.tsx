import { Link } from "@tanstack/react-router";
import { VaultLogo } from "./VaultLogo";

export function VaultFooter() {
  return (
    <footer className="mt-24 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5 text-neutral-900">
            <VaultLogo className="h-7 w-7" />
            <span className="font-vault-display text-lg tracking-tight">Viral Vault</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600">
            Quietly viral kitchen appliances — engineered for the way modern homes actually cook.
            Built to last, designed to leave out.
          </p>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Shop</div>
          <ul className="mt-4 space-y-2 text-sm text-neutral-800">
            <li><Link to="/vault/shop" className="hover:text-neutral-500">All appliances</Link></li>
            <li><Link to="/vault" className="hover:text-neutral-500">New arrivals</Link></li>
            <li><Link to="/vault" className="hover:text-neutral-500">Bestsellers</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Support</div>
          <ul className="mt-4 space-y-2 text-sm text-neutral-800">
            <li><Link to="/vault/about" className="hover:text-neutral-500">About</Link></li>
            <li><a className="hover:text-neutral-500">Shipping</a></li>
            <li><a className="hover:text-neutral-500">Warranty</a></li>
            <li><a className="hover:text-neutral-500">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-neutral-500 sm:flex-row sm:px-6 lg:px-8">
          <div>© {new Date().getFullYear()} Viral Vault. All rights reserved.</div>
          <div>Made for kitchens that go viral.</div>
        </div>
      </div>
    </footer>
  );
}
