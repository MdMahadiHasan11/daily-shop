import { User } from "lucide-react";
import Link from "next/link";

export async function MobileAuthSection() {
  await new Promise((resolve) => setTimeout(resolve, 1800));
  const isLoggedIn = false;

  return (
    <Link
      href={isLoggedIn ? "/dashboard" : "/login"}
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
