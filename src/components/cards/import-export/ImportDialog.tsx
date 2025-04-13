
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUp, Database } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/hooks/use-i18n";

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportDialog({ open, onOpenChange }: ImportDialogProps) {
  const { t } = useI18n();
  const [importSource, setImportSource] = useState<string | null>(null);
  const [importFile, setImportFile] = useState<File | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImportFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!importSource) {
      toast.error(t("selectImportSource"), {
        description: t("pleaseSelectAnImportSource"),
      });
      return;
    }
    
    if (importSource === 'file' && !importFile) {
      toast.error(t("fileRequired"), {
        description: t("pleaseSelectAFileToImport"),
      });
      return;
    }

    toast.success(t("importStarted"), {
      description: t("processingYourImport"),
    });
    
    onOpenChange(false);
    setImportSource(null);
    setImportFile(null);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("import")}</DialogTitle>
          <DialogDescription>{t("selectImportSource")}</DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-4 py-4">
          <div 
            className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 ${importSource === 'file' ? 'border-primary bg-primary/5' : ''}`}
            onClick={() => setImportSource('file')}
          >
            <div className="p-2 bg-primary/10 rounded-full">
              <FileUp className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{t("fileUpload")}</h3>
              <p className="text-sm text-muted-foreground">{t("importFromFile")}</p>
            </div>
          </div>
          
          <div 
            className={`flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50 ${importSource === 'database' ? 'border-primary bg-primary/5' : ''}`}
            onClick={() => setImportSource('database')}
          >
            <div className="p-2 bg-primary/10 rounded-full">
              <Database className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{t("databaseImport")}</h3>
              <p className="text-sm text-muted-foreground">{t("importFromDatabase")}</p>
            </div>
          </div>
          
          {importSource === 'file' && (
            <div className="space-y-4 pt-4 border-t">
              <label className="block text-sm font-medium">{t("chooseFile")}</label>
              <Input type="file" onChange={handleFileChange} />
              {importFile && (
                <p className="text-sm text-muted-foreground">
                  {importFile.name} ({Math.round(importFile.size / 1024)} KB)
                </p>
              )}
            </div>
          )}
          
          {importSource === 'database' && (
            <div className="space-y-4 pt-4 border-t">
              <label className="block text-sm font-medium">{t("selectDatabaseSource")}</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectDatabaseSource")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="postgres">PostgreSQL</SelectItem>
                  <SelectItem value="mysql">MySQL</SelectItem>
                  <SelectItem value="sqlserver">SQL Server</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Connection String" type="password" />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button 
            onClick={handleImport}
            disabled={!importSource || (importSource === 'file' && !importFile)}
          >
            {t("processImport")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
