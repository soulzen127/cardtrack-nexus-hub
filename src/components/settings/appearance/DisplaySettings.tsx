
import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/hooks/use-i18n";

export const DisplaySettings = () => {
  const { t } = useI18n();
  
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">Display Settings</h3>
      <Separator />
      <div className="space-y-4 py-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="compactMode">{t("compactMode")}</Label>
            <p className="text-sm text-muted-foreground">Reduce spacing in UI elements</p>
          </div>
          <Switch id="compactMode" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="welcomeScreen">{t("showWelcomeScreen")}</Label>
            <p className="text-sm text-muted-foreground">Display welcome screen when users log in</p>
          </div>
          <Switch id="welcomeScreen" />
        </div>
      </div>
    </div>
  );
};
