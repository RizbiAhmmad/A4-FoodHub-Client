export interface Meal {
  id: string
  name: string
  description?: string
  price: number
  image?: string | null
  isFeatured?: boolean
  provider: {
    restaurantName: string
    address: string
  }
  category?: {
    name: string
  }
  reviews?: {
    rating: number
  }[]
}
