import MealCard from "@/components/modules/homepage/MealCard";
import { mealService } from "@/services/meal.service";
import { Meal } from "@/types/meal.type";
import Link from "next/link";

export default async function MealsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  // ✅ MUST await searchParams in Next 15
  const { sort } = await searchParams;

  const mealsRes = await mealService.getMeals({ limit: "20" });
  let meals: Meal[] = mealsRes?.data || [];

  // 🔥 Sorting
  if (sort === "low") {
    meals = [...meals].sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  }

  if (sort === "high") {
    meals = [...meals].sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">🍴 All Meals</h1>

        <div className="flex gap-3 text-sm">
          <Link
            href="/meals?sort=low"
            className={`px-4 py-2 border rounded-lg ${
              sort === "low" ? "bg-black text-white" : "hover:bg-muted"
            }`}
          >
            Price: Low → High
          </Link>

          <Link
            href="/meals?sort=high"
            className={`px-4 py-2 border rounded-lg ${
              sort === "high" ? "bg-black text-white" : "hover:bg-muted"
            }`}
          >
            Price: High → Low
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {meals.map((meal: Meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
}
