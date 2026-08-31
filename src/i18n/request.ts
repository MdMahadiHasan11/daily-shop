
import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const locales = ["en", "bn", "hi"];
const defaultLocale = "en";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get("NEXT_LOCALE")?.value;

  const locale: string =
    savedLocale && locales.includes(savedLocale)
      ? savedLocale
      : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});