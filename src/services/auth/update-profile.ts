/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { tags } from "@/constants";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zod-validator";
import { updateProfileZodSchema } from "@/zod/auth.validation";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const handleUpdateProfile = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  const identifier = formData.get("identifier") as string;
  const redirectTo = formData.get("redirect") || null;

  try {
    const skipProfile = formData.get("skip") === "true";

    if (!skipProfile) {
      const id = formData.get("id") as string;
      const firstName = formData.get("firstName") as string;
      const lastName = formData.get("lastName") as string;
      const genderId = formData.get("genderId") as string;
      const dateOfBirth = formData.get("dateOfBirth") as string;
      const bio = formData.get("bio") as string;

      const profileData = {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        genderId: genderId ? parseInt(genderId, 10) : undefined,
        dateOfBirth: dateOfBirth
          ? new Date(dateOfBirth).toISOString()
          : undefined,
        bio: bio || undefined,
      };

      const validationResult = zodValidator(
        profileData,
        updateProfileZodSchema,
      );

      if (validationResult.success === false) {
        return {
          ...validationResult,
          step: "COMPLETE_PROFILE",
          data: { id, identifier, ...profileData },
        };
      }

      const patchRes = await serverFetch.patch(`/user/${id}`, {
        body: JSON.stringify(profileData),
        isPublic: false,
      });

      if (patchRes) {
        revalidateTag(tags.userInfoTag, { expire: 0 });
      }

      const patchResult = await patchRes.json();

      if (!patchRes.ok || !patchResult.success) {
        return {
          success: false,
          message: patchResult.message || "Failed to update profile",
          step: "COMPLETE_PROFILE",
          data: { id, identifier, ...profileData },
        };
      }
    }

    if (redirectTo) {
      redirect(`${redirectTo.toString()}?loggedIn=true`);
    }
    redirect("/?loggedIn=true");
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
      step: "COMPLETE_PROFILE",
      data: { identifier },
    };
  }
};
