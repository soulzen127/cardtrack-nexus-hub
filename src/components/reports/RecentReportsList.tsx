
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Share2, Download } from "lucide-react";

interface RecentReport {
  id: number;
  name: string;
  generated: string;
  format: string;
  size: string;
}

interface RecentReportsListProps {
  reports: RecentReport[];
}

export function RecentReportsList({ reports }: RecentReportsListProps) {
  return (
    <div className="space-y-4">
      {reports.map((report) => (
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
  );
}
