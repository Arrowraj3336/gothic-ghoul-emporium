import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { xfx } from "@/lib/xmen-fx";
import { vaultProducts } from "@/lib/vault-products";
import { getCharacter } from "@/lib/xmen-characters";
import { XLogo } from "@/components/XmenIcons";

export const Route = createFileRoute("/x-lab")({
  head: () => ({ meta: [{ title: "X-Lab — Dev Panel" }, { name: "robots", content: "noindex" }] }),
  component: XLab,
});

function XLab() {
  const [loaderKey, setLoaderKey] = useState(0);
  const [msg, setMsg] = useState("");

  function tapKey(key: string) {
    setMsg(`Dispatched "${key}" key event`);
    window.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
    setTimeout(() => setMsg(""), 1200);
  }
  function konami() {
    const seq = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    seq.forEach((k, i) => setTimeout(() => window.dispatchEvent(new KeyboardEvent("keydown", { key: k, bubbles: true })), i * 60));
  }
  function replayLoader() {
    sessionStorage.removeItem("xmen-home-loaded-v3");
    setLoaderKey((k) => k + 1);
    // Force transition by navigating to /
    window.location.href = "/";
  }

  const shortcuts: Array<[string, string, keyof typeof xfx]> = [
    ["X", "X-pulse insignia", "x"],
    ["M", "Magneto tremor", "magneto"],
    ["W", "Wolverine · SNIKT", "wolverine"],
    ["J", "Jean Grey / Phoenix", "phoenix"],
    ["P", "Professor X telepathy", "professor"],
    ["S", "Storm lightning", "storm"],
    ["C", "Cyclops optic beam", "cyclops"],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14 sm:px-6 lg:px-8" data-x-lab={loaderKey}>
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full border border-xmen-line">
          <XLogo className="h-4 w-4 text-xmen-red" />
        </span>
        <div>
          <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// developer panel</div>
          <h1 className="font-xmen-display text-4xl sm:text-5xl tracking-tight">X-Lab</h1>
        </div>
      </div>
      <p className="mt-3 max-w-xl text-sm text-xmen-ink-soft">
        Verify every easter egg, animation and per-character product theme. Not linked anywhere in the shipping UI.
      </p>

      {msg && (
        <div className="mt-6 inline-block rounded-full border border-xmen-line bg-white px-3 py-1 font-xmen-mono text-[11px] text-xmen-red">
          {msg}
        </div>
      )}

      <section className="mt-10">
        <h2 className="font-xmen-display text-lg uppercase tracking-[0.25em] text-xmen-ink">Keyboard triggers</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map(([key, label, fx]) => (
            <button
              key={key}
              onClick={() => { xfx[fx](); tapKey(key); }}
              className="flex items-center justify-between rounded-2xl border border-xmen-line bg-white p-4 text-left hover:border-xmen-red transition"
            >
              <div>
                <div className="font-xmen-display text-sm">{label}</div>
                <div className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">press "{key}"</div>
              </div>
              <kbd className="rounded-md border border-xmen-line px-2.5 py-1 font-xmen-mono text-sm">{key}</kbd>
            </button>
          ))}
          <button onClick={konami} className="rounded-2xl border border-xmen-line bg-white p-4 text-left hover:border-xmen-red transition">
            <div className="font-xmen-display text-sm">Konami · Nightcrawler *BAMF*</div>
            <div className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">↑↑↓↓←→←→BA</div>
          </button>
          <button onClick={() => xfx.cerebro()} className="rounded-2xl border border-xmen-line bg-white p-4 text-left hover:border-xmen-red transition">
            <div className="font-xmen-display text-sm">Cerebro broadcast</div>
            <div className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">tap logo 5×</div>
          </button>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-xmen-display text-lg uppercase tracking-[0.25em] text-xmen-ink">Loader / animations</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <button onClick={replayLoader} className="rounded-full bg-xmen-red px-5 py-2.5 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white">
            Replay X-Mansion gate loader
          </button>
          <Link to="/order-success" search={{ id: "XM-DEMO-01", total: 249 } as any} className="rounded-full border border-xmen-line px-5 py-2.5 font-xmen-display text-[11px] uppercase tracking-[0.3em] hover:border-xmen-ink">
            Preview order-success sequence
          </Link>
          <button onClick={() => xfx.success()} className="rounded-full border border-xmen-line px-5 py-2.5 font-xmen-display text-[11px] uppercase tracking-[0.3em]">
            Play success chime
          </button>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-xmen-display text-lg uppercase tracking-[0.25em] text-xmen-ink">Per-character product themes</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {vaultProducts.map((p) => {
            const ch = getCharacter(p.slug);
            return (
              <Link
                key={p.slug}
                to="/products/$slug"
                params={{ slug: p.slug }}
                className="rounded-2xl border p-4 transition hover:-translate-y-0.5"
                style={{ borderColor: ch.ring, background: `linear-gradient(135deg, #fff, ${ch.colorSoft})` }}
              >
                <div className="font-xmen-mono text-[10px] uppercase tracking-widest" style={{ color: ch.color }}>
                  {ch.codename}
                </div>
                <div className="mt-1 font-xmen-display text-base">{p.name}</div>
                <div className="mt-2 flex gap-1.5">
                  <span className="h-3 w-3 rounded-full" style={{ background: ch.color }} />
                  <span className="h-3 w-3 rounded-full" style={{ background: ch.colorSoft }} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-xmen-display text-lg uppercase tracking-[0.25em] text-xmen-ink">Admin</h2>
        <Link to="/x-admin" className="mt-3 inline-block font-xmen-mono text-xs text-xmen-red">→ /x-admin — product CRUD</Link>
      </section>
    </div>
  );
}
