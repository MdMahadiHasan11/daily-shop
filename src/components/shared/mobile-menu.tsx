/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronRight, LayoutDashboard, Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { NavCategoryItem, NavSubCategory } from "@/types";
import { DynamicIcon } from "../icon-helper";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

interface MobileMenuProps {
  navItems: Array<{ href: string; label: string }>;
  categories?: NavCategoryItem[];
  hasAccessToken?: boolean;
  userInfo?: {
    name: string;
    email: string;
    role?: string;
  } | null;
  dashboardRoute?: string;
}

const MenuItemNode = ({
  item,
  level = 0,
  onClose,
}: {
  item: NavCategoryItem | NavSubCategory;
  level?: number;
  onClose: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubcategories = Boolean(
    item.subcategories && item.subcategories.length > 0,
  );

  const handleRowClick = (e: React.MouseEvent) => {
    if (hasSubcategories) {
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
        role={hasSubcategories ? "button" : undefined}
        tabIndex={hasSubcategories ? 0 : undefined}
        onClick={handleRowClick}
        onKeyDown={(e) => e.key === "Enter" && handleRowClick(e as any)}
        className={`flex items-center justify-between py-3 px-4 select-none cursor-pointer transition-colors duration-200 ${
          isOpen ? "bg-gray-100/80" : "hover:bg-gray-50"
        } ${level > 0 ? "bg-gray-50/50" : ""}`}
        style={{ paddingLeft: `${16 + level * 14}px` }}
      >
        <div className="flex items-center gap-3 text-sm font-semibold text-gray-800 flex-1 truncate">
          <DynamicIcon
            name={item.iconName}
            className="h-5 w-5 text-gray-500 shrink-0"
          />
          {hasSubcategories ? (
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

        {hasSubcategories && (
          <div className="p-1 text-gray-400 shrink-0">
            <ChevronRight
              className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-90 text-primary" : "rotate-0"
              }`}
            />
          </div>
        )}
      </div>

      {hasSubcategories && (
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden bg-gray-50/70">
            {item.subcategories?.map((subItem) => (
              <MenuItemNode
                key={subItem.label}
                item={subItem}
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
  categories,
  hasAccessToken = false,
  userInfo = null,
  dashboardRoute = "/dashboard",
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="text-white hover:bg-white/10 p-1.5 h-8 w-8 rounded flex items-center justify-center">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="flex flex-col p-0 w-[85vw] max-w-xs border-r border-gray-200 bg-white"
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

          <div className="flex flex-col flex-1 justify-between overflow-y-auto">
            <nav className="w-full">
              {categories?.map((category) => (
                <MenuItemNode
                  key={category.label}
                  item={category}
                  onClose={closeMenu}
                />
              ))}
            </nav>

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
