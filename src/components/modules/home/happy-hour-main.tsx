import { fetchRecommendedProducts } from "@/lib/fake-api";
import HappyHour from "./happy-hour";

export type WeekdayCategory = {
  id: string;
  label: string;
};

interface HappyHourProps {
  className?: string;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function getFutureTargetDate(daysToAdd: number) {
  return new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000).toISOString();
}

export default async function HappyHourMain({
  className,
  searchParams,
}: HappyHourProps) {
  const resolvedParams = await searchParams;

  const currentCategory = Array.isArray(resolvedParams.happy_hours)
    ? resolvedParams.happy_hours[0]
    : resolvedParams.happy_hours
      ? resolvedParams.happy_hours
      : "milk";

  const products = await fetchRecommendedProducts();
  const categories: WeekdayCategory[] = [
    { id: "biscuits", label: "Biscuits Others" },
    { id: "milk", label: "Full Cream Milk" },
    { id: "pasta", label: "Pasta" },
    { id: "drinks", label: "Soft Drinks" },
  ];

  const targetDate = getFutureTargetDate(2);

  return (
    <main className={className}>
      <HappyHour
        categories={categories}
        products={products}
        currentCategory={currentCategory}
        targetDate={targetDate}
      />
    </main>
  );
}
