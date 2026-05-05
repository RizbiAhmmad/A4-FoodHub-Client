/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllProvidersAction } from "@/actions/provider.action";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Utensils } from "lucide-react";

export default async function ProvidersPage() {
  const { data: providers } = await getAllProvidersAction();

  return (
    <div className="container max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-orange-600">
          Our Partner Restaurants
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover the best food from our top-rated providers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {providers?.map((provider: any) => (
          <Card
            key={provider.id}
            className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-muted/40"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-muted">
              {provider.logo ? (
                <Image
                  src={provider.logo}
                  alt={provider.restaurantName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-orange-100">
                  <Utensils className="size-12 text-orange-400" />
                </div>
              )}
              <div className="absolute top-4 right-4">
                <Badge className="bg-green-500 hover:bg-green-600 border-none">
                  {provider.status}
                </Badge>
              </div>
            </div>

            <CardHeader>
              <CardTitle className="text-2xl font-bold group-hover:text-orange-600 transition-colors">
                {provider.restaurantName}
              </CardTitle>
              <CardDescription className="line-clamp-2 mt-2">
                {provider.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 text-orange-500 shrink-0" />
                <span className="truncate">{provider.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="size-4 text-orange-500 shrink-0" />
                <span>{provider.phone || "No phone provided"}</span>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-muted/40">
                <div className="text-sm font-medium">
                  <span className="text-orange-600 font-bold">
                    {provider.meals?.length || 0}
                  </span>{" "}
                  Meals available
                </div>
                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="hover:bg-orange-600 hover:text-white transition-colors"
                >
                  <Link href={`/providers/${provider.id}`}>View Menu</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {(!providers || providers.length === 0) && (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed">
          <Utensils className="size-16 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-muted-foreground">
            No restaurants found
          </h2>
          <p className="text-muted-foreground">
            Check back later for new providers!
          </p>
        </div>
      )}
    </div>
  );
}
