import React from "react";
import { Skeleton } from "../skeleton";

export default function PortfolioDetailSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="min-h-[200px] w-full" />
      <Skeleton className="min-h-[400px] w-full" />
      <h1 className="text-3xl font-bold">Gallery</h1>
      <div className="my-6 columns-1 gap-2 space-y-2 align-super sm:columns-2 2xl:columns-3">
        <Skeleton className="min-h-[300px] w-full" />
        <Skeleton className="min-h-[100px] w-full" />
        <Skeleton className="min-h-[150px] w-full" />
        <Skeleton className="min-h-[200px] w-full" />
        <Skeleton className="min-h-[280px] w-full" />
        <Skeleton className="min-h-[200px] w-full" />
        <Skeleton className="min-h-[350px] w-full" />
      </div>
    </div>
  );
}
