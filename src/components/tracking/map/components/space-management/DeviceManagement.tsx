
import React from 'react';
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCcw } from "lucide-react";

export function DeviceManagement() {
  const { t } = useI18n();
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{t("deviceManagement")}</h3>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center">
            <RefreshCcw className="mr-2 h-4 w-4" />
            {t("syncFromModelLibrary")}
          </Button>
          <Button className="flex items-center">
            <PlusCircle className="mr-2 h-4 w-4" />
            {t("addDevice")}
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md p-8 text-center">
        <p className="text-muted-foreground">
          {t("noDevicesYet")}
        </p>
        <Button variant="outline" className="mt-4">
          {t("addFirstDevice")}
        </Button>
      </div>
      
      <div className="bg-muted/50 p-4 rounded-md">
        <h4 className="font-medium mb-2">{t("modelLibraryIntegration")}</h4>
        <p className="text-sm text-muted-foreground mb-4">
          {t("connectToModelLibraryAPI")}
        </p>
        <Button variant="outline" size="sm">
          {t("configureApiConnection")}
        </Button>
      </div>
    </div>
  );
}
