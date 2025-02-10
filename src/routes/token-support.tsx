import { createFileRoute } from "@tanstack/react-router";
import { AppStats } from "@/components/shared/app-stats";
import { EditTokenForm } from "@/components/token-support/edit-token-form";

export const Route = createFileRoute("/token-support")({
  component: TokenSupport,
});

function TokenSupport() {
  return (
    <section className="container flex flex-col-reverse md:flex-col">
      <AppStats />
      <EditTokenForm />
    </section>
  );
}
