import { env } from "@/env"

const API_URL = env.API_URL

interface GetMealsParams {
  isFeatured?: boolean
  search?: string
  limit?: string
}

export const mealService = {
  getMeals: async (params?: GetMealsParams, options?: { revalidate?: number }) => {
    try {
      const url = new URL(`${API_URL}/api/meals`)

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value) url.searchParams.append(key, value.toString())
        })
      }

      const res = await fetch(url.toString(), {
        next: { revalidate: options?.revalidate || 10, tags: ["meals"] },
      })

      const data = await res.json()
      return { data, error: null }
    } catch {
      return { data: null, error: { message: "Failed to fetch meals" } }
    }
  },
}
