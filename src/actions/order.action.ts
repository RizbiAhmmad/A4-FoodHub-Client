"use server";

import { orderService, OrderData, AdminOrder } from "@/services/order.service";
import { updateTag } from "next/cache";

export const createOrderAction = async (data: OrderData) => {
  const res = await orderService.createOrder(data);
  updateTag("orders");
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
  updateTag("provider-orders"); // optional: revalidate provider orders cache
  return res;
};
