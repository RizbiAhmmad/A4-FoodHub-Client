"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    id: 1,
    title: "Delicious Homemade Meals",
    subtitle: "Fresh. Healthy. Delivered to your door.",
    price: "Starting from ৳199",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200",
  },
  {
    id: 2,
    title: "Chef’s Special Dishes",
    subtitle: "Experience restaurant-quality meals at home.",
    price: "Today’s Special Menu",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200",
  },
  {
    id: 3,
    title: "Healthy & Organic Food",
    subtitle: "Good food = Good mood.",
    price: "Nutritious Choices",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200",
  },
  {
    id: 4,
    title: "Fast Delivery Meals",
    subtitle: "Hot & fresh meals in minutes.",
    price: "Order Now",
    image: "https://plus.unsplash.com/premium_photo-1666353535582-9268ce1a981c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZCUyMGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D?w=1200",

  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden rounded-2xl">
      <div
        className="flex h-full transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full relative">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent">
              <div className="h-full max-w-7xl mx-auto px-6 flex items-center">
                <div className="text-white max-w-xl space-y-4">
                  <h1 className="text-4xl md:text-6xl font-bold">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200">
                    {slide.subtitle}
                  </p>
                  <p className="text-2xl font-semibold">
                    {slide.price}
                  </p>
                  <Button className="mt-4 bg-white text-black hover:bg-gray-200">
                    Explore Meals
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() =>
          setCurrent((current - 1 + slides.length) % slides.length)
        }
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() =>
          setCurrent((current + 1) % slides.length)
        }
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
      >
        <ChevronRight />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 w-3 rounded-full transition ${
              current === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
