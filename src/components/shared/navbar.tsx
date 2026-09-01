import { ChevronRight, HelpCircle, ShoppingBag, Store } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { NavCategoryItem } from "@/types";
import { MobileAuthSection, MobileAuthSkeleton } from "./MobileAuthSection";
import MobileMenu from "./mobile-menu";

import {
  AuthSkeleton,
  CategoryDropdown,
  CategorySkeleton,
  LocationSkeleton,
} from "./nav-dynamic";
import { NavSearch } from "./nav-search";
import { AuthSection, LocationSection } from "./nav-server-sections";
import { NavbarLanguageDropdown } from "./navbar-language-dropdown";
import NavbarScrollWrapper from "./navbar-scroll-wrapper";

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

export default async function Navbar() {
  return (
    <>
      <div className="bg-[#FFE01B] text-black md:hidden py-1.5 px-4 border-b border-black/5 relative z-40">
        <div className="container mx-auto flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-red-600 flex items-center justify-center text-white font-bold text-[9px] shrink-0">
              Daily
            </div>
            <span className="text-gray-900 font-bold text-xs">
              Daily Shop App
            </span>
          </div>

          <Link
            href="/download-app"
            className="bg-[#D90000] text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-0.5 hover:bg-red-700 transition-colors shrink-0"
          >
            <span>Download Now</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      <NavbarScrollWrapper>
        <nav className="bg-primary text-primary-foreground py-2.5 md:py-3.5 transition-all duration-300 ease-out in-[.is-scrolled]:md:py-2">
          <div className="container mx-auto flex items-center justify-between px-3 md:px-6 gap-2 md:gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <MobileMenu navItems={FIXED_NAV_ITEMS} categories={CATEGORIES} />

              <Link href="/" className="flex items-center space-x-1.5 shrink-0">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded bg-white text-primary flex items-center justify-center transition-all duration-300 ease-out">
                  <ShoppingBag className="h-4 w-4 md:h-5 md:w-5 transition-all duration-300 ease-out in-[.is-scrolled]:md:h-4.5 in-[.is-scrolled]:md:w-4.5" />
                </div>
                <div className="hidden md:flex items-center font-bold tracking-tight text-white select-none">
                  <span className="text-xl transition-all duration-300 ease-out in-[.is-scrolled]:md:text-lg">
                    Daily
                  </span>
                  <span className="text-accent text-xl transition-all duration-300 ease-out in-[.is-scrolled]:md:text-lg">
                    Shop
                  </span>
                </div>
              </Link>
            </div>

            <div className="hidden lg:block w-52 shrink-0">
              <Suspense fallback={<LocationSkeleton />}>
                <LocationSection />
              </Suspense>
            </div>

            <div className="flex-1 max-w-xl mx-1 md:mx-0">
              <NavSearch />
            </div>

            <div className="hidden md:flex items-center gap-3 shrink-0">
              <NavbarLanguageDropdown />

              <div className="w-36 shrink-0">
                <Suspense fallback={<AuthSkeleton />}>
                  <AuthSection />
                </Suspense>
              </div>
            </div>

            <div className="flex md:hidden items-center gap-1 shrink-0">
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                <Suspense fallback={<MobileAuthSkeleton />}>
                  <MobileAuthSection />
                </Suspense>
              </div>
            </div>
          </div>
        </nav>

        <div className="bg-white text-foreground border-b border-gray-200 hidden md:block">
          <div className="container mx-auto flex items-center justify-between px-3 md:px-6 text-xs font-bold tracking-wider transition-all duration-300 ease-out h-9 md:h-10 in-[.is-scrolled]:md:h-8.5">
            <div className="hidden md:flex w-44 h-full shrink-0 items-center">
              <Suspense fallback={<CategorySkeleton />}>
                <CategoryDropdown categories={CATEGORIES} />
              </Suspense>
            </div>

            <nav className="flex-1 md:flex-initial flex items-center justify-start md:justify-center space-x-3 md:space-x-6 overflow-x-auto no-scrollbar py-0.5 w-full max-w-full">
              {FIXED_NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap shrink-0"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4 text-muted-foreground font-normal shrink-0 border-l border-border pl-4">
              <Link
                href="/outlets"
                className="flex items-center gap-1 hover:text-primary transition-colors whitespace-nowrap"
              >
                <Store className="h-3.5 w-3.5" />
                <span>Our outlets</span>
              </Link>
              <Link
                href="/help"
                className="flex items-center gap-1 hover:text-primary transition-colors whitespace-nowrap"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Help line</span>
              </Link>
            </div>
          </div>
        </div>
      </NavbarScrollWrapper>
    </>
  );
}
