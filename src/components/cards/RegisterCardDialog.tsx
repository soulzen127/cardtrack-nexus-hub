
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useI18n } from "@/hooks/use-i18n";

// Import our new components
import {
  CardInfoSection,
  HolderInfoSection,
  ValidityPeriodSection,
  AccessLevelSection
} from "./register";

interface RegisterCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RegisterCardDialog({
  open,
  onOpenChange,
}: RegisterCardDialogProps) {
  const { t } = useI18n();
  
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [holderEmail, setHolderEmail] = useState("");
  const [holderPhone, setHolderPhone] = useState("");
  const [cardType, setCardType] = useState("standard");
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState("");
  const [department, setDepartment] = useState("");
  const [accessLevel, setAccessLevel] = useState("medium");

  const handleSubmit = () => {
    if (!cardNumber || !holderName) {
      toast.error(t("errorCardRegistration"), {
        description: t("cardNumberAndHolderNameRequired"),
      });
      return;
    }
    
    toast.success(t("cardRegistered"), {
      description: t("cardHasBeenSuccessfullyRegistered"),
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t("registerNewCard")}</DialogTitle>
          <DialogDescription>
            {t("addNewCardToSystem")}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <CardInfoSection 
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cardType={cardType}
            setCardType={setCardType}
          />
          
          <HolderInfoSection
            holderName={holderName}
            setHolderName={setHolderName}
            holderEmail={holderEmail}
            setHolderEmail={setHolderEmail}
            holderPhone={holderPhone}
            setHolderPhone={setHolderPhone}
            department={department}
            setDepartment={setDepartment}
          />
          
          <ValidityPeriodSection
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          
          <AccessLevelSection
            accessLevel={accessLevel}
            setAccessLevel={setAccessLevel}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSubmit}>
            {t("registerCardButton")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
