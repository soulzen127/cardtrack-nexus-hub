
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

interface FilterDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FilterDialog({ isOpen, onOpenChange }: FilterDialogProps) {
  const { t } = useI18n();
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("filterTrackingData")}</DialogTitle>
          <DialogDescription>
            {t("narrowDownResults")}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>{t("cardTypes")}</Label>
            <div className="flex items-start space-x-2">
              <Checkbox id="employee-cards" defaultChecked />
              <div className="grid gap-1.5">
                <Label htmlFor="employee-cards" className="font-normal">
                  {t("employeeCards")}
                </Label>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="visitor-cards" defaultChecked />
              <div className="grid gap-1.5">
                <Label htmlFor="visitor-cards" className="font-normal">
                  {t("visitorCards")}
                </Label>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox id="asset-cards" defaultChecked />
              <div className="grid gap-1.5">
                <Label htmlFor="asset-cards" className="font-normal">
                  {t("assetTrackingCards")}
                </Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>{t("locations")}</Label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder={t("selectLocations")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("allLocations")}</SelectItem>
                <SelectItem value="main-building">{t("mainBuilding")}</SelectItem>
                <SelectItem value="warehouse">{t("warehouse")}</SelectItem>
                <SelectItem value="parking">{t("parkingArea")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>{t("movementStatus")}</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="moving" defaultChecked />
                <Label htmlFor="moving" className="font-normal">
                  {t("moving")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="stationary" defaultChecked />
                <Label htmlFor="stationary" className="font-normal">
                  {t("stationary")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="idle" defaultChecked />
                <Label htmlFor="idle" className="font-normal">
                  {t("idle")}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="offline" defaultChecked />
                <Label htmlFor="offline" className="font-normal">
                  {t("offline")}
                </Label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            {t("applyFilters")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
