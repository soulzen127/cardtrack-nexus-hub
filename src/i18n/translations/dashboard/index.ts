
import { TranslationCategory } from "../utils";
import { dashboardMainTranslations } from "./main";
import { dashboardStatsTranslations } from "./stats";
import { dashboardTimelineTranslations } from "./timeline";
import { dashboardExportTranslations } from "./export";
import { dashboardSearchTranslations } from "./search";
import { combineTranslations } from "../utils";

// Combine all dashboard-related translation categories
export const dashboardTranslations: TranslationCategory = combineTranslations([
  dashboardMainTranslations,
  dashboardStatsTranslations,
  dashboardTimelineTranslations,
  dashboardExportTranslations,
  dashboardSearchTranslations
]);
