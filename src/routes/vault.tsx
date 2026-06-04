import { createFileRoute, Outlet } from "@tanstack/react-router";
import { VaultCartProvider } from "@/lib/vault-cart";
import { VaultNavbar } from "@/components/vault/VaultNavbar";
import { VaultFooter } from "@/components/vault/VaultFooter";
import { VaultTransition } from "@/components/vault/VaultTransition";

export const Route = createFileRoute("/vault")({
  component: VaultLayout,
});

function VaultLayout() {
  return (
    <VaultCartProvider>
      <div className="vault-scope flex min-h-screen flex-col bg-white text-neutral-900">
        <VaultTransition />
        <VaultNavbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <VaultFooter />
      </div>
    </VaultCartProvider>
  );
}
