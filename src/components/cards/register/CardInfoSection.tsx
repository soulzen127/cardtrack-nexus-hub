
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useI18n } from "@/hooks/use-i18n";

interface CardInfoSectionProps {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardType: string;
  setCardType: (value: string) => void;
}

export function CardInfoSection({ 
  cardNumber, 
  setCardNumber, 
  cardType, 
  setCardType 
}: CardInfoSectionProps) {
  const { t } = useI18n();
  
  return (
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
  );
}
