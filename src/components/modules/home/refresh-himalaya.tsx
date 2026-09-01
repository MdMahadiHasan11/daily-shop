import SectionHeader from "@/components/shared/section-header";
import { fetchRecommendedProducts } from "@/lib/fake-api";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import RecommendedCardCarousel from "./recommended-card-carousel";

interface RefreshHimalayaProps {
  className?: string;
}

export default async function RefreshHimalaya({
  className,
}: RefreshHimalayaProps) {
  const [recommendedData] = await Promise.all([fetchRecommendedProducts()]);

  const t = await getTranslations("Refresh");
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="relative w-full aspect-21/9 md:aspect-4/1">
        <Image
          src="/home/refresh-company/himalya.webp"
          alt="Weekday Deals Banner"
          fill
          priority
          sizes="100vw"
          className="object-contain w-full h-full"
        />
      </div>
      <div className=" ">
        <SectionHeader title={t("title")} />
        <RecommendedCardCarousel cards={recommendedData} className="px-4" />
      </div>
    </div>
  );
}
