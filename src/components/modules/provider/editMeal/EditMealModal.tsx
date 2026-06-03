"use client";

import { useState } from "react";
import { updateMealAction, deleteMealAction } from "@/actions/meal.action";
import { env } from "@/env";
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
    try {
      const imageField = formData.get("image");

      if (imageField && (imageField as any) instanceof File) {
        const API_URL = env.API_URL;
        const uploadData = new FormData();
        uploadData.append("name", formData.get("name") as string);
        uploadData.append("description", formData.get("description") as string);
        uploadData.append("price", String(formData.get("price")));
        uploadData.append("image", imageField);

        await fetch(`${API_URL}/api/meals/${meal.id}`, {
          method: "PATCH",
          body: uploadData,
          credentials: "include",
        });
      } else {
        await updateMealAction(meal.id, {
          name: formData.get("name") as string,
          description: formData.get("description") as string,
          price: Number(formData.get("price")),
          image: (formData.get("image") as string) || undefined,
        });
      }
    } catch (err) {
      // ignore here; could surface error handling
    }
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
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Edit or Delete
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Meal</DialogTitle>
          </DialogHeader>

          <form action={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Meal Name</label>
              <Input name="name" defaultValue={meal.name} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                name="description"
                defaultValue={meal.description || ""}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Price (৳)</label>
              <Input name="price" type="number" defaultValue={meal.price} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Image</label>
              <Input
                name="image"
                defaultValue={meal.image || ""}
                placeholder="Leave blank to keep existing image or upload a new file"
              />
              <input type="file" name="image" accept="image/*" />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              Save Changes
            </Button>
          </form>

          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            Delete Meal
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
