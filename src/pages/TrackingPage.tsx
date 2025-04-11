
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MapSection, MapActions } from "@/components/tracking/MapSection";
import { TrackedCardsPanel } from "@/components/tracking/TrackedCardsPanel";
import { AlertConfigurationPanel } from "@/components/tracking/AlertConfigurationPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/hooks/use-i18n";
import { AdvancedSearch } from "@/components/tracking/AdvancedSearch";
import { mockCardLocations } from "@/components/tracking/map/mockData";

export default function TrackingPage() {
  const [isRealtime, setIsRealtime] = useState(true);
  const [timeSliderValue, setTimeSliderValue] = useState([50]);
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredLocations, setFilteredLocations] = useState(mockCardLocations);
  const { t } = useI18n();

  const handleAdvancedSearch = (filters: any) => {
    // In a real app, this would filter data from a database or API
    // For now, we'll just simulate filtering by returning a subset of the mock data
    console.log("Search filters:", filters);
    
    // Simulate filtered data
    const filtered = mockCardLocations.filter((_, index) => 
      // Just a simple filter for demonstration - in reality, this would use the actual filter criteria
      filters.cardNumber ? index % 2 === 0 : true
    );
    
    setFilteredLocations(filtered);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">{t("locationTracking")}</h1>
          <div className="flex items-center space-x-2">
            <AdvancedSearch onSearch={handleAdvancedSearch} />
            <MapActions />
          </div>
        </div>

        {/* Time Control Panel */}
        <div className="flex justify-between items-center p-4 border rounded-md bg-background">
          <div className="flex items-center space-x-4">
            <div className="space-x-2">
              <span className="text-sm font-medium">{t("viewMode")}:</span>
              <button
                onClick={() => setIsRealtime(true)}
                className={`px-3 py-1 text-sm rounded-md ${
                  isRealtime
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {t("realtime")}
              </button>
              <button
                onClick={() => setIsRealtime(false)}
                className={`px-3 py-1 text-sm rounded-md ${
                  !isRealtime
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                }`}
              >
                {t("historical")}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MapSection 
            isRealtime={isRealtime}
            setIsRealtime={setIsRealtime}
            timeSliderValue={timeSliderValue}
            setTimeSliderValue={setTimeSliderValue}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            cardLocations={filteredLocations}
          />
          
          <div className="space-y-6">
            <Tabs defaultValue="cards">
              <TabsList className="w-full">
                <TabsTrigger value="cards" className="flex-1">{t("trackedCards")}</TabsTrigger>
                <TabsTrigger value="alerts" className="flex-1">{t("alerts")}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cards">
                <TrackedCardsPanel />
              </TabsContent>
              
              <TabsContent value="alerts">
                <AlertConfigurationPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
