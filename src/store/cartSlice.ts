import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  addCartProduct,
  clearCartProducts,
  getCart,
  removeCartProduct,
  updateCartProduct,
  type AddCartPayload,
  type RemoveCartPayload,
  type UpdateCartPayload,
} from "@/api/cart";

import {
  getStoredJson,
  removeStoredItem,
  setStoredJson,
} from "@/helpers/storage";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/product";

type AddToCartPayload = Product | CartItem;

type CartState = {
  items: CartItem[];
  loading: boolean;
  error: string | null;
};

const GUEST_CART_KEY = "guestCart";

const getCartQuantity = (payload: AddToCartPayload) => {
  if ("quantity" in payload && payload.quantity > 0) {
    return payload.quantity;
  }

  return 1;
};

const getGuestCart = (): CartItem[] => {
  return getStoredJson<CartItem[]>(GUEST_CART_KEY, []);
};

const saveGuestCart = (items: CartItem[]) => {
  if (!items.length) {
    removeStoredItem(GUEST_CART_KEY);
    return;
  }

  setStoredJson(GUEST_CART_KEY, items);
};

const getCartItemSize = (item: CartItem | AddToCartPayload) => {
  return "selectedSize" in item ? item.selectedSize || null : null;
};

const addItemToCart = (items: CartItem[], payload: AddToCartPayload) => {
  const quantity = getCartQuantity(payload);
  const selectedSize = getCartItemSize(payload);

  const existingItem = items.find(
    (item) => item.id === payload.id && (item.selectedSize || null) === selectedSize,
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    return;
  }

  items.push({
    ...payload,
    quantity,
    selectedSize,
  });
};

const initialState: CartState = {
  items: getGuestCart(),
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const data = await getCart();
  return data;
});

export const syncAddCart = createAsyncThunk(
  "cart/syncAddCart",
  async (data: AddCartPayload) => {
    const response = await addCartProduct(data);
    return response;
  },
);

export const syncUpdateCart = createAsyncThunk(
  "cart/syncUpdateCart",
  async (data: UpdateCartPayload) => {
    const response = await updateCartProduct(data);
    return response;
  },
);

export const syncRemoveCart = createAsyncThunk(
  "cart/syncRemoveCart",
  async (data: RemoveCartPayload) => {
    const response = await removeCartProduct(data);
    return response;
  },
);

export const syncClearCart = createAsyncThunk("cart/syncClearCart", async () => {
  const response = await clearCartProducts();
  return response;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      addItemToCart(state.items, action.payload);
    },

    addGuestToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      addItemToCart(state.items, action.payload);
      saveGuestCart(state.items);
    },

    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          (item.selectedSize || null) !== (action.payload.selectedSize || null),
      );
    },

    removeGuestFromCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          (item.selectedSize || null) !== (action.payload.selectedSize || null),
      );

      saveGuestCart(state.items);
    },

    increaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          (item.selectedSize || null) === (action.payload.selectedSize || null),
      );

      if (item) {
        item.quantity += 1;
      }
    },

    increaseGuestQuantity: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          (item.selectedSize || null) === (action.payload.selectedSize || null),
      );

      if (item) {
        item.quantity += 1;
      }

      saveGuestCart(state.items);
    },

    decreaseQuantity: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          (item.selectedSize || null) === (action.payload.selectedSize || null),
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    decreaseGuestQuantity: (state, action: PayloadAction<CartItem>) => {
      const item = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          (item.selectedSize || null) === (action.payload.selectedSize || null),
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      saveGuestCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];
    },

    clearGuestCart: (state) => {
      state.items = [];
      removeStoredItem(GUEST_CART_KEY);
    },

    restoreGuestCart: (state) => {
      state.items = getGuestCart();
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(syncAddCart.rejected, (state, action) => {
        state.error = action.error.message || "Error";
      })

      .addCase(syncUpdateCart.rejected, (state, action) => {
        state.error = action.error.message || "Error";
      })

      .addCase(syncRemoveCart.rejected, (state, action) => {
        state.error = action.error.message || "Error";
      })

      .addCase(syncClearCart.rejected, (state, action) => {
        state.error = action.error.message || "Error";
      });
  },
});

export const {
  addToCart,
  addGuestToCart,
  removeFromCart,
  removeGuestFromCart,
  increaseQuantity,
  increaseGuestQuantity,
  decreaseQuantity,
  decreaseGuestQuantity,
  clearCart,
  clearGuestCart,
  restoreGuestCart,
} = cartSlice.actions;

export default cartSlice.reducer;
