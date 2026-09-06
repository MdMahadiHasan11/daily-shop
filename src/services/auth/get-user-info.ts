/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export type UserRole = "CUSTOMER" | "ADMIN" | "VENDOR" | "MODERATOR";

import { tags } from "@/constants";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import { IUserInfo, TResponse } from "@/types";
import { updateProfileZodSchema } from "@/zod/auth.validation";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const getUserInfo = async (): Promise<TResponse<IUserInfo>> => {
  try {
    const response = await serverFetch.get("/auth/me", {
      next: { tags: [tags.userInfoTag], revalidate: 180 },
    });

    const result = await response.json();

    if (!response.ok || !result.success || !result.data) {
      return {
        success: false,
        message: result.message || "Invalid session or token",
        data: {} as IUserInfo,
        meta: {},
      };
    }

    return {
      success: true,
      message: result?.message || "",
      data: result?.data || ({} as IUserInfo),
      meta: result.metadata || result.meta || {},
    };
  } catch (error: any) {
    console.error("Get User Info Error:", error.message);
    return {
      success: false,
      message: "Failed to fetch user information", // Fixed typo from tour packages
      data: {} as IUserInfo,
      meta: {},
    };
  }
};

export async function updateProfile(
  _currentState: any,
  formData: FormData,
): Promise<any> {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const genderIdRaw = formData.get("genderId") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const bio = formData.get("bio") as string;

    const profileData: Record<string, any> = {};

    if (firstName) profileData.firstName = firstName;
    if (lastName) profileData.lastName = lastName;
    if (genderIdRaw && genderIdRaw !== "0") {
      profileData.genderId = parseInt(genderIdRaw, 10);
    }
    if (dateOfBirth) {
      profileData.dateOfBirth = new Date(dateOfBirth).toISOString();
    }
    if (bio) profileData.bio = bio;

    const validationResult = zodValidator(profileData, updateProfileZodSchema);

    if (validationResult.success === false) {
      return {
        ...validationResult,
        success: false,
        data: profileData,
      };
    }

    const patchRes = await serverFetch.patch(`/user`, {
      body: JSON.stringify(profileData),
      isPublic: false,
    });

    const patchResult = await patchRes.json();

    if (!patchRes.ok || !patchResult.success) {
      return {
        success: false,
        message: patchResult.message || "Failed to update profile",
        data: profileData,
      };
    }

    if (patchRes) {
      revalidateTag(tags.userInfoTag, { expire: 0 });
    }

    redirect("/my-account?updated=true");
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Profile Update Error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update profile. Please try again.",
    };
  }
}
