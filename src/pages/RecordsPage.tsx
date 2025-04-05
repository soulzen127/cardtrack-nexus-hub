
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
  Search, 
  Filter, 
  Download, 
  Calendar, 
  CreditCard, 
  MapPin, 
  User, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function RecordsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  // Mock records data
  const cardRecords = [
    { id: 1, cardId: "C001", cardHolder: "John Smith", eventType: "Access", location: "Main Building", timestamp: "2023-04-18 14:23:45" },
    { id: 2, cardId: "C002", cardHolder: "Jane Doe", eventType: "Location Update", location: "Downtown Taipei", timestamp: "2023-04-18 13:15:22" },
    { id: 3, cardId: "C003", cardHolder: "Bob Johnson", eventType: "Status Change", location: "Remote", timestamp: "2023-04-18 11:05:17" },
    { id: 4, cardId: "C001", cardHolder: "John Smith", eventType: "Geofence Alert", location: "Restricted Zone", timestamp: "2023-04-18 10:42:33" },
    { id: 5, cardId: "C005", cardHolder: "Charlie Brown", eventType: "Access", location: "Server Room", timestamp: "2023-04-18 09:30:11" },
  ];
  
  const systemRecords = [
    { id: 1, action: "User Login", user: "admin@example.com", ipAddress: "192.168.1.1", timestamp: "2023-04-18 15:30:45" },
    { id: 2, action: "Card Registered", user: "operator@example.com", ipAddress: "192.168.1.2", timestamp: "2023-04-18 14:22:10" },
    { id: 3, action: "Report Generated", user: "manager@example.com", ipAddress: "192.168.1.3", timestamp: "2023-04-18 13:17:23" },
    { id: 4, action: "Settings Changed", user: "admin@example.com", ipAddress: "192.168.1.1", timestamp: "2023-04-18 12:05:56" },
    { id: 5, action: "Database Backup", user: "system", ipAddress: "localhost", timestamp: "2023-04-18 01:00:00" },
  ];
  
  const alertRecords = [
    { id: 1, type: "Geofence Violation", description: "Card #C001 entered restricted area", status: "Acknowledged", timestamp: "2023-04-18 10:42:33" },
    { id: 2, type: "Suspicious Movement", description: "Card #C002 unusual movement pattern", status: "Pending", timestamp: "2023-04-18 11:15:22" },
    { id: 3, type: "System Warning", description: "Database storage reaching capacity", status: "Resolved", timestamp: "2023-04-18 09:30:15" },
    { id: 4, type: "Offline Card", description: "Card #C004 not seen for 48 hours", status: "Pending", timestamp: "2023-04-18 08:00:00" },
  ];

  const toggleFilter = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">Records & Logs</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={toggleFilter}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
              {isFilterExpanded ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {isFilterExpanded && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Advanced Filters
              </CardTitle>
              <CardDescription>
                Narrow down records by applying multiple filters
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <div className="flex space-x-2">
                    <div className="w-1/2">
                      <Input type="date" placeholder="From" className="h-9" />
                    </div>
                    <div className="w-1/2">
                      <Input type="date" placeholder="To" className="h-9" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Record Type</label>
                  <Select>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="access">Access Events</SelectItem>
                      <SelectItem value="location">Location Updates</SelectItem>
                      <SelectItem value="status">Status Changes</SelectItem>
                      <SelectItem value="alert">Alerts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Card ID</label>
                  <Input placeholder="Enter card ID" className="h-9" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input placeholder="Enter location" className="h-9" />
                </div>
              </div>
              
              <div className="flex justify-end mt-4 space-x-2">
                <Button variant="outline" size="sm">Reset</Button>
                <Button size="sm">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Records Database</CardTitle>
            <CardDescription>
              Browse, search, and export system records and logs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search records..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Record Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Records</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="thisWeek">This Week</SelectItem>
                  <SelectItem value="thisMonth">This Month</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="cards">
              <TabsList className="mb-4">
                <TabsTrigger value="cards">Card Events</TabsTrigger>
                <TabsTrigger value="system">System Logs</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cards">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Card ID</TableHead>
                        <TableHead className="hidden md:table-cell">Card Holder</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead className="hidden md:table-cell">Location</TableHead>
                        <TableHead className="text-right">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cardRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              {record.timestamp}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
                              {record.cardId}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2 text-muted-foreground" />
                              {record.cardHolder}
                            </div>
                          </TableCell>
                          <TableCell>{record.eventType}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              {record.location}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="system">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead className="hidden md:table-cell">User</TableHead>
                        <TableHead className="hidden md:table-cell">IP Address</TableHead>
                        <TableHead className="text-right">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {systemRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              {record.timestamp}
                            </div>
                          </TableCell>
                          <TableCell>{record.action}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2 text-muted-foreground" />
                              {record.user}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{record.ipAddress}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="alerts">
                <div className="space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    {alertRecords.map((alert) => (
                      <AccordionItem key={alert.id} value={`alert-${alert.id}`}>
                        <AccordionTrigger className="py-4 hover:no-underline">
                          <div className="flex flex-1 items-center justify-between pr-4">
                            <div className="flex items-center">
                              <AlertCircle className="h-4 w-4 mr-2 text-cardtrack-red" />
                              <span>{alert.type}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm text-muted-foreground mr-4">{alert.timestamp}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                alert.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                                alert.status === 'Acknowledged' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {alert.status}
                              </span>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="py-4 px-4 bg-muted/30">
                          <div className="space-y-2">
                            <div className="grid grid-cols-[120px_1fr] gap-2">
                              <span className="text-sm font-medium">Description:</span>
                              <span className="text-sm">{alert.description}</span>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] gap-2">
                              <span className="text-sm font-medium">Status:</span>
                              <span className="text-sm">{alert.status}</span>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] gap-2">
                              <span className="text-sm font-medium">Timestamp:</span>
                              <span className="text-sm">{alert.timestamp}</span>
                            </div>
                            <div className="grid grid-cols-[120px_1fr] gap-2">
                              <span className="text-sm font-medium">Actions:</span>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">Acknowledge</Button>
                                <Button size="sm" variant="outline">Resolve</Button>
                                <Button size="sm">View Details</Button>
                              </div>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing 1-5 of 125 records
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
