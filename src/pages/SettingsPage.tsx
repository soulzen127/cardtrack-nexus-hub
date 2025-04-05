
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Settings, 
  Save, 
  Bell, 
  Map, 
  Lock, 
  Languages, 
  Database,
  PaletteIcon
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function SettingsPage() {
  
  const handleSaveSettings = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">System Settings</h1>
          <Button onClick={handleSaveSettings}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Configuration
            </CardTitle>
            <CardDescription>
              Manage system-wide settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="general">
              <TabsList className="mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="maps">Maps & Location</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">System Information</h3>
                    <Separator />
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Organization Name</Label>
                          <Input id="companyName" defaultValue="CardTrack Inc." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="systemName">System Name</Label>
                          <Input id="systemName" defaultValue="CardTrack Nexus Hub" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contactEmail">Contact Email</Label>
                          <Input id="contactEmail" type="email" defaultValue="admin@cardtrack.example" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timezone">System Timezone</Label>
                          <Select defaultValue="asia_taipei">
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asia_taipei">Asia/Taipei (GMT+8)</SelectItem>
                              <SelectItem value="asia_tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                              <SelectItem value="america_los_angeles">America/Los_Angeles (GMT-7)</SelectItem>
                              <SelectItem value="europe_london">Europe/London (GMT+1)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Language Settings</h3>
                    <Separator />
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Primary Language</Label>
                          <Select defaultValue="zh_TW">
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="zh_TW">繁體中文 (Traditional Chinese)</SelectItem>
                              <SelectItem value="en_US">English (US)</SelectItem>
                              <SelectItem value="zh_CN">简体中文 (Simplified Chinese)</SelectItem>
                              <SelectItem value="ja_JP">日本語 (Japanese)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dateFormat">Date Format</Label>
                          <Select defaultValue="yyyy_mm_dd">
                            <SelectTrigger id="dateFormat">
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yyyy_mm_dd">YYYY-MM-DD</SelectItem>
                              <SelectItem value="dd_mm_yyyy">DD-MM-YYYY</SelectItem>
                              <SelectItem value="mm_dd_yyyy">MM-DD-YYYY</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="enableTranslation" />
                          <Label htmlFor="enableTranslation">Enable automatic translation for card holder information</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Data Management</h3>
                    <Separator />
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dataRetention">Data Retention Period</Label>
                          <Select defaultValue="365">
                            <SelectTrigger id="dataRetention">
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                              <SelectItem value="180">180 days</SelectItem>
                              <SelectItem value="365">1 year</SelectItem>
                              <SelectItem value="730">2 years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="backupSchedule">Automatic Backup Schedule</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger id="backupSchedule">
                              <SelectValue placeholder="Select schedule" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="enableAudit" defaultChecked />
                          <Label htmlFor="enableAudit">Enable comprehensive audit logging</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="maps">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Map Provider Configuration</h3>
                    <Separator />
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="mapProvider">Map Provider</Label>
                          <Select defaultValue="mapbox">
                            <SelectTrigger id="mapProvider">
                              <SelectValue placeholder="Select provider" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mapbox">Mapbox</SelectItem>
                              <SelectItem value="google">Google Maps</SelectItem>
                              <SelectItem value="openstreetmap">OpenStreetMap</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apiKey">API Key</Label>
                          <Input id="apiKey" type="password" defaultValue="••••••••••••••••" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="defaultView">Default Map View</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="defaultLat">Default Latitude</Label>
                            <Input id="defaultLat" defaultValue="25.0330" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="defaultLong">Default Longitude</Label>
                            <Input id="defaultLong" defaultValue="121.5654" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="defaultZoom">Default Zoom Level</Label>
                        <Select defaultValue="10">
                          <SelectTrigger id="defaultZoom">
                            <SelectValue placeholder="Select zoom" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5 - Country</SelectItem>
                            <SelectItem value="8">8 - City</SelectItem>
                            <SelectItem value="10">10 - District</SelectItem>
                            <SelectItem value="13">13 - Neighborhood</SelectItem>
                            <SelectItem value="15">15 - Street</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Location Tracking Settings</h3>
                    <Separator />
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="updateFrequency">Location Update Frequency</Label>
                          <Select defaultValue="5">
                            <SelectTrigger id="updateFrequency">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Every 1 minute</SelectItem>
                              <SelectItem value="5">Every 5 minutes</SelectItem>
                              <SelectItem value="15">Every 15 minutes</SelectItem>
                              <SelectItem value="30">Every 30 minutes</SelectItem>
                              <SelectItem value="60">Every hour</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accuracyThreshold">Location Accuracy Threshold</Label>
                          <Select defaultValue="50">
                            <SelectTrigger id="accuracyThreshold">
                              <SelectValue placeholder="Select threshold" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10">10 meters</SelectItem>
                              <SelectItem value="25">25 meters</SelectItem>
                              <SelectItem value="50">50 meters</SelectItem>
                              <SelectItem value="100">100 meters</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="storeHistory" defaultChecked />
                          <Label htmlFor="storeHistory">Store location history</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="enableClustering" defaultChecked />
                          <Label htmlFor="enableClustering">Enable marker clustering</Label>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="historyPeriod">Location History Retention</Label>
                        <Select defaultValue="90">
                          <SelectTrigger id="historyPeriod">
                            <SelectValue placeholder="Select period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">30 days</SelectItem>
                            <SelectItem value="60">60 days</SelectItem>
                            <SelectItem value="90">90 days</SelectItem>
                            <SelectItem value="180">180 days</SelectItem>
                            <SelectItem value="365">1 year</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications">
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
              </TabsContent>
              
              <TabsContent value="security">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Authentication Settings</h3>
                    <Separator />
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="passwordPolicy">Password Policy</Label>
                          <Select defaultValue="strong">
                            <SelectTrigger id="passwordPolicy">
                              <SelectValue placeholder="Select policy" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                              <SelectItem value="standard">Standard (8+ chars, numbers, letters)</SelectItem>
                              <SelectItem value="strong">Strong (8+ chars, numbers, symbols, mixed case)</SelectItem>
                              <SelectItem value="custom">Custom Policy</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="passwordExpiry">Password Expiration</Label>
                          <Select defaultValue="90">
                            <SelectTrigger id="passwordExpiry">
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="never">Never</SelectItem>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="60">60 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                              <SelectItem value="180">180 days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="enable2FA" defaultChecked />
                          <Label htmlFor="enable2FA">Require two-factor authentication</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox id="enforceLoginLimit" defaultChecked />
                          <Label htmlFor="enforceLoginLimit">Enforce account lockout after failed login attempts</Label>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="failedAttempts">Failed Login Attempts</Label>
                            <Input id="failedAttempts" type="number" defaultValue="5" min="1" max="10" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
                            <Input id="lockoutDuration" type="number" defaultValue="30" min="5" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Session Settings</h3>
                    <Separator />
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="sessionTimeout">Session Timeout</Label>
                          <Select defaultValue="30">
                            <SelectTrigger id="sessionTimeout">
                              <SelectValue placeholder="Select timeout" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="120">2 hours</SelectItem>
                              <SelectItem value="240">4 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxConcurrentSessions">Max Concurrent Sessions</Label>
                          <Select defaultValue="1">
                            <SelectTrigger id="maxConcurrentSessions">
                              <SelectValue placeholder="Select maximum" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 session</SelectItem>
                              <SelectItem value="2">2 sessions</SelectItem>
                              <SelectItem value="3">3 sessions</SelectItem>
                              <SelectItem value="unlimited">Unlimited</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="rememberMe" defaultChecked />
                        <Label htmlFor="rememberMe">Allow "Remember Me" functionality</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">API Security</h3>
                    <Separator />
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="apiTimeout">API Request Timeout</Label>
                        <Select defaultValue="30">
                          <SelectTrigger id="apiTimeout">
                            <SelectValue placeholder="Select timeout" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10 seconds</SelectItem>
                            <SelectItem value="30">30 seconds</SelectItem>
                            <SelectItem value="60">60 seconds</SelectItem>
                            <SelectItem value="120">120 seconds</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="rateLimit">Rate Limiting</Label>
                        <Input id="rateLimit" defaultValue="100" />
                        <p className="text-xs text-muted-foreground">Maximum number of requests per minute</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="enableCORS" defaultChecked />
                        <Label htmlFor="enableCORS">Enable CORS for API access</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="appearance">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Theme Settings</h3>
                    <Separator />
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="themeMode">Theme Mode</Label>
                          <Select defaultValue="light">
                            <SelectTrigger id="themeMode">
                              <SelectValue placeholder="Select mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Light</SelectItem>
                              <SelectItem value="dark">Dark</SelectItem>
                              <SelectItem value="system">System Default</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="colorScheme">Color Scheme</Label>
                          <Select defaultValue="blue">
                            <SelectTrigger id="colorScheme">
                              <SelectValue placeholder="Select scheme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="blue">Blue</SelectItem>
                              <SelectItem value="green">Green</SelectItem>
                              <SelectItem value="purple">Purple</SelectItem>
                              <SelectItem value="orange">Orange</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="primaryColor">Primary Color</Label>
                          <div className="flex space-x-2">
                            <Input id="primaryColor" defaultValue="#1E6CB4" />
                            <div className="w-10 h-10 rounded-md bg-cardtrack-500" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="secondaryColor">Secondary Color</Label>
                          <div className="flex space-x-2">
                            <Input id="secondaryColor" defaultValue="#319795" />
                            <div className="w-10 h-10 rounded-md bg-cardtrack-teal" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accentColor">Accent Color</Label>
                          <div className="flex space-x-2">
                            <Input id="accentColor" defaultValue="#D69E2E" />
                            <div className="w-10 h-10 rounded-md bg-cardtrack-amber" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">UI Customization</h3>
                    <Separator />
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="logo">Logo</Label>
                          <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                              <PaletteIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <Button variant="outline" size="sm">
                              Upload Logo
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="favicon">Favicon</Label>
                          <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                              <PaletteIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Button variant="outline" size="sm">
                              Upload Favicon
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="appName">Application Name</Label>
                        <Input id="appName" defaultValue="CardTrack Nexus Hub" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="loginMessage">Login Screen Message</Label>
                        <Textarea id="loginMessage" placeholder="Welcome message displayed on the login screen" rows={3} />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="compactMode">Compact Mode</Label>
                          <p className="text-sm text-muted-foreground">Reduce spacing in UI elements</p>
                        </div>
                        <Switch id="compactMode" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
