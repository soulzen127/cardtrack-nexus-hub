
import React, { useState } from "react";
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { Filter, Layers } from "lucide-react";
import { FilterDialog } from "./dialogs/FilterDialog";
import { LayersDialog } from "./dialogs/LayersDialog";

export function MapActions() {
  const { t } = useI18n();
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isLayersDialogOpen, setIsLayersDialogOpen] = useState(false);
  
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="sm" onClick={() => setIsFilterDialogOpen(true)}>
        <Filter className="h-4 w-4 mr-2" />
        {t("filter")}
      </Button>
      <Button variant="outline" size="sm" onClick={() => setIsLayersDialogOpen(true)}>
        <Layers className="h-4 w-4 mr-2" />
        {t("mapLayers")}
      </Button>
      
      {/* Filter Dialog */}
      <FilterDialog 
        isOpen={isFilterDialogOpen} 
        onOpenChange={setIsFilterDialogOpen} 
      />
      
      {/* Map Layers Dialog */}
      <LayersDialog 
        isOpen={isLayersDialogOpen} 
        onOpenChange={setIsLayersDialogOpen} 
      />
    </div>
  );
}
