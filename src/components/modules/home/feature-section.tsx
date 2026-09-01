import { Headphones, Package, ShieldCheck, Wallet } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function FeatureSection({
  className,
}: {
  className?: string;
}) {
  const t = await getTranslations("Features");

  const features = [
    {
      icon: Package,
      title: t("fastDeliveryTitle"),
      subtitle: t("fastDeliverySub"),
    },
    {
      icon: ShieldCheck,
      title: t("authorizedTitle"),
      subtitle: t("authorizedSub"),
    },
    {
      icon: Headphones,
      title: t("supportTitle"),
      subtitle: t("supportSub"),
    },
    {
      icon: Wallet,
      title: t("paymentTitle"),
      subtitle: t("paymentSub"),
    },
  ];

  return (
    <section className={className}>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded border   bg-white  transition-shadow"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-red-500 text-red-500">
                  <IconComponent className="h-6 w-6 stroke-[1.75]" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-md font-semibold text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
