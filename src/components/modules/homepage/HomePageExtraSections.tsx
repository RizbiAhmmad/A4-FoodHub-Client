import { Truck, ShieldCheck, Star, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomepageExtraSections() {
  return (
    <div className="space-y-24 mt-20">
      {/*  Promo Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-linear-to-r from-orange-500 via-red-500 to-yellow-500 p-12 text-white">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-4xl font-extrabold">
            Hungry? We Deliver Happiness 🍽️
          </h2>
          <p className="text-lg opacity-90">
            Fresh, homemade meals delivered fast to your doorstep.
          </p>
          <Link href="/meals">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200">
              Order Now
            </Button>
          </Link>
        </div>
      </section>

      {/*  Why Choose Us */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose FoodHub?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <Utensils size={28} />
            </div>
            <h3 className="font-bold text-lg">Premium Quality</h3>
            <p className="text-sm text-muted-foreground">
              Carefully curated meals from verified chefs.
            </p>
          </div>

          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 text-green-600">
              <Truck size={28} />
            </div>
            <h3 className="font-bold text-lg">Fast Delivery</h3>
            <p className="text-sm text-muted-foreground">
              Get your food hot & fresh in minutes.
            </p>
          </div>

          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              <Star size={28} />
            </div>
            <h3 className="font-bold text-lg">Top Rated</h3>
            <p className="text-sm text-muted-foreground">
              Thousands of happy customers trust us.
            </p>
          </div>

          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <ShieldCheck size={28} />
            </div>
            <h3 className="font-bold text-lg">Secure Payment</h3>
            <p className="text-sm text-muted-foreground">
              100% safe & secure checkout system.
            </p>
          </div>
        </div>
      </section>

      {/*  Stats Section */}
      <section className="bg-muted py-16 rounded-3xl">
        <div className="grid md:grid-cols-3 gap-10 text-center max-w-5xl mx-auto">
          <div>
            <h3 className="text-4xl font-bold text-orange-600">10K+</h3>
            <p className="text-muted-foreground mt-2">Meals Delivered</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-orange-600">500+</h3>
            <p className="text-muted-foreground mt-2">Happy Customers</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-orange-600">4.9 ★</h3>
            <p className="text-muted-foreground mt-2">Average Rating</p>
          </div>
        </div>
      </section>

      {/*  Final CTA */}
      <section className="text-center py-20 bg-black text-white rounded-3xl">
        <h2 className="text-4xl font-bold mb-6">
          Ready To Order Your Favorite Meal?
        </h2>
        <Link href="/meals">
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
            Explore Menu
          </Button>
        </Link>
      </section>
    </div>
  );
}
