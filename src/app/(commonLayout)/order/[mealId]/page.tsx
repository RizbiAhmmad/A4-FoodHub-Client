import { OrderForm } from "@/components/modules/customer/order/OrderForm";
import { mealService } from "@/services/meal.service";
import Image from "next/image";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ mealId: string }>;
}) {
  const { mealId } = await params;

  const res = await mealService.getMealById(mealId);
  const meal = res.data;

  if (!meal) {
    return <p className="text-center py-10 text-lg">Meal not found</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      {/* Meal Summary */}
      <div className="flex gap-4 items-center bg-muted/40 p-4 rounded-xl">
        <Image
          src={meal.image || "/placeholder.jpg"}
          alt={meal.name}
          width={90}
          height={90}
          className="rounded-lg object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{meal.name}</h2>
          <p className="text-muted-foreground text-sm">
            {meal.provider.restaurantName}
          </p>
          <p className="font-semibold text-primary">৳ {meal.price}</p>
        </div>
      </div>

      {/* Order Form */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Delivery Details</h3>
        <OrderForm mealId={mealId} />
      </div>
    </div>
  );
}
