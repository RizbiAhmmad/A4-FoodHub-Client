import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface ProviderProfileData {
  restaurantName: string;
  description?: string;
  address: string;
  phone?: string;
  logo?: string;
}

export interface ProviderProfile {
  id: string;
  restaurantName: string;
  address: string;
  description?: string;
  phone?: string;
  logo?: string;
  status: "PENDING" | "APPROVED";
}

export const providerService = {
  //* GET PROFILE (like getCategories)
  getProfile: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/providers/me`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["provider-profile"] },
      });

      const data = await res.json();
      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Failed to fetch profile" } };
    }
  },

  //* CREATE PROFILE
  createProfile: async (data: ProviderProfileData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/providers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: result.message } };
      }

      return { data: result, error: null };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
