"use server";

import { orderService, OrderData, AdminOrder } from "@/services/order.service";
import { revalidateTag } from "next/cache";

export const createOrderAction = async (data: OrderData) => {
  const res = await orderService.createOrder(data);
  revalidateTag("orders", "page");
  return res;
};

export const getAllOrdersAction = async (): Promise<{
  data: AdminOrder[] | null;
  error: { message: string } | null;
}> => {
  return await orderService.getAllOrders();
};

export const getOrdersAction = async () => {
  const res = await orderService.getOrders();
  return res;
};

export const getProviderOrdersAction = async () => {
  return await orderService.getProviderOrders();
};

export const updateOrderStatusAction = async (
  orderId: string,
  status: string,
) => {
  const res = await orderService.updateOrderStatus(orderId, status);
  revalidateTag("provider-orders", "page"); // optional: revalidate provider orders cache
  return res;
};
