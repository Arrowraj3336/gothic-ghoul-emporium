import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { vaultProducts, vaultCategories, type VaultProduct } from "@/lib/vault-products";
import { VaultProductCard } from "@/components/vault/VaultProductCard";

export const Route = createFileRoute("/vault/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Viral Vault" },
      { name: "description", content: "Browse every appliance in the Viral Vault catalog. Coffee, cooking, prep and breakfast." },
    ],
  }),
  component: VaultShop,
});

function VaultShop() {
  const [cat, setCat] = useState<VaultProduct["category"] | "All">("All");
  const [sort, setSort] = useState<"featured" | "price-asc" | "price-desc">("featured");

  const list = useMemo(() => {
    let l = cat === "All" ? vaultProducts : vaultProducts.filter((p) => p.category === cat);
    if (sort === "price-asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [cat, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <header className="mb-12 max-w-3xl">
        <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">All appliances</div>
        <h1 className="mt-3 font-vault-display text-5xl leading-tight text-neutral-900 sm:text-6xl">
          The vault.
        </h1>
        <p className="mt-4 text-[15px] text-neutral-600">
          Every piece in the Viral Vault catalog — filter by category, sort by price.
        </p>
      </header>

      <div className="mb-10 flex flex-col gap-4 border-b border-neutral-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {(["All", ...vaultCategories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={[
                "rounded-full border px-4 py-1.5 text-xs transition",
                cat === c
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900",
              ].join(" ")}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-500">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price · low to high</option>
            <option value="price-desc">Price · high to low</option>
          </select>
        </div>
      </div>

      <div className="mb-6 text-xs text-neutral-500">{list.length} pieces</div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {list.map((p, i) => (
          <VaultProductCard product={p} key={p.slug} index={i} />
        ))}
      </div>
    </div>
  );
}
