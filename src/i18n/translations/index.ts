
import { Language } from "@/contexts/LanguageContext";
import { combineTranslations } from "./utils";
import { commonTranslations } from "./common";
import { dashboardTranslations } from "./dashboard";
import { trackingTranslations } from "./tracking";
import { cardsTranslations } from "./cards"; 
import { recordsTranslations } from "./records";
import { userManagementTranslations } from "./userManagement";
import { settingsTranslations } from "./settings";
import { alertsTranslations } from "./alerts";
import { reportsTranslations } from "./reports";
import { locationsTranslations } from "./locations";

// Export the combined type from all translation categories
export type TranslationKeys = 
  keyof typeof commonTranslations.en |
  keyof typeof dashboardTranslations.en | 
  keyof typeof trackingTranslations.en |
  keyof typeof cardsTranslations.en |
  keyof typeof recordsTranslations.en |
  keyof typeof userManagementTranslations.en |
  keyof typeof settingsTranslations.en |
  keyof typeof alertsTranslations.en |
  keyof typeof reportsTranslations.en |
  keyof typeof locationsTranslations.en;

export type Translations = Record<TranslationKeys, string>;

// Combine all translation categories
export const translations = combineTranslations([
  commonTranslations,
  dashboardTranslations,
  trackingTranslations,
  cardsTranslations,
  recordsTranslations,
  userManagementTranslations,
  settingsTranslations,
  alertsTranslations,
  reportsTranslations,
  locationsTranslations
]);

export const useTranslation = (language: Language) => {
  return {
    t: (key: TranslationKeys, params?: Record<string, string>) => {
      let translation = translations[language]?.[key] || key;
      
      // Add interpolation support
      if (params) {
        Object.keys(params).forEach(param => {
          translation = translation.replace(`{${param}}`, params[param]);
        });
      }
      
      return translation;
    }
  };
};
