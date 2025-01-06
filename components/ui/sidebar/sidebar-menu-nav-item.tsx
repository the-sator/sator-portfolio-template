"use client";
import React, { ReactElement } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "./sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Indicator from "../indicator";
type Props = {
  item: {
    title: string;
    url: string;
    icon: ReactElement;
    badge?: number;
  };
};
export default function SidebarMenuNavItem({ item }: Props) {
  const pathname = usePathname();
  const t = useTranslations("SidebarItem");
  const isActivePath = (currentPath: string, childUrl: string) => {
    if (childUrl === "/") {
      return ["/", "/en", "/kh"].includes(currentPath);
    }
    return currentPath.replace(/^\/(en|kh)/, "") === childUrl;
  };
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild isActive={isActivePath(pathname, item.url)}>
        <Link href={`${item.url}`} className="text-label">
          <div className="relative">
            {item.icon}
            {!!item.badge && item.badge > 0 && (
              <Indicator
                className="absolute -right-0.5 -top-0.5 size-2 animate-none rounded-full bg-red-500"
                count={item.badge}
                size="xxs"
                color="foreground"
              />
            )}
          </div>
          <span>{t(item.title)}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
