import { get } from "es-toolkit/compat";
import { useMediaQuery } from "usehooks-ts";
import { useNavigate } from "@tanstack/react-router";

import { cn, headAddress, shortAddress } from "@/lib/utils";
import { GradientCard } from "@/components/ui/gradient-card";
import { Button } from "@/components/ui/button";
import { IconCopy, IconRocket } from "@/components/icons";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { UserAvatar } from "@/components/shared/user-avatar";
import type { TaxFarmStatisticUserResponse } from "@/services/models";
import { toCurrency } from "@/lib/number";
import ImageWithFallback from "@/components/shared/image-with-fallback";

interface Props {
  id: string;
  userStatistic: TaxFarmStatisticUserResponse;
}

export const ProfileDetail = ({ id, userStatistic }: Props) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { copyToClipboard } = useCopyToClipboard();

  const revenue = get(userStatistic, "totalRevenue", 0);
  const totalTokens = get(userStatistic, "totalToken", 0);
  const bestToken = get(userStatistic, "bestToken", null);

  const stats = [
    {
      label: "Revenue",
      value: toCurrency(revenue, { suffix: " ETH", decimals: 2 }),
    },
    { label: "Total Deployed", value: toCurrency(totalTokens) },
    {
      label: "Best Token",
      value: bestToken ? (
        <div className="flex items-center gap-1">
          <ImageWithFallback
            src={bestToken?.logo}
            alt="profile-avatar"
            className="w-6 h-6 rounded-full"
            crossOrigin="anonymous"
          />
          <p className="text-sm font-semibold text-primary">
            {bestToken?.tokenName}
          </p>
        </div>
      ) : (
        "--"
      ),
    },
  ];

  return (
    <div className="container relative isolate">
      <img
        src={isMobile ? "/profile-bg-sp.svg" : "/profile-bg.svg"}
        className="w-screen h-auto max-w-[unset] md:w-full object-cover absolute top-0 left-0 right-0 bottom-0 -mt-6 md:-mt-0"
        alt="profile-bg"
      />
      <div className="mx-8 md:mx-auto flex items-center justify-center py-[52px] md:py-[89px]">
        <GradientCard containerClassName="!rounded-[24px] w-full md:w-auto">
          <div
            className={cn(
              "rounded-[24px] pt-6 pb-2 flex flex-col items-center justify-center text-center px-2",
              "border border-solid border-primary-light/[0.16]",
              "backdrop-blur-[10px] md:backdrop-blur-[20px]"
            )}
          >
            <div className="flex w-full items-start justify-between mb-8 px-4">
              <div className="flex items-center gap-4">
                <UserAvatar
                  name={id}
                  className="w-[64px] h-[64px] md:w-10 md:h-10 rounded-full"
                />
                <div className="flex flex-col items-start gap-1">
                  <p className="text-app-white font-semibold">
                    {headAddress(id)}
                  </p>
                  <Button
                    onClick={() => copyToClipboard(id)}
                    className="bg-inherit bg-gradient-to-r from-[#EC5409]/[0.27] to-[#EC5409]/[0.3] md:bg-white/[0.05] gap-2 py-1 px-3 h-auto rounded-full text-sm leading-[20px] text-app-white md:hover:bg-white/[0.1]"
                  >
                    {shortAddress(id)}
                    <IconCopy className="text-primary" />
                  </Button>
                </div>
              </div>
              <Button
                className="hidden md:flex rounded-full bg-primary-light text-primary-dark font-semibold items-center gap-2 py-2 px-4"
                onClick={() => navigate({ to: "/create-token" })}
              >
                Create New Token
                <IconRocket className="mr-2 h-4 w-4" />
              </Button>
            </div>
            <div className="w-full md:w-auto grid grid-cols-1 lg:grid-cols-3 gap-[2px] rounded-[16px] overflow-hidden">
              {stats.map((stat, index) => (
                <div
                  key={index.toString()}
                  className="w-full md:w-auto flex flex-col items-center justify-center gap-1 md:gap-[10px] py-2 md:py-4 px-6 bg-[#121211]"
                >
                  <p className="text-sm text-foreground font-normal">
                    {stat.label}
                  </p>
                  <div className="text-primary text-[18px] font-semibold">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GradientCard>
      </div>
    </div>
  );
};
