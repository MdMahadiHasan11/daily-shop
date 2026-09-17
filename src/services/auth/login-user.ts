/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import {
  loginInitiateZodSchema,
  verifyOtpZodSchema,
} from "@/zod/auth.validation";
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
  const redirectTo = (formData.get("redirect") as string) || null;

  let redirectUrl: string | null = null;

  try {
    // -------------------------------------------------------------
    // STEP 1: Initiate Login / Register & Resend OTP
    // -------------------------------------------------------------
    if (step === "INITIATE" || step === "RESEND") {
      const validationResult = zodValidator(
        { identifier },
        loginInitiateZodSchema,
      );

      if (validationResult.success === false) {
        return {
          ...validationResult,
          data: { identifier },
          step: step === "RESEND" ? "VERIFY" : "INITIATE",
        };
      }

      const isPhone = /^\+?\d+$/.test(identifier);
      const payload = isPhone ? { phone: identifier } : { email: identifier };

      let res;
      try {
        res = await serverFetch.post("/auth/login-register-initiate", {
          body: JSON.stringify(payload),
          isPublic: true,
        });
      } catch (networkError) {
        // Catches "Failed to fetch" / connection refused errors
        console.error("Network connection error to backend:", networkError);
        return {
          success: false,
          message:
            "Unable to connect to the server. Please check if the backend is running.",
          step: step === "RESEND" ? "VERIFY" : "INITIATE",
          data: { identifier },
        };
      }

      const result = await res.json();

      if (!res.ok || !result.success) {
        const phoneError = Array.isArray(result.details)
          ? result.details.find((err: any) => err.field === "body.phone")
          : null;

        const emailError = Array.isArray(result.details)
          ? result.details.find((err: any) => err.field === "body.email")
          : null;

        return {
          success: false,
          message:
            phoneError?.message ||
            emailError?.message ||
            result.error ||
            result.message ||
            "Failed to send OTP. Please try again.",
          step: step === "RESEND" ? "VERIFY" : "INITIATE",
          data: { identifier },
        };
      }

      return {
        success: true,
        message: result.data?.message || "OTP sent successfully",
        step: "VERIFY",
        data: { identifier },
      };
    }

    // -------------------------------------------------------------
    // STEP 2: Verify OTP & Login
    // -------------------------------------------------------------
    if (step === "VERIFY") {
      const validationResult = zodValidator({ otp }, verifyOtpZodSchema);

      if (validationResult.success === false) {
        return {
          ...validationResult,
          step: "VERIFY",
          data: { identifier, otp },
        };
      }

      if (!identifier) {
        return {
          success: false,
          message:
            "Missing identifier. Please provide your email or phone number.",
          step: "INITIATE",
          data: { identifier, otp },
        };
      }

      const isPhone = /^\+?\d+$/.test(identifier);
      const payload = isPhone
        ? { phone: identifier, otp }
        : { email: identifier, otp };

      let res;
      try {
        res = await serverFetch.post("/auth/login-register", {
          body: JSON.stringify(payload),
        });
      } catch (networkError) {
        console.error("Network connection error to backend:", networkError);
        return {
          success: false,
          message:
            "Unable to connect to the server. Please verify your connection.",
          step: "VERIFY",
          data: { identifier, otp },
        };
      }

      const result = await res.json();

      if (!res.ok || !result.success) {
        return {
          success: false,
          message:
            result.message || "Invalid or expired OTP. Please try again.",
          step: "VERIFY",
          data: { identifier, otp },
        };
      }

      const setCookieHeaders = res.headers.getSetCookie();

      if (!setCookieHeaders || setCookieHeaders.length === 0) {
        throw new Error(
          "Server configuration error: Authentication cookies missing from response.",
        );
      }

      const parsedCookies = parseSetCookie(setCookieHeaders, { map: true });
      const accessTokenCookie = parsedCookies["accessToken"];
      const refreshTokenCookie = parsedCookies["refreshToken"];

      if (!accessTokenCookie || !refreshTokenCookie) {
        throw new Error(
          "Authentication tokens were not found in response cookies.",
        );
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

      // Check if user is a new user from response data
      if (result.data?.isNewUser) {
        return {
          success: true,
          message: "OTP verified successfully. Please complete your profile.",
          step: "COMPLETE_PROFILE",
          data: { identifier, user: result.data.user },
        };
      }

      // Determine redirect path safely outside catch block
      redirectUrl = redirectTo
        ? `${redirectTo.toString()}?loggedIn=true`
        : "/?loggedIn=true";
    }
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Auth Error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Authentication failed. Please check your network and try again.",
      step: formData.get("step") || "INITIATE",
      data: { identifier },
    };
  }

  // Execute redirection outside of try/catch block
  if (redirectUrl) {
    redirect(redirectUrl);
  }
};
