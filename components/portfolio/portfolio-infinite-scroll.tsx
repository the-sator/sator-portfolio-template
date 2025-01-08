"use client";
import React, { useEffect, useState } from "react";
import PortfolioCard from "./portfolio-card";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../ui/spinner";
import { useGetInfinitePortfolios } from "@/data/query/portfolio";
import { toast } from "@/hooks/use-toast";
import CustomCreateButton from "../ui/button/custom-create-button";
import { Portfolio, PortfolioFilter } from "@/types/portfolio.type";
type Props = {
  filter: PortfolioFilter;
};
export default function PortfolioInfiniteScroll({ filter }: Props) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
  } = useGetInfinitePortfolios(filter, {});
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error Fetching Portfolio",
        description: error.message,
        variant: "destructive",
      });
    }

    if (data) {
      const allPortfolios = data?.pages.flatMap((page) => page.data || []);
      setPortfolios(allPortfolios);
    }
  }, [data, isError]);

  return (
    <>
      {portfolios.length > 0 ? (
        <InfiniteScroll
          dataLength={portfolios.length}
          next={fetchNextPage}
          hasMore={hasNextPage || isFetchingNextPage}
          scrollThreshold={0.5}
          loader={
            <div className="grid w-full grid-cols-1 place-items-center py-2.5">
              <Spinner size={18} />
            </div>
          }
          className="my-4 mb-10 !overflow-visible"
        >
          {/* <div className="flex flex-wrap gap-4"> */}
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((portfolio) => (
              <PortfolioCard key={portfolio?.id} portfolio={portfolio!} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CustomCreateButton
            href={"/admin-panel/portfolio/create"}
            className="min-h-[350px]"
          />
        </div>
      )}
    </>
  );
}
