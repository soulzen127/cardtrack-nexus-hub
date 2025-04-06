
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Filter, 
  Layers, 
  Search, 
  CreditCard, 
  PlayCircle, 
  PauseCircle, 
  Clock,
  Sliders,
  Map
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapView } from "@/components/tracking/MapView";
import { useI18n } from "@/hooks/use-i18n";

export default function TrackingPage() {
  const [isRealtime, setIsRealtime] = useState(true);
  const [timeSliderValue, setTimeSliderValue] = useState([50]);
  const [selectedDate, setSelectedDate] = useState("");
  const { t } = useI18n();

  // Mock cards data
  const trackingCards = [
    { id: "C001", name: "John Smith", cardNumber: "1234-5678-9012-3456", status: "active", location: t("taipei") },
    { id: "C002", name: "Jane Doe", cardNumber: "2345-6789-0123-4567", status: "active", location: t("kaohsiung") },
    { id: "C003", name: "Charlie Brown", cardNumber: "5678-9012-3456-7890", status: "active", location: t("tainan") },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">{t("locationTracking")}</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              {t("filter")}
            </Button>
            <Button variant="outline" size="sm">
              <Layers className="h-4 w-4 mr-2" />
              {t("mapLayers")}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t("mapView")}</CardTitle>
              <CardDescription>{t("realtimeGeographicVisualization")}</CardDescription>
            </CardHeader>
            <CardContent>
              <MapView 
                isRealtime={isRealtime}
                timeSliderValue={timeSliderValue}
                selectedDate={selectedDate}
              />
              
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={isRealtime ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setIsRealtime(true)}
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    {t("realtime")}
                  </Button>
                  <Button 
                    variant={!isRealtime ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setIsRealtime(false)}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {t("historical")}
                  </Button>
                </div>
                
                {isRealtime ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{t("autoRefresh")}:</span>
                    <Select defaultValue="30s">
                      <SelectTrigger className="w-24 h-8">
                        <SelectValue placeholder={t("refresh")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10s">10s</SelectItem>
                        <SelectItem value="30s">30s</SelectItem>
                        <SelectItem value="1m">1m</SelectItem>
                        <SelectItem value="5m">5m</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <span className="text-sm whitespace-nowrap">{t("selectDate")}:</span>
                    <Input
                      type="date"
                      className="h-8 w-full"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                )}
              </div>
              
              {!isRealtime && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">{t("time")}:</span>
                    <span className="text-sm">12:30 PM</span>
                  </div>
                  <Slider
                    defaultValue={timeSliderValue}
                    max={100}
                    step={1}
                    onValueChange={setTimeSliderValue}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-muted-foreground">00:00</span>
                    <span className="text-xs text-muted-foreground">23:59</span>
                  </div>
                  <div className="mt-2 flex justify-center space-x-2">
                    <Button size="sm" variant="outline">
                      <PauseCircle className="h-4 w-4 mr-2" />
                      {t("pause")}
                    </Button>
                    <Button size="sm">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      {t("play")}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{t("trackedCards")}</CardTitle>
              <CardDescription>{t("cardsCurrentlyBeingMonitored")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("searchCards")}
                  className="pl-8"
                />
              </div>
              
              <Tabs defaultValue="active">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="active">{t("active")}</TabsTrigger>
                  <TabsTrigger value="history">{t("history")}</TabsTrigger>
                  <TabsTrigger value="geofence">{t("geofence")}</TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="space-y-4">
                  {trackingCards.map((card) => (
                    <div 
                      key={card.id} 
                      className="flex flex-col p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 mr-2 text-primary" />
                          <span className="font-medium">{card.name}</span>
                        </div>
                        <Badge variant="outline" className="bg-cardtrack-green/10 text-cardtrack-green border-cardtrack-green/20">
                          {t("active")}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {t("card")}: {card.cardNumber}
                      </p>
                      <div className="flex items-center">
                        <Map className="h-3 w-3 mr-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{card.location}</p>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="history">
                  <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md">
                    <p className="text-muted-foreground text-sm">
                      {t("selectCardToViewLocationHistory")}
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="geofence">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{t("geofenceAlerts")}</span>
                      <Button size="sm" variant="outline">
                        <Sliders className="h-3 w-3 mr-2" />
                        {t("configure")}
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start space-x-2">
                        <Checkbox id="geofence1" />
                        <div className="space-y-1">
                          <Label
                            htmlFor="geofence1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {t("officeArea")}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {t("alertWhenCardsEnterOrLeave")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox id="geofence2" />
                        <div className="space-y-1">
                          <Label
                            htmlFor="geofence2"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {t("restrictedZone")}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {t("alertWhenCardsEnter")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <Checkbox id="geofence3" />
                        <div className="space-y-1">
                          <Label
                            htmlFor="geofence3"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {t("cityLimits")}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {t("alertWhenCardsLeave")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
