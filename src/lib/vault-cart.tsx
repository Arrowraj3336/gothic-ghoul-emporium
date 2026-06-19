import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { vaultProducts } from "./vault-products";

type CartItem = { slug: string; qty: number };
type Ctx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  detailed: { product: (typeof vaultProducts)[number]; qty: number; lineTotal: number }[];
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const XmenCartContext = createContext<Ctx | null>(null);
const KEY = "xmen-cart-v1";

export function XmenCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const add = useCallback((slug: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug);
      if (existing) return prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { slug, qty }];
    });
  }, []);
  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) => qty <= 0 ? prev.filter((i) => i.slug !== slug) : prev.map((i) => i.slug === slug ? { ...i, qty } : i));
  }, []);
  const remove = useCallback((slug: string) => setItems((prev) => prev.filter((i) => i.slug !== slug)), []);
  const clear = useCallback(() => setItems([]), []);

  const detailed = useMemo(() => items.flatMap((it) => {
    const p = vaultProducts.find((p) => p.slug === it.slug);
    return p ? [{ product: p, qty: it.qty, lineTotal: p.price * it.qty }] : [];
  }), [items]);
  const subtotal = useMemo(() => detailed.reduce((a, b) => a + b.lineTotal, 0), [detailed]);
  const count = useMemo(() => items.reduce((a, b) => a + b.qty, 0), [items]);

  return (
    <XmenCartContext.Provider value={{ items, count, subtotal, detailed, add, setQty, remove, clear }}>
      {children}
    </XmenCartContext.Provider>
  );
}

export function useXmenCart() {
  const v = useContext(XmenCartContext);
  if (!v) throw new Error("useXmenCart must be inside XmenCartProvider");
  return v;
}
