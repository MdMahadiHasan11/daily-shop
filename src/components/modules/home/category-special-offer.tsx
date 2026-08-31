import { categoryFeaturesOffers } from "@/data/category-offer-features";
import CategorySpecialOfferCarousel from "./category-special-offer-carousel";

export default async function CategoryCards({
  className,
}: {
  description?: string;
  subTitle?: string;
  title?: string;
  className?: string;
}) {
  const offers = categoryFeaturesOffers;

  if (!offers || offers.length === 0) return null;

  return <CategorySpecialOfferCarousel offers={offers} className={className} />;
}
