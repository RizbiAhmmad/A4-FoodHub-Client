import MealCard from "@/components/modules/homepage/MealCard";
import { mealService } from "@/services/meal.service";
import { Meal } from "@/types/meal.type";

export default async function MealsPage() {
  // Fetch all meals
  const mealsRes = await mealService.getMeals({ limit: "20" }); 
  const meals: Meal[] = mealsRes?.data || [];

  if (!meals.length) {
    return (
      <p className="text-center py-20 text-xl text-gray-500 dark:text-gray-400">
        No meals available yet.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">🍴 All Meals</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3  gap-6">
        {meals.map((meal: Meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}
