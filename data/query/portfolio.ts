import { useInfiniteQuery } from "@tanstack/react-query";
import { Portfolio, PortfolioFilter } from "@/types/portfolio.type";
import { paginatePortfolioAction } from "@/action/portfolio.action";
export function getQueryKey() {
  return ["portfolio"];
}

export function getFilterQueryKey(filter: PortfolioFilter) {
  return ["portfolio", filter];
}

export function useGetInfinitePortfolios(
  initialData: Portfolio[],
  initialPage: number | null | undefined,
  filter: PortfolioFilter,
  options: object,
) {
  return useInfiniteQuery({
    queryKey: [getQueryKey()],
    queryFn: ({ pageParam = initialPage }) =>
      paginatePortfolioAction({
        ...filter,
        page: String(pageParam),
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.page !== null ? lastPage.page : undefined;
    },
    initialPageParam: 1,
    initialData: {
      pages: [{ data: initialData || [], page: initialPage || null }],
      pageParams: [undefined],
    },
    ...options,
  });
}
