import { fetchRecommendedProducts } from "@/lib/fake-api";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import RecommendedCardCarousel from "./recommended-card-carousel";

interface FreshVegetablesProps {
  className?: string;
}

export default async function FreshVegetables({
  className,
}: FreshVegetablesProps) {
  const [recommendedData] = await Promise.all([fetchRecommendedProducts()]);

  const t = await getTranslations("Refresh");
  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div className="relative w-full   flex justify-center items-center">
        <Image
          src="/home/fresh-vegetable.webp"
          alt="Fresh Vegetables"
          width={1920}
          height={1080}
          priority
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="mt-10">
        <RecommendedCardCarousel cards={recommendedData} className="px-4" />
      </div>
    </div>
  );
}
