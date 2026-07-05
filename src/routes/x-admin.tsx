import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useProducts } from "@/lib/xmen-products-store";
import { vaultProducts as defaults, type VaultProduct } from "@/lib/vault-products";
import { toast } from "sonner";
import {
  Trash2, Plus, RotateCcw, Save, LogOut, Search, ImagePlus,
  ArrowUp, ArrowDown, Eye, Star, Package,
} from "lucide-react";
import { formatINR } from "@/lib/utils";
import { XLogo } from "@/components/XmenIcons";

export const Route = createFileRoute("/x-admin")({
  head: () => ({ meta: [{ title: "X-Admin — Product Manager" }, { name: "robots", content: "noindex" }] }),
  component: XAdmin,
});

const KEY = "xmen-products-v1";
const AUTH_KEY = "xmen-admin-ok";
const PASSCODE = "xavier";
const MAX_IMAGE_BYTES = 2_000_000;

type Store = { overrides: Record<string, Partial<VaultProduct>>; added: VaultProduct[]; deleted: string[] };
function readStore(): Store {
  try { return JSON.parse(localStorage.getItem(KEY) || "null") ?? { overrides: {}, added: [], deleted: [] }; }
  catch { return { overrides: {}, added: [], deleted: [] }; }
}
function writeStore(s: Store) {
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new CustomEvent("xmen-products-change"));
}
function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
function guardSize(file: File): boolean {
  if (file.size > MAX_IMAGE_BYTES) { toast.error(`${file.name} is too large — max 2 MB.`); return false; }
  return true;
}

