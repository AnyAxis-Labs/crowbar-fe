import StakingHero from "@/components/staking/hero";
import { StakingCard } from "@/components/staking/staking-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/staking")({
  component: Staking,
});

function Staking() {
  return (
    <div className="flex flex-col-reverse md:flex-col">
      <StakingHero />
      <StakingCard />
    </div>
  );
}
