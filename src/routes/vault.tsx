import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CartProvider } from "@/lib/cart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { KonamiBat } from "@/components/KonamiBat";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/vault")({
  component: VaultLayout,
});

function VaultLayout() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <KonamiBat />
      <Toaster />
    </CartProvider>
  );
}
