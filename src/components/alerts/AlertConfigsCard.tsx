
import React from "react";
import { Settings } from "lucide-react";
import { AlertSummaryCard } from "./AlertSummaryCard";
import { useI18n } from "@/hooks/use-i18n";

export function AlertConfigsCard({ configurations }: { configurations: any[] }) {
  const { t } = useI18n();
  const enabledConfigs = configurations.filter(c => c.enabled).length;
  
  return (
    <AlertSummaryCard 
      icon={<Settings size={20} />}
      title={t("alertConfigurations")}
      count={configurations.length}
      iconClass="text-primary"
    >
      <p className="text-sm text-muted-foreground">
        {enabledConfigs} {t("enabled").toLowerCase()}
      </p>
    </AlertSummaryCard>
  );
}
