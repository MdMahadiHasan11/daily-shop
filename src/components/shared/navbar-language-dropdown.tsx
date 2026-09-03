"use client";

import { LOCALES } from "@/data/language";
import { setLocaleAction } from "@/services/language/locale";
import { ChevronDown, Languages } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export function NavbarLanguageDropdown() {
  const currentLocale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const activeLocale =
    LOCALES.find((l) => l.code === currentLocale) || LOCALES[0];

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === currentLocale || isPending) return;

    startTransition(async () => {
      await setLocaleAction(newLocale);

      router.refresh();
    });
  };

  return (
    <div className="relative group">
      <button
        type="button"
        disabled={isPending}
        className="cursor-pointer text-xs font-semibold px-2.5 border border-white/40 rounded text-white hover:bg-white/10 transition-all duration-300 ease-out h-9 py-1 in-[.is-scrolled]:md:h-8 in-[.is-scrolled]:md:py-0.5 flex items-center gap-1.5 disabled:opacity-50 select-none"
      >
        <Languages className="h-3.5 w-3.5 shrink-0" />
        <span>{activeLocale.label}</span>
        <ChevronDown className="h-3 w-3 shrink-0 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      {/* Hover Dropdown Menu */}
      <div className="absolute right-0 top-full pt-1.5 hidden group-hover:block z-50 min-w-30">
        <div className="bg-white dark:bg-gray-950 border border-border rounded shadow-lg py-1 text-xs text-foreground overflow-hidden">
          {LOCALES.map((loc) => {
            const isActive = currentLocale === loc.code;
            return (
              <button
                key={loc.code}
                type="button"
                disabled={isPending}
                onClick={() => handleLanguageChange(loc.code)}
                aria-pressed={isActive}
                className={`w-full text-left px-3 py-2 transition-colors flex items-center justify-between cursor-pointer ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "hover:bg-muted text-gray-700 dark:text-gray-200"
                } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <span>{loc.label}</span>
                {isActive && (
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
