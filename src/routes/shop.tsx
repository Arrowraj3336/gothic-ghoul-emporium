import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { vaultCategories, type VaultProduct } from "@/lib/vault-products";
import { useProducts } from "@/lib/xmen-products-store";
import { XmenProductCard } from "@/components/XmenProductCard";
import { XLogo } from "@/components/XmenIcons";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Armory — Shop All | Viral Vault" },
      { name: "description", content: "Every Viral Vault piece. Coffee, cooking, prep and breakfast gear — engineered like Cerebro, priced for the gifted." },
      { property: "og:title", content: "Armory — Viral Vault" },
      { property: "og:description", content: "Powered kitchen and home gear, X-Men edition." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const vaultProducts = useProducts();
  const [cat, setCat] = useState<VaultProduct["category"] | "All">("All");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const list = useMemo(() => {
    let l = cat === "All" ? vaultProducts : vaultProducts.filter((p) => p.category === cat);
    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [cat, sort, vaultProducts]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
      <header className="relative mb-12 overflow-hidden border-2 border-xmen-ink bg-white px-6 py-12 text-center sm:px-12 sm:py-16">
        <div className="absolute inset-0 xm-hex opacity-60" />
        <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 xm-halftone opacity-30" />
        <div className="pointer-events-none absolute -right-12 -bottom-12 h-48 w-48 xm-halftone-yellow opacity-40" />
        <div className="relative">
          <XLogo className="mx-auto h-12 w-12 text-xmen-red" />
          <div className="mt-4 font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// THE ARMORY</div>
          <h1 className="mt-3 font-xmen-display text-4xl sm:text-6xl">EVERY MUTANT. EVERY POWER.</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-xmen-ink-soft">
            Browse the full Viral Vault catalog. Filter by squad, sort by price, deploy on demand.
          </p>
        </div>
      </header>

      <div className="mb-8 flex flex-col gap-4 border-y-2 border-xmen-ink py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {(["All", ...vaultCategories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`border-2 px-4 py-2 font-xmen-display text-[11px] uppercase tracking-[0.25em] transition ${
                cat === c
                  ? "border-xmen-ink bg-xmen-red text-white"
                  : "border-xmen-ink bg-white text-xmen-ink hover:bg-xmen-yellow"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="px-3 py-2 font-xmen-mono text-xs"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>
      </div>

      <div className="mb-6 font-xmen-mono text-[11px] uppercase tracking-widest text-xmen-ink-soft">
        Showing {list.length} {list.length === 1 ? "mutant" : "mutants"}
      </div>

      <div className="grid grid-cols-2 gap-5 sm:gap-7 md:grid-cols-3 lg:grid-cols-4">
        {list.map((p, i) => (
          <XmenProductCard product={p} key={p.slug} index={i} />
        ))}
      </div>
    </div>
  );
}
