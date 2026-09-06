import { fetchHeroAd } from "@/lib/fake-api";
import HeroAdCarousel from "./hero-ad-carousel";

export default async function HeroAd({
  className,
}: {
  description?: string;
  subTitle?: string;
  title?: string;
  className?: string;
}) {
  const offers = await fetchHeroAd();

  return (
    <div>
      <HeroAdCarousel offers={offers} className={className} />
    </div>
  );
}
