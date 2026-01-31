"use server"

import { categoryService, CategoryData } from "@/services/category.service"

export async function createCategoryAction(data: CategoryData) {
  return await categoryService.createCategory(data)
}
