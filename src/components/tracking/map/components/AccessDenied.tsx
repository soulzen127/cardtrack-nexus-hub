
import React from 'react';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from "@/hooks/use-i18n";

export function AccessDenied() {
  const { t } = useI18n();
  
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-10 text-center">
      <Shield className="h-10 w-10 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium mb-2">{t("accessRestricted")}</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {t("insufficientPermissions")}
      </p>
      <Button variant="outline" size="sm">
        {t("requestAccess")}
      </Button>
    </div>
  );
}
