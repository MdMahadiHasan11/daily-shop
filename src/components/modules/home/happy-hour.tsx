import { ApiProduct } from "@/types";
import Image from "next/image";
import HappyHourClient from "./happy-hour-client";
import { WeekdayCategory } from "./weekday-deals-main";

interface HappyHourProps {
  products: ApiProduct[];
  currentCategory: string;
  targetDate: string | Date;
  categories: WeekdayCategory[];
}

export default async function HappyHour({
  categories,
  products,
  currentCategory,
  targetDate,
}: HappyHourProps) {
  return (
    <div className="flex w-full flex-col gap-4 md:flex-row items-stretch">
      {/* Left Section */}
      <div className="relative hidden w-70 shrink-0 overflow-hidden rounded-xl bg-card md:flex flex-col justify-between">
        {/* Background Image: Scale applied to hide native image black borders */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/home/weekday/week-offer.webp"
            alt="Special Savings Big Sale"
            fill
            priority
            sizes="240px"
            className="object-cover object-center scale-105"
          />
        </div>

        {/* Overlay for depth */}
        <div className="absolute inset-0 bg-black/20 z-0" />

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
          {/* Top Title Section */}
          <div className="text-3xl font-extrabold italic tracking-tight text-white drop-shadow-md">
            Special <br />
            <span className="text-rose-400">Savings!</span>
          </div>

          {/* Badge Section */}
          <div className="self-end rounded-full border-4 border-rose-100/90 bg-white p-4 text-center font-black uppercase leading-tight text-rose-600 shadow-xl transition-transform hover:scale-105">
            Big <br /> Sale
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative flex-1 rounded bg-primary/20 p-4 md:p-6">
        <HappyHourClient
          initialProducts={products}
          targetDate={targetDate}
          categories={categories}
          currentCategory={currentCategory}
        />
      </div>
    </div>
  );
}
