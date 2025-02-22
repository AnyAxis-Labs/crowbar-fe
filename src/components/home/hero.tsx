import NiceModal from "@ebay/nice-modal-react";
import { useNavigate } from "@tanstack/react-router";
import { get } from "es-toolkit/compat";
import { useMemo } from "react";

import {
  IconChevronRight,
  IconHomeBg,
  IconLogoIcon,
  IconRocket,
} from "@/components/icons";
// import { useTaxFarmControllerFindStatistic } from "@/services/queries";
import ModalTutorial from "@/components/shared/modal-tutorial";
import { Button } from "@/components/ui/button";
import { abbreviateNumber, toCurrency } from "@/lib/number";

export default function HomeHero() {
  const navigate = useNavigate();

  // const { data: statisticResponse } = useTaxFarmControllerFindStatistic();

  const data = get(
    { data: { totalToken: 100, totalUser: 100, totalRevenue: 100 } },
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
    <section className="relative overflow-visible text-white py-[32px] lg:py-[72px]">
      <div className="container flex items-center mx-auto px-4 isolate">
        <div className="flex flex-col w-full lg:flex-row items-center md:mx-auto lg:w-auto gap-[60px] lg:gap-36">
          <div className="w-full md:w-fit">
            <IconLogoIcon className="h-[77px] w-[215px] mb-8" />
            <div className="flex items-center gap-6">
              <Button
                className="rounded-full bg-primary-light text-primary-dark font-semibold flex items-center gap-2 py-2 px-4"
                onClick={() => navigate({ to: "/create-token" })}
              >
                Create New Token
                <IconRocket className="mr-2 h-4 w-4" />
              </Button>
              <Button
                variant="link"
                className="p-0"
                onClick={() => NiceModal.show(ModalTutorial)}
              >
                <span className="text-app-white text-sm leading-[20px] tracking-[0.07px]">
                  Learn more
                </span>
                <IconChevronRight className="h-4 w-4 text-primary" />
              </Button>
            </div>
          </div>
          <div className="relative flex flex-col md:flex-row items-center gap-2">
            <div className="absolute top-0 md:top-1/2 -right-[120px] transform translate-y-[calc(-50%+40px)] select-none pointer-events-none">
              <div
                className="rfm-overlay !h-[30%] mt-[35%]"
                style={
                  {
                    "--gradient-width": "20px",
                    "--gradient-color": "#080A06",
                  } as React.CSSProperties
                }
              />
              <IconHomeBg className="w-auto h-[450px] md:h-[720px]" />
            </div>
            {/* {stats.map((stat, index) => (
              <GradientCard key={index.toString()}>
                <div
                  className={cn(
                    "rounded-[32px] py-4 px-8 flex flex-col items-center justify-center text-center",
                    "border border-solid border-primary-light/[0.16]",
                    "backdrop-blur-[20px]",
                    "w-[250px] md:w-auto",
                    "h-[106px] md:h-[140px]"
                  )}
                >
                  <div className="text-[36px] font-semibold text-primary-light mb-2">
                    {stat.value}
                  </div>
                  <div className="text-base text-white/60">{stat.label}</div>
                </div>
              </GradientCard>
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
}
