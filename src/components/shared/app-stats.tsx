import { useMemo } from "react";
import { get } from "es-toolkit/compat";

import { abbreviateNumber, toCurrency } from "@/lib/number";
import { cn } from "@/lib/utils";
import { IconCreateTokenBg } from "@/components/icons";
import { GradientCard } from "@/components/ui/gradient-card";

export const AppStats = () => {
  // const { data: statisticResponse } = useTaxFarmControllerFindStatistic();

  const data = get(
    {
      data: {
        totalToken: 0,
        totalUser: 0,
        totalRevenue: 0,
      },
    },
    "data"
  );

  const stats = useMemo(() => {
    return [
      {
        label: "Total Tokens",
        value: data ? toCurrency(data.totalToken || 0) : "--",
      },
      {
        label: "Total User",
        value: data ? toCurrency(data.totalUser || 0) : "--",
      },
      {
        label: "Total Revenue",
        value: data ? `$${abbreviateNumber(data.totalRevenue || 0, 0)}` : "--",
      },
    ];
  }, [data]);

  return (
    <div className="relative flex flex-col items-center gap-6 py-8 isolate">
      <h2 className="text-2xl font-semibold">UNI Stats</h2>
      <div className="absolute bottom-0 right-0 md:-bottom-[140px] md:right-1/2 transform translate-x-[calc(50%+20px)] select-none pointer-events-none">
        <IconCreateTokenBg className="w-auto h-[320px]" />
      </div>
      <div className="flex items-center mx-auto w-fit gap-2">
        {stats.map((stat, index) => (
          <GradientCard
            containerClassName="!rounded-[16px] md:!rounded-[32px]"
            key={index.toString()}
          >
            <div
              className={cn(
                "!rounded-[16px] md:!rounded-[32px] py-4 px-6 md:px-8 flex flex-col items-center justify-center text-center h-[78px] md:h-[140px]",
                "border border-solid border-primary-light/[0.16]",
                "backdrop-blur-[20px]"
              )}
            >
              <div className="text-[18px] md:text-[36px] font-semibold text-primary-light mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-base text-white/60">
                {stat.label}
              </div>
            </div>
          </GradientCard>
        ))}
      </div>
    </div>
  );
};
