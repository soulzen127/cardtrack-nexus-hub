
import React, { createContext, useState, useContext, ReactNode } from "react";

export type Language = "en" | "zh_TW" | "ja" | "ko" | "fr" | "es" | "de";
export type LanguageLabels = Record<Language, string>;

export const languageLabels: LanguageLabels = {
  en: "English",
  zh_TW: "繁體中文",
  ja: "日本語",
  ko: "한국어",
  fr: "Français",
  de: "Deutsch",
  es: "Español"
};

// Flag emoji codes for each language
export const languageFlags: Record<Language, string> = {
  en: "🇺🇸", // USA
  zh_TW: "🇹🇼", // Taiwan
  ja: "🇯🇵", // Japan
  ko: "🇰🇷", // Korea
  fr: "🇫🇷", // France
  es: "🇪🇸", // Spain
  de: "🇩🇪", // Germany
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Check if we're in a browser environment before using localStorage
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && ["en", "zh_TW", "ja", "ko", "fr", "es", "de"].includes(savedLanguage)) {
        return savedLanguage;
      }
      
      if (typeof navigator !== 'undefined') {
        const browserLang = navigator.language;
        if (browserLang.startsWith("zh")) return "zh_TW";
        if (browserLang.startsWith("ja")) return "ja";
        if (browserLang.startsWith("ko")) return "ko";
        if (browserLang.startsWith("fr")) return "fr";
        if (browserLang.startsWith("es")) return "es";
        if (browserLang.startsWith("de")) return "de";
      }
    }
    return "en";
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const handleSetLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("language", newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
