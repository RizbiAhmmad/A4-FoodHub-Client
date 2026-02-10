import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface OrderItem {
  mealId: string;
  quantity: number;
  meal?: {
    name: string;
    image?: string;
    price: number;
  };
}

export interface Order {
  id: string;
  address: string;
  phone: string;
  items: OrderItem[];
  status: string; // "pending", "delivered"
  createdAt: string;
}

export interface OrderData {
  address: string;
  phone: string;
  items: {
    mealId: string;
    quantity: number;
  }[];
}

export interface ProviderOrderItem {
  quantity: number;
  price: number;
  meal?: {
    name: string;
    image?: string | null;
  };
}

export interface ProviderOrder {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  address: string;
  phone: string;

  customer?: {
    name: string;
  };

  items: ProviderOrderItem[];
}

export interface AdminOrder {
  id: string;
  status: string;
  totalAmount: number;
  address: string;
  phone: string;
  createdAt: string;

  customer?: {
    name: string;
    email: string;
    phone: string;
  };

  provider?: {
    restaurantName: string;
  };

  items: {
    quantity: number;
    price: number;
    meal?: {
      name: string;
      image?: string | null;
    };
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

  getAllOrders: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/orders/admin`, {
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["admin-orders"] },
      });

      const result: AdminOrder[] = await res.json();
      return { data: result, error: null };
    } catch {
      return { data: null, error: { message: "Failed to fetch all orders" } };
    }
  },

  getOrders: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/orders`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["orders"] },
      });
      const result = await res.json();
      return { data: result, error: null };
    } catch {
      return { data: null, error: { message: "Failed to fetch orders" } };
    }
  },

  getProviderOrders: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/orders/provider`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["provider-orders"] },
      });

      const result = await res.json();
      return { data: result, error: null };
    } catch {
      return {
        data: null,
        error: { message: "Failed to fetch provider orders" },
      };
    }
  },

  updateOrderStatus: async (orderId: string, status: string) => {
    try {
      const cookieStore = await cookies(); // get the provider cookies
      const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(), // <-- add this
        },
        body: JSON.stringify({ status }),
      });

      const result = await res.json();
      if (!res.ok) return { data: null, error: { message: result.message } };
      return { data: result, error: null };
    } catch {
      return { data: null, error: { message: "Failed to update status" } };
    }
  },
};
