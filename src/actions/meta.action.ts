"use server";

import { metaService } from "@/services/meta.service";

export const getAdminAnalyticsAction = async () => {
  return await metaService.getAdminAnalytics();
};
