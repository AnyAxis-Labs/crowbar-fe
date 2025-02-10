import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import NiceModal from "@ebay/nice-modal-react";

export const Route = createRootRoute({
  component: () => (
    <NiceModal.Provider>
      <main className="bg-background w-full overflow-hidden">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </NiceModal.Provider>
  ),
});
