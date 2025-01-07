import { Category, CreateCategory } from "@/types/category.type";
import { fetchApi } from "@/utils/fetch-client";

const getPath = () => {
  return `/site-user/category`;
};

export const getCategory = async () => {
  const { data, error } = await fetchApi.get<Category[]>(`${getPath()}`, [
    "category",
  ]);
  if (error) {
    return { data: null, error };
  }
  return { data, error };
};

export const createCategory = async (payload: CreateCategory) => {
  const { data, error } = await fetchApi.post<Category>(
    `${getPath()}`,
    payload,
    ["category"],
  );
  if (error) {
    return { data: null, error };
  }
  return { data, error };
};

export const updateCategory = async (id: string, payload: CreateCategory) => {
  const { data, error } = await fetchApi.put<Category>(
    `${getPath()}/${id}`,
    payload,
    ["category"],
  );
  if (error) {
    return { data: null, error };
  }
  return { data, error };
};

export const deleteCategory = async (id: string) => {
  const data = await fetchApi.delete<Category>(`${getPath()}/${id}`, [
    "category",
  ]);
  return data;
};
