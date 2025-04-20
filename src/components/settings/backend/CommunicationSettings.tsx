
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CommunicationSettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">通訊設定</h3>
        <Separator />
        
        <Tabs defaultValue="mqtt">
          <TabsList className="mb-4">
            <TabsTrigger value="mqtt">MQTT Broker</TabsTrigger>
            <TabsTrigger value="other">其他協定</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mqtt">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mqttBroker">MQTT Broker 位址</Label>
                  <Input id="mqttBroker" placeholder="mqtt://example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mqttPort">MQTT 埠號</Label>
                  <Input id="mqttPort" type="number" defaultValue="1883" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mqttUsername">MQTT 使用者名稱</Label>
                  <Input id="mqttUsername" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mqttPassword">MQTT 密碼</Label>
                  <Input id="mqttPassword" type="password" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="mqttSsl" />
                  <Label htmlFor="mqttSsl">使用 SSL/TLS 連接</Label>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="other">
            <div className="py-4">
              <p className="text-muted-foreground">目前不支援其他通訊協定。請使用 MQTT 進行設備連接。</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
