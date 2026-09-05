import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;

  if (!savedLocale) {
    response.cookies.set("NEXT_LOCALE", "en", {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });
  }

  // const accessToken = request.cookies.get("accessToken")?.value;
  // const refreshToken = request.cookies.get("refreshToken")?.value;
  // const isUserLoggedIn = !!(accessToken && refreshToken);

  // const { pathname } = request.nextUrl;

  // if (isUserLoggedIn && pathname.startsWith("/login")) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
