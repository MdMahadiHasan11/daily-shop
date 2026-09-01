export interface ApiUomOption {
  id: string;
  name: string;
  unitValue: number;
  isPreSelected: boolean;
  stock: string;
}

export interface ApiProductPrice {
  price: string;
  priceValue: number;
  oldPrice?: string | null;
  oldPriceValue?: number | null;
  discountAmountValue: number;
  currency: string;
}

export interface ApiProduct {
  id: string;
  name: string;
  sku: string;
  unit: string;
  displayUnit: string;
  deliveryInfo: string;
  deliveryType: string;
  orderMinimumQuantity: number;
  orderMaximumQuantity: number;
  orderStepQuantity?: number;
  price: ApiProductPrice;
  picture: {
    largeDeviceUrl: {
      imageUrl: string;
    };
  };
  uomOptions?: ApiUomOption[];
}
