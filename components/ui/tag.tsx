import { cn } from "@/lib/utils";
import React from "react";
type Props = {
  children: React.ReactNode;
  color?: string; // Limit color options
  className?: string;
};

export default function Tag({ className, color = "blue", children }: Props) {
  const colorClasses = {
    red: "dark:bg-red-900/30 dark:text-red-500 text-red-700 bg-red-500/50",
    violet:
      "dark:bg-violet-900/30 dark:text-violet-500 text-violet-700 bg-violet-500/50",
    green:
      "dark:bg-green-900/30 dark:text-green-500 text-green-700 bg-green-500/50",
    purple:
      "dark:bg-purple-900/30 dark:text-purple-500 text-purple-700 bg-purple-500/50",
    yellow:
      "dark:bg-yellow-900/30 bg-yellow-500/50 text-yellow-700 dark:text-yellow-500",
    orange:
      "dark:bg-orange-900/30 bg-orange-500/50 dark:text-orange-500 text-orange-700",
    gray: "dark:bg-gray-900/90 dark:text-gray-500 text-gray-700 bg-gray-500/50",
    teal: "dark:bg-teal-900/30 dark:text-teal-500 text-teal-700 bg-teal-500/50",
    indigo:
      "dark:bg-indigo-900/30 bg-indigo-500/50 dark:text-indigo-500 text-indigo-700",
    blue: "dark:bg-blue-900/30 text-blue-700 bg-blue-500/50 dark:text-blue-500",
  };

  type Color = keyof typeof colorClasses;

  return (
    <div
      className={cn(
        `flex h-6 w-fit min-w-[60px] items-center justify-center rounded-full px-4 text-[12px]`,
        colorClasses[color as Color] || colorClasses.blue,
        className,
      )}
    >
      {children}
    </div>
  );
}
