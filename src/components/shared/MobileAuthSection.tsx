import { getUserInfo } from "@/services/auth/get-user-info";
import { getCookie } from "@/services/auth/token-handlers";
import { User } from "lucide-react";
import Link from "next/link";
import { UserDropdown } from "./user-dropdown";

export async function MobileAuthSection() {
  const accessToken = await getCookie("accessToken");
  const userInfo = accessToken ? await getUserInfo() : null;
  const isLoggedIn = !!accessToken && !!userInfo;

  const getDashboardRoute = (role?: string) => {
    switch (role) {
      case "ADMIN":
        return "/admin/dashboard";
      case "VENDOR":
        return "/vendor/dashboard";
      default:
        return "/dashboard";
    }
  };

  const dashboardRoute = getDashboardRoute(userInfo?.data?.role);

  if (isLoggedIn && userInfo) {
    return (
      <UserDropdown userInfo={userInfo?.data} dashboardRoute={dashboardRoute} />
    );
  }

  return (
    <Link
      href="/login"
      className="text-white hover:opacity-80 transition-opacity p-1"
    >
      <User className="h-6 w-6" />
    </Link>
  );
}

export function MobileAuthSkeleton() {
  return (
    <div className="h-6 w-6 rounded-full bg-white/30 animate-pulse shrink-0" />
  );
}
