"use server";

import { orderService, OrderData } from "@/services/order.service";
import { updateTag } from "next/cache";


export const createOrderAction = async (data: OrderData) => {
  const res = await orderService.createOrder(data);
  updateTag("orders");
  return res;
};
