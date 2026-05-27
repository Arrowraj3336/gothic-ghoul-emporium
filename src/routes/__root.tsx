import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/lib/cart";
import { KonamiBat } from "@/components/KonamiBat";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-signal text-glow">404</h1>
        <h2 className="mt-4 font-display text-xl uppercase tracking-[0.25em]">Lost in the Shadows</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          This corridor of Gotham doesn't exist. Even the Bat can't find it.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center border border-signal bg-transparent px-6 py-3 font-display text-xs uppercase tracking-[0.3em] text-signal transition hover:bg-signal hover:text-primary-foreground hover:shadow-signal"
          >
            Return to the Manor
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
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl uppercase tracking-[0.2em] text-signal">Signal Lost</h1>
        <p className="mt-3 text-sm text-muted-foreground">A flicker in the night. Try again.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border border-signal px-5 py-2.5 font-display text-xs uppercase tracking-[0.25em] text-signal hover:bg-signal hover:text-primary-foreground"
          >
            Retry
          </button>
          <a href="/" className="border border-border px-5 py-2.5 font-display text-xs uppercase tracking-[0.25em] text-foreground hover:border-foreground">
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
      { title: "Gotham.Haus — Aesthetic Dark Home Decor" },
      { name: "description", content: "Hand-finished, gothic-inspired home decor pieces for those who prefer the night. Lighting, decor, accents and furnishings — all in matte black." },
      { name: "author", content: "Gotham.Haus" },
      { property: "og:title", content: "Gotham.Haus — Aesthetic Dark Home Decor" },
      { property: "og:description", content: "Hand-finished, gothic-inspired home decor pieces for those who prefer the night. Lighting, decor, accents and furnishings — all in matte black." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Gotham.Haus — Aesthetic Dark Home Decor" },
      { name: "twitter:description", content: "Hand-finished, gothic-inspired home decor pieces for those who prefer the night. Lighting, decor, accents and furnishings — all in matte black." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/664de41b-08ea-41ef-92d0-62554b333525/id-preview-c09845d3--398eaf39-bcd4-4c8c-94e2-04d10c47d8ea.lovable.app-1779739186137.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/664de41b-08ea-41ef-92d0-62554b333525/id-preview-c09845d3--398eaf39-bcd4-4c8c-94e2-04d10c47d8ea.lovable.app-1779739186137.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
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
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
        <RouteTransition />
        <KonamiBat />
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}
