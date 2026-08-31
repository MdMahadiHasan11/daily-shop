"use client";

import { ReactNode, useEffect, useState } from "react";

export default function NavbarScrollWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (window.innerWidth < 768) {
        if (isScrolled) setIsScrolled(false);
        return;
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          if (currentScroll > 40) {
            setIsScrolled(true);
          } else if (currentScroll < 10) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isScrolled]);

  return (
    <div
      className={`sticky top-0 z-50 w-full bg-background transform-gpu navbar-wrapper ${
        isScrolled ? "is-scrolled" : ""
      }`}
    >
      {children}
    </div>
  );
}
