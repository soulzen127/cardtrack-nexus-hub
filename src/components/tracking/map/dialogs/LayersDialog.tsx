
import React from "react";
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MapPin, Map as MapIcon, Layers } from "lucide-react";

interface LayersDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LayersDialog({ isOpen, onOpenChange }: LayersDialogProps) {
  const { t } = useI18n();
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("mapLayers")}</DialogTitle>
          <DialogDescription>
            {t("customizeMapDisplay")}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox id="layer-cards" defaultChecked />
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="layer-cards" className="font-medium">
                    {t("cardsLayer")}
                  </Label>
                  <MapPin className="h-4 w-4 ml-2 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">
                  {t("showCardsOnMap")}
                </span>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="layer-geofences" defaultChecked />
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="layer-geofences" className="font-medium">
                    {t("geofencesLayer")}
                  </Label>
                  <MapIcon className="h-4 w-4 ml-2 text-blue-500" />
                </div>
                <span className="text-xs text-muted-foreground">
                  {t("showGeofencedAreas")}
                </span>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="layer-heatmap" />
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="layer-heatmap" className="font-medium">
                    {t("heatmapLayer")}
                  </Label>
                  <div className="ml-2 h-4 w-4 bg-gradient-to-r from-blue-500 to-red-500 rounded-full" />
                </div>
                <span className="text-xs text-muted-foreground">
                  {t("showDensityHeatmap")}
                </span>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="layer-buildings" defaultChecked />
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="layer-buildings" className="font-medium">
                    {t("buildingsLayer")}
                  </Label>
                  <Layers className="h-4 w-4 ml-2 text-gray-500" />
                </div>
                <span className="text-xs text-muted-foreground">
                  {t("show3DBuildings")}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>{t("mapStyle")}</Label>
            <Select defaultValue="streets">
              <SelectTrigger>
                <SelectValue placeholder={t("selectMapStyle")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="streets">{t("streetsView")}</SelectItem>
                <SelectItem value="satellite">{t("satelliteView")}</SelectItem>
                <SelectItem value="light">{t("lightTheme")}</SelectItem>
                <SelectItem value="dark">{t("darkTheme")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            {t("applyChanges")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
