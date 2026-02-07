import { getMyMealsAction } from "@/actions/meal.action";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default async function MyMealsPage() {
  const { data: meals } = await getMyMealsAction();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Meals</h1>
        <Link href="/provider-dashboard/create-meal">
          <Button>Add New Meal</Button>
        </Link>
      </div>

      {meals?.length === 0 && (
        <p className="text-muted-foreground">You havenot added any meals yet.</p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meals?.map((meal) => (
          <Card key={meal.id} className="overflow-hidden shadow-md">
            <div className="relative h-44 w-full">
              <Image
                src={meal.image || "/placeholder.png"}
                alt={meal.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{meal.name}</h2>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {meal.description}
              </p>

              <div className="flex justify-between items-center pt-2">
                <span className="font-bold text-primary">৳ {meal.price}</span>
                <span className="text-xs bg-muted px-2 py-1 rounded">
                  {meal.category?.name || "No Category"}
                </span>
              </div>

              <div className="flex gap-2 pt-3">
                <Link href={`/dashboard/edit-meal/${meal.id}`} className="w-full">
                  <Button variant="secondary" className="w-full">
                    Edit
                  </Button>
                </Link>

                <Link href={`/dashboard/delete-meal/${meal.id}`} className="w-full">
                  <Button variant="destructive" className="w-full">
                    Delete
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
