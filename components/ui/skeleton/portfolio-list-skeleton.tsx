import React from "react";
import { Skeleton } from "../skeleton";

export default function PortfolioListSkeleton() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton className="h-[350px] w-full bg-border" key={index} />
      ))}
    </div>
  );
}
