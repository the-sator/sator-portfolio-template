import PortfolioForm from "@/components/ui/form/portfolio-form";
import { ADMIN_LOGIN_PATH } from "@/constant/base";
import { getCategory } from "@/data/category";
import { getSiteUserSession } from "@/data/site-user";
import { redirect } from "next/navigation";

export default async function App() {
  const [{ user }, { data: categories }] = await Promise.all([
    getSiteUserSession(),
    getCategory(),
  ]);
  if (!user) {
    return redirect(ADMIN_LOGIN_PATH);
  }
  return (
    <div className="p-4">
      <PortfolioForm user={user} categories={categories || []} />
    </div>
  );
}
