import React, { ReactNode } from "react";
import ThemeSwitch from "./theme-switch";
import LanguageDropdown from "./dropdown/language-dropdown";
import Link from "next/link";
type Props = {
  sidebarTrigger: ReactNode;
  currentLocale: string;
};
export default function Navbar({ sidebarTrigger, currentLocale }: Props) {
  return (
    <nav className="sticky top-0 z-20 flex h-10 w-full items-center justify-between border-b bg-background px-4">
      {/* <SidebarTrigger /> */}
      {sidebarTrigger}
      <div className="flex items-center justify-center">
        <LanguageDropdown currentLocale={currentLocale} />
        {/* <LanguageSwitcherSelect /> */}
        <ThemeSwitch />
      </div>
    </nav>
  );
}
