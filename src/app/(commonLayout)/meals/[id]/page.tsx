import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { mealService } from "@/services/meal.service";
import { Button } from "@/components/ui/button";
// import { OrderForm } from "@/components/modules/customer/order/OrderForm";
import Link from "next/link";

export default async function MealDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await mealService.getMealById(id);
  const meal = response.data;

  if (!meal) return <p className="text-center py-12 text-lg">Meal not found!</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden md:flex md:gap-8">
        {/* Left: Meal Image */}
        <div className="relative w-full md:w-1/2 h-96 md:h-auto">
          <Image
            src={meal.image || "/placeholder.jpg"}
            alt={meal.name}
            fill
            className="object-cover"
          />
          {meal.isFeatured && (
            <Badge className="absolute top-2 left-2 bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-lg">
              Featured
            </Badge>
          )}
        </div>

        {/* Right: Info */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold">{meal.name}</h1>
            <p className="text-sm text-muted-foreground">{meal.provider.restaurantName}</p>

            <div className="flex items-center gap-2 mt-2">
              {meal.category && (
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  #{meal.category.name}
                </Badge>
              )}
              
            </div>

            <p className="text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
              {meal.description}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <p className="text-2xl md:text-3xl font-bold text-primary">৳ {meal.price}</p>

            <Link href={`/order/${meal.id}`} className="w-full md:w-1/2">
  <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
    Order Now
  </Button>
</Link>


            <div className="mt-4 flex items-center gap-4">
              <Image
                src={meal.provider.logo || "/placeholder.jpg"}
                alt={meal.provider.restaurantName}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div className="text-sm">
                <p className="font-semibold">{meal.provider.restaurantName}</p>
                <p className="text-muted-foreground">{meal.provider.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
