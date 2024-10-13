import { createRootRoute, Outlet } from "@tanstack/react-router";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
