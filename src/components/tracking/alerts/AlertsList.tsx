
import React from 'react';
import { AlertItem } from './AlertItem';
import { useI18n } from "@/hooks/use-i18n";

interface GeofenceAlert {
  id: string;
  name: string;
  description: string;
  type: 'enter' | 'exit' | 'both';
  radius: number;
  active: boolean;
}

interface AlertsListProps {
  alerts: GeofenceAlert[];
  onToggleActive: (id: string) => void;
  onConfigure: (alert: GeofenceAlert) => void;
}

export function AlertsList({ alerts, onToggleActive, onConfigure }: AlertsListProps) {
  const { t } = useI18n();
  
  if (alerts.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        {t("noAlertsConfigured")}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {alerts.map(alert => (
        <AlertItem 
          key={alert.id} 
          alert={alert} 
          onToggleActive={onToggleActive} 
          onConfigure={() => onConfigure(alert)}
        />
      ))}
    </div>
  );
}
