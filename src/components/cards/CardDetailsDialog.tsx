
import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Calendar, 
  User, 
  MapPin, 
  Clock, 
  Shield, 
  History 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CardDetailsDialogProps {
  card: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CardDetailsDialog({ card, open, onOpenChange }: CardDetailsDialogProps) {
  if (!card) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-cardtrack-green/10 text-cardtrack-green border-cardtrack-green/20">Active</Badge>;
      case "suspended":
        return <Badge variant="outline" className="bg-cardtrack-amber/10 text-cardtrack-amber border-cardtrack-amber/20">Suspended</Badge>;
      case "lost":
        return <Badge variant="outline" className="bg-cardtrack-red/10 text-cardtrack-red border-cardtrack-red/20">Lost</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Mock history data
  const cardHistory = [
    { date: "2023-04-18", time: "14:23", event: "Location updated", details: "Taipei, Taiwan" },
    { date: "2023-04-17", time: "09:45", event: "Card used", details: "Building access" },
    { date: "2023-04-15", time: "16:30", event: "Status changed", details: "Set to Active" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Card Details</DialogTitle>
          <DialogDescription>
            View detailed information about this card
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Card #{card.id}</span>
            </div>
            {getStatusBadge(card.status)}
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="grid grid-cols-[25px_1fr] items-start pb-2">
              <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Card Number</p>
                <p className="text-sm text-muted-foreground">
                  {card.cardNumber}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-[25px_1fr] items-start pb-2">
              <User className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Card Holder</p>
                <p className="text-sm text-muted-foreground">
                  {card.holder}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-[25px_1fr] items-start pb-2">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Issue Date</p>
                <p className="text-sm text-muted-foreground">
                  {card.issueDate}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-[25px_1fr] items-start pb-2">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Last Known Location</p>
                <p className="text-sm text-muted-foreground">
                  {card.location}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-[25px_1fr] items-start pb-2">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Last Seen</p>
                <p className="text-sm text-muted-foreground">
                  {card.lastSeen}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-[25px_1fr] items-start">
              <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium">Security Features</p>
                <p className="text-sm text-muted-foreground">
                  PIN protected, NFC enabled
                </p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center mb-2">
              <History className="h-5 w-5 mr-2 text-muted-foreground" />
              <h3 className="font-medium">Recent Activity</h3>
            </div>
            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
              {cardHistory.map((item, index) => (
                <div key={index} className="bg-muted/50 p-2 rounded-md text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.event}</span>
                    <span className="text-muted-foreground text-xs">{item.date} {item.time}</span>
                  </div>
                  <p className="text-muted-foreground">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button>View Full History</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
