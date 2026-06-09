import api from "@/api";
import i18n from "@/i18n";
import type { CreateProductReviewPayload, ProductReview } from "@/types/review";
import type { Product } from "@/types/product";

const getProductLanguage = () => i18n.language?.split("-")[0] || "en";

export const getProducts = async () => {
  const response = await api.get("/products", {
    params: { lang: getProductLanguage() },
  });
  return response.data;
};

export const getNewArrivalProducts = async () => {
  const response = await api.get("/products/new-arrivals", {
    params: { lang: getProductLanguage() },
  });
  return response.data;
};

export const getTopRatedProducts = async () => {
  const response = await api.get("/products/top-rated", {
    params: { lang: getProductLanguage() },
  });
  return response.data;
};

export const getBestSellerProducts = async () => {
  const response = await api.get("/products/best-seller", {
    params: { lang: getProductLanguage() },
  });
  return response.data;
};

export const getLimitedEditionProducts = async () => {
  const response = await api.get("/products/limited-edition", {
    params: { lang: getProductLanguage() },
  });
  return response.data;
};

export const getProductReviews = async (
  productId: number,
): Promise<ProductReview[]> => {
  const response = await api.get(`/products/${productId}/reviews`);
  return response.data;
};

export const createProductReview = async (
  productId: number,
  payload: CreateProductReviewPayload,
): Promise<ProductReview> => {
  const response = await api.post(`/products/${productId}/reviews`, payload);
  return response.data;
};

export const getRelatedProducts = async (
  productId: number,
  limit = 8,
): Promise<Product[]> => {
  const response = await api.get(`/products/${productId}/related`, {
    params: { limit, lang: getProductLanguage() },
  });

  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await api.get(`/products/${id}`, {
    params: {
      lang:
        i18n.resolvedLanguage?.split("-")[0] ||
        i18n.language?.split("-")[0] ||
        "en",
    },
  });

  return response.data;
};

export const getSearchProducts = async (searchText: string) => {
  const response = await api.get("/products/search", {
    params: { q: searchText, lang: getProductLanguage() },
  });
  return response.data;
};

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

  params.append("lang", getProductLanguage());

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
