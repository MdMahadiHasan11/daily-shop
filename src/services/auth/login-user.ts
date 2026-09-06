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
  const redirectTo = (formData.get("redirect") as string) || "/";

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

      const res = await serverFetch.post("/auth/login-register-initiate", {
        body: JSON.stringify(payload),
        isPublic: true,
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        const phoneError = result.details?.find(
          (err: any) => err.field === "body.phone",
        );
        return {
          success: false,
          message:
            phoneError?.message ||
            result.error ||
            result.message ||
            "Failed to send OTP",
          step: step === "RESEND" ? "VERIFY" : "INITIATE",
          data: { identifier },
        };
      }

      return {
        success: true,
        message: result.data?.message || "OTP resent successfully",
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
          message: "Missing identifier. Please provide one and try again.",
          step: "VERIFY",
          data: { identifier, otp },
        };
      }

      const isPhone = /^\+?\d+$/.test(identifier);
      const payload = isPhone
        ? { phone: identifier, otp }
        : { email: identifier, otp };

      const res = await serverFetch.post("/auth/login-register-verify", {
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        return {
          success: false,
          message: result.message || "Invalid or expired OTP",
          step: "VERIFY",
          data: { identifier, otp },
        };
      }

      const setCookieHeaders = res.headers.getSetCookie();

      if (!setCookieHeaders || setCookieHeaders.length === 0) {
        throw new Error(
          "Server is busy right now. Please try again after some time.",
        );
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

      // Check if user is a new user from response data
      if (result.data?.isNewUser) {
        return {
          success: true,
          message: "OTP verified successfully. Please complete your profile.",
          step: "COMPLETE_PROFILE",
          data: { identifier, user: result.data.user },
        };
      }

      redirect(`${redirectTo.toString()}?loggedIn=true`);
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
          : "Login Failed. You might have entered incorrect phone or email.",
      step: formData.get("step") || "INITIATE",
      data: { identifier },
    };
  }
};
