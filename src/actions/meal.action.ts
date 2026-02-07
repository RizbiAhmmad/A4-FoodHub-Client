"use server";

import { mealService, MealData, ProviderMeal } from "@/services/meal.service";
import { updateTag } from "next/cache";

export const getMyMealsAction = async (): Promise<{
  data: ProviderMeal[] | null;
  error: { message: string } | null;
}> => {
  return await mealService.getMyMeals();
};

export const createMealAction = async (data: MealData) => {
  const res = await mealService.createMeal(data);
  updateTag("meals");
  return res;
};
