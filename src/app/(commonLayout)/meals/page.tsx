import MealCard from "@/components/modules/homepage/MealCard";
import { mealService } from "@/services/meal.service";
import { categoryService } from "@/services/category.service";
import { Meal } from "@/types/meal.type";
import MealFilters from "./MealFilters";
import MealSearch from "./MealSearch";
import Pagination from "./Pagination";

export default async function MealsPage({
  searchParams,
}: {
  searchParams: Promise<{
    sort?: string;
    searchTerm?: string;
    cuisine?: string;
    page?: string;
  }>;
}) {
  const params = await searchParams;
  const { sort, searchTerm, cuisine, page = "1" } = params;

  // Map UI sort to backend params
  const sortBy = sort ? "price" : "createdAt";
  const sortOrder = sort === "low" ? "asc" : "desc";

  // Parallel fetch for meals and categories
  const [mealsRes, categoriesRes] = await Promise.all([
    mealService.getMeals({
      limit: "9",
      page,
      searchTerm,
      cuisine,
      sortBy,
      sortOrder,
    }),
    categoryService.getCategories(),
  ]);

  const meals: Meal[] = mealsRes?.data || [];
  const categories = categoriesRes?.data || [];
  const meta = mealsRes?.meta || { page: 1, totalPages: 1 };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
          Explore Our Delicious <span className="text-orange-500">Meals</span>
        </h1>
        <MealSearch />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <MealFilters categories={categories} />
        </aside>

        {/* Main Content: Meal Grid */}
        <main className="flex-grow">
          {meals.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {meals.map((meal: Meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>

              <Pagination
                currentPage={Number(page)}
                totalPages={meta.totalPages}
                searchParams={params}
              />
            </>
          ) : (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
              <p className="text-xl text-gray-500 mb-2 font-bold">No meals found!</p>
              <p className="text-gray-400">Try adjusting your filters or search term.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
