
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/hooks/use-i18n";

export function LocationTrackingSettings() {
  const { t } = useI18n();
  
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="updateFrequency">{t("locationUpdateFrequency")}</Label>
          <Select defaultValue="5">
            <SelectTrigger id="updateFrequency">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Every 1 minute</SelectItem>
              <SelectItem value="5">Every 5 minutes</SelectItem>
              <SelectItem value="15">Every 15 minutes</SelectItem>
              <SelectItem value="30">Every 30 minutes</SelectItem>
              <SelectItem value="60">Every hour</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="accuracyThreshold">{t("locationAccuracyThreshold")}</Label>
          <Select defaultValue="50">
            <SelectTrigger id="accuracyThreshold">
              <SelectValue placeholder="Select threshold" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 meters</SelectItem>
              <SelectItem value="25">25 meters</SelectItem>
              <SelectItem value="50">50 meters</SelectItem>
              <SelectItem value="100">100 meters</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="storeHistory" defaultChecked />
          <Label htmlFor="storeHistory">{t("storeLocationHistory")}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="enableClustering" defaultChecked />
          <Label htmlFor="enableClustering">{t("enableMarkerClustering")}</Label>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="historyPeriod">{t("locationHistoryRetention")}</Label>
        <Select defaultValue="90">
          <SelectTrigger id="historyPeriod">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30 days</SelectItem>
            <SelectItem value="60">60 days</SelectItem>
            <SelectItem value="90">90 days</SelectItem>
            <SelectItem value="180">180 days</SelectItem>
            <SelectItem value="365">1 year</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
