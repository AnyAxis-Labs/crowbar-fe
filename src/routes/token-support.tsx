import { AppStats } from "@/components/shared/app-stats";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/token-support")({
  component: TokenSupport,
});

function TokenSupport() {
  return (
    <section className="container flex flex-col-reverse md:flex-col">
      <AppStats />
      {/* <EditTokenForm /> */}
    </section>
  );
}
