import { HttpError } from "@/types/base.type";
import { cookies } from "next/headers";

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {},
): Promise<{ data: T | null; error: HttpError | null }> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  const cookie = (await cookies()).get("session-site-user")?.value;
  const defaultOptions: RequestInit = {
    credentials: "include", // Important for cookies
    headers: {
      "Content-Type": "application/json",
      Cookie: `session-site-user=${cookie}`,
      ...options.headers,
    },
  };
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${baseUrl}${url}`, mergedOptions);
    console.log("YOU ARE HITTING THIS ENDPOINT 👉:", url);

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      const errorBody = await response.json();
      return {
        data: null,
        error: {
          statusCode: errorBody.statusCode || 500,
          error: errorBody.error,
        },
      };
    }

    if (contentType && contentType.includes("application/json")) {
      const json = await response.json();
      return {
        data: json.data as T,
        error: null,
      };
    }

    return {
      data: (await response.text()) as T,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: {
        statusCode: 500,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
    };
  }
}

// HTTP method helpers
export const fetchApi = {
  get: <T>(url: string, tags?: string[], options?: RequestInit) =>
    apiFetch<T>(url, { method: "GET", next: { tags: tags }, ...options }),
  post: <T>(
    url: string,
    body?: unknown,
    tags?: string[],
    options?: RequestInit,
  ) =>
    apiFetch<T>(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      next: { tags: tags },
      ...options,
    }),
  put: <T>(
    url: string,
    body?: unknown,
    tags?: string[],
    options?: RequestInit,
  ) =>
    apiFetch<T>(url, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      next: { tags: tags },
      ...options,
    }),
  delete: <T>(url: string, tags?: string[], options?: RequestInit) =>
    apiFetch<T>(url, { method: "DELETE", next: { tags: tags }, ...options }),
};
