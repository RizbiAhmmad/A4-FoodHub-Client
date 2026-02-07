"use server";

import { mealService, MealData, ProviderMeal } from "@/services/meal.service";
import { revalidateTag, updateTag } from "next/cache";

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

export const updateMealAction = async (id: string, data: MealData) => {
  const res = await mealService.updateMeal(id, data);
  revalidateTag("my-meals", "max");
  return res;
};

export const deleteMealAction = async (id: string) => {
  const res = await mealService.deleteMeal(id);
  revalidateTag("my-meals", "max");
  return res;
};
