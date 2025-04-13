
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

interface ScheduledReport {
  id: number;
  name: string;
  frequency: string;
  recipients: string;
  nextRun: string;
}

interface ScheduledReportsListProps {
  reports: ScheduledReport[];
  onEditSchedule: (reportId: number) => void;
  onDisable: (reportId: number) => void;
}

export function ScheduledReportsList({ reports, onEditSchedule, onDisable }: ScheduledReportsListProps) {
  return (
    <div className="space-y-4">
      {reports.map((report) => (
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
                <Button variant="outline" size="sm" onClick={() => onEditSchedule(report.id)}>
                  Edit Schedule
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-cardtrack-red border-cardtrack-red/20 hover:bg-cardtrack-red/10"
                  onClick={() => onDisable(report.id)}
                >
                  Disable
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
