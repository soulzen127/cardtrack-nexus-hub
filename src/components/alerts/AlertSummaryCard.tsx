
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/hooks/use-i18n";

interface AlertSummaryCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  iconClass?: string;
  children?: React.ReactNode;
}

export function AlertSummaryCard({ icon, title, count, iconClass, children }: AlertSummaryCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <span className={`h-5 w-5 mr-2 ${iconClass}`}>{icon}</span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        {children}
      </CardContent>
    </Card>
  );
}

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

import { AlertCircle, CheckCircle, Settings } from "lucide-react";
