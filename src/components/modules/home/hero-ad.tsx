import { heroAdData } from "@/data/hero-add";
import HeroAdCarousel from "./hero-ad-carousel";

export default async function HeroAd({
  className,
}: {
  description?: string;
  subTitle?: string;
  title?: string;
  className?: string;
}) {
  const offers = heroAdData;

  if (!offers || offers.length === 0) return null;

  return <HeroAdCarousel offers={offers} className={className} />;
}
