/**
 * Real X-Men character PNG assets (backgrounds already removed).
 * Used across the site as decorative portraits — hero cast, squad grid,
 * page backdrops, admin previews, etc.
 */
import cyclops from "@/assets/xmen/cyclops.png.asset.json";
import wolverine from "@/assets/xmen/wolverine.png.asset.json";
import xavier from "@/assets/xmen/xavier.png.asset.json";
import magneto from "@/assets/xmen/magneto.png.asset.json";
import gambit from "@/assets/xmen/gambit.png.asset.json";
import nightcrawler from "@/assets/xmen/nightcrawler.png.asset.json";
import colossus from "@/assets/xmen/colossus.png.asset.json";
import storm from "@/assets/xmen/storm.png.asset.json";

export type CastMember = {
  slug: string;
  name: string;
  codename: string;
  power: string;
  quote: string;
  color: string;
  colorSoft: string;
  ring: string;
  img: string;
};

export const xmenCast: CastMember[] = [
  {
    slug: "cyclops", name: "Scott Summers", codename: "Cyclops",
    power: "Concussive optic beams",
    quote: "Heat. Focused. Surgical.",
    color: "#c8202a", colorSoft: "#ffe9eb", ring: "rgba(200,32,42,0.35)",
    img: cyclops.url,
  },
  {
    slug: "wolverine", name: "Logan Howlett", codename: "Wolverine",
    power: "Adamantium claws · healing factor",
    quote: "Bub, I'm the best there is at what I do.",
    color: "#d4a017", colorSoft: "#fbf3dc", ring: "rgba(212,160,23,0.35)",
    img: wolverine.url,
  },
  {
    slug: "xavier", name: "Charles Xavier", codename: "Professor X",
    power: "Telepathy · psionic intellect",
    quote: "The mind is a beautiful, terrible thing.",
    color: "#1f6b3a", colorSoft: "#e4f4ea", ring: "rgba(31,107,58,0.35)",
    img: xavier.url,
  },
  {
    slug: "magneto", name: "Erik Lehnsherr", codename: "Magneto",
    power: "Master of magnetism",
    quote: "Steel bends to my will.",
    color: "#6b0d16", colorSoft: "#fbe6e9", ring: "rgba(107,13,22,0.4)",
    img: magneto.url,
  },
  {
    slug: "storm", name: "Ororo Munroe", codename: "Storm",
    power: "Weather manipulation",
    quote: "I have summoned a perfect rain.",
    color: "#1a3f8b", colorSoft: "#e6ecf9", ring: "rgba(26,63,139,0.35)",
    img: storm.url,
  },
  {
    slug: "nightcrawler", name: "Kurt Wagner", codename: "Nightcrawler",
    power: "Teleportation",
    quote: "Bamf — and I'm already there.",
    color: "#3a1f78", colorSoft: "#ece4fb", ring: "rgba(58,31,120,0.35)",
    img: nightcrawler.url,
  },
  {
    slug: "gambit", name: "Remy LeBeau", codename: "Gambit",
    power: "Kinetic charge",
    quote: "Ace up my sleeve, chère.",
    color: "#8b3a62", colorSoft: "#f7e4ed", ring: "rgba(139,58,98,0.35)",
    img: gambit.url,
  },
  {
    slug: "colossus", name: "Piotr Rasputin", codename: "Colossus",
    power: "Organic steel form",
    quote: "Unbreakable. Unmoved.",
    color: "#4a5568", colorSoft: "#eaeef3", ring: "rgba(74,85,104,0.35)",
    img: colossus.url,
  },
];

export const castByCodename = Object.fromEntries(xmenCast.map((c) => [c.codename.toLowerCase(), c]));
