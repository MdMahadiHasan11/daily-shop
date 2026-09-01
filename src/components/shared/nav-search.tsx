"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export function NavSearch() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const t = useTranslations("Navbar");
  return (
    <form className="relative w-full flex items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={t("searchPlaceholder")}
        className="w-full bg-white text-foreground rounded-full md:rounded-l md:rounded-r-none px-4 pr-10 md:pr-4 text-xs md:text-sm outline-none transition-all duration-300 ease-out placeholder:text-gray-400 h-8 md:h-9 in-[.is-scrolled]:md:h-8"
      />
      <button
        type="submit"
        aria-label="Search"
        className="cursor-pointer absolute right-1 md:static md:right-auto bg-transparent md:bg-accent text-gray-500 md:text-accent-foreground px-2 md:px-4 rounded-r flex items-center justify-center transition-all duration-300 ease-out h-8 md:h-9 in-[.is-scrolled]:md:h-8"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}
