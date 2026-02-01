"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { createMealAction } from "@/actions/meal.action";
import { getCategories } from "@/actions/category.action";
import { useEffect, useState } from "react";
import { Category } from "@/services/category.service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CreateMealForm() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const res = await getCategories();
      setCategories(res.data || []);
    })();
  }, []);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      categoryId: "",
      image: "",
      isFeatured: false,
    },
    onSubmit: async ({ value }) => {
      const t = toast.loading("Creating meal...");
      const res = await createMealAction(value);

      if (res.error) {
        toast.error(res.error.message, { id: t });
        return;
      }

      toast.success("Meal created successfully ", { id: t });
      form.reset();
    },
  });

  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-muted/40">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Meal</CardTitle>
        <CardDescription>
          Create a delicious meal for your restaurant menu
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          {/* Meal Name */}
          <form.Field name="name">
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">Meal Name</label>
                <input
                  className="input input-bordered w-full"
                  placeholder="e.g. Chicken Burger"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          {/* Description */}
          <form.Field name="description">
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="textarea textarea-bordered w-full h-24"
                  placeholder="Short description of the meal..."
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          {/* Price + Category */}
          <div className="grid md:grid-cols-2 gap-4">
            <form.Field name="price">
              {(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (৳)</label>
                  <input
                    type="number"
                    className="input input-bordered w-full"
                    placeholder="10.99"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="categoryId">
              {(field) => (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select
                    className="select select-bordered w-full bg-black text-white"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    <option value="" className="bg-black text-white">
                      Select category
                    </option>

                    {categories.map((cat) => (
                      <option
                        key={cat.id}
                        value={cat.id}
                        className="bg-black text-white"
                      >
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </form.Field>
          </div>

          {/* Image */}
          <form.Field name="image">
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">Image URL</label>
                <input
                  className="input input-bordered w-full"
                  placeholder="https://example.com/image.jpg"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>

          {/* Featured Switch */}
          <form.Field name="isFeatured">
            {(field) => (
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div>
                  <p className="font-medium">Featured Meal</p>
                  <p className="text-sm text-muted-foreground">
                    Show this meal on homepage highlights
                  </p>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                />
              </div>
            )}
          </form.Field>

          <Button type="submit" className="w-full text-lg">
            Create Meal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
