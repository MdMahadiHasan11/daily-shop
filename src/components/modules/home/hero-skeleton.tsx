import Image from "next/image";

export default function HeroAdSkeleton({
  className = "w-full max-w-305 ml-auto pb-4",
}: {
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="block group outline-none">
        <div className="relative   bg-gray-50 shadow-sm transition-all duration-300">
          <div className="relative w-full aspect-4/1 overflow-hidden  ">
            <Image
              src="/home/hero/hero1.webp"
              alt="hero-image"
              fill
              sizes="100vw"
              className="object-cover w-full h-full transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
