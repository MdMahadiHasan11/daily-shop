import { mockProducts } from "@/data/home-card-data";
import { ApiProduct } from "@/types";

// Helper for Fake API Delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchRecommendedProducts(): Promise<ApiProduct[]> {
  await delay(400);
  return mockProducts;
}

// export async function fetchOfferProducts(): Promise<ApiProduct[]> {
//   await delay(500);
//   return mockOfferProducts;
// }
