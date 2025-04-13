
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  MapPin, 
  Calendar, 
  Shield, 
  Clock,
  HistoryIcon
} from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface CardDetailsDialogProps {
  card: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewHistory: (card: any) => void;
}

export default function CardDetailsDialog({
  card,
  open,
  onOpenChange,
  onViewHistory
}: CardDetailsDialogProps) {
  const { t } = useI18n();
  
  if (!card) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{t("cardDetails")}</DialogTitle>
          <DialogDescription>
            {t("viewDetailedInformationAboutThisCard")}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-primary" />
              <div>
                <h3 className="font-medium">{card.holder}</h3>
                <p className="text-sm text-muted-foreground">{card.cardNumber}</p>
              </div>
            </div>
            
            {card.status && (
              <Badge variant="outline" className={
                card.status === 'active' ? 'bg-cardtrack-green/10 text-cardtrack-green border-cardtrack-green/20' :
                card.status === 'suspended' ? 'bg-cardtrack-amber/10 text-cardtrack-amber border-cardtrack-amber/20' :
                'bg-cardtrack-red/10 text-cardtrack-red border-cardtrack-red/20'
              }>
                {t(card.status)}
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{t("lastKnownLocation")}</p>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                <p>{card.location}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{t("lastSeen")}</p>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                <p>{card.lastSeen}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{t("issueDate")}</p>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <p>{card.issueDate}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{t("securityFeatures")}</p>
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-1 text-muted-foreground" />
                <p className="text-sm">{t("pinProtectedNfcEnabled")}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">{t("recentActivity")}</h4>
            <div className="text-sm text-muted-foreground">
              <ul className="space-y-1">
                <li>• {t("entered")} {t("officeBuilding")} - {t("today")} 08:30</li>
                <li>• {t("moved")} {t("meetingRoom")} - {t("today")} 10:15</li>
                <li>• {t("moved")} {t("cafeteria")} - {t("today")} 12:00</li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-between pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t("close")}
            </Button>
            <Button 
              variant="default" 
              onClick={() => {
                onOpenChange(false);
                onViewHistory(card);
              }}
              className="flex items-center"
            >
              <HistoryIcon className="h-4 w-4 mr-2" />
              {t("viewFullHistory")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
