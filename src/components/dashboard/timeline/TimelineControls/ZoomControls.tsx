
import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface ZoomControlsProps {
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
  handleZoom: (direction: 'in' | 'out') => void;
}

export const ZoomControls: React.FC<ZoomControlsProps> = ({
  zoomLevel,
  setZoomLevel,
  handleZoom
}) => {
  const { t } = useI18n();
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground hidden md:inline-block">
        {t("zoomInstructions")}
      </span>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => handleZoom('out')}
        disabled={zoomLevel <= 0.5}
        title={t("zoomOut")}
        className="p-1 h-8 w-8"
      >
        <ZoomOut className="h-4 w-4" />
        <span className="sr-only">{t("zoomOut")}</span>
      </Button>
      <div className="w-24 hidden md:block">
        <Slider
          value={[zoomLevel * 100]}
          min={50}
          max={300}
          step={25}
          onValueChange={([val]) => setZoomLevel(val / 100)}
        />
      </div>
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => handleZoom('in')}
        disabled={zoomLevel >= 3}
        title={t("zoomIn")}
        className="p-1 h-8 w-8"
      >
        <ZoomIn className="h-4 w-4" />
        <span className="sr-only">{t("zoomIn")}</span>
      </Button>
    </div>
  );
};
