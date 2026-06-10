import { createFileRoute } from "@tanstack/react-router";

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
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-[11px] uppercase tracking-[0.2em] text-[var(--vv-gold-light)]">The doctrine</div>
      <h1 className="mt-3 font-vault-display text-5xl leading-tight text-[var(--vv-ink)] sm:text-6xl">
        Magic. Science. <em className="font-vault-italic font-normal text-[var(--vv-gold-light)]">One</em> sovereign craft.
      </h1>
      <div className="mt-10 space-y-6 text-[16px] leading-[1.75] text-[var(--vv-ink-soft)]">
        <p>
          Viral Vault was decreed in the Latverian workshops on the eve of a quiet
          equinox. The Sovereign held a single conviction: the modern kitchen had
          surrendered to plastic, to noise, to obsolescence — and a kitchen so
          surrendered is unworthy of those who feed an empire.
        </p>
        <p>
          So we began again. We summoned the last of the master artificers from
          northern Italy and Osaka — workshops that have served emperors and
          baristas alike — and bound each piece with a single oath: that magic and
          science are merely two dialects of the same language, and that the
          instruments of a great house must speak both.
        </p>
        <p>
          What you find in the Arsenal today is the result. Every instrument is
          tested against five thousand cycles, sealed with a rune of warranty,
          and crowned with the mark of Doom. We will replace anything that fails
          you in two years. We hope you cook with it every morning.
        </p>
        <p className="font-vault-serif text-lg italic text-[var(--vv-gold-light)]">
          — Issued under the seal of Doom, MMXXVI.
        </p>
      </div>
    </div>
  );
}
