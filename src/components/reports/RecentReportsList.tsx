
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download,
  Share,
  FilePdf,
  FileSpreadsheet,
  FileText as FileCSV
} from "lucide-react";

interface RecentReport {
  id: number;
  name: string;
  generated: string;
  format: string;
  size: string;
}

interface RecentReportsListProps {
  reports: RecentReport[];
  onShare: (reportId: number) => void;
  onDownload: (reportId: number) => void;
}

export function RecentReportsList({ reports, onShare, onDownload }: RecentReportsListProps) {
  const getFormatIcon = (format: string) => {
    if (format.toLowerCase().includes('pdf')) {
      return <FilePdf className="h-5 w-5 mr-2 text-cardtrack-red" />;
    } else if (format.toLowerCase().includes('excel')) {
      return <FileSpreadsheet className="h-5 w-5 mr-2 text-cardtrack-green" />;
    } else {
      return <FileCSV className="h-5 w-5 mr-2 text-cardtrack-blue" />;
    }
  };
  
  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <Card key={report.id}>
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4">
              <div className="space-y-1 mb-2 md:mb-0">
                <div className="flex items-center">
                  {getFormatIcon(report.format)}
                  <h3 className="font-medium">{report.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Generated: {report.generated} • Format: {report.format} • Size: {report.size}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onShare(report.id)}>
                  <Share className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDownload(report.id)}>
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
