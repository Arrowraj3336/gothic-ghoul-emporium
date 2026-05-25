import vase from "@/assets/product-vase.jpg";
import lamp from "@/assets/product-lamp.jpg";
import hourglass from "@/assets/product-hourglass.jpg";
import cloche from "@/assets/product-cloche.jpg";
import candle from "@/assets/product-candle.jpg";
import mirror from "@/assets/product-mirror.jpg";
import throwBlanket from "@/assets/product-throw.jpg";
import bookend from "@/assets/product-bookend.jpg";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  category: "Lighting" | "Decor" | "Furnishing" | "Accents";
  collection: string;
  description: string;
  details: string[];
  stock: number;
  rating: number;
  reviews: number;
};

export const products: Product[] = [
  {
    slug: "umbra-vase",
    name: "Umbra Faceted Vase",
    tagline: "Geometric matte-black centerpiece with brass inlay.",
    price: 189,
    image: vase,
    category: "Decor",
    collection: "Cape Crusader",
    description:
      "Hand-finished in matte obsidian ceramic with hairline brass inlays that catch the light like a blade in the dark. A silhouette as deliberate as a pointed ear.",
    details: ["Matte black ceramic", "Brass inlay detailing", "Hand-finished in Gotham, NJ", "9.4\" tall"],
    stock: 12,
    rating: 4.9,
    reviews: 142,
  },
  {
    slug: "nocturne-sconce",
    name: "Nocturne Wing Sconce",
    tagline: "A wall lamp shaped like outstretched wings.",
    price: 349,
    image: lamp,
    category: "Lighting",
    collection: "Vigilante",
    description:
      "Cast-iron sconce inspired by spread wings, casting an amber halo that summons the night. Hardwired or plug-in.",
    details: ["Cast iron, powder-coated", "E26 socket, dimmable", "Amber LED included", "16\" wingspan"],
    stock: 8,
    rating: 5.0,
    reviews: 89,
  },
  {
    slug: "midnight-hourglass",
    name: "Midnight Hourglass",
    tagline: "Time, told in copper sand on black marble.",
    price: 129,
    image: hourglass,
    category: "Accents",
    collection: "Detective",
    description:
      "A 30-minute hourglass on a brushed black base. For contemplation, focus, or the unsolved case on your desk.",
    details: ["30-minute glass", "Hand-blown borosilicate", "Brushed aluminum frame", "Copper sand"],
    stock: 24,
    rating: 4.8,
    reviews: 67,
  },
  {
    slug: "raven-cloche",
    name: "Raven Cloche",
    tagline: "Smoked glass dome over a cast raven.",
    price: 159,
    image: cloche,
    category: "Decor",
    collection: "Arkham",
    description:
      "A glass cloche enclosing a hand-cast raven figurine. Slightly ominous, completely beautiful.",
    details: ["Smoked borosilicate dome", "Solid cast resin raven", "Ebony wood base", "12\" tall"],
    stock: 15,
    rating: 4.7,
    reviews: 51,
  },
  {
    slug: "obsidian-pillar-candle",
    name: "Obsidian Pillar Candle",
    tagline: "Hand-poured, smoke and oud.",
    price: 49,
    image: candle,
    category: "Accents",
    collection: "Cape Crusader",
    description:
      "A ribbed black pillar candle infused with smoked oud, leather, and a whisper of cedar. 40-hour burn.",
    details: ["Soy & coconut wax blend", "40 hour burn time", "Cotton wick", "Made in small batches"],
    stock: 60,
    rating: 4.9,
    reviews: 318,
  },
  {
    slug: "gargoyle-mirror",
    name: "Gargoyle Baroque Mirror",
    tagline: "An ornate mirror that watches the room.",
    price: 459,
    image: mirror,
    category: "Decor",
    collection: "Arkham",
    description:
      "Hand-carved ornamental frame in aged gilt, cradling a smoke-tinted oval mirror. A statement piece, full stop.",
    details: ["Hand-carved wood frame", "Aged gilt finish", "Smoke-tinted glass", "32\" x 22\""],
    stock: 6,
    rating: 4.9,
    reviews: 44,
  },
  {
    slug: "shadow-knit-throw",
    name: "Shadow Knit Throw",
    tagline: "Chunky charcoal knit, butter soft.",
    price: 119,
    image: throwBlanket,
    category: "Furnishing",
    collection: "Wayne Manor",
    description:
      "A heavyweight, hand-knit throw in deep charcoal merino. Drape it across a tufted leather chesterfield and disappear into the evening.",
    details: ["100% merino wool", "Hand-knit", "50\" x 70\"", "Dry clean only"],
    stock: 30,
    rating: 4.8,
    reviews: 201,
  },
  {
    slug: "bat-wing-bookends",
    name: "Bat-Wing Bookends",
    tagline: "Angular wings that hold the night's library.",
    price: 89,
    image: bookend,
    category: "Accents",
    collection: "Vigilante",
    description:
      "A pair of solid steel bookends folded into sharp, wing-like silhouettes. Weighted to hold a small library — or one very dramatic novel.",
    details: ["Solid powder-coated steel", "Set of two", "6 lbs each", "Felt-lined base"],
    stock: 18,
    rating: 5.0,
    reviews: 96,
  },
];

export const collections = ["Cape Crusader", "Vigilante", "Detective", "Arkham", "Wayne Manor"];
export const categories: Product["category"][] = ["Lighting", "Decor", "Furnishing", "Accents"];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
