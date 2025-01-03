import { z } from "zod";
import { BaseFilterSchema } from "./base.type";
export type SiteUser = {
  id: string;
  created_at: Date;
  updated_at: Date;
  email: string;
  password: string;
  username: string;
  profile_url: string | null;
  totp_key: Uint8Array | null;
  last_login: Date | null;
};

export const CreateSiteUserSchema = z.object({
  username: z.string().trim().min(1).max(20, {
    message: "Username must not exceeed 20 characters",
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const SiteUserLoginSchema = z.object({
  username: z.string().trim().min(1).max(20, {
    message: "Username must not exceeed 20 characters",
  }),
  otp: z.number().lt(999999, { message: "Must be 6 characters long" }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const SiteUserFilterSchema = BaseFilterSchema.extend({
  username: z.string().optional(),
  email: z.string().optional(),
});

export type CreateSiteUser = z.infer<typeof CreateSiteUserSchema>;
export type SiteUserFilter = z.infer<typeof SiteUserFilterSchema>;
export type SiteUserLogin = z.infer<typeof SiteUserLoginSchema>;
