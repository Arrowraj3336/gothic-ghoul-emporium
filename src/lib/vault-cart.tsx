import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { vaultProducts, type VaultProduct } from "./vault-products";

export type VaultCartItem = { slug: string; qty: number };

type Ctx = {
  items: VaultCartItem[];
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  detailed: { product: VaultProduct; qty: number; lineTotal: number }[];
};

const CtxObj = createContext<Ctx | null>(null);
const KEY = "viral-vault-cart-v1";

export function VaultCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<VaultCartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<Ctx>(() => {
    const detailed = items
      .map((i) => {
        const product = vaultProducts.find((p) => p.slug === i.slug);
        if (!product) return null;
        return { product, qty: i.qty, lineTotal: product.price * i.qty };
      })
      .filter(Boolean) as Ctx["detailed"];

    return {
      items,
      add: (slug, qty = 1) =>
        setItems((prev) => {
          const existing = prev.find((p) => p.slug === slug);
          if (existing) return prev.map((p) => (p.slug === slug ? { ...p, qty: p.qty + qty } : p));
          return [...prev, { slug, qty }];
        }),
      remove: (slug) => setItems((prev) => prev.filter((p) => p.slug !== slug)),
      setQty: (slug, qty) =>
        setItems((prev) =>
          qty <= 0 ? prev.filter((p) => p.slug !== slug) : prev.map((p) => (p.slug === slug ? { ...p, qty } : p)),
        ),
      clear: () => setItems([]),
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal: detailed.reduce((s, d) => s + d.lineTotal, 0),
      detailed,
    };
  }, [items]);

  return <CtxObj.Provider value={value}>{children}</CtxObj.Provider>;
}

export function useVaultCart() {
  const c = useContext(CtxObj);
  if (!c) throw new Error("useVaultCart must be used inside VaultCartProvider");
  return c;
}
