import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { XmenCartProvider } from "@/lib/vault-cart";
import { XmenProductsProvider } from "@/lib/xmen-products-store";
import { XmenNavbar } from "@/components/XmenNavbar";
import { XmenFooter } from "@/components/XmenFooter";
import { XmenTransition } from "@/components/XmenTransition";
import { XmenEasterEggs } from "@/components/XmenEasterEggs";
import { XmenBackground } from "@/components/XmenBackground";
import { XmenSquadBackdrop } from "@/components/XmenSquadBackdrop";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="xmen-scope flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="font-xmen-display text-7xl text-xmen-red">404</h1>
        <h2 className="mt-4 font-xmen-display text-xl uppercase tracking-[0.25em] text-xmen-ink">Mutation Not Detected</h2>
        <p className="mt-3 text-sm text-xmen-ink-soft">
          Cerebro can't locate this corridor of the Institute.
        </p>
        <div className="mt-8">
          <Link to="/" className="inline-flex items-center justify-center border-2 border-xmen-red bg-xmen-red px-6 py-3 font-xmen-display text-xs uppercase tracking-[0.3em] text-white hover:bg-xmen-yellow hover:text-xmen-ink hover:border-xmen-yellow transition">
            Return to the Institute
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <h1 className="font-xmen-display text-2xl uppercase tracking-[0.2em] text-xmen-red">Signal Disrupted</h1>
        <p className="mt-3 text-sm text-neutral-600">A psionic flicker. Try again.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border-2 border-xmen-red bg-xmen-red px-5 py-2.5 font-xmen-display text-xs uppercase tracking-[0.25em] text-white hover:bg-xmen-yellow hover:text-xmen-ink hover:border-xmen-yellow"
          >
            Retry
          </button>
          <a href="/" className="border-2 border-neutral-300 px-5 py-2.5 font-xmen-display text-xs uppercase tracking-[0.25em] text-xmen-ink hover:border-xmen-ink">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Viral Vault — Gear for the Gifted" },
      { name: "description", content: "Viral Vault — futuristic kitchen and home gear engineered for the gifted. An X-Men-inspired storefront for tomorrow's home." },
      { property: "og:site_name", content: "Viral Vault" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#c8202a" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@400;500;600;700&family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Bebas+Neue&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Viral Vault",
          url: "https://viral-vault-new.lovable.app",
          description:
            "Viral Vault — futuristic kitchen and home gear engineered for the gifted. An X-Men-inspired storefront.",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://viral-vault-new.lovable.app/shop?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Viral Vault",
          url: "https://viral-vault-new.lovable.app",
          logo: "https://viral-vault-new.lovable.app/favicon.ico",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isDecor = path.startsWith("/vault");
  return (
    <html lang="en" className={isDecor ? "dark" : ""}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isDecor = path.startsWith("/vault");

  return (
    <QueryClientProvider client={queryClient}>
      {isDecor ? (
        <Outlet />
      ) : (
        <XmenProductsProvider>
          <XmenCartProvider>
            <div className="xmen-scope relative flex min-h-screen flex-col bg-white text-xmen-ink">
              <XmenBackground />
              <XmenTransition />
              <XmenEasterEggs />
              <XmenNavbar />
              <main className="flex-1">
                <Outlet />
              </main>
              <XmenFooter />
            </div>
            <Toaster />
          </XmenCartProvider>
        </XmenProductsProvider>
      )}
    </QueryClientProvider>
  );
}
