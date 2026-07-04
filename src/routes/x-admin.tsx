import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useProducts, computeProducts } from "@/lib/xmen-products-store";
import { vaultProducts as defaults, type VaultProduct } from "@/lib/vault-products";
import { toast } from "sonner";
import { Trash2, Plus, RotateCcw, Save } from "lucide-react";
import { formatINR } from "@/lib/utils";

export const Route = createFileRoute("/x-admin")({
  head: () => ({ meta: [{ title: "X-Admin — Product Manager" }, { name: "robots", content: "noindex" }] }),
  component: XAdmin,
});

const KEY = "xmen-products-v1";
const AUTH_KEY = "xmen-admin-ok";
const PASSCODE = "xavier";

function readStore() {
  try { return JSON.parse(localStorage.getItem(KEY) || "null") ?? { overrides: {}, added: [], deleted: [] }; }
  catch { return { overrides: {}, added: [], deleted: [] }; }
}
function writeStore(s: any) {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent("xmen-products-change"));
}

function XAdmin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const products = useProducts();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setAuthed(sessionStorage.getItem(AUTH_KEY) === "1");
  }, []);

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// restricted</div>
        <h1 className="mt-2 font-xmen-display text-4xl">X-Admin</h1>
        <p className="mt-3 text-sm text-xmen-ink-soft">Cerebro passcode required.</p>
        <form
          className="mt-8 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (pass.trim().toLowerCase() === PASSCODE) {
              sessionStorage.setItem(AUTH_KEY, "1");
              setAuthed(true);
            } else toast.error("Access denied");
          }}
        >
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="passcode"
            className="w-full rounded-full px-5 py-3 font-xmen-mono text-sm text-center"
          />
          <button className="w-full rounded-full bg-xmen-red px-6 py-3 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white">
            Enter
          </button>
          <p className="font-xmen-mono text-[10px] text-xmen-ink-soft">hint: xavier</p>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// x-admin</div>
          <h1 className="font-xmen-display text-4xl sm:text-5xl">Product Manager</h1>
          <p className="mt-2 text-sm text-xmen-ink-soft">Add, edit, or remove products. Stored locally in your browser.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { writeStore({ overrides: {}, added: [], deleted: [] }); toast.success("Reset to defaults"); }}
            className="inline-flex items-center gap-1.5 rounded-full border border-xmen-line px-4 py-2 font-xmen-mono text-[11px] uppercase tracking-widest hover:border-xmen-red"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
          <button
            onClick={() => {
              const s = readStore();
              const slug = `new-gear-${Date.now()}`;
              const np: VaultProduct = {
                slug, name: "New X-Gear", tagline: "A fresh addition to the Vault.",
                price: 99, image: defaults[0].image, category: "Prep", description: "Describe this new artifact.",
                features: ["Feature 1"], specs: [{ label: "Weight", value: "1 kg" }],
                stock: 20, rating: 4.5, reviews: 0,
              };
              writeStore({ ...s, added: [...s.added, np] });
              toast.success("Product added");
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-xmen-red px-4 py-2 font-xmen-mono text-[11px] uppercase tracking-widest text-white hover:bg-xmen-ink"
          >
            <Plus className="h-3 w-3" /> New product
          </button>
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        {products.map((p) => <Row key={p.slug} product={p} />)}
      </div>
    </div>
  );
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

const MAX_IMAGE_BYTES = 2_000_000; // ~2MB safety cap for localStorage
function guardSize(file: File): boolean {
  if (file.size > MAX_IMAGE_BYTES) {
    toast.error("Image too large — max 2 MB.");
    return false;
  }
  return true;
}

function Row({ product }: { product: VaultProduct }) {
  const [form, setForm] = useState<VaultProduct>(product);
  const [dirty, setDirty] = useState(false);
  useEffect(() => { setForm(product); setDirty(false); }, [product]);

  function patch<K extends keyof VaultProduct>(k: K, v: VaultProduct[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setDirty(true);
  }
  async function onMainImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; e.target.value = "";
    if (!file) return;
    if (!guardSize(file)) return;
    const url = await readFileAsDataURL(file);
    patch("image", url);
    toast.success("Main image updated (save to persist).");
  }
  async function onAddGallery(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []); e.target.value = "";
    if (!files.length) return;
    const valid = files.filter(guardSize);
    const urls = await Promise.all(valid.map(readFileAsDataURL));
    patch("gallery", [...(form.gallery ?? []), ...urls]);
  }
  function removeGallery(i: number) {
    const next = (form.gallery ?? []).filter((_, idx) => idx !== i);
    patch("gallery", next);
  }
  function save() {
    const s = readStore();
    const inAdded = s.added.some((p: VaultProduct) => p.slug === form.slug);
    if (inAdded) {
      s.added = s.added.map((p: VaultProduct) => p.slug === form.slug ? form : p);
    } else {
      s.overrides[form.slug] = {
        name: form.name, tagline: form.tagline, price: form.price,
        image: form.image, gallery: form.gallery, category: form.category, badge: form.badge,
        description: form.description, stock: form.stock,
      };
    }
    try {
      writeStore(s);
      setDirty(false);
      toast.success(`${form.name} saved`);
    } catch (err) {
      console.error(err);
      toast.error("Save failed — storage may be full. Try smaller images.");
    }
  }
  function remove() {
    if (!confirm(`Delete ${form.name}?`)) return;
    const s = readStore();
    const inAdded = s.added.some((p: VaultProduct) => p.slug === form.slug);
    if (inAdded) s.added = s.added.filter((p: VaultProduct) => p.slug !== form.slug);
    else s.deleted = [...s.deleted, form.slug];
    writeStore(s);
    toast.success("Deleted");
  }

  return (
    <div className="rounded-2xl border border-xmen-line bg-white p-4 sm:p-5">
      <div className="grid gap-4 sm:grid-cols-[140px_1fr] items-start">
        <div className="space-y-2">
          <div className="aspect-square w-full sm:w-[140px] overflow-hidden rounded-xl border border-xmen-line bg-white">
            <img src={form.image} alt={form.name} className="h-full w-full object-contain xm-product-img p-2" />
          </div>
          <label className="block cursor-pointer rounded-full border border-xmen-line px-3 py-1.5 text-center font-xmen-mono text-[10px] uppercase tracking-widest hover:border-xmen-red hover:text-xmen-red">
            Replace main
            <input type="file" accept="image/*" className="hidden" onChange={onMainImage} />
          </label>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <label className="text-xs">
            <span className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">Name</span>
            <input value={form.name} onChange={(e) => patch("name", e.target.value)} className="mt-1 w-full rounded-md px-3 py-2 text-sm" />
          </label>
          <label className="text-xs">
            <span className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">Tagline</span>
            <input value={form.tagline} onChange={(e) => patch("tagline", e.target.value)} className="mt-1 w-full rounded-md px-3 py-2 text-sm" />
          </label>
          <label className="text-xs">
            <span className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">Category</span>
            <select value={form.category} onChange={(e) => patch("category", e.target.value as VaultProduct["category"])} className="mt-1 w-full rounded-md px-3 py-2 text-sm">
              {["Coffee","Cooking","Prep","Breakfast"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="text-xs">
            <span className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">Price (USD → {formatINR(form.price)})</span>
            <input type="number" value={form.price} onChange={(e) => patch("price", Number(e.target.value))} className="mt-1 w-full rounded-md px-3 py-2 text-sm" />
          </label>
          <label className="text-xs">
            <span className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">Stock</span>
            <input type="number" value={form.stock} onChange={(e) => patch("stock", Number(e.target.value))} className="mt-1 w-full rounded-md px-3 py-2 text-sm" />
          </label>
          <label className="text-xs">
            <span className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">Badge</span>
            <input value={form.badge ?? ""} onChange={(e) => patch("badge", e.target.value || undefined)} className="mt-1 w-full rounded-md px-3 py-2 text-sm" />
          </label>
          <label className="text-xs sm:col-span-2">
            <span className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">Main image URL (or use Replace)</span>
            <input value={form.image} onChange={(e) => patch("image", e.target.value)} className="mt-1 w-full rounded-md px-3 py-2 text-sm" />
          </label>
          <label className="text-xs sm:col-span-2">
            <span className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">Description</span>
            <textarea value={form.description} onChange={(e) => patch("description", e.target.value)} rows={2} className="mt-1 w-full rounded-md px-3 py-2 text-sm" />
          </label>

          {/* Gallery uploader */}
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <span className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">Gallery ({(form.gallery ?? []).length})</span>
              <label className="cursor-pointer rounded-full border border-xmen-line px-3 py-1 text-[10px] font-xmen-mono uppercase tracking-widest hover:border-xmen-red hover:text-xmen-red">
                + Add images
                <input type="file" accept="image/*" multiple className="hidden" onChange={onAddGallery} />
              </label>
            </div>
            {(form.gallery ?? []).length > 0 && (
              <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
                {(form.gallery ?? []).map((src, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-lg border border-xmen-line bg-white">
                    <img src={src} alt="" className="h-full w-full object-contain xm-product-img p-1" />
                    <button
                      type="button"
                      aria-label="Remove image"
                      onClick={() => removeGallery(i)}
                      className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-white/90 text-xmen-ink shadow hover:text-xmen-red"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-xmen-line pt-3">
        <div className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">{form.slug}</div>
        <div className="flex gap-2">
          <button onClick={remove} className="inline-flex items-center gap-1.5 rounded-full border border-xmen-line px-3 py-1.5 text-xs text-xmen-ink-soft hover:border-xmen-red hover:text-xmen-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2">
            <Trash2 className="h-3 w-3" /> Delete
          </button>
          <button
            onClick={save}
            disabled={!dirty}
            className="inline-flex items-center gap-1.5 rounded-full bg-xmen-ink px-4 py-1.5 text-xs text-white disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-xmen-red focus-visible:ring-offset-2"
          >
            <Save className="h-3 w-3" /> {dirty ? "Save" : "Saved"}
          </button>
        </div>
      </div>
    </div>
  );
}
