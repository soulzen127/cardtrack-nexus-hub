
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MapSection, MapActions } from "@/components/tracking/MapSection";
import { TrackedCardsPanel } from "@/components/tracking/TrackedCardsPanel";
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
          <TrackedCardsPanel />
        </div>
      </div>
    </MainLayout>
  );
}
