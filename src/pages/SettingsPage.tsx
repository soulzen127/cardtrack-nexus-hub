
import React from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Settings } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useI18n } from "@/hooks/use-i18n";
import { 
  GeneralSettings, 
  MapsSettings, 
  NotificationSettings, 
  SecuritySettings, 
  AppearanceSettings 
} from "@/components/settings";

export default function SettingsPage() {
  const { t } = useI18n();
  
  const handleSaveSettings = () => {
    toast.success(t("settingsSaved"));
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">{t("systemSettings")}</h1>
          <Button onClick={handleSaveSettings}>
            <Save className="h-4 w-4 mr-2" />
            {t("saveChanges")}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              {t("configuration")}
            </CardTitle>
            <CardDescription>
              {t("manageSettings")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general">
              <TabsList className="mb-4">
                <TabsTrigger value="general">{t("generalSettings")}</TabsTrigger>
                <TabsTrigger value="maps">{t("mapsAndLocation")}</TabsTrigger>
                <TabsTrigger value="notifications">{t("notificationSettings")}</TabsTrigger>
                <TabsTrigger value="security">{t("securitySettings")}</TabsTrigger>
                <TabsTrigger value="appearance">{t("appearance")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <GeneralSettings />
              </TabsContent>
              
              <TabsContent value="maps">
                <MapsSettings />
              </TabsContent>
              
              <TabsContent value="notifications">
                <NotificationSettings />
              </TabsContent>
              
              <TabsContent value="security">
                <SecuritySettings />
              </TabsContent>
              
              <TabsContent value="appearance">
                <AppearanceSettings />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">{t("cancel")}</Button>
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              {t("saveChanges")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
