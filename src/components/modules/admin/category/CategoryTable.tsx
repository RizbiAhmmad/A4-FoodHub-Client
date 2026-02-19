"use client";

import { deleteCategoryAction } from "@/actions/category.action";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
  image?: string;
}

export function CategoryTable({ categories }: { categories: Category[] }) {
  const handleDelete = async (id: string) => {
    const t = toast.loading("Deleting category...");

    const res = await deleteCategoryAction(id);

    if (res.error) {
      toast.error(res.error.message, { id: t });
      return;
    }

    toast.success("Category deleted successfully!", { id: t });
  };

  return (
    <div className="bg-card mx-auto max-w-xl rounded-xl shadow-lg p-6">
      <h2 className="text-xl text-center font-bold mb-6">All Categories</h2>

      <div className="space-y-4">
        {categories?.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between border p-4 rounded-lg"
          >
            <div className="flex items-center gap-4">
              {cat.image && (
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-14 h-14 rounded-md object-cover"
                />
              )}
              <span className="font-medium">{cat.name}</span>
            </div>

            <Button
              variant="destructive"
              onClick={() => handleDelete(cat.id)}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
