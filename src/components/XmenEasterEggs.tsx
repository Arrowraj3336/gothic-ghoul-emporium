import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { XLogo, ClawsIcon, HelmetIcon, PhoenixIcon, TelepathyIcon, StormIcon, VisorIcon } from "./XmenIcons";
import { xfx } from "@/lib/xmen-fx";

/**
 * Hidden X-Men easter eggs (active on every Viral Vault page).
 *
 * Keyboard shortcuts (single keypress, not in input fields):
 *   X  → X-pulse insignia flash
 *   M  → Magneto: page tremor
 *   W  → Wolverine: claw slash overlay
 *   J  → Jean Grey: Phoenix flame
 *   P  → Professor X: telepathy ripple
 *   S  → Storm: lightning flash
 *   C  → Cyclops: optic-beam scan
 *
 * Konami code (↑↑↓↓←→←→BA) → Nightcrawler BAMF teleport
 *
 * Click easter eggs:
 *   • Click the navbar logo 5 times → Cerebro broadcast
 */

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

type Egg =
  | { kind: "x" }
  | { kind: "magneto" }
  | { kind: "wolverine" }
  | { kind: "phoenix" }
  | { kind: "professor" }
  | { kind: "storm" }
  | { kind: "cyclops" }
  | { kind: "bamf" }
  | { kind: "cerebro" };

export function XmenEasterEggs() {
  const [egg, setEgg] = useState<Egg | null>(null);
  const seqRef = useRef<string[]>([]);
  const clearRef = useRef<number | null>(null);

  function trigger(e: Egg, msg?: { title: string; sub?: string }) {
    setEgg(e);
    if (msg) toast(msg.title, { description: msg.sub });
    if (clearRef.current) window.clearTimeout(clearRef.current);
    clearRef.current = window.setTimeout(() => setEgg(null), 1600);
  }

  useEffect(() => {
    function isTyping(t: EventTarget | null) {
      const el = t as HTMLElement | null;
      if (!el) return false;
      const tag = el.tagName;
      return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el.isContentEditable;
    }

    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTyping(e.target)) return;

      // Konami
      const expected = KONAMI[seqRef.current.length];
      const key =
        e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight"
          ? e.key
          : e.key.toLowerCase();
      if (key === expected) {
        seqRef.current.push(key);
        if (seqRef.current.length === KONAMI.length) {
          seqRef.current = [];
          xfx.bamf();
          trigger({ kind: "bamf" }, { title: "*BAMF*", sub: "Nightcrawler dropped in. Smells like brimstone." });
          return;
        }
      } else {
        // restart sequence (allow first arrow to begin again)
        seqRef.current = key === KONAMI[0] ? [key] : [];
      }

      // Single-key triggers
      if (e.key.length !== 1) return;
      switch (e.key.toLowerCase()) {
        case "x":
          xfx.x(); trigger({ kind: "x" }, { title: "X marks the spot." }); break;
        case "m":
          xfx.magneto();
          trigger({ kind: "magneto" }, { title: "Magneto", sub: "Every fork in the room just twitched." });
          document.body.classList.add("xm-shake");
          window.setTimeout(() => document.body.classList.remove("xm-shake"), 1300);
          break;
        case "w":
          xfx.wolverine(); trigger({ kind: "wolverine" }, { title: "Wolverine", sub: "*SNIKT*" }); break;
        case "j":
          xfx.phoenix(); trigger({ kind: "phoenix" }, { title: "Phoenix", sub: "Fire and life incarnate." }); break;
        case "p":
          xfx.professor(); trigger({ kind: "professor" }, { title: "Professor X", sub: "I have been expecting you." }); break;
        case "s":
          xfx.storm(); trigger({ kind: "storm" }, { title: "Storm", sub: "The skies obey." }); break;
        case "c":
          xfx.cyclops(); trigger({ kind: "cyclops" }, { title: "Cyclops", sub: "Optic beams: armed." }); break;
      }
    }

    // logo click counter
    let count = 0;
    let resetT: number | null = null;
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("[data-xm-logo]");
      if (!target) return;
      count += 1;
      if (resetT) window.clearTimeout(resetT);
      resetT = window.setTimeout(() => (count = 0), 1500);
      if (count >= 5) {
        count = 0;
        xfx.cerebro();
        trigger({ kind: "cerebro" }, { title: "CEREBRO ONLINE", sub: "Scanning for mutant signatures…" });
      }
    }

    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
      if (clearRef.current) window.clearTimeout(clearRef.current);
      if (resetT) window.clearTimeout(resetT);
    };
  }, []);

  if (!egg) return null;
  return (
    <div className="xm-egg-overlay">
      {egg.kind === "x" && <XLogo className="h-64 w-64 text-xmen-red drop-shadow-[0_0_30px_rgba(200,32,42,0.7)]" />}
      {egg.kind === "magneto" && <HelmetIcon className="h-56 w-56 text-[#6b3fa0] drop-shadow-[0_0_30px_rgba(107,63,160,0.7)]" />}
      {egg.kind === "wolverine" && (
        <div className="flex gap-6">
          <ClawsIcon className="h-64 w-32 text-xmen-ink drop-shadow-[0_0_18px_rgba(0,0,0,0.4)]" />
          <ClawsIcon className="h-64 w-32 -scale-x-100 text-xmen-ink drop-shadow-[0_0_18px_rgba(0,0,0,0.4)]" />
        </div>
      )}
      {egg.kind === "phoenix" && <PhoenixIcon className="h-64 w-80 text-[#ff5b1f] drop-shadow-[0_0_40px_rgba(255,91,31,0.8)]" />}
      {egg.kind === "professor" && <TelepathyIcon className="h-72 w-72 text-[#1f3a93] drop-shadow-[0_0_30px_rgba(31,58,147,0.6)]" />}
      {egg.kind === "storm" && <StormIcon className="h-64 w-64 text-[#4cc9ff] drop-shadow-[0_0_30px_rgba(76,201,255,0.8)]" />}
      {egg.kind === "cyclops" && (
        <div className="relative w-screen">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 bg-xmen-red shadow-[0_0_30px_8px_rgba(200,32,42,0.8)]" />
          <VisorIcon className="relative mx-auto h-24 w-48 text-xmen-ink" />
        </div>
      )}
      {egg.kind === "bamf" && (
        <div className="xm-bamf grid place-items-center">
          <div className="font-xmen-display text-[120px] leading-none text-[#3b1a73] drop-shadow-[0_0_40px_rgba(59,26,115,0.8)]">
            *BAMF*
          </div>
        </div>
      )}
      {egg.kind === "cerebro" && (
        <div className="relative grid place-items-center">
          <div className="h-72 w-72 rounded-full border border-xmen-red animate-ping" />
          <div className="absolute h-48 w-48 rounded-full border border-xmen-red/70" />
          <div className="absolute h-24 w-24 rounded-full border-2 border-xmen-red" />
          <div className="absolute font-xmen-mono text-[11px] uppercase tracking-[0.3em] text-xmen-red">
            Cerebro · Online
          </div>
        </div>
      )}
    </div>
  );
}
