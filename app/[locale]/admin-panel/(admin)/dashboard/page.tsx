import { OverallBlogTrendChart } from "@/components/chart/overall-blog-trend-chart";
import { OverallChart } from "@/components/chart/overall-chart";
import { OverallPortfolioTrendChart } from "@/components/chart/overall-portfolio-trend-chart";
import OverallStatisticCards from "@/components/chart/overall-statistic-cards";

export default async function Home() {
  return (
    <div className="p-8">
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
