import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Meal } from "@/types/meal.type";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MealCard({ meal }: { meal: Meal }) {
  const avgRating = meal.reviews?.length
    ? (
        meal.reviews.reduce((a, r) => a + r.rating, 0) / meal.reviews.length
      ).toFixed(1)
    : null;

  return (
    <Card className="group relative h-full overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem] flex flex-col p-2">
      {/* Image Container with Hover Zoom and Rounded Corners */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem]">
        <Image
          src={meal.image || "/placeholder.jpg"}
          alt={meal.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

        {/* Category Badge - Floating over image */}
        {meal.category && (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-white/90 dark:bg-black/80 text-black dark:text-white backdrop-blur-md border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
              {meal.category.name}
            </Badge>
          </div>
        )}

        {/* Rating - Floating over image */}
        {avgRating && (
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-white/90 dark:bg-black/80 text-orange-500 px-2 py-1 rounded-full text-[10px] font-bold shadow-sm backdrop-blur-md">
            <Star size={10} fill="currentColor" />
            {avgRating}
          </div>
        )}
      </div>

      {/* Content Section with Reduced Padding */}
      <div className="px-3 py-2 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <div className="flex-grow mr-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 leading-tight">
              {meal.name}
            </h3>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {meal.provider.restaurantName}
            </p>
          </div>
          <div className="text-lg font-black text-orange-500 whitespace-nowrap">
            ৳{meal.price}
          </div>
        </div>

        <div className="mt-auto pt-3">
          <Link href={`/meals/${meal.id}`} className="block">
            <Button className="w-full h-10 bg-orange-500 hover:bg-gray-900 dark:hover:bg-white dark:hover:text-black text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 transform group-hover:scale-[1.02] shadow-[0_4px_12px_rgba(249,115,22,0.2)] group-hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)]">
              View Details
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
