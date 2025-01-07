"use server";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/data/category";
import { CreateCategorySchema } from "@/types/category.type";
import { revalidateTag } from "next/cache";

export async function createCategoryAction(formData: unknown) {
  const result = CreateCategorySchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }

  const { data, error } = await createCategory({
    name: result.data.name,
    site_user_id: result.data.site_user_id,
  });

  if (error) {
    return { error: error };
  }
  revalidateTag("category");
  return { data, error };
}

export async function updateCategoryAction(id: string, formData: unknown) {
  const result = CreateCategorySchema.safeParse(formData);
  if (!result.success) {
    return {
      error: result.error.format(),
    };
  }

  const { data, error } = await updateCategory(id, {
    name: result.data.name,
    color: result.data.color,
  });

  if (error) {
    return { error: error };
  }
  revalidateTag("category");
  return { data, error };
}

export async function deleteCategoryAction(id: string) {
  const { error } = await deleteCategory(id);
  revalidateTag("category");
  return { error };
}
