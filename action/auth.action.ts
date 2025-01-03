"use server";

import { siteUserLogin } from "@/data/site-user";
import { SiteUserLogin, SiteUserLoginSchema } from "@/types/site-user.type";
import { setSessionCookies } from "@/utils/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function siteUserLoginAction(formData: unknown) {
  const result = SiteUserLoginSchema.safeParse(formData);
  if (result.error) {
    return {
      error: result.error.format(),
    };
  }
  const payload: SiteUserLogin = {
    email: result.data.email,
    password: result.data.password,
    otp: result.data.otp,
    username: result.data.username,
  };
  const { data, error } = await siteUserLogin(payload);
  if (error) {
    return {
      error: error,
    };
  }
  await setSessionCookies(
    "session-site-user",
    data!.session.token,
    String(data!.session.expiredAt),
  );
  revalidatePath("/", "layout");
  revalidateTag("site-user-session");
  redirect("/admin-panel/dashboard");
}
