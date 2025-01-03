import { SiteUserSession } from "@/types/auth.type";
import { CreateSiteUser } from "@/types/site-user.type";
import { fetchApi } from "@/utils/fetch-client";
import { cache } from "react";

const getPath = () => {
  return `/site-user`;
};

export const siteUserLogin = async (payload: CreateSiteUser) => {
  const { data, error } = await fetchApi.post<SiteUserSession>(
    `${getPath()}/login`,
    payload,
    ["site-user"],
  );
  if (error) {
    return { data: null, error };
  }
  return { data, error };
};

export const getSiteUserSession = cache(async () => {
  const { data, error } = await fetchApi.get<SiteUserSession>(
    `${getPath()}/me`,
    ["site-user-session"],
  );
  const { user, session } = data || {};

  return { user, session, error };
});
