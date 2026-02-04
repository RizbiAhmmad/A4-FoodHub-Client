import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface User {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "ADMIN" | "PROVIDER";
  status: "ACTIVE" | "BLOCKED";
  createdAt: string;
  providerProfile?: {
    restaurantName: string;
    isApproved: boolean;
  };
}

export const adminUserService = {
  getAllUsers: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/users`, {
        headers: {
          Cookie: cookieStore.toString(), 
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const err = await res.json();
        return { data: null, error: { message: err.message } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Failed to fetch users" } };
    }
  },

  getMe: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/users/me`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const err = await res.json();
        return { data: null, error: { message: err.message } };
      }

      const data = await res.json();
      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Failed to fetch profile" } };
    }
  },

  updateUserRole: async (id: string, role: string) => {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/users/${id}/role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ role }),
    });

    return res.json();
  },

  updateUserStatus: async (id: string, status: string) => {
    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/users/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ status }),
    });

    return res.json();
  },
};
