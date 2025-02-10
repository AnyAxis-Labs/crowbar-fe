import { toCurrency } from "@/lib/number";
import { Card } from "../ui/card";

interface Stats {
  available: number | string;
  staked: number | string;
  tvl: number | string;
}

interface StakingStatsProps {
  symbol?: string;
  stats?: Stats;
}

const StakingStats = (props: StakingStatsProps) => {
  const { symbol, stats } = props;

  return (
    <Card className="border-white/10 p-4 flex flex-col gap-2 rounded-[16px]">
      {Object.entries(stats || {}).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <span className="text-sm">{statLabels[key as keyof Stats]}</span>
          <span className="text-sm font-medium text-primary">
            {toCurrency(value, {})} {symbol}
          </span>
        </div>
      ))}
    </Card>
  );
};

export default StakingStats;

const statLabels: Record<keyof Stats, string> = {
  available: "Available to Stake",
  staked: "Staked Amount",
  tvl: "TVL",
};
