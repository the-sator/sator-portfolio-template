"use client";
import React from "react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import { MdArticle, MdDashboard, MdDesignServices } from "react-icons/md";
// import ThemeSwitch from "../theme-switch";
import { IoIosSettings } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getLocale } from "next-intl/server";
const items = [
  {
    title: "Analytic",
    url: "#",
    children: [
      {
        title: "Dashboard",
        url: "/",
        icon: MdDashboard,
      },
    ],
    // icon: MdDashboard,
  },

  {
    title: "Creation",
    url: "#",
    children: [
      {
        title: "Portfolio",
        url: "/portfolio",
        icon: MdDesignServices,
      },

      {
        title: "Blog",
        url: "/blog",
        icon: MdArticle,
      },
    ],
  },

  {
    title: "Configuration",
    url: "#",
    children: [
      {
        title: "Setting",
        url: "#",
        icon: IoIosSettings,
      },
    ],
  },
];
type Props = {
  locale: string;
};
export default function SidebarItem({ locale }: Props) {
  const pathname = usePathname();
  console.log("pathname:", pathname);
  return (
    <SidebarContent>
      {items.map((item) => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.children.map((child) => (
                <SidebarMenuItem key={child.title}>
                  <SidebarMenuButton asChild isActive={pathname === child.url}>
                    <Link href={`${child.url}`}>
                      <child.icon />
                      <span>{child.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
