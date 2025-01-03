import { DataTable } from "@/components/ui/data-table";
import ClearFilterButton from "@/components/ui/filter/clear-filter-button";
import FilterInput from "@/components/ui/filter/filter-input";
import {
  CreateQuestionModal,
  EditQuestionModal,
} from "@/components/ui/modal/question-modal";
import { PortfolioFormColumns } from "@/components/ui/table/columns/portfolio-form.column";
import { getPagination } from "@/data/portfolio-form";
import { PortfolioFormFilter } from "@/types/portfolio-form.type";
import { getTranslations } from "next-intl/server";
import React from "react";
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export default async function page({ searchParams }: Props) {
  const t = await getTranslations("PortfolioForm");
  const filter = await searchParams;
  const { data: questions, metadata } = await getPagination(
    filter as PortfolioFormFilter,
  );
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl">{t("portfolio-form")}</h1>
        <CreateQuestionModal />
        <EditQuestionModal questions={questions} />
      </div>
      <div className="flex items-center gap-2">
        <FilterInput placeholder="ID" filterKey="id" />
        <FilterInput placeholder="Order" filterKey="order" />
        <ClearFilterButton />
      </div>
      <DataTable
        remote
        columns={PortfolioFormColumns}
        data={questions || []}
        metadata={metadata}
      />
    </div>
  );
}
