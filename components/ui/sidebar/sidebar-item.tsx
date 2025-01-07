"use client";
import React from "react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "./sidebar";
import { MdArticle, MdDashboard, MdDesignServices } from "react-icons/md";
// import ThemeSwitch from "../theme-switch";
import { IoIosHelpCircle, IoIosSettings } from "react-icons/io";
import SidebarMenuNavItem from "./sidebar-menu-nav-item";
import { useTranslations } from "next-intl";
const items = [
  {
    title: "analytic",
    url: "#",
    children: [
      {
        title: "dashboard",
        url: "/admin-panel/dashboard",
        icon: <MdDashboard />,
      },
    ],
  },

  {
    title: "content",
    url: "#",
    children: [
      {
        title: "portfolio",
        url: "/admin-panel/portfolio",
        icon: <MdDesignServices />,
      },

      {
        title: "blog",
        url: "/admin-panel/blog",
        icon: <MdArticle />,
      },
    ],
  },

  {
    title: "configuration",
    url: "#",
    children: [
      {
        title: "setting",
        url: "#",
        icon: <IoIosSettings />,
      },
      {
        title: "support",
        url: "#",
        icon: <IoIosHelpCircle />,
      },
    ],
  },
];

export default function SidebarItem() {
  const t = useTranslations("SidebarItem");
  // const path = pathname.split("/")[2];
  return (
    <SidebarContent>
      {items.map((item) => (
        <SidebarGroup key={item.title}>
          <SidebarGroupLabel>{t(item.title)}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {item.children.map((item) => {
                return <SidebarMenuNavItem item={item} key={item.title} />;
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}
