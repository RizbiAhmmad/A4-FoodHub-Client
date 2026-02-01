"use server";

import { providerService, ProviderProfileData } from "@/services/provider.service";
import { updateTag } from "next/cache";

export const getProviderProfile = async () => {
  return await providerService.getProfile();
};

export const createProviderProfileAction = async (
  data: ProviderProfileData
) => {
  const res = await providerService.createProfile(data);
  updateTag("provider-profile"); // revalidate
  return res;
};
