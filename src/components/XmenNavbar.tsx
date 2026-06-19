import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { XmenLogo } from "./XmenLogo";
import { useXmenCart } from "@/lib/vault-cart";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Institute" },
  { to: "/shop", label: "Armory" },
  { to: "/about", label: "Mythos" },
  { to: "/contact", label: "Cerebro" },
] as const;

export function XmenNavbar() {
  const { count } = useXmenCart();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b-2 border-xmen-ink bg-white">
      <div className="h-1 w-full bg-xmen-yellow" />
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <XmenLogo />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "relative font-xmen-display text-sm uppercase tracking-[0.25em] transition-colors",
                path === l.to ? "text-xmen-red" : "text-xmen-ink hover:text-xmen-red",
              )}
            >
              {l.label}
              {path === l.to && (
                <span className="absolute -bottom-2 left-0 right-0 h-[3px] bg-xmen-yellow" />
              )}
            </Link>
          ))}
          <Link to="/vault" className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft hover:text-xmen-blue">
            ↗ Dark Decor
          </Link>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center border-2 border-xmen-ink bg-white text-xmen-ink transition hover:bg-xmen-yellow"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full border-2 border-xmen-ink bg-xmen-red px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden grid h-10 w-10 place-items-center border-2 border-xmen-ink text-xmen-ink hover:bg-xmen-yellow"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t-2 border-xmen-ink bg-white">
          <nav className="flex flex-col px-4 py-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 font-xmen-display text-base uppercase tracking-[0.25em] border-b border-xmen-line last:border-0",
                  path === l.to ? "text-xmen-red" : "text-xmen-ink",
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link to="/vault" onClick={() => setOpen(false)} className="py-3 font-xmen-mono text-xs uppercase tracking-widest text-xmen-ink-soft">
              ↗ Sister Site · Dark Decor
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
