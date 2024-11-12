import { revalidateTag, unstable_cache } from "next/cache";
import { cache } from "react";

export type ValidTag = ReturnType<typeof getUserTag>;

export const CACHE_TAG = {
  users: "users",
} as const;

export function getUserTag(userId: string, tag: keyof typeof CACHE_TAG) {
  return `user:${userId}-${CACHE_TAG[tag]}` as const;
}
export function clearFullCache() {
  revalidateTag("*");
}

export function dbCache<T extends (...args: unknown[]) => Promise<unknown>>(
  cb: Parameters<typeof unstable_cache<T>>[0],
  { tag }: { tag: ValidTag[] },
) {
  return cache(unstable_cache<T>(cb, undefined, { tags: [...tag, "*"] }));
}
