"use server";

import { serverFetch } from "@/lib/server-fetch";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutAction = async () => {
  try {
    await serverFetch.post("/auth/logout", {
      isPublic: false,
    });
  } catch (error) {
    console.error("Backend logout error:", error);
  }

  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  } catch (cookieError) {
    console.error("Cookie delete error:", cookieError);
  }

  redirect("/login?loggedOut=true");
};
