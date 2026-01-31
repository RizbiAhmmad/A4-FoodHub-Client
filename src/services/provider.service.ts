import { env } from "@/env"
import { cookies } from "next/headers"

const API_URL = env.API_URL

export interface ProviderProfileData {
  restaurantName: string
  description?: string
  address: string
  phone?: string
  logo?: string
}

export const providerService = {
  createProfile: async (data: ProviderProfileData) => {
    try {
      const cookieStore = await cookies()

      const res = await fetch(`${API_URL}/api/providers`, {
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
