import { useEffect, useState } from "react";

/**
 * Editable text-zone store — powers the admin "Text Zone" tab.
 * A flat object of page slug → field → value. Persisted to localStorage
 * so anything the site reads with `useTextZone(page, field, fallback)`
 * updates live when the admin saves.
 */

export type TextZone = Record<string, Record<string, string>>;
const KEY = "xmen-text-zone-v1";
const EVT = "xmen-text-zone-change";

const DEFAULTS: TextZone = {
  home: {
    heroEyebrow: "New drop live · Free shipping ₹12,500+",
    heroTitle: "Kitchen gear",
    heroTitleAccent: "worth the hype.",
    heroSubtitle:
      "Viral Vault brings you smart, simple kitchen and home appliances — styled after your favourite X-Men. Easy to use, built to last, and ready to ship the same day.",
    heroPrimaryCta: "Shop the collection",
    heroSecondaryCta: "Our story",
    manifestoTitle: "Built for the extraordinary.",
    manifestoEyebrow: "// why viral vault",
    bestSellersTitle: "Loved by the squad.",
    bestSellersSubtitle:
      "Our top-rated gear this season — the pieces people keep coming back for.",
    dropsTitle: "Fresh in the vault",
    squadTitle: "Every product, a hero.",
    squadSubtitle:
      "Each item in the Vault is paired with an X-Men member. Tap in to see who's yours.",
    newsletterTitle: "Join the club.",
    newsletterSubtitle:
      "A short monthly email — new arrivals, member-only offers, and the odd easter egg.",
  },
  about: {
    heroTitle: "The Institute for Gifted Appliances.",
    heroSubtitle:
      "We test everything twice — once in the lab, once in a real kitchen. Only the standouts get through.",
  },
  contact: {
    heroTitle: "Signal Cerebro.",
    heroSubtitle: "We answer every message within one business day.",
  },
  shop: {
    heroTitle: "The full Vault.",
    heroSubtitle: "Every hero, every gadget — filter, sort, recruit.",
  },
};

export const TEXT_ZONE_PAGES: { slug: string; label: string; fields: { key: string; label: string; multiline?: boolean }[] }[] = [
  {
    slug: "home",
    label: "Homepage",
    fields: [
      { key: "heroEyebrow", label: "Hero eyebrow" },
      { key: "heroTitle", label: "Hero title (line 1)" },
      { key: "heroTitleAccent", label: "Hero title accent (line 2)" },
      { key: "heroSubtitle", label: "Hero subtitle", multiline: true },
      { key: "heroPrimaryCta", label: "Primary CTA" },
      { key: "heroSecondaryCta", label: "Secondary CTA" },
      { key: "manifestoEyebrow", label: "Manifesto eyebrow" },
      { key: "manifestoTitle", label: "Manifesto title" },
      { key: "bestSellersTitle", label: "Best sellers title" },
      { key: "bestSellersSubtitle", label: "Best sellers subtitle", multiline: true },
      { key: "dropsTitle", label: "New arrivals title" },
      { key: "squadTitle", label: "Squad title" },
      { key: "squadSubtitle", label: "Squad subtitle", multiline: true },
      { key: "newsletterTitle", label: "Newsletter title" },
      { key: "newsletterSubtitle", label: "Newsletter subtitle", multiline: true },
    ],
  },
  { slug: "about", label: "About page", fields: [
      { key: "heroTitle", label: "Hero title" },
      { key: "heroSubtitle", label: "Hero subtitle", multiline: true },
  ]},
  { slug: "contact", label: "Contact page", fields: [
      { key: "heroTitle", label: "Hero title" },
      { key: "heroSubtitle", label: "Hero subtitle", multiline: true },
  ]},
  { slug: "shop", label: "Shop page", fields: [
      { key: "heroTitle", label: "Hero title" },
      { key: "heroSubtitle", label: "Hero subtitle", multiline: true },
  ]},
];

export function readTextZone(): TextZone {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "{}") as TextZone;
    const merged: TextZone = {};
    for (const page of Object.keys(DEFAULTS)) {
      merged[page] = { ...DEFAULTS[page], ...(raw[page] ?? {}) };
    }
    return merged;
  } catch {
    return DEFAULTS;
  }
}

export function writeTextZone(next: TextZone) {
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(EVT));
}

export function resetTextZone() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVT));
}

export function useTextZone(page: string) {
  const [data, setData] = useState<Record<string, string>>(() => readTextZone()[page] ?? {});
  useEffect(() => {
    const sync = () => setData(readTextZone()[page] ?? {});
    sync();
    window.addEventListener(EVT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [page]);
  return (field: string, fallback = "") => data[field] ?? fallback;
}

export { DEFAULTS as TEXT_ZONE_DEFAULTS };
