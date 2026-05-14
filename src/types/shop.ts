export type ShopFilterParams = {
  category?: string;
  flavors?: string[];
  tags?: string[];
  sizes?: string[];
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
};

export type FilterContentProps = {
  selectedCategory: string;
  selectedFlavors: string[];
  selectedTags: string[];
  selectedSizes: string[];
  minPrice: string;
  maxPrice: string;
  onCategoryChange: (category: string) => void;
  onFlavorChange: (flavor: string) => void;
  onTagChange: (tag: string) => void;
  onSizeChange: (size: string) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
};
