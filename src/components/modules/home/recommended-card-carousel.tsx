"use client";

import { CustomCarousel } from "@/components/shared/custom-carousel";
import HomeProductCard from "@/components/shared/home-product-card";
import { ApiProduct } from "@/types";

type RecommendedCardCarouselProps = {
  cards: ApiProduct[];
  className?: string;
};

export default function RecommendedCardCarousel({
  cards,
  className,
}: RecommendedCardCarouselProps) {
  return (
    <div className={className}>
      <CustomCarousel
        loop={false}
        items={cards}
        showNavigation={cards?.length > 6 ? true : false}
        showPagination={false}
        disabledNavStyle="disabled"
        cols={{ mobile: 1, md: 6, lg: 6, xl: 6 }}
        renderItem={(card) => <HomeProductCard key={card.id} product={card} />}
      />
    </div>
  );
}
