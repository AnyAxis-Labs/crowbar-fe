import { useState, useMemo } from "react";
import { useSearch } from "@tanstack/react-router";
import { get } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { TokenCard } from "@/components/shared/token-card";
import { IconChevronDown } from "@/components/icons";
import type { TaxFarmResponse } from "@/services/models";
import { Empty } from "@/components/shared/empty";
import { Route as ProfileRoute } from "@/routes/profile.$id";
import { useTaxFarmControllerGet } from "@/services/queries";
import { IconLoading } from "@/components/icons";

const itemsPerLoad = 6;

export const ProfileTokens = ({ id }: { id: string }) => {
  const queryParams = useSearch({
    from: ProfileRoute.fullPath,
  });
  const { search, sortBy, sortOrder } = queryParams;

  const { data: tokensResponse, isLoading } = useTaxFarmControllerGet({
    search,
    sortBy,
    order: sortOrder,
    walletAddress: id,
  });

  const tokens = useMemo(() => get(tokensResponse, "data", []), [tokensResponse]);

  const [itemsToShow, setItemsToShow] = useState(itemsPerLoad);

  const displayedTokens = useMemo(
    () => tokens.slice(0, itemsToShow) as TaxFarmResponse[],
    [tokens, itemsToShow],
  );

  const handleLoadMore = () => {
    setItemsToShow((prevItems) => prevItems + itemsPerLoad);
  };

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-200px)] justify-center">
        <IconLoading className="animate-spin w-14 h-14 mt-20" />
      </div>
    );
  }

  if (tokens.length === 0) {
    return <Empty description="No project" className="mb-[84px] isolate" />;
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
      {itemsToShow < tokens.length && (
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
