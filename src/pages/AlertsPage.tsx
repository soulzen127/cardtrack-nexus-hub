
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
import { AlertActionDialog } from "@/components/alerts/AlertActionDialog";
import { 
  mockActiveAlerts, 
  mockResolvedAlerts, 
  mockAlertConfigurations 
} from "@/components/alerts/AlertsData";
import { useNavigate } from "react-router-dom";

export default function AlertsPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAlertId, setSelectedAlertId] = useState(0);
  const [selectedAlertTitle, setSelectedAlertTitle] = useState("");
  const [dialogType, setDialogType] = useState<"confirm" | "resolve" | "viewResolved">("confirm");
  
  // Handle stat card clicks
  const handleActiveAlertsClick = () => {
    // Just select the active tab
    document.getElementById("active-tab")?.click();
  };
  
  const handleResolvedAlertsClick = () => {
    // Select the resolved tab
    document.getElementById("resolved-tab")?.click();
  };
  
  const handleAlertConfigsClick = () => {
    // Select the settings tab
    document.getElementById("settings-tab")?.click();
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <AlertHeader />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div onClick={handleActiveAlertsClick} className="cursor-pointer transition-all hover:shadow-md">
            <ActiveAlertsCard alerts={mockActiveAlerts} />
          </div>
          <div onClick={handleResolvedAlertsClick} className="cursor-pointer transition-all hover:shadow-md">
            <ResolvedAlertsCard resolvedToday={2} />
          </div>
          <div onClick={handleAlertConfigsClick} className="cursor-pointer transition-all hover:shadow-md">
            <AlertConfigsCard configurations={mockAlertConfigurations} />
          </div>
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
                <TabsTrigger id="active-tab" value="active">{t("active")}</TabsTrigger>
                <TabsTrigger id="resolved-tab" value="resolved">{t("resolved")}</TabsTrigger>
                <TabsTrigger id="settings-tab" value="settings">{t("settings")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                <ActiveAlertsList 
                  alerts={mockActiveAlerts}
                  onConfirm={(alertId, title) => {
                    setSelectedAlertId(alertId);
                    setSelectedAlertTitle(title);
                    setDialogType("confirm");
                    setDialogOpen(true);
                  }}
                  onResolve={(alertId, title) => {
                    setSelectedAlertId(alertId);
                    setSelectedAlertTitle(title);
                    setDialogType("resolve");
                    setDialogOpen(true);
                  }}
                  onViewDetails={(alertId) => {
                    navigate(`/records?alert=${alertId}`);
                  }} 
                />
              </TabsContent>
              
              <TabsContent value="resolved">
                <ResolvedAlertsList 
                  alerts={mockResolvedAlerts}
                  onViewResolution={(alertId, title) => {
                    setSelectedAlertId(alertId);
                    setSelectedAlertTitle(title);
                    setDialogType("viewResolved");
                    setDialogOpen(true);
                  }}
                  onViewDetails={(alertId) => {
                    navigate(`/records?alert=${alertId}`);
                  }}
                />
              </TabsContent>
              
              <TabsContent value="settings">
                <AlertSettingsList configurations={mockAlertConfigurations} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <AlertActionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        alertId={selectedAlertId}
        alertTitle={selectedAlertTitle}
        type={dialogType}
        resolvedNote={dialogType === "viewResolved" ? "This alert was resolved by responding to a geofence violation. Security personnel verified that the card holder had proper authorization but didn't update their access rights." : undefined}
      />
    </MainLayout>
  );
}
