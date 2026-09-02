import { fetchBrand } from "@/lib/fake-api";
import CompanyBrandCarousel from "./company-brand-carousel";

interface CompanyProps {
  className?: string;
}

export default async function Company({ className }: CompanyProps) {
  const [brands] = await Promise.all([fetchBrand()]);

  return (
    <div className={className}>
      <CompanyBrandCarousel brands={brands} className={"px-4"} />
    </div>
  );
}
