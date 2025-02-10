import { createFileRoute } from "@tanstack/react-router";
import { AppStats } from "@/components/shared/app-stats";
import { CreateTokenForm } from "@/components/create-token/create-token-form";

export const Route = createFileRoute("/create-token")({
  component: CreateToken,
});

function CreateToken() {
  return (
    <section className="container flex flex-col-reverse md:flex-col">
      <AppStats />
      <CreateTokenForm />
    </section>
  );
}
