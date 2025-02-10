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
import { IconSearch } from "@/components/icons";
import { Route as ProfileRoute } from "@/routes/profile.$id";
import { useDebounceState } from "@/hooks/useDebounce";
import { useState, useEffect } from "react";
import type { SortBy, SortOrder } from "@/types";

export const ProfileFilterBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const queryParams = useSearch({
    from: ProfileRoute.fullPath,
  });
  const { sortBy, sortOrder } = queryParams;

  const debouncedSearch = useDebounceState(search, 500);

  useEffect(() => {
    updateQueryParams("search", debouncedSearch);
  }, [debouncedSearch]);

  const updateQueryParams = (key: keyof typeof queryParams, value: SortBy | SortOrder | string) => {
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
    <div className="container mt-8 mb-8 isolate">
      <div className="flex items-center justify-between w-full">
        <div className="flex w-full flex-col md:flex-row items-center justify-between gap-2 lg:gap-4">
          <div className="relative w-full md:w-[230px]">
            <IconSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
            <Input
              placeholder="Search"
              className="bg-neutral-900 border-white/10 rounded-[8px] py-2 pl-12 pr-3 text-app-white placeholder:text-foreground h-auto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex overflow-x-auto w-full flex-row items-center gap-2 lg:gap-4 w-full lg:w-auto">
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
