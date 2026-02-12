"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  createReviewAction,
  updateReviewAction,
  deleteReviewAction,
} from "@/actions/review.action";

export default function ReviewBox({ mealId }: { mealId: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleAdd = async () => {
    const t = toast.loading("Adding review...");
    const res = await createReviewAction({ mealId, rating, comment });

    if (res.error) return toast.error(res.error, { id: t });

    toast.success("Review added successfully 🎉", { id: t });
    setEditMode(true);
  };

  const handleUpdate = async () => {
    const t = toast.loading("Updating review...");
    const res = await updateReviewAction(mealId, { rating, comment });

    if (res.error) return toast.error(res.error, { id: t });

    toast.success("Review updated ✨", { id: t });
  };

  const handleDelete = async () => {
    const t = toast.loading("Deleting review...");
    const res = await deleteReviewAction(mealId);

    if (res.error) return toast.error(res.error, { id: t });

    toast.success("Review deleted 🗑️", { id: t });
    setEditMode(false);
    setComment("");
  };

  return (
    <div className="mt-3 rounded-lg border border-border bg-gray-50 dark:bg-gray-900 p-4 space-y-3">
      {/* Rating */}
      <select
        className="input input-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Star
          </option>
        ))}
      </select>

      {/* Comment */}
      <textarea
        className="textarea textarea-bordered w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-muted-foreground"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Buttons */}
      {!editMode ? (
        <button
          onClick={handleAdd}
          className="w-full rounded-md bg-primary text-primary-foreground py-2 font-medium hover:opacity-90 transition"
        >
          Add Review
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="w-full rounded-md bg-blue-600 text-white py-2 hover:opacity-90 transition"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="w-full rounded-md bg-red-600 text-white py-2 hover:opacity-90 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
