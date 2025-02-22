import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { TradingViewChart } from "@/components/shared/tradingview-chart";

export const PriceChart = ({
  className,
  symbol,
  funId,
  status,
  pairAddress,
}: {
  className?: string;
  symbol: string;
  funId: string;
  status: string;
  pairAddress?: string;
}) => {
  const [tab, setTab] = useState(status === "completed" ? "current" : "pump");

  return (
    <Card
      className={cn(
        "w-full h-full flex items-center justify-center h-[500px] overflow-hidden p-2",
        className
      )}
    >
      <Tabs value={tab} onValueChange={setTab} className="w-full h-full">
        {status === "completed" && (
          <TabsList className="mb-2">
            <TabsTrigger
              value="pump"
              className="flex-1 py-3 px-4 data-[state=active]:text-neutral-black data-[state=active]:bg-[#ACB6FF] text-[#9EA1A3]"
            >
              Pump Chart
            </TabsTrigger>
            <TabsTrigger
              value="current"
              className="flex-1 py-3 px-4 data-[state=active]:text-neutral-black data-[state=active]:bg-[#ACB6FF] text-[#9EA1A3]"
            >
              Current Chart
            </TabsTrigger>
          </TabsList>
        )}

        <TabsContent
          value="pump"
          className={cn(
            "w-full h-full",
            status === "completed" && "h-[calc(100%-56px)]"
          )}
        >
          <TradingViewChart funId={funId} symbol={`crowbar:${symbol}/S`} />
        </TabsContent>

        <TabsContent
          value="current"
          className={cn(
            "w-full h-full",
            status === "completed" && "h-[calc(100%-56px)]"
          )}
        >
          <TradingViewChart funId={funId} symbol={`crowbar:${symbol}/S`} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
