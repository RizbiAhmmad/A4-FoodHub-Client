import MealCard from "@/components/modules/homepage/MealCard"
import HeroCarousel from "@/components/modules/homepage/slider"
import { mealService } from "@/services/meal.service"
import { Meal } from "@/types/meal.type"

export default async function MealsPage() {
  const featuredMealsPromise = mealService.getMeals({ isFeatured: true })
  const mealsPromise = mealService.getMeals({ limit: "6" })

  const [featuredMeals, meals] = await Promise.all([
    featuredMealsPromise,
    mealsPromise,
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
        <HeroCarousel></HeroCarousel>
      <h1 className="text-4xl font-bold mt-8 text-center mb-8">🍽️ Meals</h1>

      {featuredMeals?.data?.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Featured Meals</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {featuredMeals.data.map((meal: Meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </>
      )}

      <h2 className="text-2xl font-bold mb-4">All Meals</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {meals?.data?.map((meal: Meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  )
}
