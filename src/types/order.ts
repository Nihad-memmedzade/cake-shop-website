export type PaymentMethod = "cash" | "bank";

export type BillingDetails = {
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  postcode: string;
  province?: string;
  phone: string;
  email: string;
};

export type OrderStatus = "pending" | "confirmed" | "cancelled";

export type OrderItem = {
  id: number;
  productId: number;
  title: string;
  image: string | null;
  price: number;
  quantity: number;
  size: string | null;
  subtotal: number;
};

export type Order = {
  id: number;
  orderNumber: string;
  items: OrderItem[];
  billingDetails: BillingDetails;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
};

export type CreateOrderPayload = {
  billingDetails: BillingDetails;
  paymentMethod: PaymentMethod;
  items: {
    productId: number;
    quantity: number;
    size?: string | null;
  }[];
};