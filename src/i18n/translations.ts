
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
  | "monthlyReport"
  // TrackingPage translations
  | "locationTracking"
  | "mapView"
  | "realtimeGeographicVisualization"
  | "filter"
  | "mapLayers"
  | "realtime"
  | "historical"
  | "autoRefresh"
  | "refresh"
  | "selectDate"
  | "time"
  | "pause"
  | "play"
  | "trackedCards"
  | "cardsCurrentlyBeingMonitored"
  | "searchCards"
  | "active"
  | "history"
  | "geofence"
  | "card"
  | "selectCardToViewLocationHistory"
  | "geofenceAlerts"
  | "configure"
  | "officeArea"
  | "alertWhenCardsEnterOrLeave"
  | "restrictedZone"
  | "alertWhenCardsEnter"
  | "cityLimits"
  | "alertWhenCardsLeave"
  // CardsPage translations
  | "cardManagement"
  | "registerCard"
  | "import"
  | "cardsOverview"
  | "manageAndMonitorCards"
  | "searchByCardOrHolder"
  | "cardNumber"
  | "holder"
  | "issueDate"
  | "status"
  | "lastSeen"
  | "location"
  | "actions"
  | "noCardsFound"
  | "viewDetails"
  | "markAsActive"
  | "suspendCard"
  | "reportAsLost"
  | "suspended"
  | "lost"
  // RecordsPage translations
  | "recordsAndLogs"
  | "filters"
  | "advancedFilters"
  | "narrowDownRecords"
  | "dateRange"
  | "recordType"
  | "allTypes"
  | "accessEvents"
  | "locationUpdates"
  | "statusChanges"
  | "enterCardID"
  | "enterLocation"
  | "reset"
  | "applyFilters"
  | "recordsDatabase"
  | "browseSearchExport"
  | "searchRecords"
  | "recordCategory"
  | "allRecords"
  | "today"
  | "thisWeek"
  | "thisMonth"
  | "customRange"
  | "cardEvents"
  | "systemLogs"
  | "timestamp"
  | "cardID"
  | "cardHolder"
  | "eventType"
  | "details"
  | "action"
  | "user"
  | "ipAddress"
  | "description"
  | "acknowledged"
  | "pending"
  | "resolved"
  | "acknowledge"
  | "resolve"
  | "showingRecords"
  | "previous"
  | "next"
  // Location names
  | "taipei"
  | "kaohsiung"
  | "tainan"
  | "taichung"
  | "hsinchu";

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
    monthlyReport: "Monthly activity report was generated",
    // TrackingPage translations
    locationTracking: "Location Tracking",
    mapView: "Map View",
    realtimeGeographicVisualization: "Real-time geographic visualization of active cards",
    filter: "Filter",
    mapLayers: "Map Layers",
    realtime: "Real-time",
    historical: "Historical",
    autoRefresh: "Auto-refresh",
    refresh: "Refresh",
    selectDate: "Select date",
    time: "Time",
    pause: "Pause",
    play: "Play",
    trackedCards: "Tracked Cards",
    cardsCurrentlyBeingMonitored: "Cards currently being monitored",
    searchCards: "Search cards...",
    active: "Active",
    history: "History",
    geofence: "Geofence",
    card: "Card",
    selectCardToViewLocationHistory: "Select a card to view location history",
    geofenceAlerts: "Geofence Alerts",
    configure: "Configure",
    officeArea: "Office Area",
    alertWhenCardsEnterOrLeave: "Alert when cards enter or leave",
    restrictedZone: "Restricted Zone",
    alertWhenCardsEnter: "Alert when cards enter",
    cityLimits: "City Limits",
    alertWhenCardsLeave: "Alert when cards leave",
    // CardsPage translations
    cardManagement: "Card Management",
    registerCard: "Register Card",
    import: "Import",
    cardsOverview: "Cards Overview",
    manageAndMonitorCards: "Manage and monitor all registered cards in the system",
    searchByCardOrHolder: "Search by card number or holder name...",
    cardNumber: "Card Number",
    holder: "Holder",
    issueDate: "Issue Date",
    status: "Status",
    lastSeen: "Last Seen",
    location: "Location",
    actions: "Actions",
    noCardsFound: "No cards found.",
    viewDetails: "View Details",
    markAsActive: "Mark as Active",
    suspendCard: "Suspend Card",
    reportAsLost: "Report as Lost",
    suspended: "Suspended",
    lost: "Lost",
    // RecordsPage translations
    recordsAndLogs: "Records & Logs",
    filters: "Filters",
    advancedFilters: "Advanced Filters",
    narrowDownRecords: "Narrow down records by applying multiple filters",
    dateRange: "Date Range",
    recordType: "Record Type",
    allTypes: "All Types",
    accessEvents: "Access Events",
    locationUpdates: "Location Updates",
    statusChanges: "Status Changes",
    enterCardID: "Enter card ID",
    enterLocation: "Enter location",
    reset: "Reset",
    applyFilters: "Apply Filters",
    recordsDatabase: "Records Database",
    browseSearchExport: "Browse, search, and export system records and logs",
    searchRecords: "Search records...",
    recordCategory: "Record Category",
    allRecords: "All Records",
    today: "Today",
    thisWeek: "This Week",
    thisMonth: "This Month",
    customRange: "Custom Range",
    cardEvents: "Card Events",
    systemLogs: "System Logs",
    timestamp: "Timestamp",
    cardID: "Card ID",
    cardHolder: "Card Holder",
    eventType: "Event Type",
    details: "Details",
    action: "Action",
    user: "User",
    ipAddress: "IP Address",
    description: "Description",
    acknowledged: "Acknowledged",
    pending: "Pending",
    resolved: "Resolved",
    acknowledge: "Acknowledge",
    resolve: "Resolve",
    showingRecords: "Showing 1-5 of 125 records",
    previous: "Previous",
    next: "Next",
    // Location names
    taipei: "Taipei, Taiwan",
    kaohsiung: "Kaohsiung, Taiwan",
    tainan: "Tainan, Taiwan",
    taichung: "Taichung, Taiwan",
    hsinchu: "Hsinchu, Taiwan"
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
    monthlyReport: "月度活動報告已生成",
    // TrackingPage translations
    locationTracking: "位置追蹤",
    mapView: "地圖視圖",
    realtimeGeographicVisualization: "活動卡片的即時地理可視化",
    filter: "篩選",
    mapLayers: "地圖圖層",
    realtime: "即時",
    historical: "歷史",
    autoRefresh: "自動刷新",
    refresh: "刷新",
    selectDate: "選擇日期",
    time: "時間",
    pause: "暫停",
    play: "播放",
    trackedCards: "追蹤卡片",
    cardsCurrentlyBeingMonitored: "目前正在監控的卡片",
    searchCards: "搜索卡片...",
    active: "使用中",
    history: "歷史",
    geofence: "地理圍欄",
    card: "卡片",
    selectCardToViewLocationHistory: "選擇卡片以查看位置歷史",
    geofenceAlerts: "地理圍欄警報",
    configure: "配置",
    officeArea: "辦公區域",
    alertWhenCardsEnterOrLeave: "卡片進入或離開時發出警報",
    restrictedZone: "限制區域",
    alertWhenCardsEnter: "卡片進入時發出警報",
    cityLimits: "城市邊界",
    alertWhenCardsLeave: "卡片離開時發出警報",
    // CardsPage translations
    cardManagement: "卡片管理",
    registerCard: "註冊卡片",
    import: "匯入",
    cardsOverview: "卡片概覽",
    manageAndMonitorCards: "管理和監控系統中所有註冊的卡片",
    searchByCardOrHolder: "通過卡號或持卡人名稱搜索...",
    cardNumber: "卡號",
    holder: "持卡人",
    issueDate: "發行日期",
    status: "狀態",
    lastSeen: "上次見到",
    location: "位置",
    actions: "操作",
    noCardsFound: "未找到卡片。",
    viewDetails: "查看詳情",
    markAsActive: "標記為使用中",
    suspendCard: "暫停卡片",
    reportAsLost: "報告遺失",
    suspended: "已暫停",
    lost: "已遺失",
    // RecordsPage translations
    recordsAndLogs: "記錄和日誌",
    filters: "過濾器",
    advancedFilters: "高級過濾器",
    narrowDownRecords: "通過應用多個過濾器縮小記錄範圍",
    dateRange: "日期範圍",
    recordType: "記錄類型",
    allTypes: "所有類型",
    accessEvents: "訪問事件",
    locationUpdates: "位置更新",
    statusChanges: "狀態變更",
    enterCardID: "輸入卡片ID",
    enterLocation: "輸入位置",
    reset: "重置",
    applyFilters: "應用過濾器",
    recordsDatabase: "記錄數據庫",
    browseSearchExport: "瀏覽、搜索和導出系統記錄和日誌",
    searchRecords: "搜索記錄...",
    recordCategory: "記錄類別",
    allRecords: "所有記錄",
    today: "今天",
    thisWeek: "本週",
    thisMonth: "本月",
    customRange: "自定義範圍",
    cardEvents: "卡片事件",
    systemLogs: "系統日誌",
    timestamp: "時間戳",
    cardID: "卡片ID",
    cardHolder: "持卡人",
    eventType: "事件類型",
    details: "詳情",
    action: "操作",
    user: "用戶",
    ipAddress: "IP地址",
    description: "描述",
    acknowledged: "已確認",
    pending: "待處理",
    resolved: "已解決",
    acknowledge: "確認",
    resolve: "解決",
    showingRecords: "顯示1-5，共125條記錄",
    previous: "上一頁",
    next: "下一頁",
    // Location names
    taipei: "台北，台灣",
    kaohsiung: "高雄，台灣",
    tainan: "台南，台灣",
    taichung: "台中，台灣",
    hsinchu: "新竹，台灣"
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
    monthlyReport: "月次アクティビティレポートが生成されました",
    // TrackingPage translations
    locationTracking: "位置追跡",
    mapView: "マップビュー",
    realtimeGeographicVisualization: "アクティブなカードのリアルタイム地理的可視化",
    filter: "フィルター",
    mapLayers: "マップレイヤー",
    realtime: "リアルタイム",
    historical: "履歴",
    autoRefresh: "自動更新",
    refresh: "更新",
    selectDate: "日付を選択",
    time: "時間",
    pause: "一時停止",
    play: "再生",
    trackedCards: "追跡カード",
    cardsCurrentlyBeingMonitored: "現在監視中のカード",
    searchCards: "カードを検索...",
    active: "アクティブ",
    history: "履歴",
    geofence: "ジオフェンス",
    card: "カード",
    selectCardToViewLocationHistory: "位置履歴を表示するカードを選択",
    geofenceAlerts: "ジオフェンスアラート",
    configure: "設定",
    officeArea: "オフィスエリア",
    alertWhenCardsEnterOrLeave: "カードが入退場する際に警告",
    restrictedZone: "制限区域",
    alertWhenCardsEnter: "カードが入場する際に警告",
    cityLimits: "市境界",
    alertWhenCardsLeave: "カードが退場する際に警告",
    // CardsPage translations
    cardManagement: "カード管理",
    registerCard: "カード登録",
    import: "インポート",
    cardsOverview: "カード概要",
    manageAndMonitorCards: "システム内のすべての登録カードを管理・監視",
    searchByCardOrHolder: "カード番号または所有者名で検索...",
    cardNumber: "カード番号",
    holder: "所有者",
    issueDate: "発行日",
    status: "状態",
    lastSeen: "最終確認",
    location: "位置",
    actions: "アクション",
    noCardsFound: "カードが見つかりません。",
    viewDetails: "詳細を表示",
    markAsActive: "アクティブとしてマーク",
    suspendCard: "カードを停止",
    reportAsLost: "紛失として報告",
    suspended: "停止済み",
    lost: "紛失",
    // RecordsPage translations
    recordsAndLogs: "記録とログ",
    filters: "フィルター",
    advancedFilters: "詳細フィルター",
    narrowDownRecords: "複数のフィルターを適用して記録を絞り込む",
    dateRange: "日付範囲",
    recordType: "記録タイプ",
    allTypes: "すべてのタイプ",
    accessEvents: "アクセスイベント",
    locationUpdates: "位置更新",
    statusChanges: "状態変更",
    enterCardID: "カードIDを入力",
    enterLocation: "位置を入力",
    reset: "リセット",
    applyFilters: "フィルターを適用",
    recordsDatabase: "記録データベース",
    browseSearchExport: "システム記録とログの閲覧、検索、エクスポート",
    searchRecords: "記録を検索...",
    recordCategory: "記録カテゴリ",
    allRecords: "すべての記録",
    today: "今日",
    thisWeek: "今週",
    thisMonth: "今月",
    customRange: "カスタム範囲",
    cardEvents: "カードイベント",
    systemLogs: "システムログ",
    timestamp: "タイムスタンプ",
    cardID: "カードID",
    cardHolder: "カード所有者",
    eventType: "イベントタイプ",
    details: "詳細",
    action: "アクション",
    user: "ユーザー",
    ipAddress: "IPアドレス",
    description: "説明",
    acknowledged: "確認済み",
    pending: "保留中",
    resolved: "解決済み",
    acknowledge: "確認",
    resolve: "解決",
    showingRecords: "125件中1-5件を表示",
    previous: "前へ",
    next: "次へ",
    // Location names
    taipei: "台北、台湾",
    kaohsiung: "高雄、台湾",
    tainan: "台南、台湾",
    taichung: "台中、台湾",
    hsinchu: "新竹、台湾"
  }
};

export const useTranslation = (language: Language) => {
  return {
    t: (key: TranslationKeys) => translations[language][key] || key
  };
};
