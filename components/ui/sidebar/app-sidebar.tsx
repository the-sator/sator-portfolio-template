import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar/sidebar";
import ProfileConfigDropdown from "../dropdown/profile-config-dropdown";
import SidebarItem from "./sidebar-item";

export async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>{/* <Avatar></Avatar> */}</SidebarHeader>
      <SidebarItem />
      <SidebarFooter>
        <div className="flex items-center justify-between">
          <ProfileConfigDropdown />
          {/* <ThemeSwitch /> */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
