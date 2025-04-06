
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, CreditCard, Map, Sliders } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/hooks/use-i18n";

interface TrackingCard {
  id: string;
  name: string;
  cardNumber: string;
  status: string;
  location: string;
}

export function TrackedCardsPanel() {
  const { t } = useI18n();

  // Mock cards data
  const trackingCards = [
    { id: "C001", name: "John Smith", cardNumber: "1234-5678-9012-3456", status: "active", location: t("taipei") },
    { id: "C002", name: "Jane Doe", cardNumber: "2345-6789-0123-4567", status: "active", location: t("kaohsiung") },
    { id: "C003", name: "Charlie Brown", cardNumber: "5678-9012-3456-7890", status: "active", location: t("tainan") },
  ];

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
        
        <Tabs defaultValue="active">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="active">{t("active")}</TabsTrigger>
            <TabsTrigger value="history">{t("history")}</TabsTrigger>
            <TabsTrigger value="geofence">{t("geofence")}</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            {trackingCards.map((card) => (
              <CardItem key={card.id} card={card} />
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
            <GeofenceContent />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function CardItem({ card }: { card: TrackingCard }) {
  const { t } = useI18n();
  
  return (
    <div 
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
  );
}

function GeofenceContent() {
  const { t } = useI18n();

  return (
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
  );
}
