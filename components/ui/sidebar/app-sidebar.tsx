import { Sidebar, SidebarFooter } from "@/components/ui/sidebar/sidebar";
import ProfileConfigDropdown from "../dropdown/profile-config-dropdown";
import SidebarItem from "./sidebar-item";
import { redirect } from "next/navigation";
import { getSiteUserSession } from "@/data/site-user";
import { ADMIN_LOGIN_PATH } from "@/constant/base";

export async function AppSidebar() {
  const { session, user } = await getSiteUserSession();
  if (!session || !user) {
    return redirect(ADMIN_LOGIN_PATH);
  }
  return (
    <Sidebar>
      <SidebarItem />
      <SidebarFooter>
        <div className="flex items-center justify-between">
          <ProfileConfigDropdown user={user} />
          {/* <ThemeSwitch /> */}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
