import React from "react";
import { CommandItem } from "../command";
import { Skeleton } from "../skeleton";

export default function TagSkeleton() {
  return (
    <>
      {Array.from({ length: 7 }).map((item, index) => (
        <CommandItem key={index}>
          <Skeleton className="h-6 w-[90%]" />
        </CommandItem>
      ))}
    </>
  );
}
