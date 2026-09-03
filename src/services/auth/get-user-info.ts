/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export type UserRole = "CUSTOMER" | "ADMIN" | "VENDOR" | "MODERATOR";
export interface IUserInfo {
  name: string;
  email: string | null;
  phoneNumber: string | null;
  image: string | null;
  role: UserRole;
  [key: string]: any;
}
import { tags } from "@/constants";
import { serverFetch } from "@/lib/server-fetch";

export const getUserInfo = async (): Promise<IUserInfo> => {
  try {
    const response = await serverFetch.get("/auth/me", {
      next: { tags: [tags.userInfoTag], revalidate: 180 },
    });

    const result = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.message || "Failed to fetch user info");
    }

    return {
      name: result.data.fullname || "Unknown User",
      email: result.data.email || null,
      phoneNumber: result.data.phoneNumber || null,
      image: result.data.image || null,
      role: result.data.role || "CUSTOMER",
      ...result.data,
    };
  } catch (error: any) {
    console.error("Get User Info Error:", error.message);
    return {
      name: "Unknown User",
      email: null,
      phoneNumber: null,
      image: null,
      role: "CUSTOMER",
    };
  }
};
