/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export type UserRole = "CUSTOMER" | "ADMIN" | "VENDOR" | "MODERATOR";

import { tags } from "@/constants";
import { serverFetch } from "@/lib/server-fetch";
import { IUserInfo, TResponse } from "@/types";

interface GetUserInfoOptions {
  include?: "location";
}

export const getUserInfo = async (
  options?: GetUserInfoOptions,
): Promise<TResponse<IUserInfo>> => {
  try {
    // Build query parameters dynamically
    const searchParams = new URLSearchParams();
    if (options?.include) {
      searchParams.append("include", options.include);
    }

    const queryString = searchParams.toString();
    const endpoint = `/user/me${queryString ? `?${queryString}` : ""}`;

    const response = await serverFetch.get(endpoint, {
      next: { tags: [tags.userInfoTag], revalidate: 900 },
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
