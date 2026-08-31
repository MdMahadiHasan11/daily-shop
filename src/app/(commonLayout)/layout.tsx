import Navbar from "@/components/shared/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Shop",
  description:
    "Comprehensive healthcare solutions including consultations, health plans, medicine, diagnostics, and more",
  generator: "v0.app",
  keywords: [
    "healthcare",
    "consultation",
    "health plans",
    "diagnostics",
    "medicine",
    "wellness",
  ],
  authors: [{ name: "Daily Shop" }],
  openGraph: {
    title: "Daily Shop",
    description: "Your trusted healthcare companion",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
