
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
  | "cancel"
  // Dashboard translations
  | "totalActiveCards"
  | "trackedLocations"
  | "activeAlerts"
  | "reportsGenerated"
  | "from"
  | "lastMonth"
  | "recentAlerts"
  | "latestAlertsNotifications"
  | "recentActivities"
  | "recentSystemUserActions"
  | "viewAllAlerts"
  | "viewAllActivities"
  | "locationOverview"
  | "geographicDistribution"
  | "mapViewAvailable"
  | "goToTracking"
  | "export"
  | "refreshData"
  | "geofenceAlert"
  | "cardLeftZone"
  | "systemAlert"
  | "databaseBackup"
  | "cardLost"
  | "cardIssued"
  | "cardIssuedTo"
  | "locationUpdated"
  | "userLogin"
  | "adminLogin"
  | "reportGenerated"
  | "monthlyReport";

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
    cancel: "Cancel",
    // Dashboard translations
    totalActiveCards: "Total Active Cards",
    trackedLocations: "Tracked Locations",
    activeAlerts: "Active Alerts",
    reportsGenerated: "Reports Generated",
    from: "from",
    lastMonth: "last month",
    recentAlerts: "Recent Alerts",
    latestAlertsNotifications: "Latest system alerts and notifications",
    recentActivities: "Recent Activities",
    recentSystemUserActions: "Recent system and user actions",
    viewAllAlerts: "View All Alerts",
    viewAllActivities: "View All Activities",
    locationOverview: "Location Overview",
    geographicDistribution: "Geographic distribution of active cards",
    mapViewAvailable: "Map view will be available once connected to Mapbox or Google Maps API",
    goToTracking: "Go to Tracking",
    export: "Export",
    refreshData: "Refresh Data",
    geofenceAlert: "Geofence Alert",
    cardLeftZone: "Card #5643 left authorized zone",
    systemAlert: "System Alert",
    databaseBackup: "Database backup completed",
    cardLost: "Card #8921 reported lost",
    cardIssued: "Card Issued",
    cardIssuedTo: "Card #3389 was issued to John Smith",
    locationUpdated: "Card #5432 location updated",
    userLogin: "User Login",
    adminLogin: "Admin user logged in from 192.168.1.1",
    reportGenerated: "Report Generated",
    monthlyReport: "Monthly activity report was generated"
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
    cancel: "取消",
    // Dashboard translations
    totalActiveCards: "使用中卡片總數",
    trackedLocations: "追蹤位置",
    activeAlerts: "活動警報",
    reportsGenerated: "已生成報告",
    from: "相較於",
    lastMonth: "上個月",
    recentAlerts: "最近警報",
    latestAlertsNotifications: "最新系統警報和通知",
    recentActivities: "最近活動",
    recentSystemUserActions: "最近系統和用戶操作",
    viewAllAlerts: "查看所有警報",
    viewAllActivities: "查看所有活動",
    locationOverview: "位置概覽",
    geographicDistribution: "活動卡片的地理分布",
    mapViewAvailable: "地圖視圖將在連接到Mapbox或Google Maps API後可用",
    goToTracking: "前往追蹤",
    export: "匯出",
    refreshData: "刷新數據",
    geofenceAlert: "地理圍欄警報",
    cardLeftZone: "卡片 #5643 離開授權區域",
    systemAlert: "系統警報",
    databaseBackup: "數據庫備份完成",
    cardLost: "卡片 #8921 報告遺失",
    cardIssued: "卡片發行",
    cardIssuedTo: "卡片 #3389 已發給 John Smith",
    locationUpdated: "卡片 #5432 位置已更新",
    userLogin: "用戶登入",
    adminLogin: "管理員從 192.168.1.1 登入",
    reportGenerated: "報告生成",
    monthlyReport: "月度活動報告已生成"
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
    cancel: "キャンセル",
    // Dashboard translations
    totalActiveCards: "有効なカードの合計",
    trackedLocations: "追跡場所",
    activeAlerts: "アクティブなアラート",
    reportsGenerated: "生成されたレポート",
    from: "からの変化",
    lastMonth: "先月",
    recentAlerts: "最近のアラート",
    latestAlertsNotifications: "最新のシステムアラートと通知",
    recentActivities: "最近のアクティビティ",
    recentSystemUserActions: "最近のシステムとユーザーのアクション",
    viewAllAlerts: "すべてのアラートを表示",
    viewAllActivities: "すべてのアクティビティを表示",
    locationOverview: "位置の概要",
    geographicDistribution: "アクティブなカードの地理的分布",
    mapViewAvailable: "MapboxまたはGoogle Maps APIに接続すると、マップビューが利用可能になります",
    goToTracking: "トラッキングへ",
    export: "エクスポート",
    refreshData: "データを更新",
    geofenceAlert: "ジオフェンスアラート",
    cardLeftZone: "カード #5643 が許可エリアを離れました",
    systemAlert: "システムアラート",
    databaseBackup: "データベースバックアップが完了しました",
    cardLost: "カード #8921 が紛失報告されました",
    cardIssued: "カード発行",
    cardIssuedTo: "カード #3389 が John Smith に発行されました",
    locationUpdated: "カード #5432 の位置が更新されました",
    userLogin: "ユーザーログイン",
    adminLogin: "管理者が 192.168.1.1 からログインしました",
    reportGenerated: "レポート生成",
    monthlyReport: "月次アクティビティレポートが生成されました"
  }
};

export const useTranslation = (language: Language) => {
  return {
    t: (key: TranslationKeys) => translations[language][key] || key
  };
};
