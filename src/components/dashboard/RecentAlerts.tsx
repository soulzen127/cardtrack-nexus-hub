
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "@/hooks/use-i18n";

export const RecentAlerts = () => {
  const { t } = useI18n();

  const recentAlerts = [
    { id: 1, type: t("geofenceAlert"), message: t("cardLeftZone"), time: "10 minutes ago", priority: "high", link: "/tracking" },
    { id: 2, type: t("systemAlert"), message: t("databaseBackup"), time: "1 hour ago", priority: "low", link: "/alerts" },
    { id: 3, type: t("cardLost"), message: t("cardLost"), time: "3 hours ago", priority: "medium", link: "/cards" },
  ];

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{t("recentAlerts")}</CardTitle>
        <CardDescription>{t("latestAlertsNotifications")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <Link to={alert.link} key={alert.id} className="block hover:bg-muted/50 rounded-md transition-colors">
              <div className="flex items-start space-x-4 p-2">
                <div className={`p-2 rounded-full ${
                  alert.priority === "high" ? "bg-red-100" :
                  alert.priority === "medium" ? "bg-amber-100" : "bg-blue-100"
                }`}>
                  <AlertCircle className={`h-4 w-4 ${
                    alert.priority === "high" ? "text-red-500" :
                    alert.priority === "medium" ? "text-amber-500" : "text-blue-500"
                  }`} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{alert.type}: {alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" asChild size="sm">
            <Link to="/alerts">{t("viewAllAlerts")}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
