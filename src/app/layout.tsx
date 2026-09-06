import SearchParamsToast from "@/components/shared/search-params-toast";
import { authToastConfigs } from "@/constants";
import { gilroy, greatVibes, hindSiliguri, playfair } from "@/lib/fonts";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Suspense } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  title: {
    default: "Daily Shop",
    template: "%s",
  },
  description: "Find here cheap product",
  keywords: "good product",
  other: {
    google: "notranslate",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale || "en"}
      translate="no"
      className={`notranslate ${hindSiliguri.variable} ${gilroy.variable} ${greatVibes.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="google" content="notranslate" />
        <meta name="googlebot" content="notranslate" />
        <title>Daily Shop</title>
      </head>
      <body
        className="notranslate min-h-full flex flex-col font-sans"
        translate="no"
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <Toaster richColors position="top-center" />
          {children}
          <Suspense fallback={null}>
            <SearchParamsToast configs={authToastConfigs} />
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
