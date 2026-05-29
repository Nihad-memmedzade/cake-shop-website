import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  createOrderRequest,
  getOrderById,
  getOrders,
} from "@/api/order";

import {
  getStoredJson,
  removeStoredItem,
  setStoredJson,
} from "@/helpers/storage";
import type { CreateOrderPayload, Order } from "@/types/order";

type OrderState = {
  orders: Order[];
  lastOrder: Order | null;
  loading: boolean;
  error: string | null;
};

const LAST_ORDER_KEY = "lastOrder";

const getSavedLastOrder = (): Order | null => {
  return getStoredJson<Order | null>(LAST_ORDER_KEY, null);
};

const saveLastOrder = (order: Order | null) => {
  if (!order) {
    removeStoredItem(LAST_ORDER_KEY);
    return;
  }

  setStoredJson(LAST_ORDER_KEY, order);
};

const initialState: OrderState = {
  orders: [],
  lastOrder: getSavedLastOrder(),
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const data = await getOrders();
  return data;
});

export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async (id: number) => {
    const data = await getOrderById(id);
    return data;
  },
);

export const createOrderThunk = createAsyncThunk(
  "orders/createOrder",
  async (payload: CreateOrderPayload) => {
    const data = await createOrderRequest(payload);
    return data;
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    selectOrder: (state, action: PayloadAction<number>) => {
      const order = state.orders.find((item) => item.id === action.payload);

      if (order) {
        state.lastOrder = order;
        saveLastOrder(order);
      }
    },

    clearLastOrder: (state) => {
      state.lastOrder = null;
      saveLastOrder(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.lastOrder = action.payload;
        saveLastOrder(action.payload);
        state.error = null;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      })

      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
        state.lastOrder = action.payload;
        saveLastOrder(action.payload);
        state.error = null;
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error";
      });
  },
});

export const { selectOrder, clearLastOrder } = orderSlice.actions;

export default orderSlice.reducer;
