"use client";

import {
  Baby,
  ChevronRight,
  Dog,
  Gamepad2,
  HeartPulse,
  Home,
  LayoutDashboard,
  Menu,
  Shirt,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export interface SubCategory {
  label: string;
  href: string;
  children?: SubCategory[];
}

export interface CategoryItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  children?: SubCategory[];
}

interface MobileMenuProps {
  navItems: Array<{ href: string; label: string }>;
  categories?: CategoryItem[];
  hasAccessToken?: boolean;
  userInfo?: {
    name: string;
    email: string;
    role?: string;
  } | null;
  dashboardRoute?: string;
}

const defaultCategories: CategoryItem[] = [
  {
    label: "Food",
    href: "/category/food",
    icon: <Utensils className="h-5 w-5" />,
    children: [
      {
        label: "Cooking Essentials",
        href: "/category/food/cooking-essentials",
        children: [
          {
            label: "Oil & Ghee",
            href: "/category/food/cooking-essentials/oil-ghee",
          },
          {
            label: "Spices & Masala",
            href: "/category/food/cooking-essentials/spices",
          },
          {
            label: "Rice & Flour",
            href: "/category/food/cooking-essentials/rice-flour",
          },
        ],
      },
      {
        label: "Beverages & Drinks",
        href: "/category/food/beverages",
        children: [
          {
            label: "Tea & Coffee",
            href: "/category/food/beverages/tea-coffee",
          },
          {
            label: "Juices & Soft Drinks",
            href: "/category/food/beverages/juices",
          },
        ],
      },
      { label: "Snacks & Biscuits", href: "/category/food/snacks" },
    ],
  },
  {
    label: "Baby Food & Care",
    href: "/category/baby-care",
    icon: <Baby className="h-5 w-5" />,
    children: [
      { label: "Baby Food & Formula", href: "/category/baby-care/food" },
      { label: "Wipes & Cleansing", href: "/category/baby-care/wipes" },
    ],
  },
  {
    label: "Diapers",
    href: "/category/diapers",
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    label: "Home Cleaning",
    href: "/category/home-cleaning",
    icon: <Home className="h-5 w-5" />,
  },
  {
    label: "Pet Care",
    href: "/category/pet-care",
    icon: <Dog className="h-5 w-5" />,
  },
  {
    label: "Beauty & Health",
    href: "/category/beauty-health",
    icon: <HeartPulse className="h-5 w-5" />,
  },
  {
    label: "Fashion & Lifestyle",
    href: "/category/fashion",
    icon: <Shirt className="h-5 w-5" />,
  },
  {
    label: "Toys & Sports",
    href: "/category/toys-sports",
    icon: <Gamepad2 className="h-5 w-5" />,
  },
  {
    label: "Gadget",
    href: "/category/gadget",
    icon: <Smartphone className="h-5 w-5" />,
  },
];

// Sub-menu level rendering component with Smooth Height Animations
const MenuItemNode = ({
  item,
  level = 0,
  onClose,
}: {
  item: CategoryItem | SubCategory;
  level?: number;
  onClose: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = Boolean(item.children && item.children.length > 0);

  const handleRowClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    } else {
      onClose();
    }
  };

  return (
    <div className="w-full flex flex-col border-b border-gray-100">
      <div
        onClick={handleRowClick}
        className={`flex items-center justify-between py-3 px-4 select-none cursor-pointer transition-colors duration-200 ${
          isOpen ? "bg-gray-100/80" : "hover:bg-gray-50"
        } ${level > 0 ? "bg-gray-50/50" : ""}`}
        style={{ paddingLeft: `${16 + level * 14}px` }}
      >
        <div className="flex items-center gap-3 text-sm font-semibold text-gray-800 flex-1 truncate">
          {"icon" in item && item.icon && (
            <span className="text-gray-500 shrink-0">{item.icon}</span>
          )}
          {hasChildren ? (
            <span className="truncate">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              onClick={onClose}
              className="truncate w-full block"
            >
              {item.label}
            </Link>
          )}
        </div>

        {hasChildren && (
          <div className="p-1 text-gray-400 shrink-0">
            <ChevronRight
              className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-90 text-primary" : "rotate-0"
              }`}
            />
          </div>
        )}
      </div>

      {/* Smooth CSS Grid Height Expansion */}
      {hasChildren && (
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden bg-gray-50/70">
            {item.children?.map((child) => (
              <MenuItemNode
                key={child.label}
                item={child}
                level={level + 1}
                onClose={onClose}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default function MobileMenu({
  navItems,
  categories = defaultCategories,
  hasAccessToken = false,
  userInfo = null,
  dashboardRoute = "/dashboard",
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* Render Trigger directly with styling to avoid nesting <button> inside <button> */}
        <SheetTrigger className="text-white hover:bg-white/10 transition-colors p-1.5 rounded-md inline-flex items-center justify-center h-8 w-8">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="flex flex-col p-0 w-[85vw] max-w-xs border-r border-gray-200 bg-white [&>button]:top-3.5 [&>button]:right-3.5 [&>button]:bg-white [&>button]:text-gray-700 [&>button]:hover:bg-gray-100 [&>button]:rounded-md [&>button]:p-1 [&>button]:shadow-sm"
        >
          <SheetHeader className="bg-primary text-primary-foreground p-3.5 flex flex-row items-center justify-start space-y-0 border-b border-white/10 shrink-0">
            <SheetTitle className="flex items-center space-x-2 text-white">
              <div className="h-7 w-7 rounded bg-white text-primary flex items-center justify-center font-bold">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div className="flex items-center font-bold tracking-tight text-white select-none">
                <span className="text-lg">Daily</span>
                <span className="text-accent text-lg">Shop</span>
              </div>
            </SheetTitle>
          </SheetHeader>

          {/* Body List */}
          <div className="flex flex-col flex-1 justify-between overflow-y-auto">
            <nav className="w-full">
              {categories.map((category) => (
                <MenuItemNode
                  key={category.label}
                  item={category}
                  onClose={closeMenu}
                />
              ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-gray-200 bg-gray-50/60 space-y-4 shrink-0">
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    className="p-2 bg-white rounded border border-gray-200 text-gray-600 hover:text-primary transition-colors text-center truncate"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {hasAccessToken && userInfo ? (
                <div className="space-y-2">
                  <div className="p-2.5 bg-white rounded border border-gray-200">
                    <p className="text-xs font-semibold text-gray-900">
                      {userInfo.name}
                    </p>
                    <p className="text-[11px] text-gray-500 truncate">
                      {userInfo.email}
                    </p>
                  </div>
                  <Link
                    href={dashboardRoute}
                    onClick={closeMenu}
                    className="block"
                  >
                    <Button className="w-full gap-2 justify-center bg-primary text-primary-foreground hover:bg-primary/90 text-xs h-9">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                </div>
              ) : (
                <Link href="/login" onClick={closeMenu} className="block">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-xs h-9">
                    Login / Register
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
