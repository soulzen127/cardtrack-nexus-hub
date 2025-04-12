
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Filter } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function AlertHeader() {
  const { t } = useI18n();
  const [isAlertSettingsOpen, setIsAlertSettingsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [showResolved, setShowResolved] = useState(true);
  
  const handleFilterApply = () => {
    console.log("Applied filters:", { filterType, filterPriority, showResolved });
    setIsFilterOpen(false);
  };
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
      <h1 className="text-2xl font-bold tracking-tight">{t("alertsAndNotifications")}</h1>
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsAlertSettingsOpen(true)}
        >
          <Bell className="h-4 w-4 mr-2" />
          {t("alertSettings")}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setIsFilterOpen(true)}
        >
          <Filter className="h-4 w-4 mr-2" />
          {t("filter")}
        </Button>
      </div>

      {/* Alert Settings Dialog */}
      <Dialog open={isAlertSettingsOpen} onOpenChange={setIsAlertSettingsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("alertSettings")}</DialogTitle>
            <DialogDescription>
              {t("configureAlertPreferences")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">{t("notificationChannels")}</h3>
              <div className="flex items-start space-x-2">
                <Checkbox id="email-alerts" />
                <div className="grid gap-1.5">
                  <Label htmlFor="email-alerts">{t("emailAlerts")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("receiveAlertsViaEmail")}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox id="app-alerts" defaultChecked />
                <div className="grid gap-1.5">
                  <Label htmlFor="app-alerts">{t("inAppAlerts")}</Label>
                  <p className="text-sm text-muted-foreground">
                    {t("showAlertsInApplication")}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">{t("alertFrequency")}</h3>
              <Select defaultValue="realtime">
                <SelectTrigger>
                  <SelectValue placeholder={t("selectFrequency")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">{t("realtime")}</SelectItem>
                  <SelectItem value="hourly">{t("hourly")}</SelectItem>
                  <SelectItem value="daily">{t("daily")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button onClick={() => setIsAlertSettingsOpen(false)}>
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("filterAlerts")}</DialogTitle>
            <DialogDescription>
              {t("filterAlertsByType")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="filter-type">{t("alertType")}</Label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger id="filter-type">
                  <SelectValue placeholder={t("selectType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allTypes")}</SelectItem>
                  <SelectItem value="geofence">{t("geofenceViolation")}</SelectItem>
                  <SelectItem value="suspicious">{t("suspiciousActivity")}</SelectItem>
                  <SelectItem value="system">{t("systemWarning")}</SelectItem>
                  <SelectItem value="connection">{t("connectionIssue")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="filter-priority">{t("priority")}</Label>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger id="filter-priority">
                  <SelectValue placeholder={t("selectPriority")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allPriorities")}</SelectItem>
                  <SelectItem value="high">{t("high")}</SelectItem>
                  <SelectItem value="medium">{t("medium")}</SelectItem>
                  <SelectItem value="low">{t("low")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="show-resolved" 
                checked={showResolved} 
                onCheckedChange={(checked) => 
                  setShowResolved(checked as boolean)
                }
              />
              <Label htmlFor="show-resolved">{t("showResolvedAlerts")}</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={handleFilterApply}>
              {t("applyFilters")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
