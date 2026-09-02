import Image from "next/image";

export default function MonthlyDeals({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="relative w-full bg-black flex justify-center items-center">
        <Image
          src="/home/monthly-returns.webp"
          alt="Weekday Deals Banner"
          width={1920}
          height={1080}
          priority
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
