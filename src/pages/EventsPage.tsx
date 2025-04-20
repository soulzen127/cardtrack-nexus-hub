
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/hooks/use-i18n";
import { MapPin, AlertTriangle, Route } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const { t } = useI18n();

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">{t("eventReporting")}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Location Report Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2" />
                {t("locationReport")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                {t("reportLocation")}
              </p>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  {t("indoorLocation")}
                </Button>
                <Button className="w-full" variant="outline">
                  {t("outdoorLocation")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Report Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2" />
                {t("emergencyReport")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                {t("reportEmergency")}
              </p>
              <Button className="w-full" variant="destructive">
                {t("reportEmergency")}
              </Button>
            </CardContent>
          </Card>

          {/* Waypoint Report Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Route className="mr-2" />
                {t("waypoints")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                {t("reportWaypoint")}
              </p>
              <div className="space-y-2">
                <Button className="w-full" variant="outline">
                  {t("indoorLocation")}
                </Button>
                <Button className="w-full" variant="outline">
                  {t("outdoorLocation")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
