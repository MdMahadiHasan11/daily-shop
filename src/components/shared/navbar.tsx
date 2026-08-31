import {
  ChevronRight,
  HelpCircle,
  MoreVertical,
  Search,
  ShoppingBag,
  Store,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import {
  AuthSection,
  AuthSkeleton,
  CategoryDropdown,
  CategorySkeleton,
  LocationSection,
  LocationSkeleton,
} from "./nav-dynamic";

import MobileMenu from "./mobile-menu";
import { MobileAuthSection, MobileAuthSkeleton } from "./MobileAuthSection";
import NavbarScrollWrapper from "./navbar-scroll-wrapper";

export default async function Navbar() {
  const fixedNavItems = [
    { href: "/summer-fest", label: "SUMMER FEST" },
    { href: "/great-deals", label: "GREAT DEALS" },
    { href: "/unilever", label: "UNILEVER-STOCK & SAVE" },
    { href: "/buy-save", label: "BUY & SAVE MORE" },
    { href: "/our-brands", label: "OUR BRANDS" },
    { href: "/womens-corner", label: "WOMEN'S CORNER" },
  ];

  return (
    <>
      {/* Top Banner (Mobile Only) */}
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

      {/* Client Scroll Wrapper wraps Server Content */}
      <NavbarScrollWrapper>
        {/* Main Nav Bar */}
        <nav className="bg-primary text-primary-foreground py-2.5 md:py-3.5 transition-all duration-300 ease-out in-[.is-scrolled]:md:py-2">
          <div className="container mx-auto flex items-center justify-between px-3 md:px-6 gap-2 md:gap-4">
            {/* Mobile Menu & Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <MobileMenu navItems={fixedNavItems} />

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

            {/* Location (Desktop Only) */}
            <div className="hidden lg:block w-52 shrink-0">
              <Suspense fallback={<LocationSkeleton />}>
                <LocationSection />
              </Suspense>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-1 md:mx-0">
              <div className="relative w-full flex items-center">
                <input
                  type="text"
                  placeholder="Search your products"
                  className="w-full bg-white text-foreground rounded-full md:rounded-l md:rounded-r-none px-4 pr-10 md:pr-4 text-xs md:text-sm outline-none transition-all duration-300 ease-out placeholder:text-gray-400 h-8 md:h-9 in-[.is-scrolled]:md:h-8"
                />
                <button className="cursor-pointer absolute right-1 md:static md:right-auto bg-transparent md:bg-accent text-gray-500 md:text-accent-foreground px-2 md:px-4 rounded-r flex items-center justify-center transition-all duration-300 ease-out h-8 md:h-9 in-[.is-scrolled]:md:h-8">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <button className="cursor-pointer text-xs font-semibold px-2.5 border border-white/40 rounded text-white hover:bg-white/10 transition-all duration-300 ease-out h-9 py-1 in-[.is-scrolled]:md:h-8 in-[.is-scrolled]:md:py-0.5">
                বাংলা
              </button>

              <div className="w-36 shrink-0">
                <Suspense fallback={<AuthSkeleton />}>
                  <AuthSection />
                </Suspense>
              </div>
            </div>

            {/* Mobile Right Icons */}
            <div className="flex md:hidden items-center gap-1 shrink-0">
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                <Suspense fallback={<MobileAuthSkeleton />}>
                  <MobileAuthSection />
                </Suspense>
              </div>

              <button className="text-white p-1 hover:opacity-80 transition-opacity">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
        </nav>

        {/* Secondary Navigation Bar */}
        <div className="bg-white text-foreground border-b border-gray-200 hidden md:block">
          <div className="container mx-auto flex items-center justify-between px-3 md:px-6 text-xs font-bold tracking-wider transition-all duration-300 ease-out h-9 md:h-10 in-[.is-scrolled]:md:h-8.5">
            {/* Category Dropdown */}
            <div className="hidden md:flex w-44 h-full shrink-0 items-center">
              <Suspense fallback={<CategorySkeleton />}>
                <CategoryDropdown />
              </Suspense>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 md:flex-initial flex items-center justify-start md:justify-center space-x-3 md:space-x-6 overflow-x-auto no-scrollbar py-0.5 w-full max-w-full">
              {fixedNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap shrink-0"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Utility Links (Desktop Only) */}
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