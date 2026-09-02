/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { redirect } from "next/navigation";
import parseSetCookie from "set-cookie-parser";
import { setCookie } from "./token-handlers";

export const handleAuthStep = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  const step = formData.get("step") || "INITIATE";
  const identifier = formData.get("identifier") as string;
  const otp = formData.get("otp") as string;
  const redirectTo = formData.get("redirect") || null;

  try {
    // -------------------------------------------------------------
    // STEP 1: Initiate Login/Register (Send OTP)
    // -------------------------------------------------------------
    if (step === "INITIATE") {
      if (!identifier) {
        return {
          success: false,
          message: "Phone or email is required",
          step: "INITIATE",
        };
      }

      const isEmail = identifier.includes("@");
      const payload = isEmail ? { email: identifier } : { phone: identifier };

      const res = await serverFetch.post("/auth/login-register-initiate", {
        body: JSON.stringify(payload),
        isPublic: true,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        return {
          success: false,
          message: result.error || result.message || "Failed to send OTP",
          step: "INITIATE",
          identifier,
        };
      }

      return {
        success: true,
        message: result.data?.message || "OTP sent successfully",
        step: "VERIFY", // সফল হলে পরবর্তী স্টেপে চলে যাবে
        identifier,
      };
    }

    // -------------------------------------------------------------
    // STEP 2: Verify OTP & Login
    // -------------------------------------------------------------
    if (step === "VERIFY") {
      if (!identifier || !otp) {
        return {
          success: false,
          message: "Identifier and OTP are required",
          step: "VERIFY",
          identifier,
        };
      }

      const isEmail = identifier.includes("@");
      const payload = isEmail
        ? { email: identifier, otp }
        : { phone: identifier, otp };

      const res = await serverFetch.post("/auth/login-register-verify", {
        body: JSON.stringify(payload),
        isPublic: true,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        return {
          success: false,
          message: result.message || "Invalid or expired OTP",
          step: "VERIFY",
          identifier,
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
        maxAge: refreshTokenCookie.maxAge ?? 60 * 60 * 24 * 7,
        path: refreshTokenCookie.path || "/",
        sameSite: (refreshTokenCookie.sameSite?.toLowerCase() as any) || "none",
      });

      // Redirect
      if (redirectTo) {
        redirect(`${redirectTo.toString()}?loggedIn=true`);
      }
      redirect("/dashboard?loggedIn=true");
    }
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Auth Error:", error);
    return {
      success: false,
      message: error.message || "Something went wrong",
      step: formData.get("step") || "INITIATE",
      identifier,
    };
  }
};
