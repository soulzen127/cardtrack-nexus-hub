
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "@/components/ui/custom-charts";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface AnalyticsContentProps {
  selectedTimeframe: string;
  setSelectedTimeframe: (timeframe: string) => void;
  onExport: () => void;
}

export function AnalyticsContent({ 
  selectedTimeframe, 
  setSelectedTimeframe,
  onExport
}: AnalyticsContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <Select
          value={selectedTimeframe}
          onValueChange={setSelectedTimeframe}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Last 24 Hours</SelectItem>
            <SelectItem value="week">Last 7 Days</SelectItem>
            <SelectItem value="month">Last 30 Days</SelectItem>
            <SelectItem value="quarter">Last 90 Days</SelectItem>
            <SelectItem value="year">Last 365 Days</SelectItem>
          </SelectContent>
        </Select>
        
        <Button className="mt-2 sm:mt-0" variant="outline" onClick={onExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Analytics
        </Button>
      </div>
      
      <Tabs defaultValue="card-activity">
        <TabsList className="mb-4">
          <TabsTrigger value="card-activity">Card Activity</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="card-activity">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Card Status Distribution</CardTitle>
                <CardDescription>Current status of all cards in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: 'Active', value: 65 },
                    { name: 'Suspended', value: 15 },
                    { name: 'Expired', value: 10 },
                    { name: 'Lost', value: 10 },
                  ]}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Card Issuance Trend</CardTitle>
                <CardDescription>Number of cards issued over time</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={[
                    { name: 'Jan', value: 10 },
                    { name: 'Feb', value: 15 },
                    { name: 'Mar', value: 25 },
                    { name: 'Apr', value: 22 },
                    { name: 'May', value: 30 },
                    { name: 'Jun', value: 28 },
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="locations">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Locations</CardTitle>
                <CardDescription>Most visited locations by cards</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { name: 'Building A', value: 120 },
                    { name: 'Building B', value: 80 },
                    { name: 'Building C', value: 60 },
                    { name: 'Building D', value: 45 },
                    { name: 'Building E', value: 30 },
                  ]}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Zone Transitions</CardTitle>
                <CardDescription>Number of zone boundary crossings</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={[
                    { name: 'Mon', value: 45 },
                    { name: 'Tue', value: 52 },
                    { name: 'Wed', value: 49 },
                    { name: 'Thu', value: 62 },
                    { name: 'Fri', value: 58 },
                    { name: 'Sat', value: 20 },
                    { name: 'Sun', value: 18 },
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="system">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Events</CardTitle>
                <CardDescription>Events by category</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: 'Card Actions', value: 45 },
                    { name: 'User Login', value: 25 },
                    { name: 'Alerts', value: 15 },
                    { name: 'Reports', value: 10 },
                    { name: 'Settings', value: 5 },
                  ]}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>System access by hour of day</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { name: '6am', value: 10 },
                    { name: '8am', value: 35 },
                    { name: '10am', value: 42 },
                    { name: '12pm', value: 30 },
                    { name: '2pm', value: 38 },
                    { name: '4pm', value: 25 },
                    { name: '6pm', value: 15 },
                  ]}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
