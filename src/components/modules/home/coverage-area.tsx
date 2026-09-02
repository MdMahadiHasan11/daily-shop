import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface LocationItem {
  id: string;
  location: string;
  outlets: string;
}

const leftColumn: LocationItem[] = [
  { id: "1", location: "Dhaka", outlets: "315 outlets" },
  { id: "2", location: "Chattogram", outlets: "25 outlets" },
  { id: "3", location: "Cumilla", outlets: "30 outlets" },
  { id: "4", location: "Manikganj", outlets: "13 outlets" },
];

const rightColumn: LocationItem[] = [
  { id: "5", location: "Sylhet", outlets: "25 outlets" },
  { id: "6", location: "Khulna", outlets: "19 outlets" },
  { id: "7", location: "Gazipur", outlets: "71 outlets" },
  { id: "8", location: "Barishal", outlets: "36 outlets" },
];

const CoverageList = ({ items }: { items: LocationItem[] }) => (
  <div className="flex flex-col">
    {items.map((item, index) => (
      <div
        key={item.id}
        className={`flex items-center justify-between py-3 px-4 ${
          index !== items.length - 1 ? "border-b border-gray-200" : ""
        }`}
      >
        <span className="font-bold text-gray-900 text-base md:text-lg">
          {item.location}
        </span>
        <div className="flex items-center gap-6">
          <span className="text-gray-400 font-medium">-</span>
          <span className="text-red-500 font-semibold text-base md:text-lg">
            {item.outlets}
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default async function CoverageSection({
  className,
}: {
  className?: string;
}) {
  const t = await getTranslations("CoverageArea");
  return (
    <div
      className={`w-full bg-gray-50 rounded  border overflow-hidden relative ${className}`}
    >
      <div className="p-6 md:p-8 z-10 relative">
        <h2 className="text-center text-xl md:text-2xl font-bold text-gray-900 mb-8 tracking-wide">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
          <CoverageList items={leftColumn} />

          <div className="border-t md:border-t-0 border-gray-200 mt-1 md:mt-0">
            <CoverageList items={rightColumn} />
          </div>
        </div>
      </div>

      <div className="relative w-full h-60 md:h-80 -mt-10 md:-mt-15">
        <Image
          src="/home/daily-coverage.svg"
          alt="World Map Background"
          fill
          className="object-cover opacity-40"
          priority
        />

        {/* <div className="absolute top-[30%] left-[15%] flex flex-col items-center cursor-pointer group">
          <div className="relative w-8 h-10">
            <Image
              src="/icons/map-pin-red.png"
              alt="Dhaka Pin"
              fill
              className="object-contain group-hover:scale-110 transition-transform"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-[10px] mt-1.5">
              স
            </span>
          </div>
        </div>

        <div className="absolute top-[70%] left-[45%] flex flex-col items-center cursor-pointer group">
          <div className="relative w-8 h-10">
            <Image
              src="/icons/map-pin-blue.png"
              alt="Barishal Pin"
              fill
              className="object-contain group-hover:scale-110 transition-transform"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-[10px] mt-1.5">
              স
            </span>
          </div>
        </div>

        <div className="absolute top-[25%] right-[25%] flex flex-col items-center cursor-pointer group">
          <div className="relative w-8 h-10">
            <Image
              src="/icons/map-pin-purple.png"
              alt="Sylhet Pin"
              fill
              className="object-contain group-hover:scale-110 transition-transform"
            />
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-[10px] mt-1.5">
              স
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
