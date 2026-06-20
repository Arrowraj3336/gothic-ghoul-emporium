/**
 * Per-product X-Men character themes.
 * Each Viral Vault product is "headlined" by a different mutant.
 */

export type XmenCharacter = {
  name: string;
  codename: string;
  power: string;
  quote: string;
  color: string;        // hex accent
  colorSoft: string;    // background tint
  ring: string;         // rgba for soft glow
};

export const xmenCharacters: Record<string, XmenCharacter> = {
  "atelier-stand-mixer": {
    name: "Hank McCoy",
    codename: "Beast",
    power: "Genius-level intellect · superhuman strength",
    quote: "Oh my stars and garters — the dough is rising at calibrated entropy.",
    color: "#1f3a93",
    colorSoft: "#e7ecff",
    ring: "rgba(31,58,147,0.35)",
  },
  "luma-pour-kettle": {
    name: "Ororo Munroe",
    codename: "Storm",
    power: "Atmospheric control · weather manipulation",
    quote: "I have summoned a single, perfect rain — at ninety-three degrees.",
    color: "#4cc9ff",
    colorSoft: "#e6f7ff",
    ring: "rgba(76,201,255,0.35)",
  },
  "noir-espresso-press": {
    name: "Erik Lehnsherr",
    codename: "Magneto",
    power: "Magnetokinesis · master of metal",
    quote: "Steel bends to my will. Today, it bends into a perfect crema.",
    color: "#6b3fa0",
    colorSoft: "#f1e9fb",
    ring: "rgba(107,63,160,0.35)",
  },
  "halo-air-fryer": {
    name: "Scott Summers",
    codename: "Cyclops",
    power: "Concussive optic beams",
    quote: "Heat. Focused. Surgical. The crust never had a chance.",
    color: "#c8202a",
    colorSoft: "#ffe9eb",
    ring: "rgba(200,32,42,0.40)",
  },
  "pebble-personal-blender": {
    name: "Pietro Maximoff",
    codename: "Quicksilver",
    power: "Superhuman speed",
    quote: "I made the smoothie before you finished the sentence.",
    color: "#0fb5a8",
    colorSoft: "#e3fbf7",
    ring: "rgba(15,181,168,0.35)",
  },
  "crisp-two-slice-toaster": {
    name: "Logan Howlett",
    codename: "Wolverine",
    power: "Adamantium claws · regenerative healing",
    quote: "Bub, the only thing crispier than my temper is this toast.",
    color: "#d4a017",
    colorSoft: "#fbf3dc",
    ring: "rgba(212,160,23,0.35)",
  },
  "harvest-rice-cooker": {
    name: "Charles Xavier",
    codename: "Professor X",
    power: "Telepathy · psionic intellect",
    quote: "I have read the grains. They are ready in nineteen minutes.",
    color: "#7a0e16",
    colorSoft: "#fbe9eb",
    ring: "rgba(122,14,22,0.35)",
  },
  "fold-hand-mixer": {
    name: "Jean Grey",
    codename: "Phoenix",
    power: "Telekinesis · cosmic fire",
    quote: "Folding without lifting a finger. The cream is mine to command.",
    color: "#ff5b1f",
    colorSoft: "#ffe7da",
    ring: "rgba(255,91,31,0.35)",
  },
};

export function getCharacter(slug: string): XmenCharacter {
  return (
    xmenCharacters[slug] ?? {
      name: "Unknown Mutant",
      codename: "X-Class",
      power: "Classified",
      quote: "Cerebro has flagged this gear — details restricted.",
      color: "#c8202a",
      colorSoft: "#ffe9eb",
      ring: "rgba(200,32,42,0.35)",
    }
  );
}
