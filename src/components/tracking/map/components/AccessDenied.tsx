
import React from 'react';
import { Shield, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/hooks/use-i18n";

export function AccessDenied() {
  const { t } = useI18n();
  
  return (
    <div className="flex flex-col items-center justify-center bg-muted p-8 rounded-md min-h-[300px]">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Shield className="h-12 w-12 text-destructive" />
        </div>
        <h3 className="text-lg font-medium">{t("accessRestricted")}</h3>
        <p className="text-muted-foreground max-w-md">
          <AlertCircle className="h-4 w-4 inline-block mr-1" />
          {t("insufficientPermissions")}
        </p>
        <Button variant="outline">{t("requestAccess")}</Button>
      </div>
    </div>
  );
}
