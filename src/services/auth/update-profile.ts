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
  const redirectTo = formData.get("redirect") || null;

  try {
    const skipProfile = formData.get("skip") === "true";
    const profile = formData.get("profile") === "profile";

    if (!skipProfile) {
      const firstName = (formData.get("firstName") as string) || "";
      const lastName = (formData.get("lastName") as string) || "";
      const gender = (formData.get("gender") as string) || "NOT_SPECIFIED";
      const dateOfBirth = (formData.get("dateOfBirth") as string) || "";
      const bio = (formData.get("bio") as string) || "";
      const image = (formData.get("image") as string) || "";
      const email = (formData.get("email") as string) || "";

      // Parse addresses from hidden JSON string input
      const rawAddresses = formData.get("addresses") as string;
      let parsedAddresses = undefined;
      try {
        parsedAddresses = rawAddresses ? JSON.parse(rawAddresses) : undefined;
      } catch (e) {
        parsedAddresses = undefined;
      }

      // Build payload matching your precise backend structure
      const profileData = {
        image: image.trim() !== "" ? image.trim() : undefined,
        email: email.trim() !== "" ? email.trim() : undefined,
        profile: {
          firstName: firstName.trim() !== "" ? firstName.trim() : undefined,
          lastName: lastName.trim() !== "" ? lastName.trim() : "",
          gender: gender,
          dateOfBirth:
            dateOfBirth.trim() !== ""
              ? new Date(dateOfBirth).toISOString()
              : undefined,
          bio: bio.trim() !== "" ? bio.trim() : "",
        },
        addresses: parsedAddresses,
      };

      const validationResult = zodValidator(
        profileData,
        updateProfileZodSchema,
      );

      if (validationResult.success === false) {
        return {
          ...validationResult,
          step: "COMPLETE_PROFILE",
          data: profileData,
        };
      }

      const patchRes = await serverFetch.patch(`/user/profile`, {
        body: JSON.stringify(profileData),
        isPublic: false,
      });

      const patchResult = await patchRes.json();

      if (!patchRes.ok || !patchResult.success) {
        return {
          success: false,
          message:
            patchResult.message ||
            patchResult.error ||
            "Failed to update profile",
          details: patchResult.details || patchResult.errors || [],
          step: "COMPLETE_PROFILE",
          data: profileData,
        };
      }

      if (patchRes) {
        revalidateTag(tags.userInfoTag, { expire: 0 });
      }

      if (profile) {
        return {
          success: true,
          message: patchResult?.message || "Profile updated successfully",
          data: patchResult.data || profileData,
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
      data: null,
    };
  }
};
