
import { Language } from "@/contexts/LanguageContext";
import { TranslationCategory } from "../utils";
import { generalSettingsTranslations } from "./general";
import { mapsLocationSettingsTranslations } from "./maps-location";
import { notificationSettingsTranslations } from "./notifications";
import { securitySettingsTranslations } from "./security";
import { appearanceSettingsTranslations } from "./appearance";

// Combine all settings translation categories
export const settingsTranslations: TranslationCategory = {
  en: {
    ...generalSettingsTranslations.en,
    ...mapsLocationSettingsTranslations.en,
    ...notificationSettingsTranslations.en,
    ...securitySettingsTranslations.en,
    ...appearanceSettingsTranslations.en,
    // Common settings translations
    systemSettings: "System Settings",
    configuration: "Configuration",
    manageSettings: "Manage system settings and preferences",
    generalSettings: "General Settings",
    mapsAndLocation: "Maps & Location",
    notificationSettings: "Notification Settings",
    securitySettings: "Security Settings",
    appearance: "Appearance",
    settingsSaved: "Settings saved successfully",
  },
  zh_TW: {
    ...generalSettingsTranslations.zh_TW,
    ...mapsLocationSettingsTranslations.zh_TW,
    ...notificationSettingsTranslations.zh_TW,
    ...securitySettingsTranslations.zh_TW,
    ...appearanceSettingsTranslations.zh_TW,
    // Common settings translations
    systemSettings: "系統設置",
    configuration: "配置",
    manageSettings: "管理系統設置和偏好",
    generalSettings: "一般設置",
    mapsAndLocation: "地圖和位置",
    notificationSettings: "通知設置",
    securitySettings: "安全設置",
    appearance: "外觀",
    settingsSaved: "設置保存成功",
  },
  ja: {
    ...generalSettingsTranslations.ja,
    ...mapsLocationSettingsTranslations.ja,
    ...notificationSettingsTranslations.ja,
    ...securitySettingsTranslations.ja,
    ...appearanceSettingsTranslations.ja,
    // Common settings translations
    systemSettings: "システム設定",
    configuration: "構成",
    manageSettings: "システム設定と設定を管理する",
    generalSettings: "一般設定",
    mapsAndLocation: "マップと位置",
    notificationSettings: "通知設定",
    securitySettings: "セキュリティ設定",
    appearance: "外観",
    settingsSaved: "設定が正常に保存されました",
  }
};
