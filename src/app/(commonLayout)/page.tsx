import CategoryCards from "@/components/modules/home/category-special-offer";
import HeroAd from "@/components/modules/home/hero-ad";
import LanguageSwitcher from "@/components/shared/language-switcher";
import { useTranslations } from "next-intl";
import Head from "next/head";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <>
      <Head>
        <title>AI-Powered Healthcare - Find Your Perfect Doctor</title>
        <meta
          name="description"
          content="Discover top-rated doctors tailored to your needs with our AI-powered healthcare platform. Get personalized recommendations and book appointments effortlessly."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        
        <div className="container mx-auto px-3 md:px-6">
          <div className=" ">
            <HeroAd className="w-full max-w-308 ml-auto px-3 md:px-6 mt-1  " />
          </div>
          <div className=" ">
            <CategoryCards className="w-full max-w-308 ml-auto px-3 md:px-6  " />
          </div>
        </div>
        <LanguageSwitcher />
        <h1 className="text-2xl font-bold">{t("title")}</h1>
      </main>
    </>
  );
}
