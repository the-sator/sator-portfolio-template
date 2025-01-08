import { PaginateResult } from "@/types/base.type";
import {
  CreatePortfolio,
  Portfolio,
  PortfolioFilter,
} from "@/types/portfolio.type";
import { fetchApi } from "@/utils/fetch-client";
import { toQueryString } from "@/utils/string";
const getPath = () => {
  return `/site-user/portfolio`;
};
export const paginatePortfolio = async (filter?: PortfolioFilter) => {
  const fullUrl = `${getPath()}${toQueryString({ ...filter })}`;
  const { data, error } = await fetchApi.get<PaginateResult<Portfolio[]>>(
    fullUrl,
    ["portfolio"],
  );
  if (!data) {
    return { data: null, page: null, error };
  }
  return { data: data?.data, page: data?.metadata.page, error };
};

export const getPortfolioBySlug = async (slug: string) => {
  const { data, error } = await fetchApi.get<Portfolio>(
    `${getPath()}/${slug}`,
    ["portfolio"],
  );
  if (!data) {
    return { data: null, page: null, error };
  }
  return { data, error };
};

export const createPortfolio = async (payload: CreatePortfolio) => {
  const { data, error } = await fetchApi.post<Portfolio>(
    `${getPath()}`,
    payload,
    ["portfolio"],
  );
  if (!data) {
    return { data: null, page: null, error };
  }
  return { data, error };
};

export const updatePortfolio = async (id: string, payload: CreatePortfolio) => {
  const { data, error } = await fetchApi.put<Portfolio>(
    `${getPath()}/${id}`,
    payload,
    ["portfolio"],
  );
  if (!data) {
    return { data: null, page: null, error };
  }
  return { data, error };
};

export const deletePortfolio = async (id: string) => {
  const { data, error } = await fetchApi.delete<Portfolio>(
    `${getPath()}/${id}`,
    ["portfolio"],
  );
  if (!data) {
    return { data: null, page: null, error };
  }
  return { data, error };
};

export const publishPortfolio = async (id: string) => {
  const data = await fetchApi.post<Portfolio>(`${getPath()}/${id}/publish`, [
    "portfolio",
  ]);
  return data;
};

export const unpublishPortfolio = async (id: string) => {
  const data = await fetchApi.post<Portfolio>(`${getPath()}/${id}/unpublish`, [
    "portfolio",
  ]);
  return data;
};
