"use server";

import { adminUserService } from "@/services/userauth.service";
import { revalidateTag } from "next/cache";

export const getAllUsersAction = async () => {
  return adminUserService.getAllUsers();
};

export const changeUserRoleAction = async (id: string, role: string) => {
  const res = await adminUserService.updateUserRole(id, role);
  revalidateTag("users", "max");
  return res;
};

export const changeUserStatusAction = async (id: string, status: string) => {
  const res = await adminUserService.updateUserStatus(id, status);
  revalidateTag("users", "max");
  return res;
};
