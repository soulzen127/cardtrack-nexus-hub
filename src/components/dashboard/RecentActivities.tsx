
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useI18n } from "@/hooks/use-i18n";

export const RecentActivities = () => {
  const { t } = useI18n();

  const recentActivities = [
    { id: 1, action: t("cardIssued"), details: t("cardIssuedTo"), time: "30 minutes ago" },
    { id: 2, action: t("locationUpdated"), details: t("locationUpdated"), time: "45 minutes ago" },
    { id: 3, action: t("userLogin"), details: t("adminLogin"), time: "1 hour ago" },
    { id: 4, action: t("reportGenerated"), details: t("monthlyReport"), time: "2 hours ago" },
  ];

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>{t("recentActivities")}</CardTitle>
        <CardDescription>{t("recentSystemUserActions")}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="border-b pb-4 last:border-0 last:pb-0">
              <p className="text-sm font-medium">{activity.action}</p>
              <p className="text-xs text-muted-foreground">{activity.details}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" asChild size="sm">
            <Link to="/records">{t("viewAllActivities")}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
