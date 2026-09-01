"use client";

import { ApiProduct, ApiUomOption } from "@/types";
import { Check, ChevronDown, Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export default function HomeProductCard({ product }: { product: ApiProduct }) {
  const t = useTranslations("ProductCard");

  const {
    id,
    price,
    picture,
    name,
    displayUnit,
    orderMinimumQuantity = 1,
    orderStepQuantity = 1,
    orderMaximumQuantity = 100,
    deliveryType,
    deliveryInfo,
    uomOptions,
  } = product;

  const productSlug = `/product/${id}`;

  const defaultOption = useMemo(() => {
    return uomOptions?.find((opt) => opt.isPreSelected) || uomOptions?.[0];
  }, [uomOptions]);

  const [selectedOption, setSelectedOption] = useState<
    ApiUomOption | undefined
  >(defaultOption);

  const [quantity, setQuantity] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Outside click handler that intercepts event propagation to prevent Link navigation when closing
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        event.stopPropagation();
        event.preventDefault();
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick, true);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [isOpen]);

  const optionUnitValue = useMemo(() => {
    if (!selectedOption) return 1;
    const match = selectedOption.name.match(/\d+/);
    return match
      ? parseInt(match[0], 10)
      : selectedOption.unitValue / 1000 || 1;
  }, [selectedOption]);

  const displayQuantity = useMemo(() => {
    if (quantity === 0) return 0;

    if (uomOptions && uomOptions.length > 0) {
      return quantity * optionUnitValue;
    }

    return quantity;
  }, [uomOptions, quantity, optionUnitValue]);

  const baseMultiplier = useMemo(() => {
    if (!selectedOption || !defaultOption?.unitValue) return 1;
    return selectedOption.unitValue / defaultOption.unitValue;
  }, [selectedOption, defaultOption]);

  const currentPrice = useMemo(
    () => price.priceValue * baseMultiplier,
    [price.priceValue, baseMultiplier],
  );

  const currentOldPrice = useMemo(
    () => (price.oldPriceValue ? price.oldPriceValue * baseMultiplier : null),
    [price.oldPriceValue, baseMultiplier],
  );

  const currentDiscount = useMemo(
    () =>
      price.discountAmountValue
        ? price.discountAmountValue * baseMultiplier
        : 0,
    [price.discountAmountValue, baseMultiplier],
  );

  const unitLabel = useMemo(() => {
    if (uomOptions && uomOptions.length > 0) {
      return selectedOption?.name.replace(/[0-9]/g, "").trim() || "kg";
    }
    return displayUnit;
  }, [uomOptions, selectedOption, displayUnit]);

  const resolvedDeliveryUnit = useMemo(() => {
    if (deliveryType === "h") return t("hours");
    if (deliveryType === "d") return t("days");
    if (deliveryType === "w") return t("weeks");
    if (deliveryType === "m") return t("months");
    return deliveryType;
  }, [deliveryType, t]);

  const handleUomSelect = (e: React.MouseEvent, option: ApiUomOption) => {
    e.preventDefault();
    e.stopPropagation();
    if (option.stock === "OutOfStock") return;
    setSelectedOption(option);
    setQuantity(0);
    setIsOpen(false);
  };

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleInitialAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(orderMinimumQuantity);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev) => {
      const step = uomOptions && uomOptions.length > 0 ? 1 : orderStepQuantity;
      const nextValue = prev + step;
      return nextValue <= orderMaximumQuantity ? nextValue : prev;
    });
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity((prev) => {
      const step = uomOptions && uomOptions.length > 0 ? 1 : orderStepQuantity;

      if (prev <= orderMinimumQuantity) {
        return 0;
      }
      return prev - step;
    });
  };

  return (
    <div className="group relative flex h-full w-full min-w-0 flex-col items-center rounded-lg border border-card-border bg-card p-3 sm:p-4 text-center transition-colors hover:bg-card-hover overflow-hidden">
      {/* Full Card Link Wrapper */}
      <Link
        href={productSlug}
        className="flex w-full min-w-0 flex-1 flex-col items-center"
      >
        {/* Discount Badge */}
        {Boolean(currentDiscount) && (
          <div className="absolute left-2 top-0 z-10 flex flex-col items-center justify-center bg-destructive px-1.5 py-1 text-[10px] sm:text-[11px] font-bold text-destructive-foreground shadow-sm [clip-path:polygon(0_0,100%_0,100%_100%,50%_85%,0_100%)]">
            <span className="leading-tight">
              {price.currency}
              {currentDiscount}
            </span>
            <span className="leading-tight">{t("off")}</span>
          </div>
        )}

        {/* Product Image: Responsive Container */}
        <div className="relative aspect-square w-full max-w-35 shrink-0 overflow-hidden my-2">
          <Image
            src={picture.largeDeviceUrl.imageUrl}
            alt={name}
            fill
            sizes="(max-width: 640px) 40vw, (max-width: 768px) 30vw, 20vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Delivery Info */}
        <span className="mb-1 text-[11px] sm:text-xs font-normal italic text-caption truncate w-full">
          {t("deliveryTime", {
            time: deliveryInfo,
            unit: resolvedDeliveryUnit,
          })}
        </span>

        {/* Product Name */}
        <h3 className="min-h-10 w-full text-xs sm:text-sm font-semibold leading-snug text-title line-clamp-2 wrap-break-word">
          {name}
        </h3>

        {/* Price Section */}
        <div className="my-2 flex w-full flex-wrap items-center justify-center gap-1 text-[11px] sm:text-xs">
          {currentOldPrice && (
            <span className="text-caption line-through">
              {price.currency}
              {currentOldPrice}
            </span>
          )}
          <span className="text-sm sm:text-base font-bold text-primary">
            {price.currency}
            {currentPrice}
          </span>
          <span className="text-description truncate max-w-full">
            {t("perUnit", { unit: selectedOption?.name || displayUnit })}
          </span>
          {orderMinimumQuantity > 1 && (
            <span className="text-caption w-full text-[10px]">
              ({t("minLimit", { qty: orderMinimumQuantity })})
            </span>
          )}
        </div>
      </Link>

      {/* UOM Dropdown Container */}
      <div className="my-1 flex h-7 w-full items-center justify-center relative z-20">
        {uomOptions && uomOptions.length > 0 && (
          <div className="relative w-full max-w-32.5" ref={dropdownRef}>
            <button
              type="button"
              onClick={handleToggleDropdown}
              className="flex w-full cursor-pointer items-center justify-between rounded border border-border bg-card px-2 py-1 text-xs font-medium text-subtitle transition-all hover:border-primary focus:outline-none focus:ring-1 focus:ring-ring"
            >
              <span className="truncate">{selectedOption?.name}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 text-caption transition-transform duration-300 ease-in-out ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Dropdown Menu Overlay */}
            {isOpen && (
              <div className="absolute left-0 right-0 top-full z-50 mt-1 origin-top overflow-hidden rounded border border-border bg-card shadow-lg">
                <div className="max-h-36 overflow-y-auto py-1">
                  {uomOptions.map((opt) => {
                    const isSelected = selectedOption?.id === opt.id;
                    const isOutOfStock = opt.stock === "OutOfStock";

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={isOutOfStock}
                        onClick={(e) => handleUomSelect(e, opt)}
                        className={`flex w-full items-center justify-between px-2.5 py-1 text-left text-xs transition-colors ${
                          isSelected
                            ? "bg-accent font-semibold text-accent-foreground"
                            : "text-subtitle hover:bg-muted"
                        } ${isOutOfStock ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
                      >
                        <span className="truncate">{opt.name}</span>
                        {isSelected && (
                          <Check className="h-3 w-3 shrink-0 text-primary ml-1" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bag Action Button Container */}
      <div className="relative z-0 mt-auto min-h-9 w-full min-w-0 pt-2">
        {quantity === 0 ? (
          <button
            type="button"
            onClick={handleInitialAdd}
            disabled={selectedOption?.stock === "OutOfStock"}
            className="flex h-9 w-full cursor-pointer items-center justify-center gap-1 rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          >
            <Plus className="h-4 w-4 shrink-0" />
            <span className="truncate">{t("addToBag")}</span>
          </button>
        ) : (
          <div className="flex min-h-9 w-full min-w-0 items-center justify-between rounded-full bg-warning px-1.5 py-1 text-xs font-bold text-warning-foreground shadow-sm transition-all">
            <button
              type="button"
              onClick={handleDecrease}
              className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/10 active:scale-90"
            >
              <Minus className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>

            <span className="min-w-0 flex-1 px-1 text-center text-[10px] sm:text-[11px] leading-tight font-bold wrap-break-word line-clamp-2 select-none">
              {t("inBag", { qty: displayQuantity, unit: unitLabel })}
            </span>

            <button
              type="button"
              onClick={handleIncrease}
              className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-black/10 active:scale-90"
            >
              <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
