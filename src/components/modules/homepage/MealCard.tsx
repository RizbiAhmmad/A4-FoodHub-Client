import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Meal } from "@/types/meal.type"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"


export default function MealCard({ meal }: { meal: Meal }) {
  const avgRating =
    meal.reviews?.length
      ? (meal.reviews.reduce((a, r) => a + r.rating, 0) / meal.reviews.length).toFixed(1)
      : null

  return (
    <Card className="h-full overflow-hidden shadow-md hover:shadow-xl transition">
      <div className="relative h-52 w-full">
        <Image
          src={meal.image || "/placeholder.jpg"}
          alt={meal.name}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{meal.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{meal.provider.restaurantName}</p>
      </CardHeader>

      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground mb-3">
          {meal.description}
        </p>

        {meal.category && (
          <Badge variant="secondary">#{meal.category.name}</Badge>
        )}
      </CardContent>

     <CardFooter className="flex flex-col gap-3 items-start">
  <div className="flex w-full justify-between items-center">
    <span className="font-bold text-lg">৳ {meal.price}</span>

    {avgRating && (
      <div className="flex items-center gap-1 text-yellow-500">
        <Star size={16} />
        {avgRating}
      </div>
    )}
  </div>

  <Link href={`/meals/${meal.id}`} className="w-full">
    <Button className="w-full">View Details</Button>
  </Link>
</CardFooter>

    </Card>
  )
}
