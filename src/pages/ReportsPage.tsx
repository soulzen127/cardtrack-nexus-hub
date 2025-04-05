
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
import { 
  BarChart, 
  FileText, 
  Download, 
  Clock, 
  Calendar, 
  Plus, 
  ChevronRight,
  PieChart,
  LineChart,
  Share2
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("templates");
  
  // Mock reports data
  const reportTemplates = [
    { id: 1, name: "Daily Activity Summary", type: "Daily", lastGenerated: "Today, 06:00 AM", format: "PDF" },
    { id: 2, name: "Weekly Card Usage", type: "Weekly", lastGenerated: "Monday, Apr 15", format: "Excel" },
    { id: 3, name: "Monthly Location Analysis", type: "Monthly", lastGenerated: "Apr 1, 2023", format: "PDF, Excel" },
    { id: 4, name: "Quarterly Security Audit", type: "Quarterly", lastGenerated: "Jan 1, 2023", format: "PDF" },
  ];
  
  const scheduledReports = [
    { id: 1, name: "Daily Activity Summary", frequency: "Daily at 06:00 AM", recipients: "operations@example.com", nextRun: "Tomorrow, 06:00 AM" },
    { id: 2, name: "Weekly Card Usage", frequency: "Weekly on Monday", recipients: "manager@example.com", nextRun: "Apr 22, 2023" },
    { id: 3, name: "System Health Check", frequency: "Daily at 12:00 AM", recipients: "admin@example.com", nextRun: "Tomorrow, 12:00 AM" },
  ];
  
  const recentReports = [
    { id: 1, name: "Daily Activity Summary", generated: "Today, 06:00 AM", format: "PDF", size: "1.2 MB" },
    { id: 2, name: "Card Issuance Report", generated: "Yesterday, 09:30 AM", format: "Excel", size: "845 KB" },
    { id: 3, name: "Location Heatmap Analysis", generated: "Apr 16, 2023", format: "PDF", size: "3.5 MB" },
    { id: 4, name: "Geofence Violations", generated: "Apr 15, 2023", format: "PDF", size: "1.1 MB" },
    { id: 5, name: "System Audit Trail", generated: "Apr 14, 2023", format: "CSV", size: "2.3 MB" },
  ];

  const handleGenerateReport = (reportId: number) => {
    toast.success(`Generating report... This may take a few moments.`);
    setTimeout(() => {
      toast.success(`Report generated successfully! Ready for download.`);
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-primary" />
                Report Templates
              </CardTitle>
              <CardDescription>Standard ready-to-use reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportTemplates.length}</div>
              <p className="text-sm text-muted-foreground">Available templates</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Scheduled Reports
              </CardTitle>
              <CardDescription>Automated recurring reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduledReports.length}</div>
              <p className="text-sm text-muted-foreground">Active schedules</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Generated Reports
              </CardTitle>
              <CardDescription>Recently created reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentReports.length}</div>
              <p className="text-sm text-muted-foreground">Reports this week</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Report Management</CardTitle>
            <CardDescription>
              Generate, schedule, and download reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="templates" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="templates">Report Templates</TabsTrigger>
                <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
                <TabsTrigger value="recent">Recent Reports</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="templates">
                <div className="space-y-4">
                  {reportTemplates.map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4">
                          <div className="space-y-1 mb-2 md:mb-0">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-primary" />
                              <h3 className="font-medium">{report.name}</h3>
                              <Badge variant="outline" className="ml-2 bg-muted">
                                {report.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Last generated: {report.lastGenerated} • Format: {report.format}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleGenerateReport(report.id)}>
                              Generate
                            </Button>
                            <Button variant="outline" size="sm">
                              Schedule
                            </Button>
                            <Button size="sm" asChild>
                              <span className="flex items-center">
                                View
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </span>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="scheduled">
                <div className="space-y-4">
                  {scheduledReports.map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4">
                          <div className="space-y-1 mb-2 md:mb-0">
                            <div className="flex items-center">
                              <Clock className="h-5 w-5 mr-2 text-primary" />
                              <h3 className="font-medium">{report.name}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {report.frequency} • Recipients: {report.recipients}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Next run: {report.nextRun}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Edit Schedule
                            </Button>
                            <Button variant="outline" size="sm" className="text-cardtrack-red border-cardtrack-red/20 hover:bg-cardtrack-red/10">
                              Disable
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recent">
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4">
                          <div className="space-y-1 mb-2 md:mb-0">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-2 text-primary" />
                              <h3 className="font-medium">{report.name}</h3>
                              <Badge variant="outline" className="ml-2 bg-muted">
                                {report.format}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Generated: {report.generated} • Size: {report.size}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Share2 className="h-4 w-4 mr-2" />
                              Share
                            </Button>
                            <Button size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="analytics">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-lg font-medium">Data Visualization</h3>
                    <div className="flex items-center space-x-2">
                      <Select defaultValue="month">
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Time Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="day">Last 24 Hours</SelectItem>
                          <SelectItem value="week">Last 7 Days</SelectItem>
                          <SelectItem value="month">Last 30 Days</SelectItem>
                          <SelectItem value="quarter">Last 90 Days</SelectItem>
                          <SelectItem value="year">Last Year</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center">
                          <BarChart className="h-4 w-4 mr-2" />
                          Card Activity by Hour
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px] bg-muted/30 rounded-md flex items-center justify-center">
                          <BarChart className="h-12 w-12 text-muted-foreground" />
                        </div>
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground">
                        Showing data for the last 30 days
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center">
                          <PieChart className="h-4 w-4 mr-2" />
                          Card Status Distribution
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px] bg-muted/30 rounded-md flex items-center justify-center">
                          <PieChart className="h-12 w-12 text-muted-foreground" />
                        </div>
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground">
                        Current status of all cards in the system
                      </CardFooter>
                    </Card>
                    
                    <Card className="md:col-span-2">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center">
                          <LineChart className="h-4 w-4 mr-2" />
                          Location Activity Trends
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] bg-muted/30 rounded-md flex items-center justify-center">
                          <LineChart className="h-12 w-12 text-muted-foreground" />
                        </div>
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground">
                        Showing location updates frequency over time
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
