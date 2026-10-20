# Project Architecture Rules

- Keep the primary Viral Vault storefront at the existing root-level TanStack routes and keep the separate `/vault` Dark Decor experience isolated; this preserves established public URLs and cart behavior.
- Account and sign-in routes are presentation-only unless the user explicitly requests working authentication; do not imply demo account details or submit credentials.
- Keep Viral Vault visual styling scoped to its existing root storefront shell and retain its established product, cart, and checkout data APIs; this enables a full rebrand without disrupting commerce behavior.