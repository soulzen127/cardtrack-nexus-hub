
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const NotificationServiceSettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">通知服務設定</h3>
        <Separator />
        
        <Tabs defaultValue="email">
          <TabsList className="mb-4">
            <TabsTrigger value="email">電子郵件設定</TabsTrigger>
            <TabsTrigger value="sms">簡訊服務設定</TabsTrigger>
            <TabsTrigger value="push">App 推播設定</TabsTrigger>
            <TabsTrigger value="webhook">Webhook 設定</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpServer">SMTP 伺服器位址</Label>
                  <Input id="smtpServer" placeholder="smtp.example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP 埠號</Label>
                  <Input id="smtpPort" type="number" defaultValue="587" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpUsername">SMTP 使用者名稱</Label>
                  <Input id="smtpUsername" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">SMTP 密碼</Label>
                  <Input id="smtpPassword" type="password" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senderEmail">寄件人信箱</Label>
                  <Input id="senderEmail" type="email" placeholder="noreply@example.com" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="senderName">寄件人名稱</Label>
                  <Input id="senderName" placeholder="CardTrack 系統通知" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="smtpSsl" defaultChecked />
                  <Label htmlFor="smtpSsl">使用 SSL/TLS</Label>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sms">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smsProvider">簡訊服務供應商</Label>
                  <Select>
                    <SelectTrigger id="smsProvider">
                      <SelectValue placeholder="請選擇簡訊供應商" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="nexmo">Nexmo</SelectItem>
                      <SelectItem value="custom">自訂</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smsApiKey">API 金鑰</Label>
                  <Input id="smsApiKey" type="password" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smsApiSecret">API 密鑰</Label>
                  <Input id="smsApiSecret" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smsSenderNumber">發送號碼</Label>
                  <Input id="smsSenderNumber" placeholder="+886xxxxxxxxx" />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="push">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pushService">推播服務</Label>
                  <Select>
                    <SelectTrigger id="pushService">
                      <SelectValue placeholder="請選擇推播服務" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fcm">Firebase Cloud Messaging (FCM)</SelectItem>
                      <SelectItem value="apns">Apple Push Notification Service (APNs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pushServerKey">伺服器金鑰</Label>
                  <Input id="pushServerKey" type="password" />
                  <p className="text-sm text-muted-foreground">Firebase 專案的伺服器金鑰或 APNs 的認證金鑰</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="webhook">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input id="webhookUrl" placeholder="https://example.com/webhook" />
                  <p className="text-sm text-muted-foreground">接收警報通知的 Webhook URL</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhookSecret">Webhook 密鑰</Label>
                  <Input id="webhookSecret" type="password" />
                  <p className="text-sm text-muted-foreground">用於驗證 Webhook 請求的密鑰</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
