import { useState } from "react";
import BigNumber from "bignumber.js";
import { get } from "es-toolkit/compat";
import { useChainId } from "wagmi";
import { Link, useNavigate } from "@tanstack/react-router";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconWebsite, IconTelegram, IconX, IconEllipse, IconArrowUp } from "@/components/icons";
import { cn, headAddress } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import type { TaxFarmResponse } from "@/services/models";
import { UserAvatar } from "@/components/shared/user-avatar";
import ImageWithFallback from "@/components/shared/image-with-fallback";
import { Badge } from "@/components/ui/badge";
import { useEthFiatPrice } from "@/hooks/useEthFiatPrice";
import { toCurrency } from "@/lib/number";
import { BURN_TOKEN_SOFT_CAP } from "@/lib/constants";

interface TokenCardProps {
  item: TaxFarmResponse;
}

export const TokenCard = ({ item }: TokenCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const { data: ethPrice = 0 } = useEthFiatPrice();

  const revenue = get(item, "revenue", 0);
  const marketCap = get(item, "marketCap", 0);
  const priceCurrent = get(item, "priceCurrent", 0);
  const priceLast5m = get(item, "priceLast5m", 0);
  const chainId = useChainId();

  const revenueInUsd = BigNumber(revenue).multipliedBy(ethPrice).toString();
  const marketCapInUsd = BigNumber(marketCap).multipliedBy(ethPrice);
  const priceChange = priceLast5m
    ? BigNumber(priceCurrent).minus(priceLast5m).dividedBy(priceLast5m).multipliedBy(100).toNumber()
    : 0;

  const saleProgress = BigNumber(revenue)
    .dividedBy(BURN_TOKEN_SOFT_CAP[chainId])
    .multipliedBy(100)
    .toNumber();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const openSocialLink = (e: React.MouseEvent<HTMLButtonElement>, url: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (url) {
      window.open(url, "_blank");
    }
  };

  const openProfileLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigate({
      to: `/profile/${item.creator}`,
    });
  };

  return (
    <Link to={`/project/${item.tokenAddress}`}>
      <Card
        key={item.id}
        className={cn(
          "rounded-[32px] overflow-hidden",
          "border-none",
          "p-px",
          "transition-all duration-300",
          isHovered
            ? "bg-gradient-to-b from-primary-light/10 from-30% to-primary-light/40 cursor-pointer"
            : "bg-white/10",
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="bg-gradient-to-b from-[#292929] to-[#1E1E1E] rounded-[31px]">
          <div className="relative rounded-[32px] overflow-hidden bg-transparent">
            <ImageWithFallback
              src={item.banner}
              alt={item.tokenName}
              className={cn(
                "w-full object-cover transition-all duration-300 bg-transparent",
                isHovered ? "h-[114px]" : "h-[176px]",
              )}
            />
            {Boolean(priceChange) && (
              <Badge
                className={cn(
                  "text-neutral-900 h-6 rounded-[4px] px-2 font-medium absolute top-3 right-3",
                  priceChange > 0 ? "bg-primary hover:bg-primary/80" : "bg-error hover:bg-error/80",
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
          <CardContent className="relative px-4 isolate z-10">
            <div className="flex items-end gap-2 -mt-5">
              <ImageWithFallback
                src={item.logo}
                alt={item.tokenName}
                className="w-[64px] h-[64px] rounded-full border border-solid border-black border-[2px] mr-2"
              />
              {item.website && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-[58px] bg-transparent border border-solid rounded-full border-white/10"
                  onClick={(e) => openSocialLink(e, item.website)}
                >
                  <IconWebsite className="h-4 w-4" />
                </Button>
              )}
              {item.telegram && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-[58px] bg-transparent border border-solid rounded-full border-white/10"
                  onClick={(e) => openSocialLink(e, item.telegram)}
                >
                  <IconTelegram className="h-4 w-4" />
                </Button>
              )}
              {item.X && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-[58px] bg-transparent border border-solid rounded-full border-white/10"
                  onClick={(e) => openSocialLink(e, item.X)}
                >
                  <IconX className="h-[14px] w-[14px]" />
                </Button>
              )}
            </div>
            <div className="flex mt-1 items-center gap-2">
              <span className="text-app-white text-[20px] font-semibold">{item.tokenName}</span>
              <span className="text-app-gray text-[18px] font-bold">{item.symbol}</span>
            </div>
            <div
              className="flex items-center space-x-1 mt-1 mb-2"
              onClick={(e) => openProfileLink(e)}
            >
              <span className="text-sm text-foreground">Creator</span>
              <UserAvatar name={item.creator} className="w-4 h-4" />
              <span className="text-sm text-primary">{headAddress(item.creator)}</span>
            </div>

            <p
              className={cn(
                "text-sm text-foreground",
                "overflow-hidden transition-all duration-300",
                "line-clamp-3",
                "break-words",
                isHovered ? "h-[62px] opacity-100" : "h-0 opacity-0",
              )}
            >
              {item.description}
            </p>

            <div className="flex flex-col gap-3 p-3 rounded-[12px] bg-[#5C5C5C]/[0.12] mt-4">
              <div className="w-full flex justify-between items-center">
                <span className="text-sm text-foreground">Token Revenue</span>
                <span className="text-sm text-primary font-semibold">
                  {toCurrency(revenueInUsd, { decimals: 2, prefix: "$" })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">
                  Market Cap:&nbsp;
                  <span className="text-sm text-primary font-semibold">
                    {toCurrency(marketCapInUsd, { decimals: 2, prefix: "$" })}
                  </span>
                </span>
                <span className="text-sm text-app-white">{saleProgress}%</span>
              </div>
              <Progress value={saleProgress} />
            </div>

            <IconEllipse
              className={cn(
                "absolute bottom-0 left-0 w-full h-auto transform translate-y-[calc(50%-80px)]",
                isHovered ? "opacity-100" : "opacity-0",
                "transition-all duration-300",
                "pointer-events-none select-none",
              )}
            />
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};
