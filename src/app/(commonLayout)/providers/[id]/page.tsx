/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getProviderByIdAction } from "@/actions/provider.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Utensils,
  Star,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProviderDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function ProviderDetailsPage({
  params,
}: ProviderDetailsProps) {
  const { id } = await params;
  const { data: provider } = await getProviderByIdAction(id);

  if (!provider) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold">Restaurant not found</h1>
        <Button asChild className="mt-4">
          <Link href="/providers">Back to list</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] w-full">
        <Image
          src={
            provider.logo ||
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          }
          alt={provider.restaurantName}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="container relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-end pb-12">
          <Button
            asChild
            variant="ghost"
            className="absolute top-8 left-4 text-white hover:bg-white/20"
          >
            <Link href="/providers">
              <ArrowLeft className="mr-2 size-4" /> Back
            </Link>
          </Button>

          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="relative size-32 md:size-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white shrink-0">
              {provider.logo ? (
                <Image
                  src={provider.logo}
                  alt={provider.restaurantName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-orange-100">
                  <Utensils className="size-16 text-orange-400" />
                </div>
              )}
            </div>
            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-bold">
                  {provider.restaurantName}
                </h1>
                <Badge className="bg-green-500 border-none">Open</Badge>
              </div>
              <p className="text-white/80 text-lg max-w-2xl mb-4 leading-relaxed line-clamp-2">
                {provider.description}
              </p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full border border-white/20">
                  <MapPin className="size-4 text-orange-400" />
                  <span>{provider.address}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full border border-white/20">
                  <Phone className="size-4 text-orange-400" />
                  <span>{provider.phone}</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full border border-white/20">
                  <Star className="size-4 text-yellow-400 fill-yellow-400" />
                  <span>4.8 (120+ reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Our Menu</h2>
            <p className="text-muted-foreground">
              Select from our delicious range of meals
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="px-4 py-1">
              Appetizers
            </Badge>
            <Badge
              variant="outline"
              className="px-4 py-1 bg-orange-50 text-orange-600 border-orange-200"
            >
              Main Course
            </Badge>
            <Badge variant="outline" className="px-4 py-1">
              Desserts
            </Badge>
          </div>
        </div>

        <Separator className="mb-10" />

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {provider.meals?.map((meal: any) => (
            <Card
              key={meal.id}
              className="group relative h-full overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem] flex flex-col p-2"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-[1.5rem]">
                <Image
                  src={
                    meal.image ||
                    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop"
                  }
                  alt={meal.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                <div className="absolute top-3 left-3 z-10">
                  <Badge className="bg-white/90 dark:bg-black/80 text-black dark:text-white backdrop-blur-md border-none px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                    {provider.restaurantName}
                  </Badge>
                </div>
              </div>

              <div className="px-3 py-2 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-grow mr-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 leading-tight">
                      {meal.name}
                    </h3>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                      {meal.description || "Delicious meal from our kitchen."}
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
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {(!provider.meals || provider.meals.length === 0) && (
          <div className="text-center py-20 bg-white rounded-3xl border border-muted/40 shadow-sm">
            <Utensils className="size-16 text-muted-foreground/20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">No meals available yet</h3>
            <p className="text-muted-foreground">
              This restaurant hasn&apos;t added any meals to their menu yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
