export type OfferType =
  | "flight"
  | "holiday"
  | "hajj"
  | "umrah"
  | "hotel"
  | "visa";

export interface CategoryFeaturesOffers {
  id: number;
  type: OfferType;
  title: string;
  image: string;
  category?: string;
}

export const categoryFeaturesOffers: CategoryFeaturesOffers[] = [
  // Flight (3 items)
  {
    id: 1,
    type: "flight",
    title: "Dubai Summer Special Flight",
    category: "Soft Drinks",
    image: "/home/category/meat.webp",
  },
  {
    id: 2,
    type: "flight",
    title: "Bangkok Express Direct Flight",
    category: "Soft Drinks",
    image: "/home/category/oil-2.webp",
  },
  {
    id: 3,
    type: "flight",
    title: "Dubai Summer Special Flight",
    category: "Soft Drinks",
    image: "/home/category/meat.webp",
  },
  {
    id: 4,
    type: "flight",
    title: "Bangkok Express Direct Flight",
    category: "Soft Drinks",
    image: "/home/category/oil-2.webp",
  },
  {
    id: 5,
    type: "flight",
    title: "Bangkok Express Direct Flight",
    category: "Soft Drinks",
    image: "/home/category/oil-2.webp",
  },
  {
    id: 6,
    type: "flight",
    title: "Dubai Summer Special Flight",
    image: "/home/category/meat.webp",
  },
  {
    id: 7,
    type: "flight",
    title: "Bangkok Express Direct Flight",
    category: "Soft Drinks",
    image: "/home/category/oil-2.webp",
  },
];
