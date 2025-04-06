
import React from "react";
import { CheckCircle } from "lucide-react";
import { AlertSummaryCard } from "./AlertSummaryCard";
import { useI18n } from "@/hooks/use-i18n";

export function ResolvedAlertsCard({ resolvedToday }: { resolvedToday: number }) {
  const { t } = useI18n();
  
  return (
    <AlertSummaryCard 
      icon={<CheckCircle size={20} />}
      title={t("resolvedToday")}
      count={resolvedToday}
      iconClass="text-cardtrack-green"
    >
      <p className="text-sm text-muted-foreground">Average resolution time: 15 minutes</p>
    </AlertSummaryCard>
  );
}
