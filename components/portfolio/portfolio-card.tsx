import { Portfolio } from "@/types/portfolio.type";
import Link from "next/link";
import React from "react";
import Tag from "../ui/tag";
// import placeholder from "@/public/image/placeholder-portfolio.png";
import ImageContainerBlurClient from "../ui/image/image-container-blur-client";
import PortfolioOptionDropdown from "../ui/dropdown/portfolio-option-dropdown";
type Props = {
  portfolio: Portfolio;
};
export default function PortfolioCard({ portfolio }: Props) {
  return (
    <Link
      href={"/admin-panel/portfolio/" + portfolio.slug}
      key={portfolio.id}
      className="max-h-[350px] min-h-[100px] rounded-md border p-3 transition-all duration-300 hover:cursor-pointer hover:border-label/50"
    >
      <ImageContainerBlurClient
        src={portfolio.cover_url || "/image/placeholder-portfolio.png"}
        className="h-[200px] overflow-hidden rounded-sm"
      />
      <div className="my-2 min-h-[70px]">
        <h2 className="line-clamp-1 text-lg font-bold">{portfolio.title}</h2>
        <p className="mt-1 line-clamp-2 text-xs text-label">
          {portfolio.description}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-2">
          {portfolio.CategoryOnPorfolio.map((category) => (
            <Tag
              key={category.category_id}
              color={category.category.color.toLowerCase()}
            >
              {category.category.name}
            </Tag>
          ))}
        </div>
        <PortfolioOptionDropdown portfolio={portfolio} />
      </div>
    </Link>
  );
}
