
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Layers, ChevronUp, ChevronDown } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useI18n } from "@/hooks/use-i18n";

interface IndoorMapControllerProps {
  isIndoorMode: boolean;
  setIsIndoorMode: (value: boolean) => void;
  currentFloor: number;
  setCurrentFloor: (floor: number) => void;
  availableFloors: number[];
  buildingName: string;
}

export const IndoorMapController: React.FC<IndoorMapControllerProps> = ({
  isIndoorMode,
  setIsIndoorMode,
  currentFloor,
  setCurrentFloor,
  availableFloors,
  buildingName
}) => {
  const { t } = useI18n();
  const [expanded, setExpanded] = useState(true);
  
  const handleFloorChange = (floor: string) => {
    setCurrentFloor(parseInt(floor));
  };
  
  const incrementFloor = () => {
    const currentIndex = availableFloors.indexOf(currentFloor);
    if (currentIndex < availableFloors.length - 1) {
      setCurrentFloor(availableFloors[currentIndex + 1]);
    }
  };
  
  const decrementFloor = () => {
    const currentIndex = availableFloors.indexOf(currentFloor);
    if (currentIndex > 0) {
      setCurrentFloor(availableFloors[currentIndex - 1]);
    }
  };
  
  return (
    <div className="absolute right-2 top-16 bg-white dark:bg-gray-800 rounded-md shadow-md p-2 z-10">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsIndoorMode(!isIndoorMode)}
          >
            <Layers className="h-4 w-4 mr-2" />
            {isIndoorMode ? t("outdoorMap") : t("indoorMap")}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-2 px-2"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
        
        {expanded && isIndoorMode && (
          <>
            <div className="text-sm font-medium">{buildingName}</div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="px-2" 
                onClick={incrementFloor}
                disabled={availableFloors.indexOf(currentFloor) === availableFloors.length - 1}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              
              <Select 
                value={currentFloor.toString()} 
                onValueChange={handleFloorChange}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Floor" />
                </SelectTrigger>
                <SelectContent>
                  {availableFloors.map((floor) => (
                    <SelectItem key={floor} value={floor.toString()}>
                      {floor === 0 ? "Ground Floor" : floor > 0 ? `Floor ${floor}` : `Basement ${Math.abs(floor)}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="px-2" 
                onClick={decrementFloor}
                disabled={availableFloors.indexOf(currentFloor) === 0}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
