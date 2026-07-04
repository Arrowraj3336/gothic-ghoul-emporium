import mixer from "@/assets/vault-mixer.jpg";
import kettle from "@/assets/vault-kettle.jpg";
import espresso from "@/assets/vault-espresso.jpg";
import airfryer from "@/assets/vault-airfryer.jpg";
import blender from "@/assets/vault-blender.jpg";
import toaster from "@/assets/vault-toaster.jpg";
import ricecooker from "@/assets/vault-ricecooker.jpg";
import handmixer from "@/assets/vault-handmixer.jpg";

export type VaultProduct = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  compareAt?: number;
  image: string;
  /** Optional extra images shown as thumbnails on the product page. */
  gallery?: string[];
  category: "Coffee" | "Cooking" | "Prep" | "Breakfast";
  badge?: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  stock: number;
  rating: number;
  reviews: number;
};

export const vaultProducts: VaultProduct[] = [
  {
    slug: "atelier-stand-mixer",
    name: "Atelier Stand Mixer",
    tagline: "A bakery-grade workhorse in soft cream.",
    price: 389,
    compareAt: 449,
    image: mixer,
    category: "Prep",
    badge: "Bestseller",
    description:
      "The Atelier is a 5.5 quart planetary stand mixer engineered for daily bakers. A whisper-quiet 600W direct-drive motor, ten precise speeds, and a tilt-head design make every loaf, batter and meringue effortless.",
    features: [
      "5.5 qt brushed steel bowl",
      "600W whisper motor — 10 speeds",
      "Includes flat beater, dough hook & whisk",
      "Tilt-head with soft-close",
    ],
    specs: [
      { label: "Capacity", value: "5.5 qt" },
      { label: "Power", value: "600W" },
      { label: "Weight", value: "11.2 kg" },
      { label: "Warranty", value: "5 years" },
    ],
    stock: 18,
    rating: 4.9,
    reviews: 1284,
  },
  {
    slug: "luma-pour-kettle",
    name: "Luma Pour Kettle",
    tagline: "Mirror-polished, gooseneck-precise.",
    price: 119,
    image: kettle,
    category: "Coffee",
    badge: "Viral",
    description:
      "A 1L gooseneck electric kettle with variable temperature control from 40°C to 100°C. Built for pour-over coffee and tea ceremonies — heats in under three minutes and holds temperature for an hour.",
    features: [
      "Variable temp 40–100°C",
      "Gooseneck precision spout",
      "Hold temp for 60 minutes",
      "Cool-touch handle",
    ],
    specs: [
      { label: "Capacity", value: "1.0 L" },
      { label: "Power", value: "1200W" },
      { label: "Material", value: "304 Stainless" },
      { label: "Warranty", value: "2 years" },
    ],
    stock: 42,
    rating: 4.8,
    reviews: 932,
  },
  {
    slug: "noir-espresso-press",
    name: "Noir Espresso Press",
    tagline: "Café-quality shots, kitchen-counter footprint.",
    price: 649,
    compareAt: 749,
    image: espresso,
    category: "Coffee",
    badge: "New",
    description:
      "A semi-automatic espresso machine with 15-bar Italian pump, PID temperature control and a professional 54mm portafilter. Steam wand included for proper microfoam.",
    features: [
      "15-bar Italian pump",
      "PID temperature control",
      "54mm pro portafilter",
      "Articulating steam wand",
    ],
    specs: [
      { label: "Pressure", value: "15 bar" },
      { label: "Tank", value: "1.8 L" },
      { label: "Power", value: "1450W" },
      { label: "Warranty", value: "3 years" },
    ],
    stock: 9,
    rating: 4.9,
    reviews: 412,
  },
  {
    slug: "halo-air-fryer",
    name: "Halo Smart Air Fryer",
    tagline: "Six liters, eight programs, one quiet hum.",
    price: 179,
    image: airfryer,
    category: "Cooking",
    description:
      "A 6L digital air fryer with eight one-touch programs and a removable non-stick basket that's dishwasher safe. App-connected with 80+ guided recipes.",
    features: [
      "6 L capacity — feeds 4",
      "8 one-touch programs",
      "Dishwasher-safe basket",
      "App with 80+ recipes",
    ],
    specs: [
      { label: "Capacity", value: "6 L" },
      { label: "Temp range", value: "40–230°C" },
      { label: "Power", value: "1700W" },
      { label: "Warranty", value: "2 years" },
    ],
    stock: 27,
    rating: 4.7,
    reviews: 2104,
  },
  {
    slug: "pebble-personal-blender",
    name: "Pebble Personal Blender",
    tagline: "Single-serve smoothies, twist-and-go.",
    price: 69,
    image: blender,
    category: "Prep",
    badge: "Viral",
    description:
      "A compact 350ml personal blender with a Tritan travel cup. Cross-blade pulverises ice, frozen fruit and seeds in 30 seconds. Twist-on lid doubles as a drinking spout.",
    features: [
      "350 ml travel cup",
      "Stainless cross-blade",
      "BPA-free Tritan jar",
      "One-touch operation",
    ],
    specs: [
      { label: "Capacity", value: "350 ml" },
      { label: "Power", value: "300W" },
      { label: "Weight", value: "1.1 kg" },
      { label: "Warranty", value: "1 year" },
    ],
    stock: 88,
    rating: 4.6,
    reviews: 5421,
  },
  {
    slug: "crisp-two-slice-toaster",
    name: "Crisp Two-Slice Toaster",
    tagline: "Even browning. Seven shades. No drama.",
    price: 99,
    image: toaster,
    category: "Breakfast",
    description:
      "Brushed-steel two-slice toaster with extra-wide slots, seven browning shades, and dedicated bagel, defrost and reheat modes. A removable crumb tray keeps it spotless.",
    features: [
      "Extra-wide slots",
      "7 browning shades",
      "Bagel / defrost / reheat",
      "Removable crumb tray",
    ],
    specs: [
      { label: "Slots", value: "2 × 32mm" },
      { label: "Power", value: "900W" },
      { label: "Material", value: "Brushed steel" },
      { label: "Warranty", value: "2 years" },
    ],
    stock: 56,
    rating: 4.7,
    reviews: 814,
  },
  {
    slug: "harvest-rice-cooker",
    name: "Harvest Rice Cooker",
    tagline: "Fluffy rice in twenty minutes, every time.",
    price: 149,
    image: ricecooker,
    category: "Cooking",
    description:
      "A 1.8L micro-computer rice cooker with twelve cooking modes — white, brown, sushi, congee, steam and more. Fuzzy logic ensures perfect grain separation, keep-warm holds for 24 hours.",
    features: [
      "12 cooking programs",
      "Fuzzy logic precision",
      "24-hour keep warm",
      "Includes steam tray",
    ],
    specs: [
      { label: "Capacity", value: "1.8 L (10 cups)" },
      { label: "Power", value: "860W" },
      { label: "Inner pot", value: "Non-stick coated" },
      { label: "Warranty", value: "2 years" },
    ],
    stock: 31,
    rating: 4.8,
    reviews: 678,
  },
  {
    slug: "fold-hand-mixer",
    name: "Fold Hand Mixer",
    tagline: "Five-speed, sage-soft, batter-quiet.",
    price: 79,
    image: handmixer,
    category: "Prep",
    description:
      "A featherweight 5-speed hand mixer in pastel sage. Twin stainless beaters detach with a single button. Soft-start avoids splatter; turbo button powers through stiff doughs.",
    features: [
      "5 speeds + turbo",
      "Twin stainless beaters",
      "Soft-start anti-splatter",
      "Cord storage clip",
    ],
    specs: [
      { label: "Power", value: "250W" },
      { label: "Weight", value: "0.9 kg" },
      { label: "Color", value: "Sage" },
      { label: "Warranty", value: "2 years" },
    ],
    stock: 64,
    rating: 4.6,
    reviews: 392,
  },
];

export const vaultCategories: VaultProduct["category"][] = ["Coffee", "Cooking", "Prep", "Breakfast"];

export function getVaultProduct(slug: string) {
  return vaultProducts.find((p) => p.slug === slug);
}
