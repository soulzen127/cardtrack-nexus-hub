
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Search, CalendarIcon, X } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface AdvancedSearchProps {
  onSearch: (filters: any) => void;
}

export function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [department, setDepartment] = useState("");
  const [region, setRegion] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  // Mock departments and regions
  const departments = ["IT", "HR", "Finance", "Operations", "Sales", "Marketing"];
  const regions = ["Taipei", "Taichung", "Kaohsiung", "Tainan", "Hsinchu"];

  const handleSearch = () => {
    const filters = {
      cardNumber,
      holderName,
      department,
      region,
      date: date ? format(date, "yyyy-MM-dd") : undefined,
    };
    onSearch(filters);
    setIsOpen(false);
  };

  const handleClear = () => {
    setCardNumber("");
    setHolderName("");
    setDepartment("");
    setRegion("");
    setDate(undefined);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Search className="h-4 w-4 mr-2" />
          {t("advancedSearch")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">{t("searchFilters")}</h4>
            <p className="text-sm text-muted-foreground">
              {t("searchByMultipleFilters")}
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cardNumber" className="text-right">
                {t("cardNumber")}
              </Label>
              <Input
                id="cardNumber"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="holderName" className="text-right">
                {t("holderName")}
              </Label>
              <Input
                id="holderName"
                value={holderName}
                onChange={(e) => setHolderName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                {t("department")}
              </Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t("selectDepartment")} />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="region" className="text-right">
                {t("region")}
              </Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t("selectRegion")} />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((reg) => (
                    <SelectItem key={reg} value={reg}>
                      {reg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">{t("date")}</Label>
              <div className="col-span-3">
                <div className="flex">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    type="button"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : t("pickDate")}
                  </Button>
                </div>
                <div className="mt-1">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={handleClear}>
              <X className="h-4 w-4 mr-2" />
              {t("clear")}
            </Button>
            <Button size="sm" onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              {t("search")}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
