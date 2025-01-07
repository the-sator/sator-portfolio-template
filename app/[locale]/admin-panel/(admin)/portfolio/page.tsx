import { LinkButton } from "@/components/ui/button/link-button";
import React from "react";
import { IoAddOutline } from "react-icons/io5";
import PortfolioInfiniteScroll from "@/components/portfolio/portfolio-infinite-scroll";
import FilterInput from "@/components/ui/filter/filter-input";
import { ComboboxOption } from "@/components/ui/combobox";
import { CategoryFilterCombobox } from "@/components/ui/filter/category-filter-combobox";
import { paginatePortfolio } from "@/data/portfolio";
import { getCategory } from "@/data/category";
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

type ComboboxOptionWithColor = ComboboxOption & {
  color?: string;
};
export default async function PortfolioPage({ searchParams }: Props) {
  const filter = await searchParams;
  const [{ data: portfolios, page }, { data: categories }] = await Promise.all([
    paginatePortfolio(filter),
    getCategory(),
  ]);
  const options: ComboboxOptionWithColor[] = categories
    ? categories.map((category) => {
        return {
          label: category.name,
          value: category.id,
          color: category.color.toLowerCase(),
        };
      })
    : [];
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <LinkButton
          href={`/admin-panel/portfolio/create`}
          variant="outline"
          className="gap-2"
        >
          <IoAddOutline size={14} className="group-hover:text-blue-700" />
          <p className="text-sm group-hover:text-blue-700">Create</p>
        </LinkButton>
      </div>
      <div className="my-2 flex h-10 gap-2">
        <FilterInput placeholder="Title" filterKey="title" className="h-full" />
        {/* <FilterCombobox filterKey="category" options={options} /> */}
        <CategoryFilterCombobox
          filterKey={"categories"}
          defaultValue={(filter.categories as string[]) || []}
          options={options || []}
          placeholder="Category"
          maxCount={1}
          className="w-full"
        />
      </div>
      <PortfolioInfiniteScroll
        portfolios={portfolios!}
        page={page}
        filter={filter}
      />
    </div>
  );
}
