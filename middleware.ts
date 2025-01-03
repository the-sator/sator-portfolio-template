import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { getSiteUserSession } from "./data/site-user";

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware(routing);

// Define public paths that don't require authentication
const publicPaths = ["/admin-panel/login", "/admin-panel/register"];

// Helper function to check if a path is public
const isPublicPath = (pathname: string) => {
  return publicPaths.some((path) =>
    pathname.replace(/^\/(en|kh)/, "").startsWith(path),
  );
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (isPublicPath(pathname)) {
    return intlMiddleware(req);
  }

  if (pathname.replace(/^\/(en|kh)/, "").startsWith("/admin-panel")) {
    const { error } = await getSiteUserSession();
    console.log("error:", error);

    if (error) {
      const locale = pathname.startsWith("/kh") ? "kh" : "en";
      const url = new URL(`/${locale}/admin-panel/login`, req.url);

      url.searchParams.set("callbackUrl", pathname);

      return NextResponse.redirect(url);
    }

    if (pathname.replace(/^\/(en|kh)/, "") === "/admin-panel") {
      const locale = pathname.startsWith("/kh") ? "kh" : "en";
      return NextResponse.redirect(
        new URL(`/${locale}/admin-panel/dashboard`, req.url),
      );
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // However, match all pathnames within `/users`, optionally with a locale prefix
    "/([\\w-]+)?/users/(.+)",
  ],
};
