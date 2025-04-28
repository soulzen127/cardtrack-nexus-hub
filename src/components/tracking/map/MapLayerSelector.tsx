
import React from "react";
import { useI18n } from "@/hooks/use-i18n";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Globe, Building } from "lucide-react";

interface MapLayerSelectorProps {
  currentMapLayer: '3dgis' | 'venue';
  onLayerChange: (value: '3dgis' | 'venue') => void;
}

export function MapLayerSelector({ currentMapLayer, onLayerChange }: MapLayerSelectorProps) {
  const { t } = useI18n();
  
  return (
    <Tabs 
      defaultValue="3dgis"
      value={currentMapLayer} 
      onValueChange={(value) => onLayerChange(value as '3dgis' | 'venue')}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="3dgis" className="flex items-center justify-center">
          <Globe className="h-4 w-4 mr-2" />
          {t("threeDGISLayer")}
        </TabsTrigger>
        <TabsTrigger value="venue" className="flex items-center justify-center">
          <Building className="h-4 w-4 mr-2" />
          {t("venueSpaceManagementLayer")}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
