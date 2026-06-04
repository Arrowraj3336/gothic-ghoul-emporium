import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { VaultLogo } from "./VaultLogo";
import { useVaultCart } from "@/lib/vault-cart";

const links = [
  { to: "/vault" as const, label: "Home" },
  { to: "/vault/shop" as const, label: "Shop" },
  { to: "/vault/about" as const, label: "Story" },
];

export function VaultNavbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { count } = useVaultCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/vault" className="group flex items-center gap-2.5 text-neutral-900">
          <VaultLogo className="h-7 w-7 transition-transform group-hover:rotate-[15deg]" />
          <span className="font-vault-display text-lg tracking-tight">
            Viral <span className="font-medium">Vault</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => {
            const active = path === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={[
                  "relative text-[13px] tracking-wide transition-colors",
                  active ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-900",
                ].join(" ")}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 mx-auto h-px w-5 bg-neutral-900" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button className="hidden sm:grid h-9 w-9 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900">
            <Search className="h-4 w-4" />
          </button>
          <Link
            to="/vault/cart"
            aria-label="Cart"
            className="relative grid h-9 w-9 place-items-center rounded-full text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-neutral-900 px-1 text-[10px] font-medium text-white">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/"
            className="ml-2 hidden sm:inline-flex items-center text-[11px] uppercase tracking-[0.2em] text-neutral-400 hover:text-neutral-700"
          >
            ← Dark Decor
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden grid h-9 w-9 place-items-center rounded-full text-neutral-700 hover:bg-neutral-100"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <nav className="flex flex-col px-4 py-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-neutral-100 py-3 text-sm text-neutral-800 last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="py-3 text-[11px] uppercase tracking-[0.2em] text-neutral-400"
            >
              ← Back to Dark Decor
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
