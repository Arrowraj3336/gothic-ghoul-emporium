import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { VaultLogo } from "./VaultLogo";
import { WWStar } from "./VaultIcons";
import { useVaultCart } from "@/lib/vault-cart";

const links = [
  { to: "/vault" as const, label: "The Court" },
  { to: "/vault/shop" as const, label: "Arsenal" },
  { to: "/vault/about" as const, label: "Doctrine" },
];

export function VaultNavbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useVaultCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--vv-gold-soft)] bg-[color-mix(in_oklab,var(--vv-cream)_88%,transparent)] backdrop-blur-xl">
      {/* Gold rule */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[var(--vv-gold)] to-transparent opacity-80" />

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/vault" className="group flex items-center gap-3 text-[var(--vv-ink)]">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-[var(--vv-gold-soft)] bg-white/60 transition-transform group-hover:rotate-[12deg]">
            <VaultLogo className="h-9 w-9" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-vault-heroic text-xl tracking-[0.18em] uppercase">
              Viral Vault
            </span>
            <span className="mt-1 text-[10px] tracking-[0.32em] uppercase text-[var(--vv-gold)]">
              House of Latveria
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={[
                  "group relative font-vault-heroic text-[12px] tracking-[0.28em] uppercase transition-colors",
                  active ? "text-[var(--vv-crimson)]" : "text-[var(--vv-ink-soft)] hover:text-[var(--vv-crimson)]",
                ].join(" ")}
              >
                {l.label}
                <span
                  className={[
                    "absolute -bottom-2 left-1/2 h-[3px] -translate-x-1/2 bg-[var(--vv-gold)] transition-all",
                    active ? "w-6 opacity-100" : "w-0 opacity-0 group-hover:w-6 group-hover:opacity-100",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button className="hidden sm:grid h-10 w-10 place-items-center rounded-full text-[var(--vv-ink-soft)] hover:bg-[var(--vv-gold-soft)] hover:text-[var(--vv-crimson)]">
            <Search className="h-4 w-4" />
          </button>
          <Link
            to="/vault/cart"
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-full text-[var(--vv-ink)] hover:bg-[var(--vv-gold-soft)] hover:text-[var(--vv-crimson)]"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--vv-crimson)] px-1 text-[10px] font-semibold text-white ring-2 ring-[var(--vv-gold)]">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/"
            className="ml-2 hidden md:inline-flex items-center gap-1.5 rounded-full border border-[var(--vv-gold-soft)] px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[var(--vv-ink-soft)] hover:border-[var(--vv-crimson)] hover:text-[var(--vv-crimson)]"
          >
            <WWStar className="h-3 w-3 text-[var(--vv-gold)]" />
            Dark Decor
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-full text-[var(--vv-ink)] hover:bg-[var(--vv-gold-soft)]"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-[var(--vv-gold-soft)] bg-[var(--vv-cream)]">
          <nav className="flex flex-col px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 border-b border-[var(--vv-gold-soft)] py-4 font-vault-heroic text-sm uppercase tracking-[0.2em] text-[var(--vv-ink)] last:border-0"
              >
                <WWStar className="h-3 w-3 text-[var(--vv-gold)]" />
                {l.label}
              </Link>
            ))}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="py-3 text-[11px] uppercase tracking-[0.25em] text-[var(--vv-ink-soft)]"
            >
              ← Back to Dark Decor
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
