"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

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

import { createCategoryAction } from "@/actions/category.action";

export function CreateCategoryForm() {
  const form = useForm({
    defaultValues: { name: "", image: "" },
    
    onSubmit: async ({ value }) => {
      const t = toast.loading("Creating category...");
      const res = await createCategoryAction(value);

      if (res.error) {
        toast.error(res.error.message, { id: t });
        return;
      }

      toast.success("Category created successfully!", { id: t });
      form.reset();
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

            {/* Image URL */}
            <form.Field name="image">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                    <input
                      id={field.name}
                      className="input input-bordered w-full"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="https://example.com/image.png"
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
