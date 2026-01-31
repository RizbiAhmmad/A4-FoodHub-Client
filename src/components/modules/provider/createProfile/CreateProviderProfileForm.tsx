"use client";

import { createProviderProfileAction } from "@/actions/provider.action";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  restaurantName: z.string().min(3, "Restaurant name is too short"),
  address: z.string().min(5, "Address is required"),
  description: z.string(),
  phone: z.string(),
  logo: z.string(),
});

export function CreateProviderProfileForm() {
  const form = useForm({
    defaultValues: {
      restaurantName: "",
      address: "",
      description: "",
      phone: "",
      logo: "",
    },
    validators: { onSubmit: schema },

    onSubmit: async ({ value }) => {
      const t = toast.loading("Creating profile...");
      const res = await createProviderProfileAction(value);

      if (res.error) {
        toast.error(res.error.message, { id: t });
        return;
      }

      toast.success("Profile Created! Waiting for approval ⏳", { id: t });
    },
  });

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl border-muted/40">
      <CardHeader>
        <CardTitle className="text-2xl">Create Restaurant Profile</CardTitle>
        <CardDescription>
          Add your restaurant details to start selling meals 🍽️
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="provider-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <FieldGroup className="grid md:grid-cols-2 gap-6">
            {/* Restaurant Name */}
            <form.Field name="restaurantName">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Restaurant Name
                    </FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. Food Palace"
                    />
                    {invalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Phone */}
            <form.Field name="phone">
              {(field) => {
                const invalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={invalid}>
                    <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="+8801XXXXXXXXX"
                    />
                    {invalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>

          {/* Address */}
          <form.Field name="address">
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                  <Textarea
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Full restaurant address"
                  />
                  {invalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Description */}
          <form.Field name="description">
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                  <Textarea
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Tell customers about your restaurant..."
                  />
                  {invalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Logo */}
          <form.Field name="logo">
            {(field) => {
              const invalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={invalid}>
                  <FieldLabel htmlFor={field.name}>Logo URL</FieldLabel>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                  {invalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Button
            type="submit"
            className="w-full h-11 text-base font-semibold"
          >
            Create Restaurant
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
