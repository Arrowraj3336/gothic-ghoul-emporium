import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { vaultProducts as defaultProducts, type VaultProduct } from "./vault-products";

/**
 * Runtime-editable product store.
 * Reads defaults from vault-products.ts, applies localStorage overrides + additions.
 * Powers the /x-admin panel without needing a backend.
 */

type Store = {
  overrides: Partial<Record<string, Partial<VaultProduct>>>;
  added: VaultProduct[];
  deleted: string[];
};

const KEY = "xmen-products-v1";
const empty: Store = { overrides: {}, added: [], deleted: [] };

function readStore(): Store {
  if (typeof window === "undefined") return empty;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch { return empty; }
}
function writeStore(s: Store) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent("xmen-products-change"));
}

export function computeProducts(s: Store): VaultProduct[] {
  const base = defaultProducts
    .filter((p) => !s.deleted.includes(p.slug))
    .map((p) => ({ ...p, ...(s.overrides[p.slug] ?? {}) }));
  return [...base, ...s.added];
}

type Ctx = {
  products: VaultProduct[];
  update: (slug: string, patch: Partial<VaultProduct>) => void;
  add: (p: VaultProduct) => void;
  remove: (slug: string) => void;
  reset: () => void;
};
const C = createContext<Ctx | null>(null);

export function XmenProductsProvider({ children }: { children: React.ReactNode }) {
  const [store, setStore] = useState<Store>(empty);
  useEffect(() => {
    setStore(readStore());
    const onChange = () => setStore(readStore());
    window.addEventListener("xmen-products-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("xmen-products-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const update = useCallback((slug: string, patch: Partial<VaultProduct>) => {
    setStore((prev) => {
      const next = { ...prev, overrides: { ...prev.overrides, [slug]: { ...(prev.overrides[slug] ?? {}), ...patch } } };
      writeStore(next);
      return next;
    });
  }, []);
  const add = useCallback((p: VaultProduct) => {
    setStore((prev) => { const next = { ...prev, added: [...prev.added, p] }; writeStore(next); return next; });
  }, []);
  const remove = useCallback((slug: string) => {
    setStore((prev) => {
      const inAdded = prev.added.some((p) => p.slug === slug);
      const next: Store = inAdded
        ? { ...prev, added: prev.added.filter((p) => p.slug !== slug) }
        : { ...prev, deleted: [...prev.deleted, slug] };
      writeStore(next);
      return next;
    });
  }, []);
  const reset = useCallback(() => { writeStore(empty); setStore(empty); }, []);

  const products = useMemo(() => computeProducts(store), [store]);
  return <C.Provider value={{ products, update, add, remove, reset }}>{children}</C.Provider>;
}

export function useProductStore() {
  const v = useContext(C);
  if (!v) throw new Error("useProductStore must be inside XmenProductsProvider");
  return v;
}

/** Read the current products from localStorage without a provider (SSR-safe). */
export function useProducts(): VaultProduct[] {
  const [list, setList] = useState<VaultProduct[]>(() => computeProducts(empty));
  useEffect(() => {
    const sync = () => setList(computeProducts(readStore()));
    sync();
    window.addEventListener("xmen-products-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("xmen-products-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return list;
}

export function getProductBySlug(slug: string): VaultProduct | undefined {
  if (typeof window === "undefined") return defaultProducts.find((p) => p.slug === slug);
  return computeProducts(readStore()).find((p) => p.slug === slug);
}
