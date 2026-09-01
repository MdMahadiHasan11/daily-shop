"use client";

import { CustomCarousel } from "@/components/shared/custom-carousel";
import { CategoryFeaturesOffers } from "@/data/category-offer-features";

import Image from "next/image";
import Link from "next/link";

type SpecialOfferCarouselProps = {
  offers: CategoryFeaturesOffers[];
  className?: string;
};

export default function HeroAdCarousel({
  offers,
  className,
}: SpecialOfferCarouselProps) {
  return (
    <div className={className}>
      <CustomCarousel
        loop={false}
        items={offers}
        buttonPosition={{ prev: "left-1", next: "right-1" }}
        showNavigation={true}
        showPagination={false}
        disabledNavStyle="disabled"
        cols={{ mobile: 1, md: 1, lg: 1, xl: 1 }}
        renderItem={(offer) => (
          <div>
            <Link
              href={`/promotions/${offer.id}`}
              className="block group outline-none"
            >
              <div className="relative   bg-gray-50 shadow-sm transition-all duration-300">
                <div className="relative w-full aspect-4/1 overflow-hidden  ">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="100vw"
                    className="object-cover w-full h-full transition-transform duration-500"
                    priority
                  />
                </div>
              </div>
            </Link>
          </div>
        )}
      />
    </div>
  );
}
