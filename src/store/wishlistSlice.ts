import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import {
  addWishlistProduct,
  getWishlist,
  removeWishlistProduct,
} from "@/api/wishlist";

import {
  getStoredJson,
  removeStoredItem,
  setStoredJson,
} from "@/helpers/storage";
import type { Product } from "@/types/product";

interface WishlistState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const GUEST_WISHLIST_KEY = "guestWishlist";

const getGuestWishlist = (): Product[] => {
  return getStoredJson<Product[]>(GUEST_WISHLIST_KEY, []);
};

const saveGuestWishlist = (items: Product[]) => {
  if (!items.length) {
    removeStoredItem(GUEST_WISHLIST_KEY);
    return;
  }

  setStoredJson(GUEST_WISHLIST_KEY, items);
};

const initialState: WishlistState = {
  items: getGuestWishlist(),
  loading: false,
  error: null,
};

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const data = await getWishlist();
    return data;
  },
);

export const syncAddWishlist = createAsyncThunk(
  "wishlist/syncAddWishlist",
  async (productId: number) => {
    const data = await addWishlistProduct(productId);
    return data;
  },
);

export const syncRemoveWishlist = createAsyncThunk(
  "wishlist/syncRemoveWishlist",
  async (productId: number) => {
    const data = await removeWishlistProduct(productId);
    return data;
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleGuestWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      } else {
        state.items.push(action.payload);
      }

      saveGuestWishlist(state.items);
    },

    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find((item) => item.id === action.payload.id);

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        );
      } else {
        state.items.push(action.payload);
      }
    },

    clearWishlist: (state) => {
      state.items = [];
      state.error = null;
    },

    restoreGuestWishlist: (state) => {
      state.items = getGuestWishlist();
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(syncAddWishlist.rejected, (state, action) => {
        state.error = action.error.message || "Error";
      })

      .addCase(syncRemoveWishlist.rejected, (state, action) => {
        state.error = action.error.message || "Error";
      });
  },
});

export const {
  toggleGuestWishlist,
  toggleWishlist,
  clearWishlist,
  restoreGuestWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
