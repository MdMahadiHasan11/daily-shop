import { BrandItem } from "@/data/brand";
import Image from "next/image";
import Link from "next/link";

interface BrandCardsProps {
  brand: BrandItem;
  className?: string;
}

export default function BrandCard({ brand }: BrandCardsProps) {
  return (
    <div className={`w-full`}>
      <Link
        key={brand.id}
        href={brand.link}
        className="group relative bg-white rounded p-4     transition-all duration-300 flex flex-col items-center justify-between h-48 border   overflow-hidden cursor-pointer"
      >
        {/* Logo Image Area */}
        <div className="relative w-full h-28 flex items-center justify-center my-auto">
          <Image
            src={brand.image}
            alt={brand.name}
            fill
            className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="w-full bg-slate-100 group-hover:bg-slate-200 transition-colors py-2 rounded text-center">
          <span className="text-gray-900 font-semibold text-sm tracking-wide">
            {brand.name}
          </span>
        </div>
      </Link>
    </div>
  );
}
