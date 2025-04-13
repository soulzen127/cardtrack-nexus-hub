
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Bell, Settings, MapIcon, Ruler, Info } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { toast } from "sonner";
import { AlertsList } from './AlertsList';
import { Slider } from "@/components/ui/slider";

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
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<GeofenceAlert | null>(null);
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

  const handleConfigureAlert = (alert: GeofenceAlert) => {
    setSelectedAlert(alert);
    setIsConfiguring(true);
  };

  const handleSaveConfiguration = () => {
    if (!selectedAlert) return;

    setAlerts(prev => prev.map(alert => 
      alert.id === selectedAlert.id ? selectedAlert : alert
    ));

    toast.success(t("alertConfigured"), {
      description: t("alertConfigurationSaved")
    });

    setIsConfiguring(false);
    setSelectedAlert(null);
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
        {!isCreating && !isConfiguring && (
          <>
            <AlertsList 
              alerts={alerts} 
              onToggleActive={toggleAlertActive} 
              onConfigure={handleConfigureAlert}
            />
            
            <Button onClick={() => setIsCreating(true)}>
              {t("newAlert")}
            </Button>
          </>
        )}
        
        {isCreating && (
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
        )}

        {isConfiguring && selectedAlert && (
          <div className="border rounded-md p-4 space-y-4">
            <h3 className="font-medium flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              {t("configureAlert")}: {selectedAlert.name}
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="configAlertName">{t("name")}</Label>
              <Input 
                id="configAlertName" 
                value={selectedAlert.name} 
                onChange={e => setSelectedAlert({...selectedAlert, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="configAlertDescription">{t("description")}</Label>
              <Input 
                id="configAlertDescription" 
                value={selectedAlert.description} 
                onChange={e => setSelectedAlert({...selectedAlert, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="configAlertType">{t("alertType")}</Label>
              <Select 
                value={selectedAlert.type} 
                onValueChange={value => setSelectedAlert({...selectedAlert, type: value as 'enter' | 'exit' | 'both'})}
              >
                <SelectTrigger id="configAlertType">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enter">{t("whenEntering")}</SelectItem>
                  <SelectItem value="exit">{t("whenLeaving")}</SelectItem>
                  <SelectItem value="both">{t("whenEnteringOrLeaving")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="configRadius">{t("radiusMeters")}</Label>
                <span className="text-sm">{selectedAlert.radius}m</span>
              </div>
              <Slider
                id="configRadius"
                value={[selectedAlert.radius]}
                min={50}
                max={5000}
                step={50}
                onValueChange={([value]) => setSelectedAlert({...selectedAlert, radius: value})}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>50m</span>
                <span>2500m</span>
                <span>5000m</span>
              </div>
            </div>
            
            <div className="rounded-md bg-muted p-3 space-y-2">
              <h4 className="text-sm font-medium flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {t("geofenceLocation")}
              </h4>
              
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <MapIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t("center")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{selectedAlert.radius}m</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 pt-2">
                <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  {t("clickOnMapToDrawGeofence")}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Label htmlFor="configActive" className="flex items-center space-x-2 cursor-pointer">
                <Switch 
                  id="configActive"
                  checked={selectedAlert.active}
                  onCheckedChange={(checked) => setSelectedAlert({...selectedAlert, active: checked})}
                />
                <span>{selectedAlert.active ? t("enabled") : t("disabled")}</span>
              </Label>
            </div>
            
            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => {
                setIsConfiguring(false);
                setSelectedAlert(null);
              }}>
                {t("cancel")}
              </Button>
              <Button onClick={handleSaveConfiguration}>
                {t("saveConfiguration")}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
