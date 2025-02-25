import { Link } from "@tanstack/react-router";
import BigNumber from "bignumber.js";
import { get } from "es-toolkit/compat";
import { useChainId } from "wagmi";

import {
  IconArrowUp,
  IconCopy,
  IconTelegram,
  IconWebsite,
  IconX,
} from "@/components/icons";
import ImageWithFallback from "@/components/shared/image-with-fallback";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useGetDexScreenerPairAddress } from "@/hooks/useDexscreenerPairAddress";
import { useEthFiatPrice } from "@/hooks/useEthFiatPrice";
import { BURN_TOKEN_SOFT_CAP } from "@/lib/constants";
import { abbreviateNumber, toCurrency } from "@/lib/number";
import { cn, headAddress, shortAddress } from "@/lib/utils";
import type { MemeResponse } from "@/services/models";
import { PriceChart } from "./price-chart";

export const ProjectInfoCard = ({ project }: { project: MemeResponse }) => {
  const { copyToClipboard } = useCopyToClipboard();
  const { data: ethPrice = 0 } = useEthFiatPrice();
  const chainId = useChainId();

  const revenue = get(project, "revenue", 0);
  const marketCap = get(project, "marketCap", 0);
  const priceCurrent = get(project, "priceCurrent", 0);
  const priceLast5m = get(project, "priceLast5m", 0);

  const revenueInUsd = BigNumber(revenue).multipliedBy(ethPrice).toString();
  const marketCapInUsd = BigNumber(marketCap).multipliedBy(ethPrice);
  const priceChange = priceLast5m
    ? BigNumber(priceCurrent)
        .minus(priceLast5m)
        .dividedBy(priceLast5m)
        .multipliedBy(100)
        .toNumber()
    : 0;

  const saleProgress = BigNumber(revenue)
    .dividedBy(BURN_TOKEN_SOFT_CAP[chainId])
    .multipliedBy(100)
    .toNumber();

  const openSocialLink = (
    e: React.MouseEvent<HTMLButtonElement>,
    url: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <Card className="w-full bg-background-surface overflow-hidden backdrop-blur-[10px] rounded-[32px] border-white/[0.05]">
      <ImageWithFallback
        // src={project.banner}
        src={project.image}
        alt="Project banner"
        className="w-full max-w-[unset] h-[200px] object-cover"
      />
      <CardContent className="-mt-8 p-4 md:p-6 rounded-[32px] bg-background-surface backdrop-blur-[10px]">
        <div className="flex flex-col md:flex-row gap-4 items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <ImageWithFallback
              src={project.image}
              alt="Project logo"
              className="w-10 h-10 md:w-[88px] md:h-[88px] rounded-[16px]"
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-end gap-2">
                <span className="text-[20px] text-app-white font-semibold leading-[24px]">
                  {project.name}
                </span>
                <span className="text-base text-[#525252] font-semibold leading-[20px]">
                  {project.symbol}
                </span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <span className="text-sm text-foreground">Creator</span>
                <UserAvatar
                  name={project.creator}
                  className="w-4 h-4 rounded-full"
                />
                <Link to={`/profile/${project.creator}`}>
                  <span className="text-sm text-primary">
                    {headAddress(project.creator)}
                  </span>
                </Link>
              </div>

              <Button
                onClick={() => copyToClipboard(project.creator)}
                className="w-fit gap-2 py-1 px-3 h-auto rounded-full text-sm font-normal leading-[20px] text-app-white hover:bg-white/[0.1] bg-inherit bg-gradient-to-r from-[#EC5409]/[0.27] to-[#EC5409]/[0.3]"
              >
                <IconCopy className="text-primary" />
                {shortAddress(project.creator)}
              </Button>
            </div>
            {Boolean(priceChange) && (
              <Badge
                className={cn(
                  "text-neutral-900 h-6 rounded-[4px] px-2 font-medium",
                  priceChange > 0
                    ? "bg-primary hover:bg-primary/80"
                    : "bg-error hover:bg-error/80"
                )}
              >
                {toCurrency(priceChange, { decimals: 2 })}%{" "}
                {priceChange > 0 ? (
                  <IconArrowUp className="h-4 w-4" />
                ) : (
                  <IconArrowUp className="h-4 w-4 transform rotate-180" />
                )}
              </Badge>
            )}
          </div>

          <div className="flex items-end gap-2">
            {project.website && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-[8px] bg-white/10"
                onClick={(e) => openSocialLink(e, project.website)}
              >
                <IconWebsite className="h-4 w-4" />
              </Button>
            )}
            {project.telegram && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-[8px] bg-white/10"
                onClick={(e) => openSocialLink(e, project.telegram)}
              >
                <IconTelegram className="h-4 w-4" />
              </Button>
            )}
            {project.x && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-[8px] bg-white/10"
                onClick={(e) => openSocialLink(e, project.x)}
              >
                <IconX className="h-[14px] w-[14px]" />
              </Button>
            )}
          </div>
        </div>

        <p className="text-sm mb-4 leading-[20px] text-foreground break-all">
          {project.description}
        </p>

        <div className="flex flex-col gap-6 p-3 rounded-[12px] bg-[#5C5C5C]/[0.12]">
          <div className="flex items-center gap-8">
            <div>
              <p className="text-sm text-foreground mb-1">Token Revenue</p>
              <p className="text-[18px] font-semibold text-primary">
                ${toCurrency(revenueInUsd, { decimals: 4 })}
              </p>
            </div>
            <div>
              <p className="text-sm text-foreground mb-1">Market Cap</p>
              <p className="text-[18px] font-semibold text-primary">
                ${abbreviateNumber(marketCapInUsd, 2)}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Progress value={saleProgress} className="h-5" />
            <span className="text-sm text-foreground leading-[20px] font-medium px-3">
              {saleProgress}%
            </span>
          </div>
        </div>

        <div className="w-full h-[460px] bg-background overflow-hidden rounded-[16px] mt-6">
          {/* {dexScreenerAddress ? (
            <iframe
              src={`https://dexscreener.com/ethereum/${dexScreenerAddress}?embed=1&theme=dark&trades=0&info=0`}
              className="w-full h-full"
              title="Price Chart"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-sm text-foreground">No data available</span>
            </div>
          )} */}
          <PriceChart
            className="mt-4"
            symbol={project.symbol}
            funId={project.tokenAddress}
            status={project.status}
            pairAddress={project.pairAddress}
          />
        </div>
      </CardContent>
    </Card>
  );
};
