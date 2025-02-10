import { useNavigate, useSearch } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  IconFlag,
  IconNew,
  IconRising,
  IconSearch,
  IconTopStar,
  IconTrending,
} from "@/components/icons";
import { Route as IndexRoute } from "@/routes/index";
import { useDebounceState } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import type { HomeFilter, SortBy, SortOrder } from "@/types";

const tabs: {
  value: HomeFilter;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
}[] = [
  {
    value: "trending",
    Icon: IconTrending,
    label: "Trending",
  },
  {
    value: "top",
    Icon: IconTopStar,
    label: "Top",
  },
  {
    value: "rising",
    Icon: IconRising,
    label: "Rising",
  },
  {
    value: "new",
    Icon: IconNew,
    label: "New",
  },
  {
    value: "finalized",
    Icon: IconFlag,
    label: "Finalized",
  },
];

export const TokenFilterBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const queryParams = useSearch({
    from: IndexRoute.fullPath,
  });
  const { sortBy, sortOrder } = queryParams;

  const debouncedSearch = useDebounceState(search, 500);

  useEffect(() => {
    updateQueryParams("search", debouncedSearch);
  }, [debouncedSearch]);

  const updateQueryParams = (
    key: keyof typeof queryParams,
    value: SortBy | SortOrder | HomeFilter | string,
  ) => {
    navigate({
      search: {
        ...queryParams,
        // @ts-ignore search type is correct but TS doesn't know that
        search: debouncedSearch,
        [key]: value,
      },
    });
  };

  return (
    <div className="container mt-8">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-2 lg:gap-4">
        <Tabs defaultValue="trending" className="w-full overflow-x-auto hidden-scroll-bar">
          <TabsList className="bg-transparent gap-2">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "py-2 px-4 rounded-[8px]",
                  "flex items-center gap-2",
                  "bg-white/[0.05]",
                  "text-foreground",
                  "text-sm leading-[20px] font-medium tracking-[0.07px]",
                  "data-[state=active]:bg-primary-light/20 data-[state=active]:text-primary",
                )}
                onClick={() => updateQueryParams("type", tab.value)}
              >
                <tab.Icon />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex flex-col w-full lg:w-auto lg:flex-row items-center gap-2 lg:gap-4">
          <div className="relative w-full lg:w-[230px]">
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
            <Input
              placeholder="Search"
              className="bg-neutral-900 border-white/10 rounded-[8px] py-2 pl-12 pr-3 text-app-white placeholder:text-foreground h-auto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-row items-center gap-2 lg:gap-4 w-full lg:w-auto">
            <Select
              value={sortBy || "revenue"}
              onValueChange={(value) => updateQueryParams("sortBy", value as SortBy)}
            >
              <SelectTrigger className="w-full lg:w-fit text-primary whitespace-nowrap rounded-[8px] bg-white/10 py-2 px-4 gap-2 border-0">
                <div className="flex items-center gap-2">
                  <span className="text-foreground">Sort by</span>
                  <SelectValue placeholder="Revenue" />
                </div>
              </SelectTrigger>
              <SelectContent className="mt-2 bg-[#262626]/70 backdrop-blur-[15px] border-0 rounded-[8px]">
                <SelectItem value="createTime">Creation Time</SelectItem>
                <SelectSeparator />
                <SelectItem value="revenue">Revenue</SelectItem>
                <SelectSeparator />
                <SelectItem value="marketCap">Market Cap</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortOrder || "DESC"}
              onValueChange={(value) => updateQueryParams("sortOrder", value as SortOrder)}
            >
              <SelectTrigger className="w-full lg:w-fit text-primary whitespace-nowrap rounded-[8px] bg-white/10 py-2 px-4 gap-2 border-0">
                <div className="flex items-center gap-2">
                  <span className="text-foreground">Sort order</span>
                  <SelectValue placeholder="Newest" />
                </div>
              </SelectTrigger>
              <SelectContent className="mt-2 bg-[#262626]/70 backdrop-blur-[15px] border-0 rounded-[8px]">
                <SelectItem value="DESC">Newest</SelectItem>
                <SelectSeparator />
                <SelectItem value="ASC">Oldest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
