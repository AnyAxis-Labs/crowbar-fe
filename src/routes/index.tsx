import { get } from "es-toolkit/compat";

import HomeHero from "@/components/home/hero";
import { TokenFilterBar } from "@/components/home/token-filter-bar";
import { TokenList } from "@/components/home/token-list";
import { IconLoading } from "@/components/icons";
import {
  MemeControllerQueryPaginationFilter,
  MemeControllerQueryPaginationSortBy,
  MemeControllerQueryPaginationSortOrder,
} from "@/services/models";
import { useMemeControllerQueryPagination } from "@/services/queries";
import type { HomeFilter, HomeSearch, SortBy, SortOrder } from "@/types";
import { createFileRoute, useSearch } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search: Record<string, unknown>): HomeSearch => {
    const { page, type, sortBy, sortOrder, search: searchQuery } = search;

    return {
      page: page ? Number(page) : 1,
      type: type ? (type as HomeFilter) : undefined,
      sortBy: sortBy ? (sortBy as SortBy) : undefined,
      sortOrder: sortOrder ? (sortOrder as SortOrder) : undefined,
      search: searchQuery ? (searchQuery as string) : undefined,
    };
  },
});
const PAGE_SIZE = 12;

const sortByMap: Record<SortBy, MemeControllerQueryPaginationSortBy> = {
  "creation-time": MemeControllerQueryPaginationSortBy.createdTime,
  "trading-volume": MemeControllerQueryPaginationSortBy.volume24hs,
  "market-cap": MemeControllerQueryPaginationSortBy.marketCap,
};

function Index() {
  const queryParams = useSearch({
    from: Route.fullPath,
  });
  const { search, sortBy, sortOrder, type, page } = queryParams;

  const { data, isLoading } = useMemeControllerQueryPagination(
    {
      page,
      pageSize: PAGE_SIZE,
      search: search || undefined,
      sortBy: sortBy ? sortByMap[sortBy] : undefined,
      sortOrder:
        sortOrder === "ASC"
          ? MemeControllerQueryPaginationSortOrder.ASC
          : MemeControllerQueryPaginationSortOrder.DESC,
      filter:
        type === "dex-listed"
          ? MemeControllerQueryPaginationFilter.end
          : MemeControllerQueryPaginationFilter.active,
    },
    {
      query: {
        refetchInterval: 5000, // Refetch every 5 seconds
      },
    }
  );

  // Handle data updates

  const tokens = get(data, "data.data", []);

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
