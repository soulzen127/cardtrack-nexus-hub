
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, PieChart, LineChart, Download } from "lucide-react";

interface AnalyticsContentProps {
  selectedTimeframe: string;
  setSelectedTimeframe: (value: string) => void;
}

export function AnalyticsContent({ selectedTimeframe, setSelectedTimeframe }: AnalyticsContentProps) {
  return (
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
  );
}
