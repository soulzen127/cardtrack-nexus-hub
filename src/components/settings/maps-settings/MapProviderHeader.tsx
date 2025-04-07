
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/hooks/use-i18n";

interface MapProviderHeaderProps {
  requiresAdmin: boolean;
  setRequiresAdmin: (requires: boolean) => void;
}

export function MapProviderHeader({ requiresAdmin, setRequiresAdmin }: MapProviderHeaderProps) {
  const { t } = useI18n();
  
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-medium">{t("mapProviderConfiguration")}</h3>
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="requiresAdmin" 
          checked={requiresAdmin} 
          onCheckedChange={(checked) => setRequiresAdmin(checked === true)}
        />
        <Label htmlFor="requiresAdmin" className="text-sm text-muted-foreground">
          {t("requireAdministratorAccess")}
        </Label>
      </div>
    </div>
  );
}
