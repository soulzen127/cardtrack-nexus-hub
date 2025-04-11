
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { CreditCard, MapPin, Clock, Calendar as CalendarIcon } from "lucide-react";

interface CardHistoryDialogProps {
  card: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CardHistoryDialog({
  card,
  open,
  onOpenChange,
}: CardHistoryDialogProps) {
  const [selectedTab, setSelectedTab] = useState("map");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [timeFrame, setTimeFrame] = useState("today");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  // Mock history data
  const cardHistory = [
    { 
      date: "2023-04-18", 
      time: "14:23", 
      event: "Location updated", 
      details: "Taipei, Taiwan",
      coordinates: [121.5654, 25.0330] 
    },
    { 
      date: "2023-04-18", 
      time: "12:30", 
      event: "Card used", 
      details: "Building access",
      coordinates: [121.5644, 25.0320] 
    },
    { 
      date: "2023-04-17", 
      time: "09:45", 
      event: "Card used", 
      details: "Building access",
      coordinates: [121.5634, 25.0310] 
    },
    { 
      date: "2023-04-15", 
      time: "16:30", 
      event: "Status changed", 
      details: "Set to Active",
      coordinates: [121.5624, 25.0300] 
    },
  ];

  // Initialize map
  useEffect(() => {
    if (selectedTab === "map" && open && mapContainer.current && !map.current) {
      const mapboxToken = localStorage.getItem("mapbox_api_key");
      
      if (!mapboxToken) return;
      
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [121.5654, 25.0330], // Default to Taipei
        zoom: 13,
      });
      
      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );
      
      // Add path and markers
      map.current.on('load', () => {
        // Add path line
        if (map.current) {
          const coordinates = cardHistory.map(h => h.coordinates);
          
          map.current.addSource('route', {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'LineString',
                'coordinates': coordinates
              }
            }
          });
          
          map.current.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#6366f1',
              'line-width': 4,
              'line-dasharray': [0, 2]
            }
          });
          
          // Add markers
          cardHistory.forEach((history, index) => {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundColor = index === 0 ? '#6366f1' : '#94a3b8';
            el.style.width = index === 0 ? '20px' : '12px';
            el.style.height = index === 0 ? '20px' : '12px';
            el.style.borderRadius = '50%';
            el.style.boxShadow = index === 0 
              ? '0 0 0 5px rgba(99, 102, 241, 0.3)' 
              : '0 0 0 3px rgba(148, 163, 184, 0.3)';
            
            const popup = new mapboxgl.Popup({ offset: 25 })
              .setHTML(`
                <div class="p-2">
                  <div class="font-bold">${history.date} ${history.time}</div>
                  <div>${history.event}</div>
                  <div>${history.details}</div>
                </div>
              `);
            
            new mapboxgl.Marker(el)
              .setLngLat(history.coordinates)
              .setPopup(popup)
              .addTo(map.current!);
          });
          
          // Fit bounds to see all markers
          const bounds = new mapboxgl.LngLatBounds();
          coordinates.forEach(coord => bounds.extend(coord as mapboxgl.LngLatLike));
          map.current.fitBounds(bounds, { padding: 50 });
        }
      });
    }
    
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [open, selectedTab]);

  if (!card) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Card History</DialogTitle>
          <DialogDescription>
            View location history and usage for this card
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-4 mb-4">
          <CreditCard className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold">{card.holder}</h3>
            <p className="text-sm text-muted-foreground">{card.cardNumber}</p>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <div className="space-y-1">
            <Label>Date Range</Label>
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">Last 7 days</SelectItem>
                <SelectItem value="month">Last 30 days</SelectItem>
                <SelectItem value="custom">Custom date</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {timeFrame === "custom" && (
            <div className="space-y-1">
              <Label>Select Date</Label>
              <div className="relative">
                <div className="border rounded-md p-2 flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                  <span>{selectedDate ? format(selectedDate, 'PPP') : 'Pick a date'}</span>
                </div>
                <div className="absolute mt-1 z-10 bg-white border rounded-md shadow-md">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map">
            <div ref={mapContainer} className="w-full h-[300px] rounded-md" />
          </TabsContent>
          
          <TabsContent value="list">
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {cardHistory.map((history, index) => (
                <div key={index} className="flex items-start border-b pb-3 last:border-0">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    {history.event.includes('Location') ? (
                      <MapPin className="h-5 w-5 text-primary" />
                    ) : (
                      <Clock className="h-5 w-5 text-secondary" />
                    )}
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="font-medium">{history.event}</span>
                      <span className="text-sm text-muted-foreground">
                        {history.date} {history.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{history.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
