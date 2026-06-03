/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { env } from "@/env";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

// using direct API upload via FormData

export function CreateCategoryForm() {
  const form = useForm<
    { name: string; image: File | string | null },
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    never
  >({
    defaultValues: { name: "", image: null },
    
    onSubmit: async ({ value }) => {
      const t = toast.loading("Creating category...");

      try {
        const API_URL = env.API_URL;
        const formData = new FormData();
        formData.append("name", value.name);
        if ((value.image as any) instanceof File) {
          formData.append("image", value.image as File);
        } else if (typeof value.image === "string" && value.image) {
          // if it's a URL string, keep as-is
          formData.append("image", value.image);
        }

        const res = await fetch(`${API_URL}/api/categories`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

        const result = await res.json();

        if (!res.ok) {
          toast.error(result.message || "Failed to create category", { id: t });
          return;
        }

        toast.success("Category created successfully!", { id: t });
        form.reset();
      } catch (error) {
        toast.error("Failed to create category", { id: t });
      }
    },
  });

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl border-muted/40">
      <CardHeader>
        <CardTitle>Create Category</CardTitle>
        <CardDescription>Add a new meal category 🍽️</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <FieldGroup className="grid gap-6">
            {/* Name */}
            <form.Field name="name">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                    <input
                      id={field.name}
                      className="input input-bordered w-full"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. Italian"
                    />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            {/* Image Upload */}
            <form.Field name="image">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>Image</FieldLabel>
                        <input
                          id={field.name}
                          type="file"
                          accept="image/*"
                          className="w-full"
                          onChange={(e) => field.handleChange(e.target.files ? e.target.files[0] : null)}
                        />
                    {invalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          <Button type="submit" className="w-full">
            Create Category
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
