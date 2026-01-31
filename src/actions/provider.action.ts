"use server"

import { providerService, ProviderProfileData } from "@/services/provider.service"

export async function createProviderProfileAction(data: ProviderProfileData) {
  return await providerService.createProfile(data)
}
