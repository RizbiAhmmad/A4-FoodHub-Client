/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { reviewService } from "@/services/review.service";
import { revalidateTag } from "next/cache";

export const createReviewAction = async (data: any) => {
  const res = await reviewService.createReview(data);
  revalidateTag("my-reviews", "page");
  return res;
};

export const updateReviewAction = async (mealId: string, data: any) => {
  const res = await reviewService.updateReview(mealId, data);
  revalidateTag("my-reviews", "page");
  return res;
};

export const deleteReviewAction = async (mealId: string) => {
  const res = await reviewService.deleteReview(mealId);
  revalidateTag("my-reviews", "page");
  return res;
};

export const getMyReviewsAction = async () => {
  return await reviewService.getMyReviews();
};
