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
    <header className="sticky top-0 z-40 xm-glass border-b border-xmen-line">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <XmenLogo />
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "relative font-xmen-display text-[12px] uppercase tracking-[0.28em] transition-colors",
                path === l.to ? "text-xmen-red" : "text-xmen-ink/80 hover:text-xmen-red",
              )}
            >
              {l.label}
              {path === l.to && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-xmen-red shadow-[0_0_10px_rgba(200,32,42,0.7)]" />
              )}
            </Link>
          ))}
          <Link
            to="/vault"
            className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft hover:text-xmen-ink"
          >
            ↗ Dark Decor
          </Link>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-xmen-line bg-white/70 text-xmen-ink transition hover:border-xmen-red hover:text-xmen-red"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-xmen-red px-1 text-[10px] font-semibold text-white shadow-[0_0_12px_rgba(200,32,42,0.55)]">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-xmen-line text-xmen-ink hover:border-xmen-red hover:text-xmen-red"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-xmen-line bg-white/95 backdrop-blur">
          <nav className="flex flex-col px-4 py-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 font-xmen-display text-sm uppercase tracking-[0.28em] border-b border-xmen-line last:border-0",
                  path === l.to ? "text-xmen-red" : "text-xmen-ink",
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/vault"
              onClick={() => setOpen(false)}
              className="py-3 font-xmen-mono text-[11px] uppercase tracking-widest text-xmen-ink-soft"
            >
              ↗ Sister Site · Dark Decor
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
