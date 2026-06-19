import { Link } from "@tanstack/react-router";
import { XmenLogo } from "./XmenLogo";
import { Instagram, Twitter, Youtube } from "lucide-react";

export function XmenFooter() {
  return (
    <footer className="relative mt-20 sm:mt-28 border-t-2 border-xmen-ink bg-white">
      <div className="h-1 w-full bg-xmen-red" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <XmenLogo />
            <p className="mt-4 max-w-sm text-sm text-xmen-ink-soft leading-relaxed">
              Gear for the gifted. Viral Vault is an X-Men-inspired storefront for the kitchen, the workshop and every corner of tomorrow's home.
            </p>
            <div className="mt-6 flex gap-2">
              {[Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="grid h-9 w-9 place-items-center border-2 border-xmen-ink text-xmen-ink transition hover:bg-xmen-yellow">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-xmen-display text-sm tracking-[0.25em] uppercase text-xmen-red">Armory</h4>
            <ul className="mt-4 space-y-2 text-sm text-xmen-ink-soft">
              <li><Link to="/shop" className="hover:text-xmen-red">All Gear</Link></li>
              <li><Link to="/shop" className="hover:text-xmen-red">Coffee</Link></li>
              <li><Link to="/shop" className="hover:text-xmen-red">Cooking</Link></li>
              <li><Link to="/shop" className="hover:text-xmen-red">Breakfast</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-xmen-display text-sm tracking-[0.25em] uppercase text-xmen-red">Institute</h4>
            <ul className="mt-4 space-y-2 text-sm text-xmen-ink-soft">
              <li><Link to="/about" className="hover:text-xmen-red">Mythos</Link></li>
              <li><Link to="/contact" className="hover:text-xmen-red">Cerebro</Link></li>
              <li><Link to="/vault" className="hover:text-xmen-red">Sister Site · Dark Decor</Link></li>
              <li><a href="#" className="hover:text-xmen-red">Returns</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t-2 border-xmen-ink pt-6 text-xs text-xmen-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Viral Vault. To me, my X-Men.</span>
          <span className="font-xmen-mono tracking-widest">// XAVIER INSTITUTE FOR GIFTED HOME-MAKERS</span>
        </div>
      </div>
    </footer>
  );
}
