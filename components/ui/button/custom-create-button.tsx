import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { IoAddOutline } from "react-icons/io5";
type Props = {
  href: string;
  className?: string;
};
export default function CustomCreateButton({ href, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex min-h-[200px] w-full items-center justify-center rounded-md border border-dashed p-0 transition-all hover:border-black hover:dark:border-label/50",
        className,
      )}
    >
      <IoAddOutline
        size={24}
        className="text-border group-hover:text-black group-hover:dark:text-label/50"
      />
    </Link>
  );
}
