import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar/sidebar";
import ProfileConfigDropdown from "../dropdown/profile-config-dropdown";
import SidebarItem from "./sidebar-item";
import { getLocale } from "next-intl/server";

export async function AppSidebar() {
  const locale = await getLocale();
  return (
    <Sidebar>
      <SidebarHeader>{/* <Avatar></Avatar> */}</SidebarHeader>
      <SidebarItem locale={locale} />
      <SidebarFooter>
        <div className="flex items-center justify-between">
          <ProfileConfigDropdown />
          {/* <ThemeSwitch /> */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
