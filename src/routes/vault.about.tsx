import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/vault/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Viral Vault" },
      { name: "description", content: "Why Viral Vault exists — and how we make quietly viral kitchen appliances." },
    ],
  }),
  component: VaultAbout,
});

function VaultAbout() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Our story</div>
      <h1 className="mt-3 font-vault-display text-5xl leading-tight text-neutral-900 sm:text-6xl">
        Built for the kitchens that <em className="font-vault-italic font-normal text-neutral-500">actually</em> get used.
      </h1>
      <div className="mt-10 space-y-6 text-[16px] leading-[1.75] text-neutral-700">
        <p>
          Viral Vault started in a small studio in Brooklyn with a simple frustration: every
          appliance worth using looked like it belonged in a hospital, and every appliance worth
          looking at was made out of plastic that broke in eighteen months.
        </p>
        <p>
          So we started over. We partnered with two factories in northern Italy and one in Osaka —
          the same workshops trusted by professional kitchens — and asked them to make the things
          we wanted on our own counters. No screens we didn't need. No fake-chrome plastic. No
          branded chimes when you push a button.
        </p>
        <p>
          What you see in the vault today is the result. Every piece is tested for at least 5,000
          cycles before it ships, and we'll replace anything that fails in normal use for two
          full years. We hope you cook with it every morning.
        </p>
      </div>
    </div>
  );
}
