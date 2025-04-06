
import React from "react";
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AlertSummaryCard } from "./AlertSummaryCard";
import { useI18n } from "@/hooks/use-i18n";

export function ActiveAlertsCard({ alerts }: { alerts: any[] }) {
  const { t } = useI18n();
  
  const highPriorityCount = alerts.filter(a => a.priority === 'high').length;
  const mediumPriorityCount = alerts.filter(a => a.priority === 'medium').length;
  const lowPriorityCount = alerts.filter(a => a.priority === 'low').length;
  
  return (
    <AlertSummaryCard 
      icon={<AlertCircle size={20} />}
      title={t("activeAlerts")}
      count={alerts.length}
      iconClass="text-cardtrack-red"
    >
      <div className="flex items-center space-x-2">
        <Badge variant="outline" className="bg-cardtrack-red/10 text-cardtrack-red border-cardtrack-red/20">
          {highPriorityCount} {t("high")}
        </Badge>
        <Badge variant="outline" className="bg-cardtrack-amber/10 text-cardtrack-amber border-cardtrack-amber/20">
          {mediumPriorityCount} {t("medium")}
        </Badge>
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
          {lowPriorityCount} {t("low")}
        </Badge>
      </div>
    </AlertSummaryCard>
  );
}
