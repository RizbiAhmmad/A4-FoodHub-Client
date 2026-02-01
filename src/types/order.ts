export type OrderMeal = {
  mealId: string
  quantity: number
}

export type OrderData = {
  address: string
  phone: string
  meals: OrderMeal[]
}
