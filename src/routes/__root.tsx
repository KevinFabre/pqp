import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from "@tanstack/react-router";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <ScrollRestoration getKey={(location) => location.pathname} />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
