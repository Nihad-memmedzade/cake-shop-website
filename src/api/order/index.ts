import api from "@/api";
import i18n from "@/i18n";
import type { CreateOrderPayload, Order } from "@/types/order";

const createOrderNumber = (id: number) => String(id).padStart(6, "0");
const getOrderLanguage = () => i18n.language?.split("-")[0] || "en";

type ApiOrder = Omit<Order, "orderNumber" | "billingDetails"> & {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  streetAddress: string;
  postcode: string;
  phone: string;
  email: string;
};

const mapOrder = (order: ApiOrder): Order => ({
  ...order,
  orderNumber: createOrderNumber(order.id),
  billingDetails: {
    firstName: order.firstName,
    lastName: order.lastName,
    companyName: "",
    country: order.country,
    streetAddress: order.streetAddress,
    apartment: "",
    city: order.city,
    postcode: order.postcode,
    province: "",
    phone: order.phone,
    email: order.email,
  },
});

export const getOrders = async () => {
  const response = await api.get<ApiOrder[]>("/orders", {
    params: { lang: getOrderLanguage() },
  });

  return response.data.map(mapOrder);
};

export const getOrderById = async (id: number) => {
  const response = await api.get<ApiOrder>(`/orders/${id}`, {
    params: { lang: getOrderLanguage() },
  });

  return mapOrder(response.data);
};

export const createOrderRequest = async (payload: CreateOrderPayload) => {
  const response = await api.post<ApiOrder>("/orders", payload, {
    params: { lang: getOrderLanguage() },
  });

  return mapOrder(response.data);
};