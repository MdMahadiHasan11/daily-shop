export interface NavSubCategory {
  label: string;
  href: string;
  iconName?: string;
  subcategories?: NavSubCategory[];
}

export interface NavCategoryItem {
  label: string;
  href: string;
  iconName?: string;
  subcategories?: NavSubCategory[];
}
