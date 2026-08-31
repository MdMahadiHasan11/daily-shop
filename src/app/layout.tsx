import LoginSuccessToast from "@/components/shared/login-success-toast";
import LogoutSuccessToast from "@/components/shared/logout-success-toast";
import { gilroy, greatVibes, hindSiliguri, playfair } from "@/lib/fonts";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Suspense } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Daily Shop | Shop",
  description: "Find here cheap product",
  keywords: "good product",
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
      lang={locale}
      className={`${hindSiliguri.variable} ${gilroy.variable} ${greatVibes.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <Toaster richColors position="top-center" />
          {children}
          <Suspense fallback={null}>
            <LoginSuccessToast />
            <LogoutSuccessToast />
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}