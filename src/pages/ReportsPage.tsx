
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/hooks/use-i18n";
import {
  ReportStatsCards,
  ReportTemplatesList,
  ScheduledReportsList,
  RecentReportsList,
  AnalyticsContent,
  RealtimeQueryContent
} from "@/components/reports";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  const { t } = useI18n();
  
  // Mock reports data
  const reportTemplates = [
    { id: 1, name: "Daily Activity Summary", type: "Daily", lastGenerated: "Today, 06:00 AM", format: "PDF" },
    { id: 2, name: "Weekly Card Usage", type: "Weekly", lastGenerated: "Monday, Apr 15", format: "Excel" },
    { id: 3, name: "Monthly Location Analysis", type: "Monthly", lastGenerated: "Apr 1, 2023", format: "PDF, Excel" },
    { id: 4, name: "Quarterly Security Audit", type: "Quarterly", lastGenerated: "Jan 1, 2023", format: "PDF" },
  ];
  
  const scheduledReports = [
    { id: 1, name: "Daily Activity Summary", frequency: "Daily at 06:00 AM", recipients: "operations@example.com", nextRun: "Tomorrow, 06:00 AM" },
    { id: 2, name: "Weekly Card Usage", frequency: "Weekly on Monday", recipients: "manager@example.com", nextRun: "Apr 22, 2023" },
    { id: 3, name: "System Health Check", frequency: "Daily at 12:00 AM", recipients: "admin@example.com", nextRun: "Tomorrow, 12:00 AM" },
  ];
  
  const recentReports = [
    { id: 1, name: "Daily Activity Summary", generated: "Today, 06:00 AM", format: "PDF", size: "1.2 MB" },
    { id: 2, name: "Card Issuance Report", generated: "Yesterday, 09:30 AM", format: "Excel", size: "845 KB" },
    { id: 3, name: "Location Heatmap Analysis", generated: "Apr 16, 2023", format: "PDF", size: "3.5 MB" },
    { id: 4, name: "Geofence Violations", generated: "Apr 15, 2023", format: "PDF", size: "1.1 MB" },
    { id: 5, name: "System Audit Trail", generated: "Apr 14, 2023", format: "CSV", size: "2.3 MB" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">{t("reportManagement")}</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t("createNewReport")}
          </Button>
        </div>

        <ReportStatsCards 
          reportTemplates={reportTemplates}
          scheduledReports={scheduledReports}
          recentReports={recentReports}
        />

        <Card>
          <CardHeader>
            <CardTitle>{t("reportManagement")}</CardTitle>
            <CardDescription>
              {t("generateScheduleDownload")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="templates" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="templates">{t("reportTemplates")}</TabsTrigger>
                <TabsTrigger value="scheduled">{t("scheduledReports")}</TabsTrigger>
                <TabsTrigger value="recent">{t("generatedReports")}</TabsTrigger>
                <TabsTrigger value="analytics">{t("analytics")}</TabsTrigger>
                <TabsTrigger value="query">Real-time Query</TabsTrigger>
              </TabsList>
              
              <TabsContent value="templates">
                <ReportTemplatesList templates={reportTemplates} />
              </TabsContent>
              
              <TabsContent value="scheduled">
                <ScheduledReportsList reports={scheduledReports} />
              </TabsContent>
              
              <TabsContent value="recent">
                <RecentReportsList reports={recentReports} />
              </TabsContent>
              
              <TabsContent value="analytics">
                <AnalyticsContent 
                  selectedTimeframe={selectedTimeframe}
                  setSelectedTimeframe={setSelectedTimeframe}
                />
              </TabsContent>
              
              <TabsContent value="query">
                <RealtimeQueryContent />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
