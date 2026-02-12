import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export interface ReviewData {
  mealId: string;
  rating: number;
  comment?: string;
}

export const reviewService = {
  createReview: async (data: ReviewData) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) return { data: null, error: result.message };

      return { data: result, error: null };
    } catch {
      return { data: null, error: "Failed to add review" };
    }
  },

  updateReview: async (mealId: string, data: { rating?: number; comment?: string }) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/reviews/${mealId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) return { data: null, error: result.message };

      return { data: result, error: null };
    } catch {
      return { data: null, error: "Failed to update review" };
    }
  },

  deleteReview: async (mealId: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/reviews/${mealId}`, {
        method: "DELETE",
        headers: { Cookie: cookieStore.toString() },
      });

      const result = await res.json();
      if (!res.ok) return { data: null, error: result.message };

      return { data: result, error: null };
    } catch {
      return { data: null, error: "Failed to delete review" };
    }
  },

  getMyReviews: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_URL}/api/reviews/me`, {
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["my-reviews"] },
      });

      const result = await res.json();
      return { data: result, error: null };
    } catch {
      return { data: null, error: "Failed to fetch reviews" };
    }
  },
};
