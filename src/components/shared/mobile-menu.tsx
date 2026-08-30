"use client";

import { LayoutDashboard, Menu } from "lucide-react";
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

interface MobileMenuProps {
  navItems: Array<{ href: string; label: string }>;
  hasAccessToken?: boolean;
  userInfo?: {
    name: string;
    email: string;
    role?: string;
  } | null;
  dashboardRoute?: string;
}

const MobileMenu = ({
  navItems,
  hasAccessToken = false,
  userInfo = null,
  dashboardRoute = "/dashboard",
}: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          }
        />
        <SheetContent className="flex flex-col p-0 w-80">
          <SheetHeader className="px-6 py-5 border-b border-border">
            <SheetTitle className="text-base font-semibold tracking-wide text-title">
              Menu
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col flex-1 justify-between p-6 overflow-y-auto">
            <div className="space-y-5">
              {navItems.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="block text-base font-medium text-description hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-border space-y-4">
              {hasAccessToken && userInfo ? (
                <>
                  <div className="p-3 bg-muted rounded-lg border border-border/50">
                    <p className="text-sm font-medium text-title">
                      {userInfo.name}
                    </p>
                    <p className="text-xs text-caption truncate">
                      {userInfo.email}
                    </p>
                  </div>

                  <Link
                    href={dashboardRoute}
                    onClick={closeMenu}
                    className="block"
                  >
                    <Button
                      className="w-full gap-2 justify-center bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                      size="lg"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <Link href="/login" onClick={closeMenu} className="block">
                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                    size="lg"
                  >
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
