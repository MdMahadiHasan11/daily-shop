import Image from "next/image";
import Link from "next/link";

interface AddBannerProps {
  className?: string;
}

interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export default function AddBanner({ className }: AddBannerProps) {
  const staticBanners: BannerItem[] = [
    {
      id: "1",
      title: "DAIRY\n& EGGS",
      subtitle: "SHOP NOW",
      image: "/home/add-banner/small1.jpeg",
      link: "/holiday/search/dairy?category=true",
    },
    {
      id: "2",
      title: "FROZEN\nFOODS",
      subtitle: "SHOP NOW",
      image: "/home/add-banner/small2.jpeg",
      link: "/holiday/search/frozen?category=true",
    },
    {
      id: "3",
      title: "BEVERAGES\n& COFFEE",
      subtitle: "SHOP NOW",
      image: "/home/add-banner/big Banner.jpeg",
      link: "/holiday/search/beverages?category=true",
    },
  ];

  return (
    <div className={`w-full overflow-hidden ${className ?? ""}`}>
      {" "}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-15">
        {/* Left Side - Small Banners */}{" "}
        <div className="flex flex-col gap-4 md:col-span-5">
          {staticBanners.slice(0, 2).map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              className="group relative h-45 w-full overflow-hidden rounded shadow-md md:h-50"
            >
              <Image
                src={banner.image}
                alt={banner.title.replace("\n", " ")}
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 ease-out md:group-hover:scale-105"
              />

              {/* <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end bg-linear-to-t from-black/60 via-black/20 to-transparent p-5">
                <div>
                  <h3 className="whitespace-pre-line text-lg font-black tracking-wide text-white drop-shadow-md md:text-xl">
                    {banner.title}
                  </h3>

                  <span className="mt-2 inline-block rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    {banner.subtitle}
                  </span>
                </div>
              </div> */}
            </Link>
          ))}
        </div>
        {/* Right Side - Big Banner */}
        <div className="flex md:col-span-10">
          {staticBanners.slice(2).map((banner) => (
            <Link
              key={banner.id}
              href={banner.link}
              className="group relative h-94 min-h-94 w-full overflow-hidden rounded shadow-md md:h-auto md:min-h-0"
            >
              <Image
                src={banner.image}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="scale-110 object-cover blur-2xl"
              />

              <Image
                src={banner.image}
                alt={banner.title.replace("\n", " ")}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 58vw"
                className="relative z-1 object-contain transition-transform duration-700 ease-out md:group-hover:scale-105"
              />

              {/* <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end bg-linear-to-t from-black/60 via-black/20 to-transparent p-6">
                <div>
                  <h3 className="whitespace-pre-line text-xl font-black tracking-wide text-white drop-shadow-md md:text-2xl">
                    {banner.title}
                  </h3>

                  <span className="mt-3 inline-block rounded-lg bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    {banner.subtitle}
                  </span>
                </div>
              </div> */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
