import PortfolioForm from "@/components/ui/form/portfolio-form";
import { Skeleton } from "@/components/ui/skeleton";
import { getAdminSession } from "@/data/admin";
import { getAllCategories } from "@/data/category";
import { getPortfolioBySlug } from "@/data/portfolio";
import { notFound, redirect } from "next/navigation";
import React, { Suspense } from "react";
type Props = {
  params: Promise<{ slug: string }>;
};
export default async function page({ params }: Props) {
  const slug = (await params).slug;
  const [{ auth }, { data: categories }, { data: portfolio }] =
    await Promise.all([
      getAdminSession(),
      getAllCategories(),
      getPortfolioBySlug(slug),
    ]);
  if (!auth) {
    return redirect("/admin-panel/login");
  }

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="p-4">
      <Suspense fallback={<Skeleton className="min-h-svh w-full" />}>
        <PortfolioForm
          admin={auth}
          categories={categories || []}
          portfolio={portfolio}
        />
      </Suspense>
    </div>
  );
}
