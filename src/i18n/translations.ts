
import { Language } from "@/contexts/LanguageContext";

type TranslationKeys = 
  | "dashboard" 
  | "cards" 
  | "tracking" 
  | "records" 
  | "reports" 
  | "alerts" 
  | "users" 
  | "settings" 
  | "logout"
  | "language"
  | "saveChanges"
  | "cancel";

export type Translations = Record<TranslationKeys, string>;
type TranslationMap = Record<Language, Translations>;

export const translations: TranslationMap = {
  en: {
    dashboard: "Dashboard",
    cards: "Cards",
    tracking: "Tracking",
    records: "Records",
    reports: "Reports",
    alerts: "Alerts",
    users: "Users",
    settings: "Settings",
    logout: "Logout",
    language: "Language",
    saveChanges: "Save Changes",
    cancel: "Cancel"
  },
  zh_TW: {
    dashboard: "儀表板",
    cards: "卡片",
    tracking: "追蹤",
    records: "記錄",
    reports: "報告",
    alerts: "警報",
    users: "用戶",
    settings: "設置",
    logout: "登出",
    language: "語言",
    saveChanges: "儲存變更",
    cancel: "取消"
  },
  ja: {
    dashboard: "ダッシュボード",
    cards: "カード",
    tracking: "トラッキング",
    records: "記録",
    reports: "レポート",
    alerts: "アラート",
    users: "ユーザー",
    settings: "設定",
    logout: "ログアウト",
    language: "言語",
    saveChanges: "変更を保存",
    cancel: "キャンセル"
  }
};

export const useTranslation = (language: Language) => {
  return {
    t: (key: TranslationKeys) => translations[language][key] || key
  };
};
