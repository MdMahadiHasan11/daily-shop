/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import { loginValidationZodSchema } from "@/zod/auth.validation";
import { redirect } from "next/navigation";
import parseSetCookie from "set-cookie-parser";
import { setCookie } from "./token-handlers";

export const loginUser = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  const payload = {
    email: (formData.get("email") as string) || "",
    password: (formData.get("password") as string) || "",
  };

  try {
    const redirectTo = formData.get("redirect") || null;

    const validationResult = zodValidator(payload, loginValidationZodSchema);

    if (validationResult.success === false) {
      return {
        ...validationResult,
        data: payload,
      };
    }

    const validatedPayload = validationResult.data;

    // 2. API Request
    const res = await serverFetch.post("/auth/login", {
      body: JSON.stringify(validatedPayload),
      isPublic: true,
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Login failed",
        data: payload,
      };
    }

    const setCookieHeaders = res.headers.getSetCookie();

    if (!setCookieHeaders || setCookieHeaders.length === 0) {
      throw new Error("No Set-Cookie header found in backend response");
    }

    const parsedCookies = parseSetCookie(setCookieHeaders, { map: true });

    const accessTokenCookie = parsedCookies["accessToken"];
    const refreshTokenCookie = parsedCookies["refreshToken"];

    if (!accessTokenCookie || !refreshTokenCookie) {
      throw new Error("Tokens not found in response cookies");
    }

    // Set Access Token
    await setCookie("accessToken", accessTokenCookie.value, {
      secure: true,
      httpOnly: true,
      maxAge: accessTokenCookie.maxAge ?? 60 * 60,
      path: accessTokenCookie.path || "/",
      sameSite: (accessTokenCookie.sameSite?.toLowerCase() as any) || "none",
    });

    // Set Refresh Token
    await setCookie("refreshToken", refreshTokenCookie.value, {
      secure: true,
      httpOnly: true,
      maxAge: refreshTokenCookie.maxAge ?? 60 * 60 * 24 * 90,
      path: refreshTokenCookie.path || "/",
      sameSite: (refreshTokenCookie.sameSite?.toLowerCase() as any) || "none",
    });

    // 4. Handle Password Change / Redirects
    if (result.data?.needPasswordChange) {
      if (redirectTo) {
        redirect(
          `/reset-password?redirect=${encodeURIComponent(redirectTo.toString())}`,
        );
      }
      redirect("/reset-password");
    }

    if (redirectTo) {
      redirect(`${redirectTo.toString()}?loggedIn=true`);
    }

    redirect("/dashboard?loggedIn=true");
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Login Error:", error);

    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Login Failed. You might have entered incorrect email or password.",
      data: payload,
    };
  }
};


