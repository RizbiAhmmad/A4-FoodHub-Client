"use server";

import { providerService, ProviderProfileData } from "@/services/provider.service";
import { revalidateTag } from "next/cache";

export const getAllProvidersAction = async () => {
  return await providerService.getAllProviders();
};

export const getProviderByIdAction = async (id: string) => {
  return await providerService.getProviderById(id);
};

export const createProviderProfileAction = async (data: ProviderProfileData) => {
  const res = await providerService.createProfile(data);
  revalidateTag("provider-profile", "page");
  return res;
};
