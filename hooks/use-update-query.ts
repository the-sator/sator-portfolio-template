import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";

export const useUpdateQuery = <
  T extends Record<string, string | undefined>,
>() => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const initialQuery: Record<string, string | undefined> = {};
    searchParams.forEach((value, key) => {
      initialQuery[key] = value;
    });
  }, [searchParams]);

  const updateQuery = (filters: T) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(filters).forEach(([key, value]) => {
        if (value === undefined || value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.push(newUrl);
    });
  };

  const clearQuery = () => {
    startTransition(() => {
      router.push(pathname);
    });
  };

  return { updateQuery, clearQuery, isPending };
};
