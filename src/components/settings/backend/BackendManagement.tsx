
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicSettings } from "./BasicSettings";
import { CommunicationSettings } from "./CommunicationSettings";
import { NotificationServiceSettings } from "./NotificationServiceSettings";
import { DataStorageSettings } from "./DataStorageSettings";
import { SecuritySettings } from "./SecuritySettings";
import { useI18n } from "@/hooks/use-i18n";

export const BackendManagement = () => {
  const { t } = useI18n();
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic">
        <TabsList className="mb-4 grid grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="basic">基本設定</TabsTrigger>
          <TabsTrigger value="communication">通訊設定</TabsTrigger>
          <TabsTrigger value="notification">通知服務設定</TabsTrigger>
          <TabsTrigger value="storage">資料儲存設定</TabsTrigger>
          <TabsTrigger value="security">安全設定</TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic">
          <BasicSettings />
        </TabsContent>
        
        <TabsContent value="communication">
          <CommunicationSettings />
        </TabsContent>
        
        <TabsContent value="notification">
          <NotificationServiceSettings />
        </TabsContent>
        
        <TabsContent value="storage">
          <DataStorageSettings />
        </TabsContent>
        
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