function XAdmin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [query, setQuery] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const products = useProducts();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setAuthed(sessionStorage.getItem(AUTH_KEY) === "1");
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
    );
  }, [products, query]);

  const totalStock = products.reduce((n, p) => n + (p.stock || 0), 0);
  const lowStock = products.filter((p) => p.stock <= 5).length;

  if (!authed) {
    return (
      <div className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-16">
        <div className="w-full rounded-3xl border border-xmen-line bg-white p-8 text-center shadow-[0_30px_60px_-30px_rgba(75,30,120,0.35)]">
          <XLogo className="mx-auto h-10 w-10 text-xmen-red" />
          <div className="mt-4 font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">// restricted</div>
          <h1 className="mt-2 font-xmen-display text-4xl">X-Admin</h1>
          <p className="mt-3 text-sm text-xmen-ink-soft">Enter the passcode to manage products.</p>
          <form
            className="mt-8 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (pass.trim().toLowerCase() === PASSCODE) {
                sessionStorage.setItem(AUTH_KEY, "1"); setAuthed(true);
              } else toast.error("Access denied");
            }}
          >
            <input
              type="password" value={pass} onChange={(e) => setPass(e.target.value)}
              placeholder="passcode"
              className="w-full rounded-full border border-xmen-line px-5 py-3 font-xmen-mono text-sm text-center focus:border-xmen-red focus:outline-none"
            />
            <button className="w-full rounded-full bg-xmen-red px-6 py-3 font-xmen-display text-[11px] uppercase tracking-[0.3em] text-white hover:bg-xmen-ink transition">
              Enter
            </button>
            <p className="font-xmen-mono text-[10px] text-xmen-ink-soft">hint: xavier</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      {/* HEADER STRIP */}
      <div className="overflow-hidden rounded-3xl border border-xmen-line bg-gradient-to-br from-white via-white to-[#f7f3ff] p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-xmen-mono text-[10px] uppercase tracking-[0.3em] text-xmen-red">
              <XLogo className="h-3.5 w-3.5" /> x-admin console
            </div>
            <h1 className="mt-2 font-xmen-display text-4xl sm:text-5xl tracking-tight">Product Manager</h1>
            <p className="mt-2 max-w-xl text-sm text-xmen-ink-soft">
              Add products, edit details, upload photos, and reorder gallery images.
              Changes save to your browser and appear on the storefront instantly.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                const s = readStore();
                const slug = `new-gear-${Date.now()}`;
                const np: VaultProduct = {
                  slug, name: "New product", tagline: "Add a short tagline.",
                  price: 99, image: defaults[0].image, category: "Prep",
                  description: "Describe this product.",
                  features: ["Feature 1"], specs: [{ label: "Weight", value: "1 kg" }],
                  stock: 20, rating: 4.5, reviews: 0,
                };
                writeStore({ ...s, added: [...s.added, np] });
                toast.success("Product added");
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-xmen-red px-4 py-2 font-xmen-mono text-[11px] uppercase tracking-widest text-white hover:bg-xmen-ink transition"
            >
              <Plus className="h-3 w-3" /> New product
            </button>
            <button
              onClick={() => {
                if (!confirm("Reset all products back to defaults? Uploads will be lost.")) return;
                writeStore({ overrides: {}, added: [], deleted: [] });
                toast.success("Reset to defaults");
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-xmen-line px-4 py-2 font-xmen-mono text-[11px] uppercase tracking-widest hover:border-xmen-red hover:text-xmen-red transition"
            >
              <RotateCcw className="h-3 w-3" /> Reset
            </button>
            <button
              onClick={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }}
              className="inline-flex items-center gap-1.5 rounded-full border border-xmen-line px-4 py-2 font-xmen-mono text-[11px] uppercase tracking-widest hover:border-xmen-ink transition"
            >
              <LogOut className="h-3 w-3" /> Sign out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat icon={<Package className="h-4 w-4" />} label="Products" value={products.length} />
          <Stat icon={<Star className="h-4 w-4" />} label="Total stock" value={totalStock} />
          <Stat icon={<Trash2 className="h-4 w-4" />} label="Low stock" value={lowStock} tone={lowStock > 0 ? "warn" : "ok"} />
          <Stat icon={<ImagePlus className="h-4 w-4" />} label="Custom" value={readStore().added.length} />
        </div>
      </div>

      {/* SEARCH */}
      <div className="mt-6 flex items-center gap-2 rounded-full border border-xmen-line bg-white px-4 py-2">
        <Search className="h-4 w-4 text-xmen-ink-soft" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, slug, or category…"
          className="w-full bg-transparent py-1 text-sm outline-none placeholder:text-xmen-ink-soft"
        />
        {query && (
          <button onClick={() => setQuery("")} className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft hover:text-xmen-red">clear</button>
        )}
      </div>

      {/* LIST */}
      <div className="mt-6 grid gap-4">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-xmen-line bg-white p-10 text-center text-sm text-xmen-ink-soft">
            No products match "{query}".
          </div>
        )}
        {filtered.map((p) => <Row key={p.slug} product={p} onPreview={setPreview} />)}
      </div>

      {/* PREVIEW LIGHTBOX */}
      {preview && (
        <div
          className="fixed inset-0 z-[300] grid place-items-center bg-black/70 p-4 animate-fade-in"
          role="dialog" aria-label="Image preview"
          onClick={() => setPreview(null)}
        >
          <img src={preview} alt="Preview" className="max-h-[85vh] max-w-[90vw] rounded-2xl bg-white p-4 shadow-2xl" onClick={(e) => e.stopPropagation()} />
          <button
            onClick={() => setPreview(null)}
            className="absolute right-6 top-6 rounded-full bg-white px-4 py-2 font-xmen-mono text-[10px] uppercase tracking-widest hover:bg-xmen-red hover:text-white transition"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

function Stat({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: number; tone?: "ok" | "warn" }) {
  return (
    <div className={`rounded-2xl border p-4 ${tone === "warn" ? "border-xmen-red/40 bg-xmen-red/5" : "border-xmen-line bg-white"}`}>
      <div className="flex items-center gap-1.5 font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">
        {icon} {label}
      </div>
      <div className={`mt-1 font-xmen-display text-2xl ${tone === "warn" ? "text-xmen-red" : "text-xmen-ink"}`}>{value}</div>
    </div>
  );
}

function Row({ product, onPreview }: { product: VaultProduct; onPreview: (src: string) => void }) {
  const [form, setForm] = useState<VaultProduct>(product);
  const [dirty, setDirty] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { setForm(product); setDirty(false); }, [product]);

  function patch<K extends keyof VaultProduct>(k: K, v: VaultProduct[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setDirty(true);
  }
  async function onMainImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; e.target.value = "";
    if (!file || !guardSize(file)) return;
    patch("image", await readFileAsDataURL(file));
    toast.success("Main image updated (save to persist).");
  }
  async function onAddGallery(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []); e.target.value = "";
    if (!files.length) return;
    const urls = await Promise.all(files.filter(guardSize).map(readFileAsDataURL));
    patch("gallery", [...(form.gallery ?? []), ...urls]);
  }
  function removeMain() {
    if (!confirm("Remove the main image? A gallery image will be promoted, or the default reappears.")) return;
    const gal = form.gallery ?? [];
    if (gal.length > 0) {
      patch("image", gal[0]);
      patch("gallery", gal.slice(1));
    } else {
      patch("image", defaults[0].image);
    }
    toast.success("Main image removed (save to persist).");
  }
  function moveGallery(i: number, dir: -1 | 1) {
    const gal = [...(form.gallery ?? [])];
    const j = i + dir;
    if (j < 0 || j >= gal.length) return;
    [gal[i], gal[j]] = [gal[j], gal[i]];
    patch("gallery", gal);
  }
  function promoteToMain(i: number) {
    const gal = [...(form.gallery ?? [])];
    const chosen = gal.splice(i, 1)[0];
    const oldMain = form.image;
    patch("image", chosen);
    patch("gallery", [oldMain, ...gal]);
    toast.success("Set as main image (save to persist).");
  }
  function removeGallery(i: number) {
    patch("gallery", (form.gallery ?? []).filter((_, idx) => idx !== i));
  }
  function save() {
    const s = readStore();
    const inAdded = s.added.some((p) => p.slug === form.slug);
    if (inAdded) {
      s.added = s.added.map((p) => p.slug === form.slug ? form : p);
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
      toast.error("Save failed — storage full. Try smaller images.");
    }
  }
  function remove() {
    if (!confirm(`Delete ${form.name}?`)) return;
    const s = readStore();
    const inAdded = s.added.some((p) => p.slug === form.slug);
    if (inAdded) s.added = s.added.filter((p) => p.slug !== form.slug);
    else s.deleted = [...s.deleted, form.slug];
    writeStore(s);
    toast.success("Deleted");
  }

  const galleryCount = (form.gallery ?? []).length;
  const lowStock = form.stock <= 5;

  return (
    <div className="rounded-3xl border border-xmen-line bg-white shadow-[0_10px_30px_-20px_rgba(11,13,16,0.15)] transition hover:shadow-[0_20px_40px_-20px_rgba(75,30,120,0.25)]">
      {/* Compact header */}
      <div className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => onPreview(form.image)}
            className="group relative block h-20 w-20 overflow-hidden rounded-2xl border border-xmen-line bg-white"
            aria-label="Preview main image"
          >
            <img src={form.image} alt={form.name} className="xm-product-img h-full w-full object-contain p-1" />
            <div className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
              <Eye className="h-5 w-5 text-white" />
            </div>
          </button>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-xmen-paper-soft px-2 py-0.5 font-xmen-mono text-[9px] uppercase tracking-widest text-xmen-ink-soft">{form.category}</span>
            {form.badge && <span className="rounded-full bg-xmen-red/10 px-2 py-0.5 font-xmen-mono text-[9px] uppercase tracking-widest text-xmen-red">{form.badge}</span>}
            {lowStock && <span className="rounded-full bg-yellow-100 px-2 py-0.5 font-xmen-mono text-[9px] uppercase tracking-widest text-yellow-800">Low stock</span>}
            {dirty && <span className="rounded-full bg-[#4b1e78]/10 px-2 py-0.5 font-xmen-mono text-[9px] uppercase tracking-widest text-[#4b1e78]">Unsaved</span>}
          </div>
          <div className="mt-1 truncate font-xmen-display text-lg">{form.name}</div>
          <div className="mt-0.5 flex flex-wrap items-center gap-3 font-xmen-mono text-[10px] text-xmen-ink-soft">
            <span>{formatINR(form.price)}</span>
            <span>·</span>
            <span>Stock {form.stock}</span>
            <span>·</span>
            <span>{galleryCount} gallery</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen((o) => !o)}
            className="rounded-full border border-xmen-line px-4 py-2 font-xmen-mono text-[10px] uppercase tracking-widest hover:border-xmen-ink"
          >
            {open ? "Close" : "Edit"}
          </button>
          <button
            onClick={save}
            disabled={!dirty}
            className="inline-flex items-center gap-1.5 rounded-full bg-xmen-ink px-4 py-2 font-xmen-mono text-[10px] uppercase tracking-widest text-white disabled:opacity-40"
          >
            <Save className="h-3 w-3" /> {dirty ? "Save" : "Saved"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-xmen-line p-4 sm:p-5">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Name"><input value={form.name} onChange={(e) => patch("name", e.target.value)} className="input" /></Field>
            <Field label="Tagline"><input value={form.tagline} onChange={(e) => patch("tagline", e.target.value)} className="input" /></Field>
            <Field label="Category">
              <select value={form.category} onChange={(e) => patch("category", e.target.value as VaultProduct["category"])} className="input">
                {["Coffee", "Cooking", "Prep", "Breakfast"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label={`Price (USD → ${formatINR(form.price)})`}>
              <input type="number" value={form.price} onChange={(e) => patch("price", Number(e.target.value))} className="input" />
            </Field>
            <Field label="Stock"><input type="number" value={form.stock} onChange={(e) => patch("stock", Number(e.target.value))} className="input" /></Field>
            <Field label="Badge (optional)"><input value={form.badge ?? ""} onChange={(e) => patch("badge", e.target.value || undefined)} className="input" /></Field>
            <Field label="Main image URL" full><input value={form.image} onChange={(e) => patch("image", e.target.value)} className="input" /></Field>
            <Field label="Description" full>
              <textarea value={form.description} onChange={(e) => patch("description", e.target.value)} rows={3} className="input" />
            </Field>
          </div>

          {/* MAIN IMAGE PANEL */}
          <div className="mt-6 rounded-2xl border border-xmen-line bg-xmen-paper-soft/40 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">Main image</div>
              <div className="flex gap-2">
                <label className="cursor-pointer rounded-full border border-xmen-line bg-white px-3 py-1.5 font-xmen-mono text-[10px] uppercase tracking-widest hover:border-xmen-red hover:text-xmen-red">
                  Replace
                  <input type="file" accept="image/*" className="hidden" onChange={onMainImage} />
                </label>
                <button
                  onClick={() => onPreview(form.image)}
                  className="inline-flex items-center gap-1 rounded-full border border-xmen-line bg-white px-3 py-1.5 font-xmen-mono text-[10px] uppercase tracking-widest hover:border-xmen-ink"
                >
                  <Eye className="h-3 w-3" /> Preview
                </button>
                <button
                  onClick={removeMain}
                  className="inline-flex items-center gap-1 rounded-full border border-xmen-line bg-white px-3 py-1.5 font-xmen-mono text-[10px] uppercase tracking-widest hover:border-xmen-red hover:text-xmen-red"
                >
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              </div>
            </div>
            <div className="mt-3 aspect-video max-w-md overflow-hidden rounded-xl border border-xmen-line bg-white">
              <img src={form.image} alt="" className="xm-product-img h-full w-full object-contain p-4" />
            </div>
          </div>

          {/* GALLERY PANEL */}
          <div className="mt-4 rounded-2xl border border-xmen-line bg-xmen-paper-soft/40 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">Gallery ({galleryCount})</div>
              <label className="cursor-pointer rounded-full border border-xmen-line bg-white px-3 py-1.5 font-xmen-mono text-[10px] uppercase tracking-widest hover:border-xmen-red hover:text-xmen-red">
                <ImagePlus className="mr-1 inline h-3 w-3" /> Add images
                <input type="file" accept="image/*" multiple className="hidden" onChange={onAddGallery} />
              </label>
            </div>
            {galleryCount === 0 ? (
              <p className="mt-3 text-xs text-xmen-ink-soft">No extra images yet. Add photos to show variants and angles on the product page.</p>
            ) : (
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                {(form.gallery ?? []).map((src, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-xl border border-xmen-line bg-white">
                    <div className="aspect-square">
                      <img src={src} alt="" className="xm-product-img h-full w-full object-contain p-2" />
                    </div>
                    {/* Order badge */}
                    <div className="absolute left-1.5 top-1.5 rounded-full bg-black/70 px-2 py-0.5 font-xmen-mono text-[9px] text-white">
                      #{i + 1}
                    </div>
                    {/* Action bar */}
                    <div className="absolute inset-x-1.5 bottom-1.5 flex items-center justify-between gap-1 opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">
                      <div className="flex gap-1">
                        <button
                          type="button" aria-label="Move left"
                          disabled={i === 0}
                          onClick={() => moveGallery(i, -1)}
                          className="grid h-6 w-6 place-items-center rounded-full bg-white/95 text-xmen-ink shadow disabled:opacity-40 hover:text-xmen-red"
                        >
                          <ArrowUp className="h-3 w-3 -rotate-90" />
                        </button>
                        <button
                          type="button" aria-label="Move right"
                          disabled={i === galleryCount - 1}
                          onClick={() => moveGallery(i, 1)}
                          className="grid h-6 w-6 place-items-center rounded-full bg-white/95 text-xmen-ink shadow disabled:opacity-40 hover:text-xmen-red"
                        >
                          <ArrowDown className="h-3 w-3 -rotate-90" />
                        </button>
                      </div>
                      <div className="flex gap-1">
                        <button
                          type="button" aria-label="Preview"
                          onClick={() => onPreview(src)}
                          className="grid h-6 w-6 place-items-center rounded-full bg-white/95 text-xmen-ink shadow hover:text-xmen-red"
                        >
                          <Eye className="h-3 w-3" />
                        </button>
                        <button
                          type="button" aria-label="Set as main"
                          onClick={() => promoteToMain(i)}
                          className="grid h-6 w-6 place-items-center rounded-full bg-white/95 text-xmen-ink shadow hover:text-[#4b1e78]"
                          title="Set as main"
                        >
                          <Star className="h-3 w-3" />
                        </button>
                        <button
                          type="button" aria-label="Delete"
                          onClick={() => removeGallery(i)}
                          className="grid h-6 w-6 place-items-center rounded-full bg-white/95 text-xmen-ink shadow hover:text-xmen-red"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <p className="mt-3 font-xmen-mono text-[10px] text-xmen-ink-soft">
              Tip: hover an image for reorder, preview, promote-to-main, and delete controls.
            </p>
          </div>

          {/* Footer bar */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-xmen-line pt-4">
            <div className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">Slug · {form.slug}</div>
            <div className="flex gap-2">
              <button
                onClick={remove}
                className="inline-flex items-center gap-1.5 rounded-full border border-xmen-line px-4 py-2 font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft hover:border-xmen-red hover:text-xmen-red"
              >
                <Trash2 className="h-3 w-3" /> Delete product
              </button>
              <button
                onClick={save}
                disabled={!dirty}
                className="inline-flex items-center gap-1.5 rounded-full bg-xmen-red px-5 py-2 font-xmen-mono text-[10px] uppercase tracking-widest text-white disabled:opacity-40"
              >
                <Save className="h-3 w-3" /> {dirty ? "Save changes" : "Saved"}
              </button>
            </div>
          </div>
        </div>
      )}
      <style>{`.input{ margin-top: .25rem; width: 100%; border-radius: .5rem; border: 1px solid rgba(11,13,16,0.10); background:#fff; padding:.55rem .75rem; font-size:.85rem; }
      .input:focus{ outline: none; border-color:#c8202a; box-shadow: 0 0 0 3px rgba(200,32,42,0.15); }`}</style>
    </div>
  );
}

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`block text-xs ${full ? "md:col-span-2" : ""}`}>
      <span className="font-xmen-mono text-[10px] uppercase tracking-widest text-xmen-ink-soft">{label}</span>
      {children}
    </label>
  );
}
