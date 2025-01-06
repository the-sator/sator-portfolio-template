import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";
type Props = {
  count?: number;
  className?: string;
  size?: "default" | "xxs" | "xs" | "sm" | "lg" | "icon";
  color?:
    | "default"
    | "foreground"
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success";
};

const textSize = cva("text-[10px] text-background", {
  variants: {
    size: {
      default: "text-[10px]",
      xxs: "text-[6px]",
      xs: "text-[8px]",
      sm: "text-sm",
      lg: "text-lg",
      icon: "text-sm",
    },
    color: {
      default: "text-white",
      foreground: "text-foreground",
      primary: "text-primary",
      secondary: "text-secondary",
      danger: "text-danger",
      warning: "text-warning",
      success: "text-success",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export default function Indicator({ count, className, size, color }: Props) {
  return (
    <div
      className={cn(
        "flex size-4 animate-pulse items-center justify-center rounded-full bg-blue-500",
        className,
      )}
    >
      {count && count > 0 && (
        <p className={textSize({ size, color })}>{count < 9 ? count : "9+"}</p>
      )}
    </div>
  );
}
