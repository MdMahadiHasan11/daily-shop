import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AUTH_ROUTES, PROTECTED_ROUTES } from "./config/routes";

export const matchRoutePattern = (
  pathname: string,
  routes: string[],
): boolean => {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
};

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // 1. Locale handling
  const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (!savedLocale) {
    response.cookies.set("NEXT_LOCALE", "en", {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
  }

  // 2. Authentication check
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isUserLoggedIn = !!(accessToken && refreshToken);

  const { pathname } = request.nextUrl;

  // 3. Prevent logged-in users from accessing Auth pages (like /login)
  if (isUserLoggedIn && matchRoutePattern(pathname, AUTH_ROUTES)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 4. Protect private routes from unauthenticated users
  if (!isUserLoggedIn && matchRoutePattern(pathname, PROTECTED_ROUTES)) {
    const loginUrl = new URL("/login", request.url);
    // Optional professional touch: Remember where they wanted to go
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
