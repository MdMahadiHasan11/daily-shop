import { ApiProduct } from "@/types";
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
    <div>
      {/* Right Section */}
      <div className="  rounded bg-primary/20 p-4 md:p-6">
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
