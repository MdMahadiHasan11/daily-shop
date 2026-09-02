import SectionHeader from "@/components/shared/section-header";
import { fetchRecommendedProducts } from "@/lib/fake-api";
import { getTranslations } from "next-intl/server";
import RecommendedCardCarousel from "./recommended-card-carousel";

interface BodySprayProps {
  className?: string;
}

export default async function BodySpray({ className }: BodySprayProps) {
  const [recommendedData] = await Promise.all([fetchRecommendedProducts()]);

  const t = await getTranslations("BodySpray");
  return (
    <div className={className}>
      <SectionHeader title={t("title")} />
      <RecommendedCardCarousel cards={recommendedData} className={"px-4"} />
    </div>
  );
}
