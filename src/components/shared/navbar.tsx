import { ChevronRight, HelpCircle, ShoppingBag, Store } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { MobileAuthSection, MobileAuthSkeleton } from "./MobileAuthSection";
import MobileMenu from "./mobile-menu";

import { CATEGORIES, FIXED_NAV_ITEMS } from "@/data/navbar-category";
import { getTranslations } from "next-intl/server";
import LogoutButton from "./logout-button";
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

export default async function Navbar() {
  const t = await getTranslations("Navbar");
  return (
    <>
      {/* Mobile App Promotion Banner */}
      <div className="bg-[#FFE01B] text-black md:hidden py-1.5 px-4 border-b border-black/5 relative z-40">
        <div className="container mx-auto flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-red-600 flex items-center justify-center text-white font-bold text-[9px] shrink-0">
              Daily
            </div>
            <span className="text-gray-900 font-bold text-xs truncate">
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
        {/* Main Header Bar */}
        <nav className="bg-primary text-primary-foreground py-2.5 md:py-3.5 transition-all duration-300 ease-out in-[.is-scrolled]:md:py-2">
          <div className="container mx-auto flex items-center justify-between px-3 md:px-6 gap-2 md:gap-4">
            {/* Logo & Mobile Menu */}
            <div className="flex items-center gap-2 shrink-0">
              <MobileMenu navItems={FIXED_NAV_ITEMS} categories={CATEGORIES} />

              <Link href="/" className="flex items-center space-x-1.5 shrink-0">
                <div className="h-8 w-8 md:h-10 md:w-10 rounded bg-white text-primary flex items-center justify-center transition-all duration-300 ease-out">
                  <ShoppingBag className="h-4 w-4 md:h-5 md:w-5 transition-all duration-300 ease-out" />
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
            <LogoutButton />
            {/* Location Section */}
            <div className="hidden xl:block w-48 shrink-0">
              <Suspense fallback={<LocationSkeleton />}>
                <LocationSection />
              </Suspense>
            </div>

            {/* Search Bar (Flexible) */}
            <div className="flex-1 min-w-0 max-w-xl mx-1 md:mx-0">
              <NavSearch />
            </div>

            {/* Right Actions (Language & Auth) */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0">
              <NavbarLanguageDropdown />

              <div className="w-32 md:w-36 shrink-0">
                <Suspense fallback={<AuthSkeleton />}>
                  <AuthSection />
                </Suspense>
              </div>
            </div>
            {/* Mobile Auth Area */}
            <div className="flex md:hidden items-center gap-1 shrink-0">
              <div className="  h-6 flex items-center justify-center shrink-0">
                <Suspense fallback={<MobileAuthSkeleton />}>
                  <MobileAuthSection />
                </Suspense>
              </div>
            </div>
          </div>
        </nav>

        {/* Secondary Category & Navigation Links Bar */}
        <div className="bg-white text-foreground border-b border-gray-200 hidden md:block">
          <div className="container mx-auto flex items-center justify-between px-3 md:px-6 text-xs font-bold tracking-wider transition-all duration-300 ease-out h-9 md:h-10 in-[.is-scrolled]:md:h-8.5">
            {/* Category Dropdown */}
            <div className="hidden md:flex w-44 h-full shrink-0 items-center">
              <Suspense fallback={<CategorySkeleton />}>
                <CategoryDropdown categories={CATEGORIES} />
              </Suspense>
            </div>

            {/* Scrollable Nav Links */}
            <nav className="flex-1 flex items-center justify-start md:justify-center space-x-4 md:space-x-6 overflow-x-auto no-scrollbar py-0.5 mx-4">
              {FIXED_NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap shrink-0 text-xs"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Extra Links (Outlets & Help) */}
            <div className="hidden lg:flex items-center space-x-4 text-muted-foreground font-normal shrink-0 border-l border-border pl-4">
              <Link
                href="/outlets"
                className="flex items-center gap-1 hover:text-primary transition-colors whitespace-nowrap"
              >
                <Store className="h-3.5 w-3.5" />
                <span>{t("outlet")}</span>
              </Link>
              <Link
                href="/help"
                className="flex items-center gap-1 hover:text-primary transition-colors whitespace-nowrap"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>{t("help")}</span>
              </Link>
            </div>
          </div>
        </div>
      </NavbarScrollWrapper>
    </>
  );
}
