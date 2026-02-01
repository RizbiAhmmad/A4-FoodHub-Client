import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface OrderData {
  address: string;
  phone: string;
  meals: {
    mealId: string;
    quantity: number;
  }[];
}

export const orderService = {
  createOrder: async (data: OrderData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) return { data: null, error: { message: result.message } };

      return { data: result, error: null };
    } catch {
      return { data: null, error: { message: "Failed to place order" } };
    }
  },
};
