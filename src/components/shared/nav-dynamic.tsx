"use client";

import { NavCategoryItem } from "@/types";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DynamicIcon } from "../icon-helper";

export function LocationSkeleton() {
  return (
    <div className="flex items-center gap-2 border border-white/20 rounded px-3 h-9 in-[.is-scrolled]:h-7 w-full bg-white/10 animate-pulse">
      <div className="h-4 w-4 rounded-full bg-white/30 shrink-0" />
      <div className="h-3 w-20 rounded bg-white/30" />
    </div>
  );
}

export function AuthSkeleton() {
  return (
    <div className="h-9 in-[.is-scrolled]:h-7 w-full bg-white/10 border border-white/20 rounded animate-pulse" />
  );
}

function CategoryItemRow({ item }: { item: NavCategoryItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const hasSub = Boolean(item.subcategories && item.subcategories.length > 0);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={item.href}
        className={`flex items-center justify-between px-4 py-3 text-sm md:text-base transition-colors font-medium ${
          isHovered ? "bg-gray-50 text-primary" : "text-gray-700"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <DynamicIcon
            name={item.iconName}
            className={`h-4 w-4 shrink-0 transition-colors ${
              isHovered ? "text-primary" : "text-gray-500"
            }`}
          />
          <span className="truncate">{item.label}</span>
        </div>

        {hasSub && (
          <ChevronRight
            className={`h-3.5 w-3.5 shrink-0 transition-colors ${
              isHovered ? "text-primary" : "text-gray-400"
            }`}
          />
        )}
      </Link>

      {hasSub && isHovered && (
        <div className="absolute top-0 left-full w-56 bg-white border border-gray-200 shadow-xl rounded-r-md py-1.5 -ml-px z-50">
          {item.subcategories!.map((subItem) => (
            <CategoryItemRow key={subItem.label} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}

export function CategoryDropdown({
  categories = [],
}: {
  categories?: NavCategoryItem[];
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check scroll position on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Open by default ONLY on home page when not scrolled, OR when hovered on any page
  const isOpen = (isHomePage && !isScrolled) || isHovered;
  const t = useTranslations("Navbar");
  return (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2 text-foreground transition-colors pr-4 border-r border-border h-full whitespace-nowrap cursor-pointer">
        <Menu className="h-4 w-4 shrink-0" />
        <span>{t("category")}</span>
        <ChevronDown
          className={`h-3 w-3 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

      {isOpen && (
        <div
          className={`absolute top-full left-0 w-64 bg-white  border-gray-200 border rounded-b z-50 py-2.5 ${isOpen ? "" : " shadow-xl"} `}
        >
          {categories.map((cat) => (
            <CategoryItemRow key={cat.label} item={cat} />
          ))}
        </div>
      )}
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
