import Navbar from "@/components/shared/navbar";
import { getTranslations } from "next-intl/server";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Dynamic i18n Metadata (Supports English, Bengali & Hindi)
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    generator: "v0.app",
    keywords: t("keywords"),
    authors: [{ name: "Daily Shop" }],
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale: locale,
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
}

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
