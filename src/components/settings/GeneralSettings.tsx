
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/hooks/use-i18n";

export const GeneralSettings = () => {
  const { t } = useI18n();
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t("systemInformation")}</h3>
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">{t("organizationName")}</Label>
              <Input id="companyName" defaultValue="CardTrack Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="systemName">{t("systemName")}</Label>
              <Input id="systemName" defaultValue="CardTrack Nexus Hub" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">{t("contactEmail")}</Label>
              <Input id="contactEmail" type="email" defaultValue="admin@cardtrack.example" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">{t("systemTimezone")}</Label>
              <Select defaultValue="asia_taipei">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia_taipei">Asia/Taipei (GMT+8)</SelectItem>
                  <SelectItem value="asia_tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                  <SelectItem value="america_los_angeles">America/Los_Angeles (GMT-7)</SelectItem>
                  <SelectItem value="europe_london">Europe/London (GMT+1)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t("languageSettings")}</h3>
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="language">{t("primaryLanguage")}</Label>
              <Select defaultValue="zh_TW">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zh_TW">繁體中文 (Traditional Chinese)</SelectItem>
                  <SelectItem value="en_US">English (US)</SelectItem>
                  <SelectItem value="zh_CN">简体中文 (Simplified Chinese)</SelectItem>
                  <SelectItem value="ja_JP">日本語 (Japanese)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFormat">{t("dateFormat")}</Label>
              <Select defaultValue="yyyy_mm_dd">
                <SelectTrigger id="dateFormat">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yyyy_mm_dd">YYYY-MM-DD</SelectItem>
                  <SelectItem value="dd_mm_yyyy">DD-MM-YYYY</SelectItem>
                  <SelectItem value="mm_dd_yyyy">MM-DD-YYYY</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="enableTranslation" />
              <Label htmlFor="enableTranslation">{t("enableTranslation")}</Label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t("dataManagement")}</h3>
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dataRetention">{t("dataRetentionPeriod")}</Label>
              <Select defaultValue="365">
                <SelectTrigger id="dataRetention">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                  <SelectItem value="180">180 days</SelectItem>
                  <SelectItem value="365">1 year</SelectItem>
                  <SelectItem value="730">2 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="backupSchedule">{t("automaticBackupSchedule")}</Label>
              <Select defaultValue="daily">
                <SelectTrigger id="backupSchedule">
                  <SelectValue placeholder="Select schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="enableAudit" defaultChecked />
              <Label htmlFor="enableAudit">{t("enableAudit")}</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
