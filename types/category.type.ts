import { Color } from "@/enum/base.enum";
import { z } from "zod";

export type Category = {
  id: string;
  created_at: Date;
  updated_at: Date;
  name: string;
  color: Color;
};

export type CategoryOnPorfolio = {
  portfolio_id: string;
  category_id: string;
  assignedBy: string;
  category: Category;
};

export const CreateCategorySchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    color: z.nativeEnum(Color).optional(),
    admin_id: z.string().optional(),
    site_user_id: z.string().optional(),
  })
  .refine((data) => data.admin_id || data.site_user_id, {
    message: "Either admin_id or site_user_id is required",
    path: ["admin_id"],
  });

export type CreateCategory = z.infer<typeof CreateCategorySchema>;
