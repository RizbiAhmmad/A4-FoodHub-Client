"use client";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { createOrderAction } from "@/actions/order.action";
import { Button } from "@/components/ui/button";

export function OrderForm({ mealId }: { mealId: string }) {
  const form = useForm({
    defaultValues: {
      quantity: 1,
      address: "",
      phone: "",
    },

    onSubmit: async ({ value }) => {
      const t = toast.loading("Placing order...");

      const payload = {
        address: value.address,
        phone: value.phone,
        items: [
          {
            mealId: mealId,
            quantity: value.quantity,
          },
        ],
      };

      const res = await createOrderAction(payload);

      if (res?.error) {
        toast.error(res.error.message, { id: t });
        return;
      }

      toast.success("Order placed successfully!", { id: t });
      form.reset();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      {/* Quantity */}
      <form.Field name="quantity">
        {(field) => (
          <input
            type="number"
            min={1}
            className="input input-bordered w-full"
            value={field.state.value}
            onChange={(e) => field.handleChange(Number(e.target.value))}
          />
        )}
      </form.Field>

      {/* Address */}
      <form.Field name="address">
        {(field) => (
          <input
            className="input input-bordered w-full"
            placeholder="Delivery Address"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      </form.Field>

      {/* Phone */}
      <form.Field name="phone">
        {(field) => (
          <input
            className="input input-bordered w-full"
            placeholder="Phone Number"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      </form.Field>

      <Button type="submit" className="w-full bg-orange-500">
        Confirm Order
      </Button>
    </form>
  );
}
