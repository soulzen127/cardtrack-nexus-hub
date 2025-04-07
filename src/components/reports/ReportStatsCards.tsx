
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, FileText, Clock } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface ReportStatsProps {
  reportTemplates: any[];
  scheduledReports: any[];
  recentReports: any[];
}

export function ReportStatsCards({ reportTemplates, scheduledReports, recentReports }: ReportStatsProps) {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-primary" />
            {t("reportTemplates")}
          </CardTitle>
          <CardDescription>{t("standardReadyToUseReports")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{reportTemplates.length}</div>
          <p className="text-sm text-muted-foreground">{t("availableTemplates")}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            {t("scheduledReports")}
          </CardTitle>
          <CardDescription>{t("automatedRecurringReports")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{scheduledReports.length}</div>
          <p className="text-sm text-muted-foreground">{t("activeSchedules")}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            {t("generatedReports")}
          </CardTitle>
          <CardDescription>{t("recentlyCreatedReports")}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{recentReports.length}</div>
          <p className="text-sm text-muted-foreground">{t("reportsThisWeek")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
