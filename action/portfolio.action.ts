"use server";

import {
  createPortfolio,
  deletePortfolio,
  paginatePortfolio,
  publishPortfolio,
  unpublishPortfolio,
  updatePortfolio,
} from "@/data/portfolio";
import {
  CreatePortfolio,
  CreatePortfolioSchema,
  PortfolioFilter,
} from "@/types/portfolio.type";
import { revalidateTag } from "next/cache";

export const paginatePortfolioAction = async (filter: PortfolioFilter) => {
  const { data, page } = await paginatePortfolio(filter);

  return { data, page };
};

export const createPortfolioAction = async (formData: unknown) => {
  const result = CreatePortfolioSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }
  const payload: CreatePortfolio = {
    admin_id: result.data.admin_id,
    site_user_id: result.data.site_user_id,
    slug: result.data.slug,
    title: result.data.title,
    content: result.data.content,
    description: result.data.description,
    categories: result.data.categories,
    cover_url: result.data.cover_url,
    gallery: result.data.gallery,
  };
  const { data, error } = await createPortfolio(payload);
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("portfolio");
  revalidateTag("portfolio-" + data!.slug);
  return { data, error };
};

export const updatePortfolioAction = async (id: string, formData: unknown) => {
  const result = CreatePortfolioSchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }
  const payload: CreatePortfolio = {
    admin_id: result.data.admin_id,
    slug: result.data.slug,
    title: result.data.title,
    content: result.data.content,
    description: result.data.description,
    categories: result.data.categories,
    cover_url: result.data.cover_url,
    gallery: result.data.gallery,
  };
  const { data, error } = await updatePortfolio(id, payload);
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("portfolio");
  revalidateTag("portfolio-" + data!.slug);
  return { data, error };
};

export const deletePortfolioAction = async (id: string) => {
  const { data, error } = await deletePortfolio(id);
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  return { data, error };
};

export const publishPortfolioAction = async (id: string) => {
  const { data, error } = await publishPortfolio(id);
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("portfolio");
  return { data, error };
};

export const unpublishPortfolioAction = async (id: string) => {
  const { data, error } = await unpublishPortfolio(id);
  if (error) {
    return {
      data: null,
      error: error,
    };
  }
  revalidateTag("portfolio");
  return { data, error };
};
