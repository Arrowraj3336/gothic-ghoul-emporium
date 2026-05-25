import { useEffect, useState } from "react";
import { FlyingBat } from "./BatSignal";
import { toast } from "sonner";

const SEQUENCE = ["b", "a", "t"];

// Easter egg: type "bat" anywhere to summon a bat across the screen
export function KonamiBat() {
  const [bats, setBats] = useState<number[]>([]);

  useEffect(() => {
    const buf: string[] = [];
    function onKey(e: KeyboardEvent) {
      const k = e.key.toLowerCase();
      buf.push(k);
      if (buf.length > SEQUENCE.length) buf.shift();
      if (SEQUENCE.every((s, i) => buf[i] === s)) {
        const id = Date.now();
        setBats((b) => [...b, id]);
        toast("The bat answers.", { description: "You have summoned the night." });
        setTimeout(() => setBats((b) => b.filter((x) => x !== id)), 2600);
        buf.length = 0;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {bats.map((id) => (
        <FlyingBat key={id} />
      ))}
    </>
  );
}
