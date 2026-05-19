import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const metaService = {
  getAdminAnalytics: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/meta/admin-analytics`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      });

      if (!res.ok) return { data: null, error: "Failed to fetch analytics" };
      
      const result = await res.json();
      return { data: result.data, error: null };
    } catch {
      return { data: null, error: "Failed to load analytics" };
    }
  },
};
