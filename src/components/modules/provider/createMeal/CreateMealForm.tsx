"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { createMealAction } from "@/actions/meal.action";
import { getCategories } from "@/actions/category.action";
import { useEffect, useState } from "react";
import { Category } from "@/services/category.service";

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

      toast.success("Meal created 🍔", { id: t });
      form.reset();
    },
  });

  return (
    <div className="max-w-xl mx-auto space-y-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Name */}
        <form.Field name="name">
          {(field) => (
            <input
              placeholder="Meal Name"
              className="input w-full"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        {/* Description */}
        <form.Field name="description">
          {(field) => (
            <textarea
              placeholder="Description"
              className="textarea w-full"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        {/* Price */}
        <form.Field name="price">
          {(field) => (
            <input
              type="number"
              className="input w-full"
              placeholder="Price"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
          )}
        </form.Field>

        {/* Category */}
        <form.Field name="categoryId">
          {(field) => (
            <select
              className="select w-full"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </form.Field>

        {/* Image */}
        <form.Field name="image">
          {(field) => (
            <input
              placeholder="Image URL"
              className="input w-full"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>

        {/* Featured */}
        <form.Field name="isFeatured">
          {(field) => (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
              />
              Featured Meal
            </label>
          )}
        </form.Field>

        <button className="btn w-full">Create Meal</button>
      </form>
    </div>
  );
}
