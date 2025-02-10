import { useMemo } from "react";
import { get } from "react-hook-form";
import NiceModal from "@ebay/nice-modal-react";

import { IconChevronRight, IconGlowingPlanet, IconRocket } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { GradientCard } from "@/components/ui/gradient-card";
import { abbreviateNumber, toCurrency } from "@/lib/number";
import { cn } from "@/lib/utils";
import { useTaxFarmControllerFindStatistic } from "@/services/queries";
import ModalTutorial from "@/components/shared/modal-tutorial";

export default function StakingHero() {
  const { data: statisticResponse } = useTaxFarmControllerFindStatistic();

  const data = get(statisticResponse, "data");

  const stats = useMemo(() => {
    return [
      { label: "Total Tokens", value: data ? toCurrency(data.totalToken || 0) : "--" },
      { label: "Total User", value: data ? toCurrency(data.totalUser || 0) : "--" },
      {
        label: "Total Revenue",
        value: data ? `$${abbreviateNumber(data.totalRevenue || 0, 0)}` : "--",
      },
    ];
  }, [data]);

  return (
    <section className="relative overflow-visible text-white py-8 md:py-20 isolate">
      <div className="container flex items-center justify-center mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-[437px]">
            <h1 className="text-[30px] md:text-[48px] font-semibold  mb-4 text-primary">
              UNI Staking
            </h1>
            <p className="text-gray-400 mb-4 text-xs md:text-sm leading-[20px] tracking-[0.07px]">
              Stake your UNI tokens for weekly rewards, revenue shares, boosted farm yields, and
              access to special events!
            </p>
            <div className="flex items-center gap-6">
              <Button
                className="rounded-full bg-primary-light text-primary-dark font-semibold flex items-center gap-2 py-2 px-4"
                onClick={() => window.open("https://app.uniswap.org", "_blank")}
              >
                Buy UNI
                <IconRocket className="mr-2 h-4 w-4" />
              </Button>
              <Button variant="link" className="p-0" onClick={() => NiceModal.show(ModalTutorial)}>
                <span className="text-app-white text-sm leading-[20px] tracking-[0.07px]">
                  Learn more
                </span>
                <IconChevronRight className="h-4 w-4 text-primary" />
              </Button>
            </div>
          </div>
          <div className="relative space-y-2 w-full">
            <div className="absolute -z-10 -top-[250%] md:-top-full right-0 md:right-1/3 translate-x-1/2 translate-y-1/2 transform select-none pointer-events-none">
              <IconGlowingPlanet className="w-auto h-[240px] md:h-[350px]" />
            </div>
            <h2 className="text-2xl font-semibold text-center md:text-left mb-4">UNI Stats</h2>
            <div className="flex items-center gap-2">
              {stats.map((stat, index) => (
                <div key={index.toString()} className="flex flex-1">
                  <GradientCard containerClassName="w-full !rounded-[16px] md:!rounded-[32px]">
                    <div
                      className={cn(
                        "rounded-[16px] md:rounded-[32px] flex flex-col p-4 items-center justify-center text-center",
                        "border border-solid border-primary-light/[0.16]",
                        "backdrop-blur-[20px]",
                      )}
                    >
                      <div className="text-[18px] md:text-[36px] font-semibold text-primary-light mb-2">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-base text-white/60">{stat.label}</div>
                    </div>
                  </GradientCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
