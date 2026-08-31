/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { routing } from "./routing";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get("NEXT_LOCALE")?.value;

  const locale: string =
    savedLocale && routing.locales.includes(savedLocale as any)
      ? savedLocale
      : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
