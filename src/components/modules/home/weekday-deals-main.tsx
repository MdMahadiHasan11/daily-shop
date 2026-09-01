import { fetchRecommendedProducts } from "@/lib/fake-api";
import WeekdayDeals from "./weekday-deals";

export type WeekdayCategory = {
  id: string;
  label: string;
};

interface WeekdayDealsMainProps {
  className?: string;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

function getFutureTargetDate(daysToAdd: number) {
  return new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000).toISOString();
}

export default async function WeekdayDealsMain({
  className,
  searchParams,
}: WeekdayDealsMainProps) {
  const resolvedParams = await searchParams;

  const currentCategory = Array.isArray(resolvedParams.category)
    ? resolvedParams.category[0]
    : resolvedParams.category
      ? resolvedParams.category
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
      <WeekdayDeals
        categories={categories}
        products={products}
        currentCategory={currentCategory}
        targetDate={targetDate}
      />
    </main>
  );
}
