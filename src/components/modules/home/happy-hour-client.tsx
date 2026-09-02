"use client";

import { CustomCarousel } from "@/components/shared/custom-carousel";
import HomeProductCard from "@/components/shared/home-product-card";
import { ApiProduct } from "@/types";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface CategoryItem {
  id: string;
  label: string;
}

interface HappyHourClientProps {
  initialProducts: ApiProduct[];
  targetDate: string | Date;
  categories: CategoryItem[];
  currentCategory: string;
}

export default function HappyHourClient({
  initialProducts,
  targetDate,
  categories,
  currentCategory,
}: HappyHourClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Countdown Timer Sync
  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days: String(d).padStart(2, "0"),
          hours: String(h).padStart(2, "0"),
          minutes: String(m).padStart(2, "0"),
          seconds: String(s).padStart(2, "0"),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Fast Server-side Category Navigation without Page Reload
  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("happy_hours", categoryId);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };
  const t = useTranslations("HappyHour");
  return (
    <>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-primary pb-5 md:flex-row md:items-center">
        {/* Title & Real-time Countdown Timer */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <h2 className="text-xl font-black uppercase tracking-wide text-foreground md:text-2xl">
            {t("title")}
          </h2>

          <div className="flex items-center gap-1.5 font-bold text-white pl-4">
            <div className="flex flex-col h-11 w-10  items-center justify-center rounded bg-destructive ">
              <span className="">{timeLeft.days}</span>
              <span className="text-xs  ">{t("days")}</span>
            </div>

            <div className="flex flex-col h-11 w-10  items-center justify-center rounded bg-destructive ">
              <span className=""> {timeLeft.hours}</span>
              <span className="text-xs  ">{t("hours")}</span>
            </div>

            <div className="flex flex-col h-11 w-10  items-center justify-center rounded bg-destructive ">
              <span className=""> {timeLeft.minutes}</span>
              <span className="text-xs  "> {t("minutes")}</span>
            </div>

            <div className="flex flex-col h-11 w-10  items-center justify-center rounded bg-destructive ">
              <span className="">{timeLeft.seconds}</span>
              <span className="text-xs ">{t("seconds")}</span>
            </div>
            <div className="flex flex-col h-11 w-10  items-center justify-center rounded text-destructive bg-white border border-red-500 ">
              <span className="">{t("remaining")}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = currentCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary text-accent shadow-2xs"
                    : "bg-card text-foreground hover:bg-card/80"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product List Container with Transition Opacity for Smooth Loading */}
      <div
        className={`relative transition-opacity duration-200 ${
          isPending ? "opacity-60 pointer-events-none" : "opacity-100"
        }`}
      >
        <CustomCarousel
          loop={false}
          items={initialProducts}
          showNavigation={initialProducts?.length > 5}
          showPagination={false}
          disabledNavStyle="disabled"
          cols={{ mobile: 1, md: 5, lg: 5, xl: 5 }}
          renderItem={(card) => (
            <HomeProductCard key={card.id} product={card} />
          )}
        />
      </div>
    </>
  );
}
