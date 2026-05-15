import api from "@/api";
import type {
  CreateProductReviewPayload,
  ProductReview,
} from "@/types/review";
import type { Product } from "@/types/product";
// type Filters = {
//   category?: string;
//   flavors?: string[];
//   tags?: string[];
//   sizes?: string[];
//   minPrice?: number;
//   maxPrice?: number;
//   sort?: string;
// };

export const getProducts = async () => {
  // try {
  //   const response = await api.get("/products");
  //   return response.data;
  // } catch (error) {
  //   console.error("Error, products don't pull", error);
  //   throw error;
  // }
  const response = await api.get("/products");
  return response.data;
};



// Arrival Products
export const getNewArrivalProducts = async () => {
  const response = await api.get("/products/new-arrivals");
  return response.data;
};
export const getTopRatedProducts = async () => {
  const response = await api.get("/products/top-rated");
  return response.data;
};

// Best Seller Products
export const getBestSellerProducts = async () => {
  const response = await api.get("/products/best-seller");
  return response.data;
};

// Limited edition Products
export const getLimitedEditionProducts = async () => {
  const response = await api.get("/products/limited-edition");
  return response.data;
};

// Get reviews of product
export const getProductReviews = async (
  productId: number
): Promise<ProductReview[]> => {
  const response = await api.get(`/products/${productId}/reviews`);
  return response.data;
};

// Create review of product
export const createProductReview = async (
  productId: number,
  payload: CreateProductReviewPayload
): Promise<ProductReview> => {
  const response = await api.post(`/products/${productId}/reviews`, payload);
  return response.data;
};

// Related Products
export const getRelatedProducts = async (
  productId: number,
  limit = 8
): Promise<Product[]> => {
  const response = await api.get(`/products/${productId}/related`, {
    params: { limit },
  });

  return response.data;
};

// Product By ID
export const getProductById = async (id: number) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Search Products
export const getSearchProducts = async (searchText: string) => {
  const response = await api.get(`/products/search?q=${searchText}`);
  return response.data;
};

// Filtered Products
export const getFilteredProducts = async (filters: {
  category?: string;
  flavors?: string[];
  tags?: string[];
  sizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) => {
  const params = new URLSearchParams();

  if (filters.category) {
    params.append("category", filters.category);
  }

  filters.flavors?.forEach((flavor) => {
    params.append("flavors", flavor);
  });

  filters.tags?.forEach((tag) => {
    params.append("tags", tag);
  });

  filters.sizes?.forEach((size) => {
    params.append("sizes", size);
  });

  if (filters.minPrice !== undefined) {
    params.append("minPrice", String(filters.minPrice));
  }

  if (filters.maxPrice !== undefined) {
    params.append("maxPrice", String(filters.maxPrice));
  }

  if (filters.sort) {
    params.append("sort", filters.sort);
  }

  const response = await api.get(`/products/filter?${params.toString()}`);
  return response.data;
};
