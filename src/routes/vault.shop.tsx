import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { vaultProducts, vaultCategories, type VaultProduct } from "@/lib/vault-products";
import { VaultProductCard } from "@/components/vault/VaultProductCard";
import { ArcaneSigil } from "@/components/vault/VaultIcons";

export const Route = createFileRoute("/vault/shop")({
  head: () => ({
    meta: [
      { title: "The Armory — Viral Vault" },
      { name: "description", content: "Every instrument in the Latverian armory — coffee, cooking, prep and breakfast, sealed by Doom." },
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
    <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -right-40 top-0 hidden text-[var(--vv-green)] opacity-[0.05] lg:block">
        <ArcaneSigil className="vv-sigil h-[520px] w-[520px]" />
      </div>

      <header className="mb-12 max-w-3xl">
        <div className="text-[11px] uppercase tracking-[0.28em] text-[var(--vv-green)]">The Armory</div>
        <h1 className="mt-3 font-vault-display text-5xl leading-tight text-[var(--vv-ink)] sm:text-6xl">
          The vault.
        </h1>
        <p className="mt-4 font-vault-serif text-[17px] italic text-[var(--vv-ink-soft)]">
          Every relic in the Latverian catalogue. Filter by guild, sort by tribute.
        </p>
      </header>

      <div className="mb-10 flex flex-col gap-4 border-b border-[var(--vv-green-line)] pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {(["All", ...vaultCategories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={[
                "border px-4 py-1.5 text-[11px] uppercase tracking-[0.18em] transition",
                cat === c
                  ? "border-[var(--vv-green)] bg-[var(--vv-green)] text-white"
                  : "border-[var(--vv-green-line)] bg-white text-[var(--vv-ink)] hover:border-[var(--vv-green)]",
              ].join(" ")}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--vv-ink-soft)]">Decree</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="border border-[var(--vv-green-line)] bg-white px-3 py-1.5 text-xs text-[var(--vv-ink)] focus:border-[var(--vv-green)] focus:outline-none"
          >
            <option value="featured">Sovereign's order</option>
            <option value="price-asc">Tribute · low to high</option>
            <option value="price-desc">Tribute · high to low</option>
          </select>
        </div>
      </div>

      <div className="mb-6 text-[11px] uppercase tracking-[0.22em] text-[var(--vv-ink-soft)]">{list.length} relics</div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {list.map((p, i) => (
          <VaultProductCard product={p} key={p.slug} index={i} />
        ))}
      </div>
    </div>
  );
}
