"use server";

import { mealService, MealData } from "@/services/meal.service";
import { updateTag } from "next/cache";

export const createMealAction = async (data: MealData) => {
  const res = await mealService.createMeal(data);
  updateTag("meals");
  return res;
};
