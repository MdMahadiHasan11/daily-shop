"use client";

import { CustomCarousel } from "@/components/shared/custom-carousel";
import { BrandsArray } from "@/data/brand";
import BrandCard from "./brand-cards";

type CompanyBrandCarouselProps = {
  brands: BrandsArray;
  className?: string;
};

export default function CompanyBrandCarousel({
  brands,
  className,
}: CompanyBrandCarouselProps) {
  return (
    <div className={className}>
      <CustomCarousel
        loop={false}
        items={brands}
        showNavigation={brands?.length > 6 ? true : false}
        showPagination={false}
        disabledNavStyle="disabled"
        cols={{ mobile: 1, md: 6, lg: 6, xl: 6 }}
        renderItem={(card) => <BrandCard key={card.id} brand={card} />}
      />
    </div>
  );
}
