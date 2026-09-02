import SectionHeader from "@/components/shared/section-header";
import { fetchRecommendedProducts } from "@/lib/fake-api";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import RecommendedCardCarousel from "./recommended-card-carousel";

interface HotTrendingProps {
  className?: string;
}

export default async function HotTrending({ className }: HotTrendingProps) {
  const [recommendedData] = await Promise.all([fetchRecommendedProducts()]);

  const t = await getTranslations("HotTrending");
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="">
        <SectionHeader
          title={
            <div className="flex gap-4 justify-center items-center">
              <h1>{t("title")}</h1>
              <div className="relative  flex justify-center items-center">
                <Image
                  src="/home/trending/fire.svg"
                  alt="Weekday Deals Banner"
                  width={40}
                  height={40}
                  priority
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>
          }
        />
        <RecommendedCardCarousel cards={recommendedData} className="px-4" />
      </div>
    </div>
  );
}
