import { env } from "@/env"
import { cookies } from "next/headers"

const API_URL = env.API_URL

export interface CategoryData {
  name: string
  image?: string
}

export const categoryService = {
  createCategory: async (data: CategoryData) => {
    try {
      const cookieStore = await cookies()

      const res = await fetch(`${API_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        return { data: null, error: { message: result.message } }
      }

      return { data: result, error: null }
    } catch {
      return { data: null, error: { message: "Something went wrong" } }
    }
  },
}
