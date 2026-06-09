import api from "@/api";
import i18n from "@/i18n";
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

const getLanguage = () =>
  i18n.resolvedLanguage?.split("-")[0] || i18n.language?.split("-")[0] || "en";

export const getCart = async () => {
  const response = await api.get<CartItem[]>("/cart", {
    params: { lang: getLanguage() },
  });

  return response.data;
};

export const addCartProduct = async (data: AddCartPayload) => {
  const response = await api.post<CartItem>("/cart", data, {
    params: { lang: getLanguage() },
  });

  return response.data;
};

export const updateCartProduct = async (data: UpdateCartPayload) => {
  const response = await api.put<CartItem>(
    `/cart/${data.productId}`,
    {
      quantity: data.quantity,
      size: data.size || null,
    },
    {
      params: { lang: getLanguage() },
    },
  );

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
