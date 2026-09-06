import { ApiProduct } from "@/types";
import WeekdayDealsClient from "./weekday-deals-client";
import { WeekdayCategory } from "./weekday-deals-main";

interface WeekdayDealsProps {
  products: ApiProduct[];
  currentCategory: string;
  targetDate: string | Date;
  categories: WeekdayCategory[];
}

export default async function WeekdayDeals({
  categories,
  products,
  currentCategory,
  targetDate,
}: WeekdayDealsProps) {
  return (
    <div className=" ">
      <div className="  rounded bg-primary/20 p-4 md:p-6">
        <WeekdayDealsClient
          initialProducts={products}
          targetDate={targetDate}
          categories={categories}
          currentCategory={currentCategory}
        />
      </div>
    </div>
  );
}
