
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/hooks/use-i18n";
import { 
  AlertHeader,
  ActiveAlertsCard,
  ResolvedAlertsCard,
  AlertConfigsCard,
  AlertsSearchBar,
  ActiveAlertsList,
  ResolvedAlertsList,
  AlertSettingsList
} from "@/components/alerts";
import { 
  mockActiveAlerts, 
  mockResolvedAlerts, 
  mockAlertConfigurations 
} from "@/components/alerts/AlertsData";

export default function AlertsPage() {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <AlertHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActiveAlertsCard alerts={mockActiveAlerts} />
          <ResolvedAlertsCard resolvedToday={2} />
          <AlertConfigsCard configurations={mockAlertConfigurations} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("alertManagement")}</CardTitle>
            <CardDescription>
              {t("viewAcknowledgeManage")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertsSearchBar 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm} 
            />

            <Tabs defaultValue="active">
              <TabsList className="mb-4">
                <TabsTrigger value="active">{t("active")}</TabsTrigger>
                <TabsTrigger value="resolved">{t("resolved")}</TabsTrigger>
                <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                <ActiveAlertsList alerts={mockActiveAlerts} />
              </TabsContent>
              
              <TabsContent value="resolved">
                <ResolvedAlertsList alerts={mockResolvedAlerts} />
              </TabsContent>
              
              <TabsContent value="settings">
                <AlertSettingsList configurations={mockAlertConfigurations} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
