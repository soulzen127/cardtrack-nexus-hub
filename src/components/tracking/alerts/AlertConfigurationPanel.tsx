
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { toast } from "sonner";
import { AlertsList } from './AlertsList';
import { AlertCreationForm } from './AlertCreationForm';

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
        <AlertsList alerts={alerts} onToggleActive={toggleAlertActive} />
        
        {isCreating ? (
          <AlertCreationForm 
            newAlert={newAlert}
            setNewAlert={setNewAlert}
            onCancel={() => setIsCreating(false)}
            onSave={handleCreateAlert}
          />
        ) : (
          <Button onClick={() => setIsCreating(true)}>
            {t("addNewAlert")}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
