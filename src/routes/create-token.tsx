import { CreateTokenForm } from "@/components/create-token/create-token-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create-token")({
  component: CreateToken,
});

function CreateToken() {
  return (
    <section className="container flex flex-col-reverse md:flex-col">
      <CreateTokenForm />
    </section>
  );
}
