
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CreditCard, Map, Sliders, Settings, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/hooks/use-i18n";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";

interface TrackingCard {
  id: string;
  name: string;
  cardNumber: string;
  status: string;
  location: string;
  coordinates: [number, number];
}

interface TrackedCardsPanelProps {
  onCardSelect?: (coordinates: [number, number]) => void;
}

export function TrackedCardsPanel({ onCardSelect }: TrackedCardsPanelProps) {
  const { t } = useI18n();
  const [selectedCard, setSelectedCard] = useState<TrackingCard | null>(null);
  const [isGeofenceConfigOpen, setIsGeofenceConfigOpen] = useState(false);
  const [selectedGeofence, setSelectedGeofence] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState("active");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeValue, setTimeValue] = useState(50);

  // Mock cards data
  const trackingCards: TrackingCard[] = [
    { id: "C001", name: "John Smith", cardNumber: "1234-5678-9012-3456", status: "active", location: t("taipei"), coordinates: [121.5654, 25.0330] },
    { id: "C002", name: "Jane Doe", cardNumber: "2345-6789-0123-4567", status: "active", location: t("kaohsiung"), coordinates: [120.3133, 22.6273] },
    { id: "C003", name: "Charlie Brown", cardNumber: "5678-9012-3456-7890", status: "active", location: t("tainan"), coordinates: [120.2133, 22.9997] },
  ];

  // Handle card click to focus on map
  const handleCardClick = (card: TrackingCard) => {
    setSelectedCard(card);
    if (onCardSelect) {
      onCardSelect(card.coordinates);
    }
  };

  // Custom geofence areas
  const geofenceAreas = [
    { id: "office", name: t("officeArea"), description: t("alertWhenCardsEnterOrLeave"), coordinates: [121.5654, 25.0330] as [number, number] },
    { id: "restricted", name: t("restrictedZone"), description: t("alertWhenCardsEnter"), coordinates: [120.3133, 22.6273] as [number, number] },
    { id: "city", name: t("cityLimits"), description: t("alertWhenCardsLeave"), coordinates: [120.2133, 22.9997] as [number, number] }
  ];

  const handleGeofenceSelect = (geofenceId: string) => {
    const geofence = geofenceAreas.find(area => area.id === geofenceId);
    setSelectedGeofence(geofenceId);
    
    if (geofence && onCardSelect) {
      onCardSelect(geofence.coordinates);
    }
  };

  // 處理時間軸變更
  const handleTimeChange = (value: number[]) => {
    setTimeValue(value[0]);
  };

  // 處理標籤變更
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    if (value === 'active' && selectedCard) {
      onCardSelect?.(selectedCard.coordinates);
    }
  };

  return (
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
        
        <Tabs value={currentTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="active">{t("active")}</TabsTrigger>
            <TabsTrigger value="history">{t("records")}</TabsTrigger>
            <TabsTrigger value="geofence">{t("geofence")}</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            {trackingCards.map((card) => (
              <CardItem 
                key={card.id} 
                card={card} 
                onClick={() => handleCardClick(card)}
                isSelected={selectedCard?.id === card.id}
              />
            ))}
          </TabsContent>
          <TabsContent value="history">
            {selectedCard ? (
              <CardHistoryTimeline 
                card={selectedCard} 
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                timeValue={timeValue}
                onTimeChange={handleTimeChange}
              />
            ) : (
              <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md">
                <p className="text-muted-foreground text-sm">
                  {t("selectCardToViewLocationHistory")}
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="geofence">
            <GeofenceContent 
              geofenceAreas={geofenceAreas}
              onGeofenceSelect={handleGeofenceSelect}
              selectedGeofence={selectedGeofence}
              onConfigure={() => setIsGeofenceConfigOpen(true)}
            />
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Geofence Configuration Dialog */}
      <GeofenceConfigDialog 
        open={isGeofenceConfigOpen}
        onOpenChange={setIsGeofenceConfigOpen}
        geofenceAreas={geofenceAreas}
        onGeofenceCreated={(name, type, radius) => {
          toast.success(t("geofenceCreated"), {
            description: `${name} ${t("geofenceCreatedSuccessfully")}`
          });
        }}
      />
    </Card>
  );
}

function CardItem({ card, onClick, isSelected }: { card: TrackingCard; onClick: () => void; isSelected: boolean }) {
  const { t } = useI18n();
  
  return (
    <div 
      className={`flex flex-col p-3 border rounded-md cursor-pointer hover:bg-muted/50 transition-colors ${isSelected ? 'border-primary bg-muted/50' : ''}`}
      onClick={onClick}
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
        <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
        <p className="text-xs text-muted-foreground">{card.location}</p>
      </div>
    </div>
  );
}

function CardHistoryTimeline({ 
  card, 
  selectedDate, 
  setSelectedDate,
  timeValue,
  onTimeChange
}: { 
  card: TrackingCard; 
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  timeValue: number;
  onTimeChange: (value: number[]) => void;
}) {
  const { t } = useI18n();
  
  // Mock timeline data
  const timelineEvents = [
    { time: "08:30", location: t("officeBuilding"), action: t("entered") },
    { time: "10:15", location: t("meetingRoom"), action: t("moved") },
    { time: "12:00", location: t("cafeteria"), action: t("moved") },
    { time: "13:30", location: t("officeBuilding"), action: t("returned") },
    { time: "17:45", location: t("officeBuilding"), action: t("exited") }
  ];

  // 計算目前選擇的時間
  const formatTimeFromSlider = (value: number) => {
    // 將 0-100 的範圍轉換為 0-24 小時
    const hours = Math.floor((value / 100) * 24);
    const minutes = Math.floor(((value / 100) * 24 * 60) % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
  
  const currentTime = formatTimeFromSlider(timeValue);
  
  return (
    <div className="space-y-4">
      <div className="bg-muted/50 p-3 rounded-md">
        <div className="flex items-center space-x-2 mb-2">
          <CreditCard className="h-4 w-4 text-primary" />
          <span className="font-medium">{card.name}</span>
          <Badge variant="outline">{card.cardNumber}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{t("todayRecords")}</p>
      </div>
      
      {/* Date and time selection */}
      <div className="space-y-3 border rounded-md p-3">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">{t("date")}</label>
          <Input 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
            className="w-auto"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">{t("time")}: {currentTime}</label>
          </div>
          <Slider 
            value={[timeValue]} 
            onValueChange={onTimeChange} 
            max={100} 
            step={1}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>00:00</span>
            <span>12:00</span>
            <span>23:59</span>
          </div>
        </div>
      </div>
      
      <div className="relative pl-4 space-y-4 before:absolute before:left-1.5 before:top-1 before:h-full before:w-0.5 before:-ml-px before:bg-border">
        {timelineEvents.map((event, index) => (
          <div key={index} className="relative pl-6 pb-4">
            <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-primary -ml-1"></div>
            <div className="text-sm">
              <span className="font-medium">{event.time}</span>
              <p className="text-muted-foreground">
                {event.action} {event.location}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeofenceContent({ 
  geofenceAreas, 
  onGeofenceSelect, 
  selectedGeofence,
  onConfigure
}: { 
  geofenceAreas: any[]; 
  onGeofenceSelect: (id: string) => void; 
  selectedGeofence: string | null;
  onConfigure: () => void;
}) {
  const { t } = useI18n();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{t("geofenceAlerts")}</span>
        <Button size="sm" variant="outline" onClick={onConfigure}>
          <Settings className="h-3 w-3 mr-2" />
          {t("configure")}
        </Button>
      </div>
      <div className="space-y-2">
        {geofenceAreas.map(area => (
          <div 
            key={area.id} 
            className={`flex items-start space-x-2 p-3 rounded-md border ${selectedGeofence === area.id ? 'border-primary bg-primary/5' : ''}`}
            onClick={() => onGeofenceSelect(area.id)}
          >
            <Checkbox 
              id={`geofence-${area.id}`} 
              checked={selectedGeofence === area.id}
              onCheckedChange={() => onGeofenceSelect(area.id)}
            />
            <div className="space-y-1">
              <Label
                htmlFor={`geofence-${area.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {area.name}
              </Label>
              <p className="text-xs text-muted-foreground">
                {area.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface GeofenceConfigDialogProps { 
  open: boolean; 
  onOpenChange: (open: boolean) => void; 
  geofenceAreas: any[];
  onGeofenceCreated: (name: string, type: string, radius: number) => void;
}

function GeofenceConfigDialog({ 
  open, 
  onOpenChange, 
  geofenceAreas,
  onGeofenceCreated
}: GeofenceConfigDialogProps) {
  const { t } = useI18n();
  const [geofenceName, setGeofenceName] = useState("");
  const [geofenceType, setGeofenceType] = useState("enter");
  const [geofenceRadius, setGeofenceRadius] = useState(500);
  const [selectedGeofence, setSelectedGeofence] = useState("new");
  
  const handleSave = () => {
    if (!geofenceName.trim()) {
      toast.error(t("nameRequired"), {
        description: t("pleaseEnterGeofenceName")
      });
      return;
    }
    
    onGeofenceCreated(geofenceName, geofenceType, geofenceRadius);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("configureGeofence")}</DialogTitle>
          <DialogDescription>
            {t("defineGeofenceAreasForCardTracking")}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="current-geofences">{t("currentGeofences")}</Label>
            <Select defaultValue={selectedGeofence} onValueChange={setSelectedGeofence}>
              <SelectTrigger>
                <SelectValue placeholder={t("selectGeofence")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">{t("createNewGeofence")}</SelectItem>
                {geofenceAreas.map(area => (
                  <SelectItem key={area.id} value={area.id}>
                    {area.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="geofence-name">{t("geofenceName")}</Label>
            <Input 
              id="geofence-name" 
              value={geofenceName} 
              onChange={(e) => setGeofenceName(e.target.value)} 
              placeholder={t("enterGeofenceName")} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="geofence-type">{t("alertType")}</Label>
            <Select value={geofenceType} onValueChange={setGeofenceType}>
              <SelectTrigger>
                <SelectValue placeholder={t("selectAlertType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="enter">{t("whenCardsEnter")}</SelectItem>
                <SelectItem value="exit">{t("whenCardsExit")}</SelectItem>
                <SelectItem value="both">{t("whenCardsEnterOrExit")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="radius-slider">{t("radiusMeters")}</Label>
              <span className="text-sm font-medium">{geofenceRadius}m</span>
            </div>
            <Slider 
              id="radius-slider"
              value={[geofenceRadius]} 
              onValueChange={(value) => setGeofenceRadius(value[0])} 
              min={50} 
              max={5000} 
              step={50}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>50m</span>
              <span>2500m</span>
              <span>5000m</span>
            </div>
          </div>
          
          <div className="rounded-md border p-3">
            <p className="text-sm font-medium mb-2">{t("drawGeofence")}</p>
            <p className="text-xs text-muted-foreground mb-4">{t("clickOnMapToDrawGeofence")}</p>
            <div className="h-[200px] bg-muted rounded-md flex items-center justify-center">
              <MapPin className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSave}>
            {t("saveGeofence")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
