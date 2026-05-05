"use server";

import { categoryService, CategoryData } from "@/services/category.service";
import { revalidateTag } from "next/cache";

export const getCategories = async () => {
  return await categoryService.getCategories();
};

export const createCategoryAction = async (data: CategoryData) => {
  const res = await categoryService.createCategory(data);
  revalidateTag("categories", "page"); 
  return res;
};

export const deleteCategoryAction = async (id: string) => {
  const res = await categoryService.deleteCategory(id);

  if (!res.error) {
    revalidateTag("categories", "page"); // revalidate
  }

  return res;
};