
import { TranslationCategory } from "../utils";

export const securitySettingsTranslations: TranslationCategory = {
  en: {
    passwordPolicy: "Password Policy",
    minimumPasswordLength: "Minimum Password Length",
    requireSpecialCharacters: "Require special characters",
    requireNumbers: "Require numbers",
    requireUppercaseLowercase: "Require uppercase and lowercase letters",
    passwordExpiryDays: "Password Expiry (Days)",
    failedLoginAttempts: "Failed Login Attempts Before Lockout",
    sessionTimeout: "Session Timeout (Minutes)",
    twoFactorAuthentication: "Two-Factor Authentication (2FA)",
    enableTwoFactor: "Enable Two-Factor Authentication",
    requiredForAdmins: "Required for administrators",
    optionalForUsers: "Optional for standard users",
  },
  zh_TW: {
    passwordPolicy: "密碼政策",
    minimumPasswordLength: "最小密碼長度",
    requireSpecialCharacters: "需要特殊字符",
    requireNumbers: "需要數字",
    requireUppercaseLowercase: "需要大小寫字母",
    passwordExpiryDays: "密碼過期（天）",
    failedLoginAttempts: "鎖定前的失敗登錄嘗試次數",
    sessionTimeout: "會話超時（分鐘）",
    twoFactorAuthentication: "雙因素認證 (2FA)",
    enableTwoFactor: "啟用雙因素認證",
    requiredForAdmins: "管理員必需",
    optionalForUsers: "標準用戶可選",
  },
  ja: {
    passwordPolicy: "パスワードポリシー",
    minimumPasswordLength: "最小パスワード長",
    requireSpecialCharacters: "特殊文字が必要",
    requireNumbers: "数字が必要",
    requireUppercaseLowercase: "大文字と小文字が必要",
    passwordExpiryDays: "パスワード有効期限（日）",
    failedLoginAttempts: "ロックアウト前の失敗したログイン試行",
    sessionTimeout: "セッションタイムアウト（分）",
    twoFactorAuthentication: "二要素認証（2FA）",
    enableTwoFactor: "二要素認証を有効にする",
    requiredForAdmins: "管理者には必須",
    optionalForUsers: "標準ユーザーにはオプション",
  }
};
