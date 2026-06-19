import { Link, useRouterState } from "@tanstack/react-router";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { BatLogo } from "./BatLogo";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Origin" },
  { to: "/contact", label: "Contact" },
  { to: "/vault", label: "Vault" },
] as const;

export function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/vault" className="group flex items-center gap-2.5">
          <BatLogo className="h-6 w-12 text-foreground transition-all group-hover:text-signal group-hover:drop-shadow-[0_0_12px_var(--signal-glow)]" />
          <span className="font-display text-base sm:text-lg tracking-[0.3em] uppercase">
            Dark<span className="text-signal">·</span>Decor
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "relative font-display text-[11px] uppercase tracking-[0.35em] transition-colors",
                path === l.to ? "text-signal" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {l.label}
              {path === l.to && (
                <span className="absolute -bottom-2 left-1/2 h-px w-6 -translate-x-1/2 bg-signal shadow-signal" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            aria-label="Search"
            className="hidden sm:grid h-9 w-9 place-items-center rounded-sm text-muted-foreground transition hover:text-signal hover:bg-secondary"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            to="/vault/cart"
            aria-label="Cart"
            className="relative grid h-9 w-9 place-items-center rounded-sm text-muted-foreground transition hover:text-signal hover:bg-secondary"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-signal px-1 text-[10px] font-bold text-primary-foreground shadow-signal">
                {count}
              </span>
            )}
          </Link>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden grid h-9 w-9 place-items-center rounded-sm text-muted-foreground hover:text-signal hover:bg-secondary"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in">
          <nav className="flex flex-col px-4 py-3">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 font-display text-sm uppercase tracking-[0.3em] border-b border-border/40 last:border-0",
                  path === l.to ? "text-signal" : "text-foreground/80",
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
