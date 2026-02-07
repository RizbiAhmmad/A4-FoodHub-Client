import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

// MealData interface define & export korte hobe
export interface MealData {
  name: string;
  description?: string;
  price: number;
  categoryId?: string;
  image?: string;
  isFeatured?: boolean;
}

interface GetMealsParams {
  isFeatured?: boolean;
  search?: string;
  limit?: string;
}

export interface ProviderMeal {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
  isFeatured: boolean;
  category?: {
    id: string;
    name: string;
  } | null;
}

export const mealService = {
  getMeals: async (
    params?: GetMealsParams,
    options?: { revalidate?: number },
  ) => {
    try {
      const url = new URL(`${API_URL}/api/meals`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value) url.searchParams.append(key, value.toString());
        });
      }
      const res = await fetch(url.toString(), {
        next: { revalidate: options?.revalidate || 10, tags: ["meals"] },
      });
      const data = await res.json();
      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Failed to fetch meals" } };
    }
  },

  getMealById: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/meals/${id}`, {
        next: { revalidate: 10, tags: ["meals"] },
      });
      const data = await res.json();
      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  getMyMeals: async (): Promise<{
    data: ProviderMeal[] | null;
    error: { message: string } | null;
  }> => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/meals/my-meals`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["my-meals"] },
      });

      const data: ProviderMeal[] = await res.json(); // ✅ TYPE HERE

      if (!res.ok) {
        return { data: null, error: { message: "Failed" } };
      }

      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Failed to fetch your meals" } };
    }
  },

  createMeal: async (data: MealData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/meals`, {
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
      return { data: null, error: { message: "Failed to create meal" } };
    }
  },
};
