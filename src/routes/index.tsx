import { get } from "es-toolkit/compat";

import HomeHero from "@/components/home/hero";
import { TokenFilterBar } from "@/components/home/token-filter-bar";
import { TokenList } from "@/components/home/token-list";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import type { HomeSearch, HomeFilter, SortBy, SortOrder } from "@/types";
import { useTaxFarmControllerGet } from "@/services/queries";
import { IconLoading } from "@/components/icons";

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search: Record<string, unknown>): HomeSearch => {
    const { page, type, sortBy, sortOrder, search: searchQuery } = search;

    return {
      page: page ? Number(page) : undefined,
      type: type ? (type as HomeFilter) : undefined,
      sortBy: sortBy ? (sortBy as SortBy) : undefined,
      sortOrder: sortOrder ? (sortOrder as SortOrder) : undefined,
      search: searchQuery ? (searchQuery as string) : undefined,
    };
  },
});

function Index() {
  const queryParams = useSearch({
    from: Route.fullPath,
  });
  const { search, sortBy, sortOrder, type } = queryParams;

  const { data: tokensResponse, isLoading } = useTaxFarmControllerGet({
    search,
    filter: type === "finalized" ? "finalized" : "all",
    sortBy:
      type === "trending"
        ? "volume5m"
        : type === "top"
          ? "marketCap"
          : type === "new"
            ? "createTime"
            : type === "rising"
              ? "volume5m"
              : sortBy ?? "revenue",
    order: sortOrder ?? "DESC",
  });

  const tokens = get(tokensResponse, "data", []);

  return (
    <>
      <HomeHero />
      <TokenFilterBar />
      {isLoading ? (
        <div className="flex h-[calc(100vh-200px)] justify-center">
          <IconLoading className="animate-spin w-14 h-14 mt-20" />
        </div>
      ) : (
        <TokenList tokens={tokens} />
      )}
    </>
  );
}
