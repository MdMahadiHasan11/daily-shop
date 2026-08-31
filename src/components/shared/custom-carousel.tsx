"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";

export interface ResponsiveCols {
  mobile?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface ButtonPosition {
  prev?: string;
  next?: string;
}

export interface CustomCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  showNavigation?: boolean;
  showPagination?: boolean;
  buttonPosition?: ButtonPosition;
  cols?: ResponsiveCols;
  autoplay?: boolean;
  autoplayInterval?: number;
  loop?: boolean;
  className?: string;
  stopPropagateNested?: boolean;
  draggable?: boolean;
  disabledNavStyle?: "hide" | "disabled";
  btnSize?: { bg?: number; svg?: number };
}

// Added support for 5 and 6 columns across all breakpoint maps
const mobileWidths: Record<number, string> = {
  1: "flex-[0_0_100%]",
  2: "flex-[0_0_50%]",
  3: "flex-[0_0_33.333333%]",
  4: "flex-[0_0_25%]",
  5: "flex-[0_0_20%]",
  6: "flex-[0_0_16.666667%]",
};

const smWidths: Record<number, string> = {
  1: "sm:flex-[0_0_100%]",
  2: "sm:flex-[0_0_50%]",
  3: "sm:flex-[0_0_33.333333%]",
  4: "sm:flex-[0_0_25%]",
  5: "sm:flex-[0_0_20%]",
  6: "sm:flex-[0_0_16.666667%]",
};

const mdWidths: Record<number, string> = {
  1: "md:flex-[0_0_100%]",
  2: "md:flex-[0_0_50%]",
  3: "md:flex-[0_0_33.333333%]",
  4: "md:flex-[0_0_25%]",
  5: "md:flex-[0_0_20%]",
  6: "md:flex-[0_0_16.666667%]",
};

const lgWidths: Record<number, string> = {
  1: "lg:flex-[0_0_100%]",
  2: "lg:flex-[0_0_50%]",
  3: "lg:flex-[0_0_33.333333%]",
  4: "lg:flex-[0_0_25%]",
  5: "lg:flex-[0_0_20%]",
  6: "lg:flex-[0_0_16.666667%]",
};

const xlWidths: Record<number, string> = {
  1: "xl:flex-[0_0_100%]",
  2: "xl:flex-[0_0_50%]",
  3: "xl:flex-[0_0_33.333333%]",
  4: "xl:flex-[0_0_25%]",
  5: "xl:flex-[0_0_20%]",
  6: "xl:flex-[0_0_16.666667%]",
};

export function CustomCarousel<T>({
  items,
  renderItem,
  showNavigation = true,
  showPagination = true,
  buttonPosition = { prev: "-left-4", next: "-right-4" },
  cols = { mobile: 1, sm: 1, md: 2, lg: 2, xl: 2 },
  autoplay = false,
  autoplayInterval = 3500,
  loop = true,
  className = "",
  stopPropagateNested = false,
  draggable = true,
  disabledNavStyle = "hide",
  btnSize = { bg: 10, svg: 5 },
}: CustomCarouselProps<T>) {
  const [isHovered, setIsHovered] = useState(false);
  const hasMultipleItems = (items?.length ?? 0) > 1;

  const autoplayPlugin = useMemo(() => {
    if (!autoplay || !hasMultipleItems) return [];
    return [
      Autoplay({
        delay: autoplayInterval,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ];
  }, [autoplay, autoplayInterval, hasMultipleItems]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: loop && hasMultipleItems,
      align: "start",
      slidesToScroll: 1,
      containScroll: "trimSnaps",
      skipSnaps: false,
      watchDrag: draggable,
    },
    autoplayPlugin,
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateState = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", updateState);

    if (emblaApi.scrollSnapList().length > 0) {
      updateState();
    } else {
      emblaApi.on("init", updateState);
    }

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", updateState);
      emblaApi.off("init", updateState);
    };
  }, [emblaApi, onSelect, items]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (canScrollPrev) {
      emblaApi?.scrollPrev();
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (canScrollNext) {
      emblaApi?.scrollNext();
    }
  };

  const colMobile = cols.mobile ?? 1;
  const colSm = cols.sm ?? colMobile;
  const colMd = cols.md ?? 2;
  const colLg = cols.lg ?? colMd;
  const colXl = cols.xl ?? colLg;

  const getButtonClass = (canScroll: boolean) => {
    if (!isHovered) return "opacity-0 pointer-events-none";

    if (!canScroll) {
      if (disabledNavStyle === "disabled") {
        return "opacity-40 cursor-not-allowed bg-white/60 text-neutral-400";
      }
      return "opacity-0 pointer-events-none";
    }

    return "opacity-100 hover:bg-primary hover:text-white cursor-pointer";
  };

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onPointerDown={
        stopPropagateNested ? (e) => e.stopPropagation() : undefined
      }
    >
      <div className="overflow-hidden -mx-2 px-1 py-4 -my-4" ref={emblaRef}>
        <div
          className={`flex -ml-4 md:-ml-6 ${
            draggable ? "touch-pan-y" : "touch-none"
          }`}
        >
          {items?.map((item, index) => (
            <div
              key={index}
              className={`min-w-0 pl-4 md:pl-6 shrink-0 ${
                mobileWidths[colMobile] || "flex-[0_0_100%]"
              } ${smWidths[colSm] || ""} ${mdWidths[colMd] || ""} ${
                lgWidths[colLg] || ""
              } ${xlWidths[colXl] || ""}`}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {showNavigation && hasMultipleItems && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
            aria-disabled={!canScrollPrev}
            aria-label="Previous slide"
            className={`absolute ${
              buttonPosition.prev ?? "-left-4"
            } top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-${btnSize.bg} md:h-${btnSize.bg} bg-white/90 backdrop-blur-sm border border-neutral-200/80 shadow-md rounded-full flex items-center justify-center text-neutral-800 transition-all duration-300 ${getButtonClass(
              canScrollPrev,
            )}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className={`w-4 h-4 md:w-${btnSize.svg} md:h-${btnSize.svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={handleNext}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
            aria-disabled={!canScrollNext}
            aria-label="Next slide"
            className={`absolute ${
              buttonPosition.next ?? "-right-4"
            } top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-${btnSize.bg} md:h-${btnSize.bg} bg-white/90 backdrop-blur-sm border border-neutral-200/80 shadow-md rounded-full flex items-center justify-center text-neutral-800 transition-all duration-300 ${getButtonClass(
              canScrollNext,
            )}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className={`w-4 h-4 md:w-${btnSize.svg} md:h-${btnSize.svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </>
      )}

      {showPagination && hasMultipleItems && (
        <div className="flex justify-center items-center gap-2 mt-4">
          {scrollSnaps.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                emblaApi?.scrollTo(idx);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                selectedIndex === idx
                  ? "w-6 bg-primary"
                  : "w-2 bg-neutral-300 hover:bg-neutral-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
