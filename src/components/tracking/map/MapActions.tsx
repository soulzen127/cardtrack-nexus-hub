
import React, { useState } from "react";
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { 
  Filter, 
  Layers, 
  MapPin, 
  Search,
  Upload,
  MapPinX
} from "lucide-react";
import { FilterDialog } from "./dialogs/FilterDialog";
import { LayersDialog } from "./dialogs/LayersDialog";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

export function MapActions() {
  const { t } = useI18n();
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isLayersDialogOpen, setIsLayersDialogOpen] = useState(false);
  const [isLocationMode, setIsLocationMode] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast.info(`Searching for: ${searchQuery}`, {
        description: "Search functionality will be implemented soon"
      });
    }
    setSearchQuery('');
    setIsSearchExpanded(false);
  };
  
  const handleLocationMode = () => {
    setIsLocationMode(!isLocationMode);
    toast.success(isLocationMode 
      ? t("locationModeDeactivated") 
      : t("locationModeActivated"), {
        description: isLocationMode 
          ? t("clickMapToPlaceMarkerDeactivated")
          : t("clickMapToPlaceMarker")
      });
  };
  
  return (
    <div className="flex items-center space-x-2">
      {/* Search with expansion */}
      <div className="relative flex items-center">
        {isSearchExpanded ? (
          <form onSubmit={handleSearch} className="flex">
            <Input
              type="text"
              placeholder={t("searchLocation")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-[180px] mr-1"
              autoFocus
            />
            <Button 
              variant="outline" 
              size="sm" 
              type="submit"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsSearchExpanded(true)}
          >
            <Search className="h-4 w-4 mr-2" />
            {t("search")}
          </Button>
        )}
      </div>
      
      {/* Location Marker Button */}
      <Button 
        variant={isLocationMode ? "default" : "outline"} 
        size="sm"
        onClick={handleLocationMode}
      >
        {isLocationMode ? (
          <>
            <MapPinX className="h-4 w-4 mr-2" />
            {t("cancelLocationMode")}
          </>
        ) : (
          <>
            <MapPin className="h-4 w-4 mr-2" />
            {t("addLocation")}
          </>
        )}
      </Button>
      
      {/* Filter Button */}
      <Button variant="outline" size="sm" onClick={() => setIsFilterDialogOpen(true)}>
        <Filter className="h-4 w-4 mr-2" />
        {t("filter")}
      </Button>
      
      {/* Layers Button */}
      <Button variant="outline" size="sm" onClick={() => setIsLayersDialogOpen(true)}>
        <Layers className="h-4 w-4 mr-2" />
        {t("mapLayers")}
      </Button>
      
      {/* Coordinate Input Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            {t("input")}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => toast.info(t("coordinateInputComing"))}>
            {t("coordinateInput")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => toast.info(t("addressSearchComing"))}>
            {t("addressSearch")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
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
