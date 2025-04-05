
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
  Map, 
  Filter, 
  Layers, 
  Search, 
  CreditCard, 
  PlayCircle, 
  PauseCircle, 
  Clock,
  Sliders
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

export default function TrackingPage() {
  const [isRealtime, setIsRealtime] = useState(true);
  const [timeSliderValue, setTimeSliderValue] = useState([50]);
  const [selectedDate, setSelectedDate] = useState("");

  // Mock cards data
  const trackingCards = [
    { id: "C001", name: "John Smith", cardNumber: "1234-5678-9012-3456", status: "active", location: "Taipei, Taiwan" },
    { id: "C002", name: "Jane Doe", cardNumber: "2345-6789-0123-4567", status: "active", location: "Kaohsiung, Taiwan" },
    { id: "C003", name: "Charlie Brown", cardNumber: "5678-9012-3456-7890", status: "active", location: "Tainan, Taiwan" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">Location Tracking</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Layers className="h-4 w-4 mr-2" />
              Map Layers
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Map View</CardTitle>
              <CardDescription>Real-time geographic visualization of active cards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="map-container bg-muted flex items-center justify-center">
                <div className="text-center space-y-3">
                  <Map className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">Map visualization will be available once connected to Mapbox or Google Maps API</p>
                  <p className="text-sm text-muted-foreground mb-4">This will display real-time locations of all tracked cards</p>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant={isRealtime ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setIsRealtime(true)}
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Real-time
                  </Button>
                  <Button 
                    variant={!isRealtime ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setIsRealtime(false)}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Historical
                  </Button>
                </div>
                
                {isRealtime ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Auto-refresh:</span>
                    <Select defaultValue="30s">
                      <SelectTrigger className="w-24 h-8">
                        <SelectValue placeholder="Refresh" />
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
                    <span className="text-sm whitespace-nowrap">Select date:</span>
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
                    <span className="text-sm">Time:</span>
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
                      Pause
                    </Button>
                    <Button size="sm">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Tracked Cards</CardTitle>
              <CardDescription>Cards currently being monitored</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search cards..."
                  className="pl-8"
                />
              </div>
              
              <Tabs defaultValue="active">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="geofence">Geofence</TabsTrigger>
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
                          Active
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Card: {card.cardNumber}
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
                      Select a card to view location history
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="geofence">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Geofence Alerts</span>
                      <Button size="sm" variant="outline">
                        <Sliders className="h-3 w-3 mr-2" />
                        Configure
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
                            Office Area
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Alert when cards enter or leave
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
                            Restricted Zone
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Alert when cards enter
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
                            City Limits
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Alert when cards leave
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
