"use server";

import { categoryService, CategoryData } from "@/services/category.service";
import { updateTag } from "next/cache";

export const getCategories = async () => {
  return await categoryService.getCategories();
};

export const createCategoryAction = async (data: CategoryData) => {
  const res = await categoryService.createCategory(data);
  updateTag("categories"); 
  return res;
};
