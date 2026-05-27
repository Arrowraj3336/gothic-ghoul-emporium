import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { products, categories, type Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { BatLogo } from "@/components/BatLogo";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Armory — Shop All | Dark Decor" },
      { name: "description", content: "Browse every piece in the Dark Decor catalog. Lighting, decor, accents and furnishings, all hand-finished in matte black." },
      { property: "og:title", content: "Shop — Dark Decor" },
      { property: "og:description", content: "Hand-finished gothic-luxe home decor." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const [cat, setCat] = useState<Product["category"] | "All">("All");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const list = useMemo(() => {
    let l = cat === "All" ? products : products.filter((p) => p.category === cat);
    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [cat, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="relative mb-16 overflow-hidden border border-border bg-card/40 px-8 py-16 text-center">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative">
          <BatLogo className="mx-auto h-8 w-16 text-signal" />
          <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-signal">// THE ARMORY</div>
          <h1 className="mt-3 font-display text-4xl sm:text-6xl">Every Piece. One Code.</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Browse the full Dark Decor catalog. Filter by category, sort by price, summon by night.
          </p>
        </div>
      </header>

      {/* Filter bar */}
      <div className="mb-10 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`border px-4 py-2 font-display text-[11px] uppercase tracking-[0.25em] transition ${
                cat === c
                  ? "border-signal bg-signal text-primary-foreground shadow-signal"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="border border-border bg-background px-3 py-2 font-mono text-xs text-foreground focus:border-signal focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
          </select>
        </div>
      </div>

      <div className="mb-6 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Showing {list.length} {list.length === 1 ? "piece" : "pieces"}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p, i) => (
          <ProductCard product={p} key={p.slug} index={i} />
        ))}
      </div>
    </div>
  );
}
