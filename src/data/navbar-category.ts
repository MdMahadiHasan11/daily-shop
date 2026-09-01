import { NavCategoryItem } from "@/types";

export const FIXED_NAV_ITEMS = [
  { href: "/summer-fest", label: "SUMMER FEST" },
  { href: "/great-deals", label: "GREAT DEALS" },
  { href: "/unilever", label: "UNILEVER-STOCK & SAVE" },
  { href: "/buy-save", label: "BUY & SAVE MORE" },
  { href: "/our-brands", label: "OUR BRANDS" },
  { href: "/womens-corner", label: "WOMEN'S CORNER" },
];

export const CATEGORIES: NavCategoryItem[] = [
  {
    label: "Food",
    href: "/category/food",
    iconName: "UtensilsCrossed",
    subcategories: [
      {
        label: "Cooking Essentials",
        href: "/category/food/cooking-essentials",
        subcategories: [
          {
            label: "Oil & Ghee",
            href: "/category/food/cooking-essentials/oil-ghee",
            subcategories: [
              {
                label: "Mustard Oil",
                href: "/category/food/cooking-essentials/oil-ghee/mustard",
              },
              {
                label: "Soybean Oil",
                href: "/category/food/cooking-essentials/oil-ghee/soybean",
              },
            ],
          },
          {
            label: "Rice & Flour",
            href: "/category/food/cooking-essentials/rice-flour",
          },
          {
            label: "Spices & Salt",
            href: "/category/food/cooking-essentials/spices",
          },
        ],
      },
      {
        label: "Fruits & Vegetables",
        href: "/category/food/fruits-vegetables",
        subcategories: [
          {
            label: "Fresh Fruits",
            href: "/category/food/fruits-vegetables/fresh-fruits",
          },
          {
            label: "Fresh Vegetables",
            href: "/category/food/fruits-vegetables/fresh-vegetables",
          },
        ],
      },
      { label: "Meat & Fish", href: "/category/food/meat-fish" },
      { label: "Snacks & Biscuits", href: "/category/food/snacks" },
    ],
  },
  {
    label: "Baby Food & Care",
    href: "/category/baby-care",
    iconName: "Baby",
    subcategories: [
      {
        label: "Baby Formula",
        href: "/category/baby-care/formula",
        subcategories: [
          {
            label: "Stage 1 (0-6M)",
            href: "/category/baby-care/formula/stage-1",
          },
          {
            label: "Stage 2 (6-12M)",
            href: "/category/baby-care/formula/stage-2",
          },
        ],
      },
      { label: "Baby Wipes", href: "/category/baby-care/wipes" },
    ],
  },
  { label: "Diapers", href: "/category/diapers", iconName: "Sparkles" },
  { label: "Home Cleaning", href: "/category/home-cleaning", iconName: "Home" },
  { label: "Pet Care", href: "/category/pet-care", iconName: "HeartPulse" },
  {
    label: "Beauty & Health",
    href: "/category/beauty-health",
    iconName: "HeartPulse",
  },
  {
    label: "Fashion & Lifestyle",
    href: "/category/fashion",
    iconName: "Shirt",
  },
  { label: "Home & Kitchen", href: "/category/home-kitchen", iconName: "Home" },
  { label: "Stationeries", href: "/category/stationeries", iconName: "Pencil" },
  {
    label: "Toys & Sports",
    href: "/category/toys-sports",
    iconName: "Dumbbell",
  },
  { label: "Gadget", href: "/category/gadget", iconName: "Computer" },
];
