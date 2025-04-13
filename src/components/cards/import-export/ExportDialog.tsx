
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
import { Input } from "@/components/ui/input";
import { Files, FileText, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/hooks/use-i18n";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportDialog({ open, onOpenChange }: ExportDialogProps) {
  const { t } = useI18n();
  const [exportDestination, setExportDestination] = useState<string | null>(null);
  const [exportPath, setExportPath] = useState("C:/Users/Documents/Exports");
  
  const handleExport = () => {
    if (!exportDestination) {
      toast.error(t("selectExportDestination"), {
        description: t("pleaseSelectAnExportDestination"),
      });
      return;
    }

    toast.success(t("exportComplete"), {
      description: t("yourExportIsReadyToDownload"),
    });
    
    onOpenChange(false);
    setExportDestination(null);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("export")}</DialogTitle>
          <DialogDescription>{t("selectExportDestination")}</DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 py-4">
          <div 
            className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 ${exportDestination === 'csv' ? 'border-primary bg-primary/5' : ''}`}
            onClick={() => setExportDestination('csv')}
          >
            <div className="p-2 bg-primary/10 rounded-full">
              <Files className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{t("csvExport")}</h3>
              <p className="text-sm text-muted-foreground">{t("exportToFile")}</p>
            </div>
          </div>
          
          <div 
            className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 ${exportDestination === 'pdf' ? 'border-primary bg-primary/5' : ''}`}
            onClick={() => setExportDestination('pdf')}
          >
            <div className="p-2 bg-primary/10 rounded-full">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{t("pdfExport")}</h3>
              <p className="text-sm text-muted-foreground">{t("exportToFile")}</p>
            </div>
          </div>
          
          <div 
            className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 ${exportDestination === 'excel' ? 'border-primary bg-primary/5' : ''}`}
            onClick={() => setExportDestination('excel')}
          >
            <div className="p-2 bg-primary/10 rounded-full">
              <FileSpreadsheet className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{t("excelExport")}</h3>
              <p className="text-sm text-muted-foreground">{t("exportToFile")}</p>
            </div>
          </div>
          
          {exportDestination && (
            <div className="space-y-4 pt-4 border-t">
              <label className="block text-sm font-medium">{t("exportPath")}</label>
              <Input 
                type="text" 
                placeholder={t("enterExportPath")} 
                value={exportPath}
                onChange={(e) => setExportPath(e.target.value)}
              />
              <div className="text-sm text-muted-foreground">
                {t("exportWillBeSavedTo")}: {exportPath}/{exportDestination === 'csv' ? 'cards.csv' : exportDestination === 'pdf' ? 'cards.pdf' : 'cards.xlsx'}
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button 
            onClick={handleExport}
            disabled={!exportDestination}
          >
            {t("downloadExport")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
