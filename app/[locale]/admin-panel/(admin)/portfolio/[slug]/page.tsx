import React, { Suspense } from "react";
import { DynamicRenderContent } from "@/components/editor/render-content";
import { notFound } from "next/navigation";
import PortfolioOptionDropdown from "@/components/ui/dropdown/portfolio-option-dropdown";
import { cn } from "@/lib/utils";
import ImageContainerBlur from "@/components/ui/image/image-container-blur";
import PortfolioDetailSkeleton from "@/components/ui/skeleton/portfolio-detail-skeleton";
import PortfolioGallery from "@/components/portfolio/portfolio-gallery";
import { getPortfolioBySlug } from "@/data/portfolio";
type Props = {
  params: Promise<{ slug: string }>;
};
export default async function page({ params }: Props) {
  const slug = (await params).slug;
  const { data: portfolio } = await getPortfolioBySlug(slug);
  if (!portfolio) {
    notFound();
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-end gap-4">
        <div
          className={cn(
            "flex h-fit items-center justify-center gap-4 rounded-md border border-border px-4 py-2",
            portfolio.published_at && "border-green-400",
          )}
        >
          <span
            className={cn(
              "size-2 rounded-full bg-border",
              portfolio.published_at && "bg-green-400",
            )}
          ></span>
          <p
            className={cn(
              "text-sm",
              portfolio.published_at && "text-green-400",
            )}
          >
            {portfolio.published_at ? "Published" : "Unpublish"}
          </p>
        </div>
        <PortfolioOptionDropdown portfolio={portfolio} deleteRedirect />
      </div>
      <Suspense fallback={<PortfolioDetailSkeleton />}>
        {portfolio.cover_url && (
          <ImageContainerBlur
            src={portfolio.cover_url}
            // priority={true}
            className="aspect-video h-[200px] w-full overflow-hidden rounded-sm"
          />
        )}

        <h1 className="mb-5 mt-10 text-4xl font-bold">{portfolio.title}</h1>
        <DynamicRenderContent content={portfolio.content || []} />
        {portfolio.gallery.length > 0 && (
          <PortfolioGallery images={portfolio.gallery} />
        )}
      </Suspense>
    </div>
  );
}
