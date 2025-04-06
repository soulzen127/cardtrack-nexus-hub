
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Calendar, 
  InfoIcon, 
  User 
} from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface ResolvedAlert {
  id: number;
  type: string;
  description: string;
  timestamp: string;
  resolvedBy: string;
  resolvedAt: string;
  notes?: string;
}

interface ResolvedAlertsListProps {
  alerts: ResolvedAlert[];
}

export function ResolvedAlertsList({ alerts }: ResolvedAlertsListProps) {
  const { t } = useI18n();

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <Card key={alert.id}>
          <CardContent className="p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 mr-2 text-cardtrack-green mt-0.5" />
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{alert.type}</h3>
                    <Badge className="ml-2 bg-muted text-muted-foreground">{t("resolved")}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="space-y-1">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    {t("occurred")}: {alert.timestamp}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {t("resolved")}: {alert.resolvedAt}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-muted-foreground">
                    <User className="h-4 w-4 mr-1" />
                    {t("resolvedBy")}: {alert.resolvedBy}
                  </div>
                  {alert.notes && (
                    <div className="flex items-start text-muted-foreground">
                      <InfoIcon className="h-4 w-4 mr-1 mt-0.5" />
                      {t("notes")}: {alert.notes}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
