export type ProductSize = {
  id: number;
  label: string;
};

export type Product = {
  id: number;
  title: string;
  quantity: number;
  category: string;
  flavor: string;
  price: number;
  discountedPrice: number;
  rating: number;
  images: string[];
  brand: string;
  sizes: ProductSize[];
  description: string;
  tags?: string[];
  isNewArrival?: boolean;
  isTopRated?: boolean;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
};
