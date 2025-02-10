import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TokenCard } from "@/components/shared/token-card";
import { IconChevronDown } from "@/components/icons";
import type { TaxFarmResponse } from "@/services/models";
import { Empty } from "@/components/shared/empty";

export const TokenList = ({ tokens }: { tokens: TaxFarmResponse[] }) => {
  const itemsPerLoad = 6;
  const [displayedTokens, setDisplayedTokens] = useState<TaxFarmResponse[]>([]);

  useEffect(() => {
    setDisplayedTokens(tokens.slice(0, itemsPerLoad));
  }, [tokens]);

  const handleLoadMore = useCallback(() => {
    const currentLength = displayedTokens.length;
    const newTokens = tokens.slice(currentLength, currentLength + itemsPerLoad);
    setDisplayedTokens((prevTokens) => [...prevTokens, ...newTokens]);
  }, [displayedTokens, tokens]);

  if (tokens.length === 0) {
    return <Empty description="No project" />;
  }

  return (
    <>
      <div className="container">
        <div className="px-0 md:px-8 pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedTokens.map((item) => (
            <TokenCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      {displayedTokens.length < tokens.length && (
        <div className="flex justify-center p-8">
          <Button
            variant="outline"
            className="rounded-[8px] py-2 px-4 border border-solid border-white/[0.05] bg-white/[0.05] text-foreground gap-2"
            onClick={handleLoadMore}
          >
            Load more
            <IconChevronDown className="h-6 w-6" />
          </Button>
        </div>
      )}
    </>
  );
};
