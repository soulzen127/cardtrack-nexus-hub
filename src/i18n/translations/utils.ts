
import { Language } from "@/contexts/LanguageContext";

// Helper type for category-specific translations
export type TranslationCategory = {
  [key in Language]: Record<string, string>;
};

// Combine multiple translation categories into one
export function combineTranslations(categories: TranslationCategory[]): Record<Language, Record<string, string>> {
  const result: Record<Language, Record<string, string>> = {
    en: {},
    zh_TW: {},
    ja: {}
  };
  
  for (const category of categories) {
    for (const lang of Object.keys(category) as Language[]) {
      result[lang] = {
        ...result[lang],
        ...category[lang]
      };
    }
  }
  
  return result;
}
