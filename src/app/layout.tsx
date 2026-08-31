import LoginSuccessToast from "@/components/shared/login-success-toast";
import LogoutSuccessToast from "@/components/shared/logout-success-toast";
import { gilroy, greatVibes, hindSiliguri, playfair } from "@/lib/fonts";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Daily Shop | Shop",
  description: "Find here cheap product",
  keywords: "good product",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${hindSiliguri.variable} ${gilroy.variable} ${greatVibes.variable} ${playfair.variable}`}
    >
      <body
        className="min-h-full flex flex-col font-sans"
        suppressHydrationWarning
      >
        <Toaster richColors position="top-center" />
        {children}
        <Suspense fallback={null}>
          <LoginSuccessToast />
          <LogoutSuccessToast />
        </Suspense>
      </body>
    </html>
  );
}
