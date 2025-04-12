
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n } from "@/hooks/use-i18n";
import { toast } from "sonner";

interface GeofenceAlert {
  id: string;
  name: string;
  description: string;
  type: 'enter' | 'exit' | 'both';
  radius: number;
  active: boolean;
}

interface AlertCreationFormProps {
  newAlert: Partial<GeofenceAlert>;
  setNewAlert: React.Dispatch<React.SetStateAction<Partial<GeofenceAlert>>>;
  onCancel: () => void;
  onSave: () => void;
}

export function AlertCreationForm({ 
  newAlert, 
  setNewAlert, 
  onCancel, 
  onSave 
}: AlertCreationFormProps) {
  const { t } = useI18n();
  
  return (
    <div className="border rounded-md p-4 space-y-4">
      <h3 className="font-medium">{t("createNewAlert")}</h3>
      
      <div className="space-y-2">
        <Label htmlFor="alertName">{t("name")}</Label>
        <Input 
          id="alertName" 
          value={newAlert.name || ''} 
          onChange={e => setNewAlert({...newAlert, name: e.target.value})}
          placeholder={t("enterAlertName")}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="alertDescription">{t("description")}</Label>
        <Input 
          id="alertDescription" 
          value={newAlert.description || ''} 
          onChange={e => setNewAlert({...newAlert, description: e.target.value})}
          placeholder={t("enterAlertDescription")}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="alertType">{t("alertType")}</Label>
          <Select 
            value={newAlert.type} 
            onValueChange={value => setNewAlert({...newAlert, type: value as 'enter' | 'exit' | 'both'})}
          >
            <SelectTrigger id="alertType">
              <SelectValue placeholder={t("selectType")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="enter">{t("whenEntering")}</SelectItem>
              <SelectItem value="exit">{t("whenLeaving")}</SelectItem>
              <SelectItem value="both">{t("whenEnteringOrLeaving")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="alertRadius">{t("radiusMeters")}</Label>
          <Input 
            id="alertRadius" 
            type="number" 
            value={newAlert.radius || 500} 
            onChange={e => setNewAlert({...newAlert, radius: parseInt(e.target.value)})}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 pt-2">
        <Button variant="outline" onClick={onCancel}>
          {t("cancel")}
        </Button>
        <Button onClick={onSave}>
          {t("createAlert")}
        </Button>
      </div>
    </div>
  );
}
