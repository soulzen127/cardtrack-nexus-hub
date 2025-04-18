
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  AlertCircle, 
  AlertTriangle, 
  InfoIcon, 
  Clock, 
  MapPin, 
  CreditCard, 
  XCircle 
} from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { toast } from "sonner";
import { ActiveAlert } from "./AlertsData";

interface ActiveAlertsListProps {
  alerts: ActiveAlert[];
  onConfirm?: (alertId: number, title: string) => void;
  onResolve?: (alertId: number, title: string) => void;
  onViewDetails?: (alertId: number) => void;
}

export function ActiveAlertsList({ alerts, onConfirm, onResolve, onViewDetails }: ActiveAlertsListProps) {
  const { t } = useI18n();

  const handleAcknowledge = (alertId: number, title: string) => {
    if (onConfirm) {
      onConfirm(alertId, title);
    } else {
      toast.success(`Alert #${alertId} has been acknowledged`);
    }
  };

  const handleResolve = (alertId: number, title: string) => {
    if (onResolve) {
      onResolve(alertId, title);
    } else {
      toast.success(`Alert #${alertId} has been marked as resolved`);
    }
  };

  const handleViewDetails = (alertId: number) => {
    if (onViewDetails) {
      onViewDetails(alertId);
    } else {
      toast.info(`Viewing details for alert #${alertId}`);
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Card key={alert.id} className={`
          border-l-4
          ${alert.priority === 'high' ? 'border-l-cardtrack-red' : ''}
          ${alert.priority === 'medium' ? 'border-l-cardtrack-amber' : ''}
          ${alert.priority === 'low' ? 'border-l-blue-500' : ''}
        `}>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-start">
                  {alert.priority === 'high' ? (
                    <AlertCircle className="h-5 w-5 mr-2 text-cardtrack-red mt-0.5" />
                  ) : alert.priority === 'medium' ? (
                    <AlertTriangle className="h-5 w-5 mr-2 text-cardtrack-amber mt-0.5" />
                  ) : (
                    <InfoIcon className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                  )}
                  <div>
                    <h3 className="font-medium">{alert.type}</h3>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {alert.timestamp}
                  </div>
                  
                  {alert.location && (
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {alert.location}
                    </div>
                  )}
                  
                  {alert.cardId && (
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-1" />
                      {alert.cardId}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAcknowledge(alert.id, alert.type)}
                >
                  {t("acknowledge")}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleResolve(alert.id, alert.type)}
                >
                  {t("resolve")}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(alert.id)}
                >
                  {t("viewDetails")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
