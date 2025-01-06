import { Block } from "@blocknote/core";
import { z } from "zod";
import { BaseFilterSchema } from "./base.type";
import { CategoryOnPorfolio } from "./category.type";

export type Portfolio = {
  id: string;
  admin_id: string;
  title: string;
  description: string;
  cover_url: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date | null;
  slug: string;
  gallery: string[];
  content: Block[] | null;
  CategoryOnPorfolio: CategoryOnPorfolio[];
};

export const CreatePortfolioSchema = z.object({
  admin_id: z.string().optional(),
  site_user_id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(200, {
      message: "Description should not be longer than 200 characters",
    }),
  slug: z.string().min(1, { message: "Slug is required" }),
  cover_url: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  content: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export const PortfolioFilterSchema = BaseFilterSchema.extend({
  title: z.string().optional(),
  categories: z.union([z.array(z.string()), z.string()]).optional(),
});

export type CreatePortfolio = z.infer<typeof CreatePortfolioSchema>;
export type PortfolioFilter = z.infer<typeof PortfolioFilterSchema>;
