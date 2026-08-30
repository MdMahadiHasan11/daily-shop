import {
  Baby,
  ChevronDown,
  ChevronRight,
  Computer,
  Dumbbell,
  HeartPulse,
  Home,
  LayoutDashboard,
  Menu,
  Pencil,
  Shirt,
  Sparkles,
  User,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

// Standardized Interface for Infinite Nested Depth
export interface CategoryItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  subcategories?: CategoryItem[];
}

// --- 1. DELIVERY LOCATION ---
export async function LocationSection() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const location = "Select your delivery location";

  return (
    <button className="cursor-pointer flex items-center gap-2 border border-white/40 rounded   px-3 text-xs font-medium text-white hover:bg-white/10 transition-all duration-300 h-9 in-[.is-scrolled]:h-7 w-full justify-center">
      {/* Replacing MapPin with the SVG image */}
      <Image
        src="/svg/car.svg"
        alt="Car Icon"
        width={16}
        height={16}
        className="h-4 w-4 shrink-0 object-contain"
      />

      <span className="truncate">{location}</span>
    </button>
  );
}

export function LocationSkeleton() {
  return (
    <div className="flex items-center gap-2 border border-white/20 rounded  px-3 h-9 in-[.is-scrolled]:h-7 w-full bg-white/10 animate-pulse">
      <div className="h-4 w-4 rounded-full bg-white/30 shrink-0" />
      <div className="h-3 w-20 rounded bg-white/30" />
    </div>
  );
}

// --- 2. AUTH SECTION ---
export async function AuthSection() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const isLoggedIn = false;
  const dashboardRoute = "/dashboard";

  if (isLoggedIn) {
    return (
      <Link href={dashboardRoute} className="block w-full">
        <Button
          variant="outline"
          className=" w-full gap-2 bg-transparent text-white border-white/40 hover:bg-white/10 text-xs transition-all duration-300 h-9 in-[.is-scrolled]:h-7"
        >
          <LayoutDashboard className="h-4 w-4 shrink-0" />
          <span>Dashboard</span>
        </Button>
      </Link>
    );
  }

  return (
    <Link href="/login" className="block w-full">
      <Button
        variant="outline"
        className="rounded w-full gap-2 bg-transparent text-white border-white/40 hover:bg-white hover:text-primary text-xs font-semibold transition-all duration-300 h-9 in-[.is-scrolled]:h-7 whitespace-nowrap"
      >
        <User className="h-4 w-4 shrink-0" />
        <span>Sign in / Sign up</span>
      </Button>
    </Link>
  );
}

export function AuthSkeleton() {
  return (
    <div className="h-9 in-[.is-scrolled]:h-7 w-full bg-white/10 border border-white/20 rounded animate-pulse" />
  );
}

function RecursiveCategoryList({
  items,
  width = "w-56",
}: {
  items: CategoryItem[];
  width?: string;
}) {
  return (
    <div
      className={`sub-menu-dropdown absolute top-0 left-full ${width} bg-white border border-gray-200 shadow-xl rounded-r-md opacity-0 invisible transition-all duration-200 ease-in-out py-1.5 -ml-px z-50`}
    >
      {items.map((item) => {
        const hasSub = item.subcategories && item.subcategories.length > 0;
        const IconComponent = item.icon;

        return (
          <div key={item.label} className="nav-row relative">
            <Link
              href={item.href}
              className="flex items-center justify-between px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors font-medium"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {IconComponent && (
                  <IconComponent className="h-4 w-4 text-gray-500 shrink-0" />
                )}
                <span className="truncate">{item.label}</span>
              </div>

              {hasSub && (
                <ChevronRight className="chevron-icon h-3.5 w-3.5 text-gray-400 shrink-0 transition-transform duration-200" />
              )}
            </Link>

            {/* Recursion for Child Levels */}
            {hasSub && <RecursiveCategoryList items={item.subcategories!} />}
          </div>
        );
      })}
    </div>
  );
}

// --- 4. CATEGORY DROPDOWN SERVER COMPONENT ---
export async function CategoryDropdown() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Category Data matching CategoryItem Interface
  const categories: CategoryItem[] = [
    {
      label: "Food",
      href: "/category/food",
      icon: UtensilsCrossed,
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
      icon: Baby,
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
    { label: "Diapers", href: "/category/diapers", icon: Sparkles },
    { label: "Home Cleaning", href: "/category/home-cleaning", icon: Home },
    { label: "Pet Care", href: "/category/pet-care", icon: HeartPulse },
    {
      label: "Beauty & Health",
      href: "/category/beauty-health",
      icon: HeartPulse,
    },
    { label: "Fashion & Lifestyle", href: "/category/fashion", icon: Shirt },
    { label: "Home & Kitchen", href: "/category/home-kitchen", icon: Home },
    { label: "Stationeries", href: "/category/stationeries", icon: Pencil },
    { label: "Toys & Sports", href: "/category/toys-sports", icon: Dumbbell },
    { label: "Gadget", href: "/category/gadget", icon: Computer },
  ];

  return (
    <div className="nav-container relative h-full flex items-center">
      {/* SCOPED CSS FOR DIRECT CHILD HOVER ONLY */}
      <style>{`
        /* Show direct level 1 menu on hover */
        .nav-container:hover > .main-menu {
          opacity: 1;
          visibility: visible;
        }
        .nav-container:hover > .trigger-btn .trigger-chevron {
          transform: rotate(180deg);
        }

        /* Show direct nested submenu ONLY on direct row hover */
        .nav-row:hover > .sub-menu-dropdown {
          opacity: 1 !important;
          visibility: visible !important;
        }

        /* Rotate arrow on direct row hover */
        .nav-row:hover > a .chevron-icon {
          // transform: rotate(90deg);
          color: var(--primary, #000);
        }
      `}</style>

      {/* TRIGGER BUTTON */}
      <div className="trigger-btn flex items-center gap-2 text-foreground transition-colors pr-4 border-r border-border h-full whitespace-nowrap cursor-pointer">
        <Menu className="h-4 w-4 shrink-0" />
        <span>SHOP BY CATEGORY</span>
        <ChevronDown className="trigger-chevron h-3 w-3 shrink-0 transition-transform duration-200" />
      </div>

      {/* LEVEL 1 MENU */}
      <div className="main-menu absolute top-full left-0 w-64 bg-white border border-gray-200 shadow-xl rounded-b-md opacity-0 invisible transition-all duration-200 ease-in-out z-50 py-1.5">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          const hasSub = cat.subcategories && cat.subcategories.length > 0;

          return (
            <div key={cat.label} className="nav-row relative">
              <Link
                href={cat.href}
                className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {IconComponent && (
                    <IconComponent className="h-5 w-5 text-gray-500 shrink-0" />
                  )}
                  <span className="font-medium text-gray-800 text-xs sm:text-sm truncate">
                    {cat.label}
                  </span>
                </div>
                {hasSub && (
                  <ChevronRight className="chevron-icon h-4 w-4 text-gray-400 shrink-0 transition-transform duration-200" />
                )}
              </Link>

              {/* RECURSIVE SUB-LEVELS */}
              {hasSub && <RecursiveCategoryList items={cat.subcategories!} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="flex items-center gap-2 pr-4 border-r border-border h-full w-full">
      <div className="h-4 w-4 rounded bg-muted animate-pulse shrink-0" />
      <div className="h-3 w-28 rounded bg-muted animate-pulse" />
      <div className="h-3 w-3 rounded bg-muted animate-pulse shrink-0" />
    </div>
  );
}
