import SectionHeader from "@/components/shared/section-header";
import { fetchRecommendedProducts } from "@/lib/fake-api";
import { getTranslations } from "next-intl/server";
import RecommendedCardCarousel from "./recommended-card-carousel";

interface RecommendedProps {
  className?: string;
}

export default async function Recommended({ className }: RecommendedProps) {
  const [recommendedData] = await Promise.all([fetchRecommendedProducts()]);

  const t = await getTranslations("ProductCard");
  return (
    <div className={className}>
      <SectionHeader title={t("title")} />
      <RecommendedCardCarousel cards={recommendedData} className={"px-4"} />
    </div>
  );
}
