import { cn } from "@/lib/utils";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
type Props = {
  size?: number;
  className?: string;
};
export default function Spinner({ size = 14, className }: Props) {
  return (
    <AiOutlineLoading3Quarters
      className={cn("animate-spin text-foreground", className)}
      size={size}
    />
  );
}
