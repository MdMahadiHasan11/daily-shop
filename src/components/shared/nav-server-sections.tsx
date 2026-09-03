import { getUserInfo } from "@/services/auth/get-user-info";
import { getCookie } from "@/services/auth/token-handlers";
import { User } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserDropdown } from "./user-dropdown";

export async function LocationSection() {
  const t = await getTranslations("Navbar");

  return (
    <button
      type="button"
      className="cursor-pointer flex items-center gap-2 border border-white/40 rounded px-3 text-xs font-medium text-white hover:bg-white/10 transition-all duration-300 h-9 in-[.is-scrolled]:h-7 w-full justify-center"
    >
      <Image
        src="/svg/car.svg"
        alt="Delivery vehicle"
        width={16}
        height={16}
        className="h-4 w-4 shrink-0 object-contain"
      />
      <span className="truncate">{t("location")}</span>
    </button>
  );
}

export async function AuthSection() {
  const t = await getTranslations("Navbar");
  const accessToken = await getCookie("accessToken");
  const userInfo = accessToken ? await getUserInfo() : null;
  const isLoggedIn =
    !!accessToken && !!userInfo && userInfo.name !== "Unknown User";

  const getDashboardRoute = (role?: string) => {
    switch (role) {
      case "ADMIN":
        return "/admin/dashboard";
      case "VENDOR":
        return "/vendor/dashboard";
      case "MODERATOR":
        return "/moderator/dashboard";
      default:
        return "/dashboard";
    }
  };

  const dashboardRoute = getDashboardRoute(userInfo?.role);

  if (isLoggedIn) {
    return <UserDropdown userInfo={userInfo} dashboardRoute={dashboardRoute} />;
  }

  return (
    <Link href="/login" className="block w-full">
      <Button
        variant="outline"
        className="rounded w-full gap-2 bg-transparent text-white border-white/40 hover:bg-white hover:text-primary text-xs font-semibold transition-all duration-300 h-9 in-[.is-scrolled]:h-7 whitespace-nowrap"
      >
        <User className="h-4 w-4 shrink-0" />
        <span>{t("auth")}</span>
      </Button>
    </Link>
  );
}
