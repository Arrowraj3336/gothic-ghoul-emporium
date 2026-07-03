## Viral Vault — Major Upgrade Plan

Big request — breaking it into shippable chunks. Please confirm before I build.

### 1. Homepage + Product Page redesign (white / minimal / futuristic)
- Rebuild `src/routes/index.tsx` with a cleaner hero: airy whitespace, thin hairline dividers, glass cards, soft `rounded-2xl` corners everywhere (no sharp corners).
- Rebuild `src/routes/products.$slug.tsx` as a modern PDP: large transparent product hero on left, sticky character-tinted spec panel on right, rounded-2xl thumbnails.
- Make all product images render on transparent background (CSS: remove image bg via `mix-blend-multiply` on white + soft drop-shadow, since source jpgs aren't PNG). Round all corners (`rounded-2xl` / `rounded-3xl`).
- Update `XmenProductCard` corners + soft shadow.

### 2. New site-wide animated background
- New `<XmenBackground />` component mounted in `__root.tsx` (xmen scope only). Uses a fixed SVG layer with:
  - Slow-drifting hex grid
  - Parallax X-insignias that shift on scroll (via `scroll` event, throttled with rAF)
  - Faint animated gradient orbs
- Respects `prefers-reduced-motion`.

### 3. New loader animation
- Replace `XmenTransition` with a faster (~900ms total), GPU-only version: single SVG X drawn with stroke-dashoffset + radial white flash. No layout thrash, transform/opacity only.

### 4. INR currency
- Add `formatINR()` in `src/lib/utils.ts`. Convert all `$${price}` sites (card, PDP, cart, checkout) to `₹` with `Intl.NumberFormat('en-IN')`. Prices in `vault-products.ts` stay numeric; multiply by 83 for display, or keep as-is and just switch symbol — I'll just switch symbol + Indian number formatting.

### 5. Order-success X-Men animation
- New `/order-success` route. On checkout submit, show fullscreen sequence: Blackbird jet SVG streaks across, X-insignia bursts, "Mission Complete" text. Then reveal order summary. ~2.5s.

### 6. Hidden developer/test panel
- New route `/x-lab` (unlinked). Lists every easter egg with a "Trigger" button, plays each character theme, previews the loader, and shows all product character themes in a grid.

### 7. Admin panel for products
- New route `/x-admin` (unlinked, localStorage-gated with a simple passcode `xavier`).
- CRUD over products stored in `localStorage` (overrides `vault-products.ts` defaults at runtime via a `useProducts()` hook). Add/edit name, tagline, price, category, badge, image URL. Delete + reset-to-defaults buttons.
- Note: this is client-side only (no backend). If you want real persistence across devices, we'd need to enable Lovable Cloud — say the word.

### 8. Sound effects + haptics
- New `src/lib/xmen-fx.ts` with tiny WebAudio-synthesized cues (no asset downloads): loader whoosh, Cerebro ping, per-egg tones (Wolverine snikt, Magneto hum, Storm crackle, Phoenix whoosh, etc.). Plus `navigator.vibrate()` where supported.
- Global mute toggle in navbar (persisted).

### Out of scope unless you confirm
- Real backend / Lovable Cloud for admin persistence
- Licensed Marvel audio samples (using synthesized tones instead)
- Currency conversion rate handling (using symbol swap + Indian formatting; prices unchanged numerically)

Reply **"go"** to build all of it, or tell me which sections to cut/prioritize.