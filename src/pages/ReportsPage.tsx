
import React, { useState, useEffect } from "react";
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
  Share2,
  Search,
  Filter,
  RefreshCw
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
import { useI18n } from "@/hooks/use-i18n";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("templates");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  const { t } = useI18n();
  
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

  // Mock real-time query data
  const [queryResults, setQueryResults] = useState([
    { id: 1, cardId: "CARD-001", location: "Main Office", timestamp: "2023-04-07 14:32:15", action: "Entry" },
    { id: 2, cardId: "CARD-042", location: "Warehouse B", timestamp: "2023-04-07 14:25:10", action: "Exit" },
    { id: 3, cardId: "CARD-053", location: "Conference Room", timestamp: "2023-04-07 14:10:45", action: "Entry" },
  ]);

  const handleGenerateReport = (reportId: number) => {
    toast.success(`Generating report... This may take a few moments.`);
    setTimeout(() => {
      toast.success(`Report generated successfully! Ready for download.`);
    }, 3000);
  };

  const handleSearch = () => {
    setIsLoading(true);
    
    // Simulate API call for real-time query
    setTimeout(() => {
      // Mock filtering based on search query
      const filteredResults = [
        { id: 1, cardId: "CARD-001", location: "Main Office", timestamp: "2023-04-07 14:32:15", action: "Entry" },
        { id: 2, cardId: "CARD-042", location: "Warehouse B", timestamp: "2023-04-07 14:25:10", action: "Exit" },
        { id: 3, cardId: "CARD-053", location: "Conference Room", timestamp: "2023-04-07 14:10:45", action: "Entry" },
      ].filter(item => 
        searchQuery === "" || 
        item.cardId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setQueryResults(filteredResults);
      setIsLoading(false);
      
      if (filteredResults.length === 0) {
        toast.info("No results found for your query");
      } else {
        toast.success(`Found ${filteredResults.length} results`);
      }
    }, 1000);
  };

  const refreshData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock refreshed data
      setQueryResults([
        { id: 1, cardId: "CARD-001", location: "Main Office", timestamp: "2023-04-07 14:32:15", action: "Entry" },
        { id: 2, cardId: "CARD-042", location: "Warehouse B", timestamp: "2023-04-07 14:25:10", action: "Exit" },
        { id: 3, cardId: "CARD-053", location: "Conference Room", timestamp: "2023-04-07 14:10:45", action: "Entry" },
        { id: 4, cardId: "CARD-007", location: "Cafeteria", timestamp: "2023-04-07 14:38:22", action: "Entry" },
      ]);
      
      setIsLoading(false);
      toast.success("Data refreshed successfully");
    }, 800);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">{t("reportManagement")}</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t("createNewReport")}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart className="h-5 w-5 mr-2 text-primary" />
                {t("reportTemplates")}
              </CardTitle>
              <CardDescription>{t("standardReadyToUseReports")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportTemplates.length}</div>
              <p className="text-sm text-muted-foreground">{t("availableTemplates")}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                {t("scheduledReports")}
              </CardTitle>
              <CardDescription>{t("automatedRecurringReports")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduledReports.length}</div>
              <p className="text-sm text-muted-foreground">{t("activeSchedules")}</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                {t("generatedReports")}
              </CardTitle>
              <CardDescription>{t("recentlyCreatedReports")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentReports.length}</div>
              <p className="text-sm text-muted-foreground">{t("reportsThisWeek")}</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("reportManagement")}</CardTitle>
            <CardDescription>
              {t("generateScheduleDownload")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="templates" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="templates">{t("reportTemplates")}</TabsTrigger>
                <TabsTrigger value="scheduled">{t("scheduledReports")}</TabsTrigger>
                <TabsTrigger value="recent">{t("generatedReports")}</TabsTrigger>
                <TabsTrigger value="analytics">{t("analytics")}</TabsTrigger>
                <TabsTrigger value="query">Real-time Query</TabsTrigger>
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
                      <Select defaultValue="month" value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
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
                        Showing data for the last {selectedTimeframe === "month" ? "30 days" : 
                          selectedTimeframe === "week" ? "7 days" : 
                          selectedTimeframe === "day" ? "24 hours" : 
                          selectedTimeframe === "quarter" ? "90 days" : 
                          selectedTimeframe === "year" ? "year" : "custom period"}
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
              
              <TabsContent value="query">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          placeholder="Search by card ID, location..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSearch();
                            }
                          }}
                        />
                      </div>
                      <Button onClick={handleSearch} disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          "Search"
                        )}
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={refreshData} disabled={isLoading}>
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh
                      </Button>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Real-Time Query Results</CardTitle>
                      <CardDescription>
                        Showing {queryResults.length} results
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Card ID</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead className="text-right">Details</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {queryResults.length > 0 ? (
                            queryResults.map((result) => (
                              <TableRow key={result.id}>
                                <TableCell className="font-medium">{result.cardId}</TableCell>
                                <TableCell>{result.location}</TableCell>
                                <TableCell>{result.timestamp}</TableCell>
                                <TableCell>
                                  <Badge 
                                    variant="outline" 
                                    className={`${
                                      result.action === "Entry" 
                                        ? "bg-green-100 text-green-800 hover:bg-green-200" 
                                        : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                                    }`}
                                  >
                                    {result.action}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                  <Button variant="ghost" size="sm">
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                No results found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <p className="text-sm text-muted-foreground">Showing the most recent data</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
