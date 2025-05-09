
import React, { useState } from "react";
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
import { useAccessControl } from "@/hooks/use-access-control";
import { 
  GeneralSettings, 
  MapsSettings, 
  NotificationSettings, 
  SecuritySettings, 
  AppearanceSettings
} from "@/components/settings";
import { UserGroupSettings } from "@/components/settings/UserGroupSettings";
import { BackendManagement } from "@/components/settings/backend/BackendManagement";

export default function SettingsPage() {
  const { t } = useI18n();
  const { currentUserRole } = useAccessControl();
  const isAdmin = currentUserRole === "admin";
  const isManager = currentUserRole === "manager" || isAdmin;
  const isOperator = currentUserRole === "operator" || isManager;
  
  const [activeTab, setActiveTab] = useState("general");
  
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
            <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 grid grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="general">一般設定</TabsTrigger>
                <TabsTrigger value="system">系統設定</TabsTrigger>
                {isAdmin && <TabsTrigger value="permissions">權限設定</TabsTrigger>}
                {isAdmin && <TabsTrigger value="advanced">高級設定</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="general">
                <GeneralSettings />
              </TabsContent>
              
              <TabsContent value="system">
                <Tabs defaultValue="appearance">
                  <TabsList className="mb-4">
                    <TabsTrigger value="appearance">外觀</TabsTrigger>
                    <TabsTrigger value="maps">地圖設定</TabsTrigger>
                    {isOperator && <TabsTrigger value="notifications">通知設定</TabsTrigger>}
                  </TabsList>
                  
                  <TabsContent value="appearance">
                    <AppearanceSettings />
                  </TabsContent>
                  
                  <TabsContent value="maps">
                    <MapsSettings />
                  </TabsContent>
                  
                  <TabsContent value="notifications">
                    <NotificationSettings />
                  </TabsContent>
                </Tabs>
              </TabsContent>
              
              {isAdmin && (
                <TabsContent value="permissions">
                  <Tabs defaultValue="userGroups">
                    <TabsList className="mb-4">
                      <TabsTrigger value="userGroups">用戶管理</TabsTrigger>
                      <TabsTrigger value="security">安全設定</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="userGroups">
                      <UserGroupSettings />
                    </TabsContent>
                    
                    <TabsContent value="security">
                      <SecuritySettings />
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              )}
              
              {isAdmin && (
                <TabsContent value="advanced">
                  <Tabs defaultValue="backend">
                    <TabsList className="mb-4">
                      <TabsTrigger value="backend">後台管理</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="backend">
                      <BackendManagement />
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              )}
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
