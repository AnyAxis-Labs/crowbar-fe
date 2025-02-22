import { createFileRoute } from "@tanstack/react-router";
import { useLayoutEffect } from "react";

import { IconLoading } from "@/components/icons";
import type { ProfileSearch, SortBy, SortOrder } from "@/types";

export const Route = createFileRoute("/profile/$id")({
  component: Profile,
  validateSearch: (search: Record<string, unknown>): ProfileSearch => {
    const { page, sortBy, sortOrder, search: searchQuery } = search;

    return {
      page: page ? Number(page) : undefined,
      sortBy: sortBy ? (sortBy as SortBy) : undefined,
      sortOrder: sortOrder ? (sortOrder as SortOrder) : undefined,
      search: searchQuery ? (searchQuery as string) : undefined,
    };
  },
});

function Profile() {
  // const { id } = Route.useParams();

  // const { data: userStatisticResponse, isLoading: isUserStatisticLoading } =
  //   useTaxFarmControllerFindStatisticUser({
  //     walletAddress: id,
  //   });

  // const userStatistic = get({}, "data");

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // if (isUserStatisticLoading) {
  return (
    <div className="flex h-[calc(100vh-200px)] justify-center">
      <IconLoading className="animate-spin w-14 h-14 mt-20" />
    </div>
  );
  // }

  // if (!userStatistic) {
  //   return (
  //     <div className="flex h-[calc(100vh-200px)] justify-center">
  //       <Empty description="User not found" />
  //     </div>
  //   );
  // }

  // return (
  //   <section className="relative">
  //     <ProfileDetail id={id} userStatistic={userStatistic} />
  //     <ProfileFilterBar />
  //     <ProfileTokens id={id} />
  //   </section>
  // );
}
