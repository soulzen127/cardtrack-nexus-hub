
import React, { useState } from "react";
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
import { CreditCard } from "lucide-react";
import { CardHistoryMap } from "./card-history/CardHistoryMap";
import { CardHistoryList } from "./card-history/CardHistoryList";
import { CardHistoryDateFilter } from "./card-history/CardHistoryDateFilter";
import { mockCardHistory } from "./card-history/mockData";

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

        <CardHistoryDateFilter 
          timeFrame={timeFrame}
          setTimeFrame={setTimeFrame}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="map">
            <CardHistoryMap 
              selectedTab={selectedTab} 
              open={open} 
              cardHistory={mockCardHistory} 
            />
          </TabsContent>
          
          <TabsContent value="list">
            <CardHistoryList cardHistory={mockCardHistory} />
          </TabsContent>
        </Tabs>

        <div className="mt-4 flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
