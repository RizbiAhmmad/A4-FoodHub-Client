/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCategories } from "@/actions/category.action";
import HomepageExtraSections from "@/components/modules/homepage/HomePageExtraSections";
import MealCard from "@/components/modules/homepage/MealCard";
import HeroCarousel from "@/components/modules/homepage/slider";
import { mealService } from "@/services/meal.service";
import { Meal } from "@/types/meal.type";
import Image from "next/image";
import Link from "next/link";

export default async function MealsPage() {
  const featuredMealsPromise = mealService.getMeals({ isFeatured: true });
  const mealsPromise = mealService.getMeals({ limit: "8" });
  const categoriesPromise = getCategories();

  const [featuredMeals, meals, categories] = await Promise.all([
    featuredMealsPromise,
    mealsPromise,
    categoriesPromise,
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <HeroCarousel></HeroCarousel>

      {/* Category Section */}
      {categories?.data?.length > 0 && (
        <section className="my-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            All Categories
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {categories.data.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/meals?cuisine=${cat.name}`}
                className="group"
              >
                <div className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition">
                  <Image
                    src={cat.image || "/placeholder.jpg"}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h3 className="text-white text-lg font-semibold">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <h1 className="text-4xl font-bold mt-8 text-center mb-8">🍽️ Meals</h1>

      {/* {featuredMeals?.data?.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Featured Meals</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {featuredMeals.data.map((meal: Meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </div>
        </>
      )}

      <h2 className="text-2xl font-bold mb-4">All Meals</h2> */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals?.data?.map((meal: Meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>

      <div>
        <HomepageExtraSections></HomepageExtraSections>
      </div>
    </div>
  );
}
