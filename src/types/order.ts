import type { CartItem } from "./cart";

export type PaymentMethod = "cash" | "bank";

export type BillingDetails = {
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  apartment: string;
  city: string;
  postcode: string;
  province: string;
  phone: string;
  email: string;
};

export type OrderStatus = "pending" | "confirmed" | "cancelled";

export type Order = {
  id: string;
  orderNumber: string;
  userId: number;
  items: CartItem[];
  billingDetails: BillingDetails;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
};

export type CreateOrderPayload = Omit<
  Order,
  "id" | "orderNumber" | "status" | "createdAt"
>;