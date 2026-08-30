import LoginSuccessToast from "@/components/shared/login-success-toast";
import LogoutSuccessToast from "@/components/shared/logout-success-toast";
import { gilroy, greatVibes, playfair } from "@/lib/fonts";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "../styles/globals.css";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Daily Shop | Shop",
  description: "Find here cheap product",
  keywords: "good product",
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      className={`${gilroy.variable} ${greatVibes.variable} ${playfair.variable}`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
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
