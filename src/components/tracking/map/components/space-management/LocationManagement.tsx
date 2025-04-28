
import React from 'react';
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function LocationManagement() {
  const { t } = useI18n();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t("locationFloorManagement")}</h3>
        <Button className="flex items-center">
          <PlusCircle className="mr-2 h-4 w-4" />
          {t("addLocation")}
        </Button>
      </div>
      
      <div className="border rounded-md p-8 text-center">
        <p className="text-muted-foreground">
          {t("noLocationsYet")}
        </p>
        <Button variant="outline" className="mt-4">
          {t("addFirstLocation")}
        </Button>
      </div>
      
      <div className="bg-muted/50 p-4 rounded-md">
        <h4 className="font-medium mb-2">{t("gisIntegration")}</h4>
        <p className="text-sm text-muted-foreground mb-4">
          {t("connectToExternalGISPlatform")}
        </p>
        <Button variant="outline" size="sm">
          {t("configureSyncSettings")}
        </Button>
      </div>
    </div>
  );
}
