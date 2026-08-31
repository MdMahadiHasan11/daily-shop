"use client";

import { setLocaleAction } from "@/services/auth/language/locale";
import { useLocale } from "next-intl";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === currentLocale) return;
    startTransition(async () => {
      await setLocaleAction(newLocale);
      window.location.reload();
    });
  };

  return (
    <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border">
      {[
        { code: "en", label: "EN" },
        { code: "bn", label: "বাংলা" },
        { code: "hi", label: "हिंदी" },
      ].map((loc) => (
        <button
          key={loc.code}
          disabled={isPending}
          onClick={() => handleLanguageChange(loc.code)}
          className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
            currentLocale === loc.code
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          {loc.label}
        </button>
      ))}
    </div>
  );
}
