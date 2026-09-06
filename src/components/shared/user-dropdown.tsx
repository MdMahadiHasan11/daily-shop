"use client";

import { logoutAction } from "@/services/auth/logout-user";
import { IUserInfo } from "@/types";
import {
  BookOpen,
  ChevronDown,
  FileText,
  Gift,
  Heart,
  LayoutDashboard,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface UserDropdownProps {
  userInfo: IUserInfo | undefined;
  dashboardRoute: string;
}

export function UserDropdown({ userInfo, dashboardRoute }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = useTranslations("UserDropdown");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper to safely get the user's full name or fallback
  const fullName = userInfo?.profile?.firstName
    ? `${userInfo.profile.firstName} ${userInfo.profile.lastName || ""}`.trim()
    : null;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button (Clickable) */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer text-xs font-semibold p-1.5 md:px-2.5 border border-white/40 rounded text-white hover:bg-white/10 transition-all duration-300 ease-out h-7 w-7 md:h-9 md:w-auto md:py-1 in-[.is-scrolled]:md:h-8 in-[.is-scrolled]:md:py-0.5 flex items-center justify-center md:gap-1.5 disabled:opacity-50 select-none"
      >
        <UserIcon className="h-4 w-4 shrink-0" />

        {/* Name: Hidden on mobile, visible from md screens upwards + Truncated */}
        <span className="hidden md:inline truncate max-w-27.5 md:max-w-40">
          {userInfo?.profile?.firstName || t("customer")}
        </span>

        {/* Chevron: Hidden on mobile, visible from md screens upwards */}
        <ChevronDown
          className={`hidden md:block h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu Container */}
      <div
        className={`absolute right-0 pt-2 w-56 origin-top-right transition-all duration-200 ease-out z-50 ${
          isOpen
            ? "transform opacity-100 scale-100 pointer-events-auto"
            : "transform opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative rounded bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 shadow-2xl border border-zinc-200 dark:border-zinc-800 p-1.5">
          {/* Top-Right Arrow pointing up */}
          <div className="absolute -top-1.5 md:right-5 right-2 h-3 w-3 rotate-45 bg-white dark:bg-zinc-950 border-t border-l border-zinc-200 dark:border-zinc-800" />

          {/* Header title with truncate for long names */}
          <div className="px-3 py-2 font-semibold text-sm border-b border-zinc-100 dark:border-zinc-800 mb-1 text-zinc-900 dark:text-zinc-100 truncate max-w-full">
            {fullName || t("customer")}
          </div>

          {/* Links */}
          <div className="space-y-0.5">
            <Link
              href={dashboardRoute}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer flex w-full items-center px-2.5 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm font-medium"
            >
              <LayoutDashboard className="mr-2.5 h-4 w-4 text-zinc-500" />
              <span>{t("dashboard")}</span>
            </Link>

            <Link
              href="/orders"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer flex w-full items-center px-2.5 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm font-medium"
            >
              <FileText className="mr-2.5 h-4 w-4 text-zinc-500" />
              <span>{t("orderHistory")}</span>
            </Link>

            <Link
              href="/my-account"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer flex w-full items-center px-2.5 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm font-medium"
            >
              <UserIcon className="mr-2.5 h-4 w-4 text-zinc-500" />
              <span>{t("personalInfo")}</span>
            </Link>

            <Link
              href="/reward-points"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer flex w-full items-center px-2.5 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm font-medium"
            >
              <Gift className="mr-2.5 h-4 w-4 text-zinc-500" />
              <span>{t("rewardPoints")}</span>
            </Link>

            <Link
              href="/address-book"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer flex w-full items-center px-2.5 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm font-medium"
            >
              <BookOpen className="mr-2.5 h-4 w-4 text-zinc-500" />
              <span>{t("addressBook")}</span>
            </Link>

            <Link
              href="/wishlist"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer flex w-full items-center px-2.5 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-sm font-medium"
            >
              <Heart className="mr-2.5 h-4 w-4 text-zinc-500" />
              <span>{t("wishlist")}</span>
            </Link>
          </div>

          <div className="my-1 h-px bg-zinc-100 dark:bg-zinc-800" />

          {/* Logout Action Form / Button */}
          <form action={logoutAction}>
            <button
              type="submit"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer flex w-full items-center px-2.5 py-2 rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors text-sm font-medium"
            >
              <LogOut className="mr-2.5 h-4 w-4" />
              <span>{t("logout")}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
