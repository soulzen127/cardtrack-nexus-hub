
import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MapPin, Settings } from "lucide-react";
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

interface AlertItemProps {
  alert: GeofenceAlert;
  onToggleActive: (id: string) => void;
  onConfigure: () => void;
}

export function AlertItem({ alert, onToggleActive, onConfigure }: AlertItemProps) {
  const { t } = useI18n();
  
  return (
    <div className="flex items-center justify-between p-3 border rounded-md">
      <div>
        <div className="flex items-center">
          <MapPin className={`h-5 w-5 mr-2 ${alert.active ? 'text-primary' : 'text-muted-foreground'}`} />
          <h3 className="font-medium">{alert.name}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{alert.description}</p>
        <div className="flex items-center text-xs mt-1">
          <span className="text-muted-foreground mr-2">
            {alert.type === 'enter' ? t("enter") : 
             alert.type === 'exit' ? t("exit") : 
             t("enterAndExit")}
          </span>
          <span className="text-muted-foreground">
            {alert.radius}m
          </span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={onConfigure}>
          <Settings className="h-4 w-4 mr-2" />
          {t("configure")}
        </Button>
        <Switch 
          checked={alert.active} 
          onCheckedChange={() => onToggleActive(alert.id)} 
        />
      </div>
    </div>
  );
}
