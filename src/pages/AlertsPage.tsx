
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  Filter, 
  Settings, 
  AlertCircle, 
  Search, 
  CheckCircle, 
  XCircle,
  Calendar,
  MapPin,
  CreditCard,
  Clock,
  AlertTriangle,
  InfoIcon,
  ShieldAlert
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock alerts data
  const activeAlerts = [
    { 
      id: 1, 
      type: "Geofence Violation", 
      description: "Card #1234 entered restricted area", 
      timestamp: "10 minutes ago", 
      priority: "high", 
      location: "Research Lab, Taipei",
      cardId: "C001"
    },
    { 
      id: 2, 
      type: "Suspicious Movement", 
      description: "Unusual movement pattern detected for Card #5678", 
      timestamp: "25 minutes ago", 
      priority: "medium", 
      location: "Downtown Taipei",
      cardId: "C002"
    },
    { 
      id: 3, 
      type: "System Warning", 
      description: "Database storage reaching 85% capacity", 
      timestamp: "1 hour ago", 
      priority: "medium", 
      location: "System",
      cardId: null
    },
    { 
      id: 4, 
      type: "Connection Lost", 
      description: "Card #9012 not reporting for over 24 hours", 
      timestamp: "5 hours ago", 
      priority: "low", 
      location: "Last seen: Taichung",
      cardId: "C004"
    },
  ];
  
  const resolvedAlerts = [
    { 
      id: 101, 
      type: "Geofence Violation", 
      description: "Card #3456 left authorized zone", 
      timestamp: "Yesterday, 15:30", 
      resolvedBy: "admin@example.com",
      resolvedAt: "Yesterday, 15:45", 
      notes: "Authorized exception for delivery"
    },
    { 
      id: 102, 
      type: "System Error", 
      description: "Failed database connection", 
      timestamp: "Yesterday, 08:22",
      resolvedBy: "system",
      resolvedAt: "Yesterday, 08:30", 
      notes: "Auto-recovered after system restart"
    },
    { 
      id: 103, 
      type: "Multiple Failed Logins", 
      description: "5 failed login attempts for user operator@example.com", 
      timestamp: "Apr 16, 2023, 14:12",
      resolvedBy: "admin@example.com",
      resolvedAt: "Apr 16, 2023, 14:30", 
      notes: "User contacted and password reset provided"
    },
  ];
  
  const alertConfigurations = [
    {
      id: 1,
      name: "Geofence Violations",
      description: "Alerts when cards enter or leave defined geographical areas",
      channels: ["Email", "In-app"],
      enabled: true
    },
    {
      id: 2,
      name: "Card Status Changes",
      description: "Alerts when card status changes (activated, suspended, lost)",
      channels: ["Email", "In-app", "SMS"],
      enabled: true
    },
    {
      id: 3,
      name: "System Warnings",
      description: "Technical alerts about system performance and issues",
      channels: ["Email"],
      enabled: true
    },
    {
      id: 4,
      name: "Suspicious Activities",
      description: "Potential security concerns or unusual usage patterns",
      channels: ["Email", "In-app", "SMS"],
      enabled: false
    }
  ];

  const handleAcknowledge = (alertId: number) => {
    toast.success(`Alert #${alertId} has been acknowledged`);
  };

  const handleResolve = (alertId: number) => {
    toast.success(`Alert #${alertId} has been marked as resolved`);
  };

  const handleIgnore = (alertId: number) => {
    toast.success(`Alert #${alertId} has been dismissed`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">Alerts & Notifications</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alert Settings
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-cardtrack-red" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeAlerts.length}</div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-cardtrack-red/10 text-cardtrack-red border-cardtrack-red/20">
                  {activeAlerts.filter(a => a.priority === 'high').length} High
                </Badge>
                <Badge variant="outline" className="bg-cardtrack-amber/10 text-cardtrack-amber border-cardtrack-amber/20">
                  {activeAlerts.filter(a => a.priority === 'medium').length} Medium
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                  {activeAlerts.filter(a => a.priority === 'low').length} Low
                </Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-cardtrack-green" />
                Resolved Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-sm text-muted-foreground">Average resolution time: 15 minutes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                Alert Configurations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alertConfigurations.length}</div>
              <p className="text-sm text-muted-foreground">
                {alertConfigurations.filter(c => c.enabled).length} enabled
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alert Management</CardTitle>
            <CardDescription>
              View, acknowledge, and manage system alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search alerts..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="active">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active Alerts</TabsTrigger>
                <TabsTrigger value="resolved">Resolved Alerts</TabsTrigger>
                <TabsTrigger value="settings">Alert Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                <div className="space-y-4">
                  {activeAlerts.map((alert) => (
                    <Card key={alert.id} className={`
                      border-l-4
                      ${alert.priority === 'high' ? 'border-l-cardtrack-red' : ''}
                      ${alert.priority === 'medium' ? 'border-l-cardtrack-amber' : ''}
                      ${alert.priority === 'low' ? 'border-l-blue-500' : ''}
                    `}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-start">
                              {alert.priority === 'high' ? (
                                <AlertCircle className="h-5 w-5 mr-2 text-cardtrack-red mt-0.5" />
                              ) : alert.priority === 'medium' ? (
                                <AlertTriangle className="h-5 w-5 mr-2 text-cardtrack-amber mt-0.5" />
                              ) : (
                                <InfoIcon className="h-5 w-5 mr-2 text-blue-500 mt-0.5" />
                              )}
                              <div>
                                <h3 className="font-medium">{alert.type}</h3>
                                <p className="text-sm text-muted-foreground">{alert.description}</p>
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {alert.timestamp}
                              </div>
                              
                              {alert.location && (
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {alert.location}
                                </div>
                              )}
                              
                              {alert.cardId && (
                                <div className="flex items-center">
                                  <CreditCard className="h-4 w-4 mr-1" />
                                  {alert.cardId}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAcknowledge(alert.id)}
                            >
                              Acknowledge
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleResolve(alert.id)}
                            >
                              Resolve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleIgnore(alert.id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="resolved">
                <div className="space-y-4">
                  {resolvedAlerts.map((alert) => (
                    <Card key={alert.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-start">
                            <CheckCircle className="h-5 w-5 mr-2 text-cardtrack-green mt-0.5" />
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium">{alert.type}</h3>
                                <Badge className="ml-2 bg-muted text-muted-foreground">Resolved</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{alert.description}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="space-y-1">
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="h-4 w-4 mr-1" />
                                Occurred: {alert.timestamp}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Resolved: {alert.resolvedAt}
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center text-muted-foreground">
                                <User className="h-4 w-4 mr-1" />
                                Resolved by: {alert.resolvedBy}
                              </div>
                              {alert.notes && (
                                <div className="flex items-start text-muted-foreground">
                                  <InfoIcon className="h-4 w-4 mr-1 mt-0.5" />
                                  Notes: {alert.notes}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="settings">
                <div className="space-y-4">
                  {alertConfigurations.map((config) => (
                    <Card key={config.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <ShieldAlert className="h-5 w-5 mr-2 text-primary" />
                              <h3 className="font-medium">{config.name}</h3>
                              {config.enabled ? (
                                <Badge className="ml-2 bg-cardtrack-green/10 text-cardtrack-green">Enabled</Badge>
                              ) : (
                                <Badge className="ml-2 bg-muted text-muted-foreground">Disabled</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{config.description}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs mr-2">Channels:</span>
                              <div className="flex flex-wrap gap-1">
                                {config.channels.map((channel, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {channel}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            {config.enabled ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-cardtrack-red border-cardtrack-red/20 hover:bg-cardtrack-red/10"
                              >
                                Disable
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-cardtrack-green border-cardtrack-green/20 hover:bg-cardtrack-green/10"
                              >
                                Enable
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
