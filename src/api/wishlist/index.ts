import api from "@/api";
import i18n from "@/i18n";
import type { Product } from "@/types/product";

const getLanguage = () =>
  i18n.resolvedLanguage?.split("-")[0] ||
  i18n.language?.split("-")[0] ||
  "en";

export const getWishlist = async () => {
  const response = await api.get<Product[]>("/wishlist", {
    params: { lang: getLanguage() },
  });

  return response.data;
};

export const addWishlistProduct = async (productId: number) => {
  const response = await api.post(`/wishlist/${productId}`);
  return response.data;
};

export const removeWishlistProduct = async (productId: number) => {
  const response = await api.delete(`/wishlist/${productId}`);
  return response.data;
};