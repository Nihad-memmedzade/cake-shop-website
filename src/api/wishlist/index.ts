import api from "@/api";
import type { Product } from "@/types/product";

export const getWishlist = async () => {
  const response = await api.get<Product[]>("/wishlist");
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