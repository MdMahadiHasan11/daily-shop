import { brand, BrandsArray } from "@/data/brand";
import { HeroAd, heroAdData } from "@/data/hero-add";
import { mockProducts } from "@/data/home-card-data";
import { ApiProduct } from "@/types";

// Helper for Fake API Delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchRecommendedProducts(): Promise<ApiProduct[]> {
  await delay(0);
  return mockProducts;
}

export async function fetchBrand(): Promise<BrandsArray> {
  await delay(0);
  return brand;
}
export async function fetchHeroAd(): Promise<HeroAd[]> {
  await delay(0);
  return heroAdData;
}

// export async function fetchOfferProducts(): Promise<ApiProduct[]> {
//   await delay(500);
//   return mockOfferProducts;
// }
