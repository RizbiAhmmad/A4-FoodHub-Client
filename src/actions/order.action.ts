"use server";

import { orderService, OrderData, Order } from "@/services/order.service";
import { updateTag } from "next/cache";

export const createOrderAction = async (data: OrderData) => {
  const res = await orderService.createOrder(data);
  updateTag("orders");
  return res;
};

// Fix for TypeScript
export const getOrdersAction = async (): Promise<{ data: Order[]; error: Error | null }> => {
  const res = await orderService.getOrders();

  return {
    data: res.data || [], // convert null to empty array
    error: res.error,
  };
};
