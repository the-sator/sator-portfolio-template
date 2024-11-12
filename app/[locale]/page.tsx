import { OverallChart } from "./_feature/overall-chart";
import OverallStatisticCards from "./_feature/overall-statistic-cards";
import { OverallBlogTrendChart } from "./_feature/overall-blog-trend-chart";
import { OverallPortfolioTrendChart } from "./_feature/overall-portfolio-trend-chart";
import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
type Props = {
  params: Promise<{ locale: string }>;
};
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // const t = useTranslations("Dashboard");
  return (
    <div className="p-8">
      {/* <h1 className="text-2xl font-bold">{t("dashboard")}</h1> */}
      <div className="flex flex-col gap-4">
        <OverallStatisticCards />
        <OverallChart />
        <div className="grid grid-cols-3 gap-4">
          <OverallBlogTrendChart />
          <OverallPortfolioTrendChart />
        </div>
      </div>
    </div>
  );
}
