import { createFileRoute } from "@tanstack/react-router";
import { ArcaneSigil, WWTiara } from "@/components/vault/VaultIcons";

export const Route = createFileRoute("/vault/about")({
  head: () => ({
    meta: [
      { title: "The Doctrine — Viral Vault" },
      { name: "description", content: "Why the House of Doom forges kitchen instruments — magic, science, and sovereign craft." },
    ],
  }),
  component: VaultAbout,
});

function VaultAbout() {
  return (
    <div className="relative mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -right-40 top-10 hidden text-[var(--vv-green)] opacity-[0.06] lg:block">
        <ArcaneSigil className="vv-sigil h-[440px] w-[440px]" />
      </div>

      <div className="text-[var(--vv-green)]"><WWTiara className="h-9 w-16" /></div>
      <div className="mt-4 text-[11px] uppercase tracking-[0.28em] text-[var(--vv-green)]">The doctrine</div>
      <h1 className="mt-3 font-vault-display text-5xl leading-tight text-[var(--vv-ink)] sm:text-6xl">
        Magic. Science. <em className="font-vault-italic font-normal text-[var(--vv-green)]">One</em> sovereign craft.
      </h1>
      <div className="mt-10 space-y-6 text-[16px] leading-[1.75] text-[var(--vv-ink)]">
        <p>
          Viral Vault was decreed in the Latverian workshops on the eve of a
          quiet equinox. The Sovereign held a single conviction: the modern
          kitchen had surrendered to plastic, to noise, to obsolescence — and
          a kitchen so surrendered is unworthy of those who feed an empire.
        </p>
        <p>
          So we began again. We summoned the last of the master artificers
          from northern Italy and Osaka — workshops that have served emperors
          and baristas alike — and bound each piece with a single oath: that
          magic and science are merely two dialects of the same language, and
          the instruments of a great house must speak both.
        </p>
        <p>
          What you find in the Armory today is the result. Every instrument is
          tested against five thousand cycles, sealed with a rune of warranty,
          and crowned with the mark of Doom. We will replace anything that
          fails you in two years. We hope you cook with it every morning.
        </p>
        <p className="font-vault-serif text-lg italic text-[var(--vv-green)]">
          — Issued under the seal of Doom, MMXXVI.
        </p>
      </div>
    </div>
  );
}
