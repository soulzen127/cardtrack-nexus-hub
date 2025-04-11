
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Download } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { toast } from "sonner";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ExportDialog({ open, onOpenChange }: ExportDialogProps) {
  const { t } = useI18n();
  const [exportFormat, setExportFormat] = useState("pdf");
  const [exportData, setExportData] = useState<string[]>([
    "cardActivity",
    "locationData",
    "alertsData",
  ]);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [fileName, setFileName] = useState("dashboard_export");

  const handleExportDataChange = (id: string, checked: boolean) => {
    setExportData((prev) =>
      checked ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const handleExport = () => {
    toast.success(t("exportStarted"), {
      description: t("exportWillBeReadySoon"),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("exportDashboardData")}</DialogTitle>
          <DialogDescription>
            {t("selectDataAndFormatToExport")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>{t("exportFormat")}</Label>
            <RadioGroup
              value={exportFormat}
              onValueChange={setExportFormat}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf">PDF</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel">Excel</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv">CSV</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>{t("dataToInclude")}</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cardActivity"
                  checked={exportData.includes("cardActivity")}
                  onCheckedChange={(checked) =>
                    handleExportDataChange("cardActivity", checked === true)
                  }
                />
                <Label htmlFor="cardActivity">{t("cardActivityData")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="locationData"
                  checked={exportData.includes("locationData")}
                  onCheckedChange={(checked) =>
                    handleExportDataChange("locationData", checked === true)
                  }
                />
                <Label htmlFor="locationData">{t("locationData")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="alertsData"
                  checked={exportData.includes("alertsData")}
                  onCheckedChange={(checked) =>
                    handleExportDataChange("alertsData", checked === true)
                  }
                />
                <Label htmlFor="alertsData">{t("alertsData")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="systemEvents"
                  checked={exportData.includes("systemEvents")}
                  onCheckedChange={(checked) =>
                    handleExportDataChange("systemEvents", checked === true)
                  }
                />
                <Label htmlFor="systemEvents">{t("systemEvents")}</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("dateRange")}</Label>
            <div className="flex flex-col space-y-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "PP")} -{" "}
                          {format(dateRange.to, "PP")}
                        </>
                      ) : (
                        format(dateRange.from, "PP")
                      )
                    ) : (
                      <span>{t("selectDateRange")}</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={{
                      from: dateRange.from,
                      to: dateRange.to,
                    }}
                    onSelect={(range) => {
                      // Cast to the expected type
                      const typedRange = range as {
                        from: Date | undefined;
                        to: Date | undefined;
                      };
                      setDateRange(typedRange);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileName">{t("fileName")}</Label>
            <Input
              id="fileName"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            {t("exportNow")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
