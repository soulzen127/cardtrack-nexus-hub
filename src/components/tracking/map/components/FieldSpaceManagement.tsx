
import React, { useState } from 'react';
import { useI18n } from "@/hooks/use-i18n";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, Layers, MapPin, Upload } from "lucide-react";
import { LocationManagement } from './space-management/LocationManagement';
import { DeviceManagement } from './space-management/DeviceManagement';
import { SpaceManagement } from './space-management/SpaceManagement';

interface FieldSpaceManagementProps {
  // Add props as needed
}

export function FieldSpaceManagement({}: FieldSpaceManagementProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('location');
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  
  return (
    <div className="w-full h-full min-h-[600px]">
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t("fieldSpaceManagement")}</CardTitle>
              <CardDescription>{t("manageLocationsDevicesAndSpaces")}</CardDescription>
            </div>
            <Button onClick={() => setShowUploadDialog(true)} className="flex items-center">
              <Upload className="mr-2 h-4 w-4" />
              {t("uploadFiles")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {t("locations")}
              </TabsTrigger>
              <TabsTrigger value="device" className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                {t("devices")}
              </TabsTrigger>
              <TabsTrigger value="space" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                {t("spaces")}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="location">
              <LocationManagement />
            </TabsContent>
            
            <TabsContent value="device">
              <DeviceManagement />
            </TabsContent>
            
            <TabsContent value="space">
              <SpaceManagement />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {showUploadDialog && (
        <UploadDialog onClose={() => setShowUploadDialog(false)} />
      )}
    </div>
  );
}

function UploadDialog({ onClose }: { onClose: () => void }) {
  const { t } = useI18n();
  const [selectedUploadType, setSelectedUploadType] = useState<'2d' | '3d'>('2d');
  
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-background rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-medium mb-4">{t("uploadFiles")}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2">{t("selectFileType")}</label>
            <div className="flex gap-4">
              <button 
                onClick={() => setSelectedUploadType('2d')}
                className={`flex-1 p-3 border rounded-md text-center ${selectedUploadType === '2d' ? 'border-primary bg-primary/10' : 'border-gray-200'}`}
              >
                {t("2dFloorPlans")}
                <div className="text-xs text-muted-foreground mt-1">JPG, PNG, PDF</div>
              </button>
              <button 
                onClick={() => setSelectedUploadType('3d')}
                className={`flex-1 p-3 border rounded-md text-center ${selectedUploadType === '3d' ? 'border-primary bg-primary/10' : 'border-gray-200'}`}
              >
                {t("3dModels")}
                <div className="text-xs text-muted-foreground mt-1">OBJ, GLB</div>
              </button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium block mb-2">{t("dragAndDropFiles")}</label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center">
              <Upload className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-sm text-muted-foreground">
                {selectedUploadType === '2d' 
                  ? t("dragAndDrop2dFiles") 
                  : t("dragAndDrop3dFiles")}
              </p>
              <Button variant="outline" className="mt-4">
                {t("browseFiles")}
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button onClick={onClose}>
              {t("upload")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
