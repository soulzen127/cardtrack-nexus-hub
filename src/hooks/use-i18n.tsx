
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/i18n/translations";

export const useI18n = () => {
  const { language } = useLanguage();
  const { t } = useTranslation(language);
  
  return { t, language };
};
