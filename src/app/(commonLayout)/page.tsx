import CategoryCards from "@/components/modules/home/category-special-offer";
import FeatureSection from "@/components/modules/home/feature-section";
import HeroAd from "@/components/modules/home/hero-ad";
import Recommended from "@/components/modules/home/recommended";
import RefreshHimalaya from "@/components/modules/home/refresh-himalaya";
import WeekdayDealsMain from "@/components/modules/home/weekday-deals-main";
import Head from "next/head";

export default function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
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
        <div className="container mx-auto px-6   ">
          <div className=" ">
            <HeroAd className="w-full max-w-305 ml-auto " />
          </div>
          <div className=" ">
            <CategoryCards className="w-full max-w-308 ml-auto px-3 md:pl-6    " />
          </div>
          <div>
            <FeatureSection className="mt-10" />
          </div>

          <div>
            <Recommended className="mt-10" />
          </div>

          <div>
            <WeekdayDealsMain
              searchParams={searchParams}
              className="mt-10  mb-12 "
            />
          </div>

          <div>
            <RefreshHimalaya className="" />
          </div>
        </div>
      </main>
    </>
  );
}
