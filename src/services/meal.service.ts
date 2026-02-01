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
