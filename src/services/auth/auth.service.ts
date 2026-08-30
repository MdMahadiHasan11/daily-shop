/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { verifyAccessToken } from "@/lib/jwtHanlders";
import { serverFetch } from "@/lib/server-fetch";
import parseSetCookie from "set-cookie-parser";
import { deleteCookie, getCookie, setCookie } from "./token-handlers";

export async function getNewAccessToken() {
  try {
    const accessToken = await getCookie("accessToken");
    const refreshToken = await getCookie("refreshToken");

    // Case 1: Both tokens are missing - user is logged out
    if (!accessToken && !refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    // Case 2: Access Token exists - verify validity
    if (accessToken) {
      const verifiedToken = await verifyAccessToken(accessToken);

      if (verifiedToken.success) {
        return {
          tokenRefreshed: false,
        };
      }
    }

    // Case 3: Refresh Token is missing - user is logged out
    if (!refreshToken) {
      return {
        tokenRefreshed: false,
      };
    }

    // API Call - serverFetch skips getNewAccessToken for /auth/refresh-token
    const response = await serverFetch.post("/auth/refresh-token", {
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Token refresh failed");
    }

    // Fetch API getSetCookie() already returns a string[]
    const setCookieHeaders = response.headers.getSetCookie();

    if (!setCookieHeaders || setCookieHeaders.length === 0) {
      throw new Error("No Set-Cookie header found in backend response");
    }

    // Pass string[] directly without deprecated splitCookiesString
    const parsedCookies = parseSetCookie(setCookieHeaders, { map: true });

    const accessTokenCookie = parsedCookies["accessToken"];
    const refreshTokenCookie = parsedCookies["refreshToken"];

    if (!accessTokenCookie || !refreshTokenCookie) {
      throw new Error("Tokens not found in response cookies");
    }

    // Set new Access Token
    await deleteCookie("accessToken");
    await setCookie("accessToken", accessTokenCookie.value, {
      secure: true,
      httpOnly: true,
      maxAge: accessTokenCookie.maxAge ?? 60 * 60,
      path: accessTokenCookie.path || "/",
      sameSite: (accessTokenCookie.sameSite?.toLowerCase() as any) || "none",
    });

    // Set new Refresh Token
    await deleteCookie("refreshToken");
    await setCookie("refreshToken", refreshTokenCookie.value, {
      secure: true,
      httpOnly: true,
      maxAge: refreshTokenCookie.maxAge ?? 60 * 60 * 24 * 90,
      path: refreshTokenCookie.path || "/",
      sameSite: (refreshTokenCookie.sameSite?.toLowerCase() as any) || "none",
    });

    console.log("Access and Refresh tokens refreshed successfully!");

    return {
      tokenRefreshed: true,
      success: true,
      message: "Token refreshed successfully",
    };
  } catch (error: any) {
    return {
      tokenRefreshed: false,
      success: false,
      message: error?.message || "Something went wrong",
    };
  }
}
