import { useInfiniteQuery } from "@tanstack/react-query";
import { PortfolioFilter } from "@/types/portfolio.type";
import { paginatePortfolioAction } from "@/action/portfolio.action";
export function getPortfolioQueryKey() {
  return "portfolio";
}

export function getFilterQueryKey(filter: PortfolioFilter) {
  return ["portfolio", filter];
}

export function useGetInfinitePortfolios(
  filter: PortfolioFilter,
  options: object,
) {
  return useInfiniteQuery({
    queryKey: [getPortfolioQueryKey(), getFilterQueryKey(filter)],
    queryFn: ({ pageParam }) =>
      paginatePortfolioAction({
        ...filter,
        page: String(pageParam),
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.page !== null ? lastPage.page : undefined;
    },
    initialPageParam: 1,
    ...options,
  });
}
