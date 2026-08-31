"use server";

import { cookies } from "next/headers";

export async function setLocaleAction(newLocale: string) {
  const cookieStore = await cookies();
  cookieStore.set("NEXT_LOCALE", newLocale, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });
}
