export type OfferType =
  | "flight"
  | "holiday"
  | "hajj"
  | "umrah"
  | "hotel"
  | "visa";

export interface HeroAd {
  id: number;
  type: OfferType;
  title: string;
  image: string;
  category?: string;
}

export const heroAdData: HeroAd[] = [
  {
    id: 1,
    type: "flight",
    title: "Dubai Summer Special Flight",
    category: "Soft Drinks",
    image: "/home/hero/summer.webp",
  },
  {
    id: 2,
    type: "flight",
    title: "Dubai Summer Special Flight",
    category: "Soft Drinks",
    image: "/home/hero/hero1.webp",
  },
];
