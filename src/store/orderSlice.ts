import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { CreateOrderPayload, Order } from "@/types/order";

type OrderState = {
  orders: Order[];
  lastOrder: Order | null;
};

const initialState: OrderState = {
  orders: [],
  lastOrder: null,
};

const createOrderNumber = () => Date.now().toString().slice(-6);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrder: (state, action: PayloadAction<CreateOrderPayload>) => {
      const order: Order = {
        ...action.payload,
        id: crypto.randomUUID(),
        orderNumber: createOrderNumber(),
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      state.orders.unshift(order);
      state.lastOrder = order;
    },

    selectOrder: (state, action: PayloadAction<string>) => {
      const order = state.orders.find((item) => item.id === action.payload);

      if (order) {
        state.lastOrder = order;
      }
    },

    clearLastOrder: (state) => {
      state.lastOrder = null;
    },
  },
});

export const { createOrder, selectOrder, clearLastOrder } = orderSlice.actions;

export default orderSlice.reducer;