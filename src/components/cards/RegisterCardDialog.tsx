
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { useI18n } from "@/hooks/use-i18n";

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
          <div className="space-y-4">
            <h3 className="text-sm font-medium">{t("cardInformation")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">{t("cardNumber")}</Label>
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder={t("enterCardNumber")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardType">{t("cardType")}</Label>
                <Select value={cardType} onValueChange={setCardType}>
                  <SelectTrigger id="cardType">
                    <SelectValue placeholder={t("selectCardType")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">{t("standard")}</SelectItem>
                    <SelectItem value="premium">{t("premium")}</SelectItem>
                    <SelectItem value="temporary">{t("temporary")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">{t("holderInformation")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="holderName">{t("holderName")}</Label>
                <Input
                  id="holderName"
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  placeholder={t("enterHolderName")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="holderEmail">{t("holderEmail")}</Label>
                <Input
                  id="holderEmail"
                  type="email"
                  value={holderEmail}
                  onChange={(e) => setHolderEmail(e.target.value)}
                  placeholder={t("enterHolderEmail")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="holderPhone">{t("holderPhone")}</Label>
                <Input
                  id="holderPhone"
                  value={holderPhone}
                  onChange={(e) => setHolderPhone(e.target.value)}
                  placeholder={t("enterHolderPhone")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">{t("department")}</Label>
                <Input
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder={t("enterDepartment")}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">{t("validityPeriod")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">{t("startDate")}</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endDate">{t("endDate")}</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">{t("additionalInfo")}</h3>
            <div className="space-y-2">
              <Label htmlFor="accessLevel">{t("accessLevel")}</Label>
              <Select value={accessLevel} onValueChange={setAccessLevel}>
                <SelectTrigger id="accessLevel">
                  <SelectValue placeholder={t("accessLevel")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{t("low")}</SelectItem>
                  <SelectItem value="medium">{t("medium")}</SelectItem>
                  <SelectItem value="high">{t("high")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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
