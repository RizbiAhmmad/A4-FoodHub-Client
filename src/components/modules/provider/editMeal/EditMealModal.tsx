"use client";

import { useState } from "react";
import { updateMealAction, deleteMealAction } from "@/actions/meal.action";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProviderMeal } from "@/services/meal.service";

export default function EditMealModal({ meal }: { meal: ProviderMeal }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (formData: FormData) => {
    setLoading(true);
    await updateMealAction(meal.id, {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
    });
    setLoading(false);
    setOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteMealAction(meal.id);
    setLoading(false);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Edit or Delete</Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Meal</DialogTitle>
          </DialogHeader>

          <form action={handleUpdate} className="space-y-3">
            <Input name="name" defaultValue={meal.name} />
            <Textarea name="description" defaultValue={meal.description || ""} />
            <Input name="price" type="number" defaultValue={meal.price} />
            <Button type="submit" disabled={loading}>Save Changes</Button>
          </form>

          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            Delete Meal
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
