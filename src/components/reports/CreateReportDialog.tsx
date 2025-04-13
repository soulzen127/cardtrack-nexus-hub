
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface CreateReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateReportDialog: React.FC<CreateReportDialogProps> = ({
  open,
  onOpenChange
}) => {
  const [reportType, setReportType] = useState("cards");
  const [reportFormat, setReportFormat] = useState("pdf");
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [dateRange, setDateRange] = useState("last_7_days");
  const [selectedFields, setSelectedFields] = useState<string[]>(["id", "holder", "status"]);
  
  const handleCreateReport = () => {
    if (!reportTitle.trim()) {
      toast.error("Report title is required");
      return;
    }
    
    toast.success("Creating your report...");
    setTimeout(() => {
      toast.success("Report generated successfully!");
      onOpenChange(false);
    }, 1500);
  };
  
  const toggleField = (field: string) => {
    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter(f => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Report</DialogTitle>
          <DialogDescription>
            Select the type of report and customize its content
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="type" className="pt-2">
          <TabsList className="mb-4 grid grid-cols-4">
            <TabsTrigger value="type">Type</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="type">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-title">Report Title</Label>
                <Input
                  id="report-title"
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="Enter report title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-description">Description (Optional)</Label>
                <Textarea
                  id="report-description"
                  value={reportDescription}
                  onChange={(e) => setReportDescription(e.target.value)}
                  placeholder="Enter description"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Report Category</Label>
                <RadioGroup value={reportType} onValueChange={setReportType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cards" id="report-cards" />
                    <Label htmlFor="report-cards">Cards Report</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tracking" id="report-tracking" />
                    <Label htmlFor="report-tracking">Location Tracking Report</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="activity" id="report-activity" />
                    <Label htmlFor="report-activity">Activity Report</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="report-system" />
                    <Label htmlFor="report-system">System Status Report</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Time Period</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="yesterday">Yesterday</SelectItem>
                    <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                    <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                    <SelectItem value="this_month">This Month</SelectItem>
                    <SelectItem value="last_month">Last Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Fields to Include</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="field-id" 
                      checked={selectedFields.includes("id")}
                      onCheckedChange={() => toggleField("id")}
                    />
                    <Label htmlFor="field-id">ID/Number</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="field-holder" 
                      checked={selectedFields.includes("holder")}
                      onCheckedChange={() => toggleField("holder")}
                    />
                    <Label htmlFor="field-holder">Card Holder</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="field-status" 
                      checked={selectedFields.includes("status")}
                      onCheckedChange={() => toggleField("status")}
                    />
                    <Label htmlFor="field-status">Status</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="field-issue-date" 
                      checked={selectedFields.includes("issue_date")}
                      onCheckedChange={() => toggleField("issue_date")}
                    />
                    <Label htmlFor="field-issue-date">Issue Date</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="field-expiry-date" 
                      checked={selectedFields.includes("expiry_date")}
                      onCheckedChange={() => toggleField("expiry_date")}
                    />
                    <Label htmlFor="field-expiry-date">Expiry Date</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="field-location" 
                      checked={selectedFields.includes("location")}
                      onCheckedChange={() => toggleField("location")}
                    />
                    <Label htmlFor="field-location">Last Location</Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="format">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Report Format</Label>
                <RadioGroup value={reportFormat} onValueChange={setReportFormat}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pdf" id="format-pdf" />
                    <Label htmlFor="format-pdf">PDF Document</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="excel" id="format-excel" />
                    <Label htmlFor="format-excel">Excel Spreadsheet</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="csv" id="format-csv" />
                    <Label htmlFor="format-csv">CSV File</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-charts" />
                  <Label htmlFor="include-charts">Include Charts and Graphs</Label>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Schedule Type</Label>
                <Select defaultValue="once">
                  <SelectTrigger>
                    <SelectValue placeholder="Select schedule type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">One-time Report</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Delivery Method</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="email-delivery" defaultChecked />
                  <Label htmlFor="email-delivery">Send via Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="system-delivery" defaultChecked />
                  <Label htmlFor="system-delivery">Save to System</Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateReport}>
            Create Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
