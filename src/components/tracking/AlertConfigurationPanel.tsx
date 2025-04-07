
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Bell, Settings } from "lucide-react";
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

export function AlertConfigurationPanel() {
  const { t } = useI18n();
  const [alerts, setAlerts] = useState<GeofenceAlert[]>([
    { 
      id: '1', 
      name: t("officeArea"), 
      description: t("alertWhenCardsEnterOrLeave"), 
      type: 'both',
      radius: 500,
      active: true
    },
    { 
      id: '2', 
      name: t("restrictedZone"), 
      description: t("alertWhenCardsEnter"), 
      type: 'enter',
      radius: 200,
      active: true
    },
    { 
      id: '3', 
      name: t("cityLimits"), 
      description: t("alertWhenCardsLeave"), 
      type: 'exit',
      radius: 5000,
      active: false
    }
  ]);
  
  const [isCreating, setIsCreating] = useState(false);
  const [newAlert, setNewAlert] = useState<Partial<GeofenceAlert>>({
    name: '',
    description: '',
    type: 'both',
    radius: 500,
    active: true
  });
  
  const toggleAlertActive = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
    
    const alert = alerts.find(a => a.id === id);
    if (alert) {
      toast.success(`${alert.name} ${alert.active ? t("disabled") : t("enabled")}`);
    }
  };
  
  const handleCreateAlert = () => {
    if (!newAlert.name) {
      toast.error(t("nameRequired"));
      return;
    }
    
    const newId = String(Date.now());
    const createdAlert = {
      ...newAlert,
      id: newId
    } as GeofenceAlert;
    
    setAlerts(prev => [...prev, createdAlert]);
    setIsCreating(false);
    setNewAlert({
      name: '',
      description: '',
      type: 'both',
      radius: 500,
      active: true
    });
    
    toast.success(t("alertCreated"));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="h-5 w-5 mr-2" />
          {t("geofenceAlerts")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map(alert => (
          <div key={alert.id} className="flex items-center justify-between p-3 border rounded-md">
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
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                {t("configure")}
              </Button>
              <Switch 
                checked={alert.active} 
                onCheckedChange={() => toggleAlertActive(alert.id)} 
              />
            </div>
          </div>
        ))}
        
        {isCreating ? (
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
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                {t("cancel")}
              </Button>
              <Button onClick={handleCreateAlert}>
                {t("createAlert")}
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={() => setIsCreating(true)}>
            {t("addNewAlert")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
