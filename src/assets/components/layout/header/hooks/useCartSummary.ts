import { useMemo } from "react";
import type { CartItem } from "@/types/cart";

export function useCartSummary(shoppingList: CartItem[]) {
  const cartCount = shoppingList.length;

  const subtotal = useMemo(() => {
    return shoppingList.reduce((sum, product) => {
      const finalPrice =
        product.discountedPrice > 0 ? product.discountedPrice : product.price;

      return sum + finalPrice * product.quantity;
    }, 0);
  }, [shoppingList]);

  return { cartCount, subtotal };
}
