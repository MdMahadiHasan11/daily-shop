"use client";

import { CustomCarousel } from "@/components/shared/custom-carousel";
import { CategoryFeaturesOffers } from "@/data/category-offer-features";

import Image from "next/image";
import Link from "next/link";

type SpecialOfferCarouselProps = {
  offers: CategoryFeaturesOffers[];
  className?: string;
};

export default function CategorySpecialOfferCarousel({
  offers,
  className,
}: SpecialOfferCarouselProps) {
  return (
    <div className={className}>
      <CustomCarousel
        loop={false}
        items={offers}
        showNavigation={true}
        showPagination={false}
        disabledNavStyle="disabled"
        btnSize={{ bg: 8, svg: 4 }}
        cols={{ mobile: 1, md: 5, lg: 5, xl: 5 }}
        renderItem={(offer) => (
          <div>
            <Link
              href={`/promotions/${offer.id}`}
              className="block group outline-none"
            >
              {/* Card Container with Rounded Corners & Relative Positioning */}
              <div className="relative   rounded-2xl bg-gray-50 shadow-sm transition-all duration-300">
                {/* Square Image Container */}
                <div className="relative w-full aspect-square overflow-hidden rounded-sm">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    priority
                  />
                </div>

                {/* Floating Pill Badge at the Bottom */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[85%] z-10">
                  <h1 className="bg-[#FFD600] text-gray-900 font-bold text-center text-sm md:text-base py-1.5 px-4 rounded-full shadow-md whitespace-nowrap overflow-hidden text-ellipsis">
                    {offer.category || "Soft Drinks"}
                  </h1>
                </div>
              </div>
            </Link>
          </div>
        )}
      />
    </div>
  );
}
