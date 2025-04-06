
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Notification Channels</h3>
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableEmail">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send alerts and reports via email</p>
                </div>
                <Switch id="enableEmail" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtpServer">SMTP Server</Label>
                <Input id="smtpServer" defaultValue="smtp.example.com" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input id="smtpPort" defaultValue="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="encryption">Encryption</Label>
                  <Select defaultValue="tls">
                    <SelectTrigger id="encryption">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="ssl">SSL</SelectItem>
                      <SelectItem value="tls">TLS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emailSender">Sender Email</Label>
                <Input id="emailSender" defaultValue="alerts@cardtrack.example" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableSMS">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send critical alerts via SMS</p>
                </div>
                <Switch id="enableSMS" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smsProvider">SMS Provider</Label>
                <Select defaultValue="twilio">
                  <SelectTrigger id="smsProvider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twilio">Twilio</SelectItem>
                    <SelectItem value="aws">AWS SNS</SelectItem>
                    <SelectItem value="clicksend">ClickSend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <Input id="apiKey" type="password" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="senderPhone">Sender Phone Number</Label>
                <Input id="senderPhone" placeholder="+1234567890" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Notification Settings</h3>
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label>Alert Priority Levels</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="highPriority" className="text-sm">High Priority Alerts</Label>
                  <Select defaultValue="all">
                    <SelectTrigger id="highPriority">
                      <SelectValue placeholder="Select channels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Email + SMS + In-app</SelectItem>
                      <SelectItem value="email_inapp">Email + In-app</SelectItem>
                      <SelectItem value="inapp">In-app only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mediumPriority" className="text-sm">Medium Priority Alerts</Label>
                  <Select defaultValue="email_inapp">
                    <SelectTrigger id="mediumPriority">
                      <SelectValue placeholder="Select channels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Email + SMS + In-app</SelectItem>
                      <SelectItem value="email_inapp">Email + In-app</SelectItem>
                      <SelectItem value="inapp">In-app only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lowPriority" className="text-sm">Low Priority Alerts</Label>
                  <Select defaultValue="inapp">
                    <SelectTrigger id="lowPriority">
                      <SelectValue placeholder="Select channels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Email + SMS + In-app</SelectItem>
                      <SelectItem value="email_inapp">Email + In-app</SelectItem>
                      <SelectItem value="inapp">In-app only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quietHours">Quiet Hours</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime" className="text-sm">Start Time</Label>
                  <Input id="startTime" type="time" defaultValue="22:00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime" className="text-sm">End Time</Label>
                  <Input id="endTime" type="time" defaultValue="08:00" />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="quietHoursOverride" />
              <Label htmlFor="quietHoursOverride">Allow high priority alerts to override quiet hours</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
