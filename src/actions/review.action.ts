/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { reviewService } from "@/services/review.service";
import { updateTag } from "next/cache";

export const createReviewAction = async (data: any) => {
  const res = await reviewService.createReview(data);
  updateTag("my-reviews");
  return res;
};

export const updateReviewAction = async (mealId: string, data: any) => {
  const res = await reviewService.updateReview(mealId, data);
  updateTag("my-reviews");
  return res;
};

export const deleteReviewAction = async (mealId: string) => {
  const res = await reviewService.deleteReview(mealId);
  updateTag("my-reviews");
  return res;
};
