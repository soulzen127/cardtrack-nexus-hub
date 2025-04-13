
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ChevronRight } from "lucide-react";

interface ReportTemplate {
  id: number;
  name: string;
  type: string;
  lastGenerated: string;
  format: string;
}

interface ReportTemplatesListProps {
  templates: ReportTemplate[];
  onGenerate: (reportId: number) => void;
  onSchedule: (reportId: number) => void;
  onView: (reportId: number) => void;
}

export function ReportTemplatesList({ templates, onGenerate, onSchedule, onView }: ReportTemplatesListProps) {
  return (
    <div className="space-y-4">
      {templates.map((report) => (
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
                <Button variant="outline" size="sm" onClick={() => onGenerate(report.id)}>
                  Generate
                </Button>
                <Button variant="outline" size="sm" onClick={() => onSchedule(report.id)}>
                  Schedule
                </Button>
                <Button size="sm" onClick={() => onView(report.id)}>
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
  );
}
