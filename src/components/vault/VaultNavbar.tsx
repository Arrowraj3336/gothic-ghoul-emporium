import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { VaultLogo } from "./VaultLogo";
import { useVaultCart } from "@/lib/vault-cart";

const links = [
  { to: "/vault" as const, label: "Court" },
  { to: "/vault/shop" as const, label: "Armory" },
  { to: "/vault/about" as const, label: "Doctrine" },
];

export function VaultNavbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useVaultCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--vv-green-line)] bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link to="/vault" className="group flex items-center gap-3 text-[var(--vv-green)]">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--vv-green-line)] bg-white transition-transform group-hover:scale-105 sm:h-12 sm:w-12">
            <VaultLogo className="h-7 w-7 sm:h-9 sm:w-9" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-vault-heroic text-base tracking-[0.22em] uppercase sm:text-lg">
              Viral Vault
            </span>
            <span className="mt-1 text-[9px] tracking-[0.32em] uppercase text-[var(--vv-ink-soft)]">
              House of Latveria
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={[
                  "group relative font-vault-heroic text-[12px] tracking-[0.3em] uppercase transition-colors",
                  active ? "text-[var(--vv-green)]" : "text-[var(--vv-ink-soft)] hover:text-[var(--vv-green)]",
                ].join(" ")}
              >
                {l.label}
                <span
                  className={[
                    "absolute -bottom-2 left-1/2 h-[2px] -translate-x-1/2 bg-[var(--vv-green)] transition-all",
                    active ? "w-6 opacity-100" : "w-0 opacity-0 group-hover:w-6 group-hover:opacity-100",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button className="hidden h-10 w-10 place-items-center rounded-full text-[var(--vv-ink-soft)] hover:bg-[var(--vv-green-soft)] hover:text-[var(--vv-green)] sm:grid">
            <Search className="h-4 w-4" />
          </button>
          <Link
            to="/vault/cart"
            aria-label="Reliquary"
            className="relative grid h-10 w-10 place-items-center rounded-full text-[var(--vv-ink)] hover:bg-[var(--vv-green-soft)] hover:text-[var(--vv-green)]"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--vv-green)] px-1 text-[10px] font-semibold text-white">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/"
            className="ml-2 hidden items-center gap-1.5 rounded-full border border-[var(--vv-green-line)] px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-[var(--vv-ink-soft)] hover:border-[var(--vv-green)] hover:text-[var(--vv-green)] md:inline-flex"
          >
            Dark Decor →
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full text-[var(--vv-ink)] hover:bg-[var(--vv-green-soft)] md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--vv-green-line)] bg-white md:hidden">
          <nav className="flex flex-col px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--vv-green-line)] py-4 font-vault-heroic text-sm uppercase tracking-[0.25em] text-[var(--vv-ink)] last:border-0"
              >
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
