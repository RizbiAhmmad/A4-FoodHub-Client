import React from "react";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/constants/blog-data";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, User } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="container max-w-7xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">FoodHub Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our latest stories, recipes, and tips for a better culinary
          experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Card
            key={blog.id}
            className="group overflow-hidden flex flex-col hover:shadow-xl transition-all duration-300 border-none bg-card/50 backdrop-blur-sm border border-border/50"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-orange-500 hover:bg-orange-600 border-none">
                  {blog.category}
                </Badge>
              </div>
            </div>

            <CardHeader className="flex-1">
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3" />
                  {blog.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="size-3" />
                  {blog.author}
                </span>
              </div>
              <CardTitle className="line-clamp-2 group-hover:text-orange-500 transition-colors">
                {blog.title}
              </CardTitle>
              <CardDescription className="line-clamp-3 mt-2">
                {blog.description}
              </CardDescription>
            </CardHeader>

            <CardFooter className="pt-0">
              <Button
                asChild
                variant="ghost"
                className="p-0 hover:bg-transparent hover:text-orange-600 group-hover:translate-x-1 transition-transform"
              >
                <Link href={`/blogs/${blog.id}`}>
                  Read More <span className="ml-1">→</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
