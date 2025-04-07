
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MapSection, MapActions } from "@/components/tracking/MapSection";
import { TrackedCardsPanel } from "@/components/tracking/TrackedCardsPanel";
import { AlertConfigurationPanel } from "@/components/tracking/AlertConfigurationPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useI18n } from "@/hooks/use-i18n";

export default function TrackingPage() {
  const [isRealtime, setIsRealtime] = useState(true);
  const [timeSliderValue, setTimeSliderValue] = useState([50]);
  const [selectedDate, setSelectedDate] = useState("");
  const { t } = useI18n();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">{t("locationTracking")}</h1>
          <MapActions />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MapSection 
            isRealtime={isRealtime}
            setIsRealtime={setIsRealtime}
            timeSliderValue={timeSliderValue}
            setTimeSliderValue={setTimeSliderValue}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
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
