import { Link } from "@tanstack/react-router";
import { BatLogo } from "./BatLogo";
import { Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-background overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <BatLogo className="h-7 w-14 text-signal" />
              <span className="font-display text-xl tracking-[0.25em] uppercase">Gotham<span className="text-signal">.</span>Haus</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Aesthetic home decor for the ones who prefer the night.
              Hand-finished pieces, small batches, shipped in matte black.
            </p>
            <div className="mt-6 flex gap-2">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-sm border border-border text-muted-foreground transition hover:border-signal hover:text-signal"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xs tracking-[0.3em] uppercase text-signal">Shop</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop" className="hover:text-foreground">All Pieces</Link></li>
              <li><Link to="/shop" className="hover:text-foreground">Lighting</Link></li>
              <li><Link to="/shop" className="hover:text-foreground">Decor</Link></li>
              <li><Link to="/shop" className="hover:text-foreground">Accents</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-xs tracking-[0.3em] uppercase text-signal">House</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground">Our Origin</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Signal Us</Link></li>
              <li><a href="#" className="hover:text-foreground">Shipping</a></li>
              <li><a href="#" className="hover:text-foreground">Returns</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Gotham.Haus. All shadows reserved.</span>
          <span className="font-mono tracking-widest">/ /  WAYNE ENTERPRISES SUBSIDIARY  / /</span>
        </div>
      </div>
    </footer>
  );
}
