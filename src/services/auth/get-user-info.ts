/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export type UserRole = "CUSTOMER" | "ADMIN" | "VENDOR" | "MODERATOR";

import { tags } from "@/constants";
import { serverFetch } from "@/lib/server-fetch";
import { IUserInfo, TResponse } from "@/types";

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
      message: "Failed to fetch user information",
      data: {} as IUserInfo,
      meta: {},
    };
  }
};
