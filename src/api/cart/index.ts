import api from "@/api";
import type { CartItem } from "@/types/cart";

export type AddCartPayload = {
  productId: number;
  quantity?: number;
  size?: string | null;
};

export type UpdateCartPayload = {
  productId: number;
  quantity: number;
  size?: string | null;
};

export type RemoveCartPayload = {
  productId: number;
  size?: string | null;
};

export const getCart = async () => {
  const response = await api.get<CartItem[]>("/cart");
  return response.data;
};

export const addCartProduct = async (data: AddCartPayload) => {
  const response = await api.post<CartItem>("/cart", data);
  return response.data;
};

export const updateCartProduct = async (data: UpdateCartPayload) => {
  const response = await api.put<CartItem>(`/cart/${data.productId}`, {
    quantity: data.quantity,
    size: data.size || null,
  });

  return response.data;
};

export const removeCartProduct = async (data: RemoveCartPayload) => {
  const response = await api.delete(`/cart/${data.productId}`, {
    params: {
      size: data.size || undefined,
    },
  });

  return response.data;
};

export const clearCartProducts = async () => {
  const response = await api.delete("/cart");
  return response.data;
};