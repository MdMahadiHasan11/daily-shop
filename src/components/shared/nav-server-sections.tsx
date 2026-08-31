import { LayoutDashboard, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export async function LocationSection() {
  const location = "Select your delivery location";

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
      <span className="truncate">{location}</span>
    </button>
  );
}

export async function AuthSection() {
  const isLoggedIn = false;
  const dashboardRoute = "/dashboard";

  if (isLoggedIn) {
    return (
      <Link href={dashboardRoute} className="block w-full">
        <Button
          variant="outline"
          className="w-full gap-2 bg-transparent text-white border-white/40 hover:bg-white/10 text-xs transition-all duration-300 h-9 in-[.is-scrolled]:h-7"
        >
          <LayoutDashboard className="h-4 w-4 shrink-0" />
          <span>Dashboard</span>
        </Button>
      </Link>
    );
  }

  return (
    <Link href="/login" className="block w-full">
      <Button
        variant="outline"
        className="rounded w-full gap-2 bg-transparent text-white border-white/40 hover:bg-white hover:text-primary text-xs font-semibold transition-all duration-300 h-9 in-[.is-scrolled]:h-7 whitespace-nowrap"
      >
        <User className="h-4 w-4 shrink-0" />
        <span>Sign in / Sign up</span>
      </Button>
    </Link>
  );
}
