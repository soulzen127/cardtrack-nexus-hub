
import React from "react";
import { CreditCard, MapPin, MoreHorizontal } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useI18n } from "@/hooks/use-i18n";

interface Card {
  id: string;
  cardNumber: string;
  status: string;
  holder: string;
  issueDate: string;
  lastSeen: string;
  location: string;
}

interface CardsListProps {
  cards: Card[];
  onStatusChange: (cardId: string, newStatus: string) => void;
  onViewDetails: (card: Card) => void;
  onViewHistory: (card: Card) => void;
}

export function CardsList({ cards, onStatusChange, onViewDetails, onViewHistory }: CardsListProps) {
  const { t } = useI18n();
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="outline" className="bg-cardtrack-green/10 text-cardtrack-green border-cardtrack-green/20">{t("active")}</Badge>;
      case "suspended":
        return <Badge variant="outline" className="bg-cardtrack-amber/10 text-cardtrack-amber border-cardtrack-amber/20">{t("suspended")}</Badge>;
      case "lost":
        return <Badge variant="outline" className="bg-cardtrack-red/10 text-cardtrack-red border-cardtrack-red/20">{t("lost")}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  if (cards.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="h-24 text-center">
          {t("noCardsFound")}
        </TableCell>
      </TableRow>
    );
  }
  
  return (
    <>
      {cards.map((card) => (
        <TableRow key={card.id}>
          <TableCell className="font-medium">
            <div className="flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-muted-foreground" />
              {card.cardNumber}
            </div>
          </TableCell>
          <TableCell>{card.holder}</TableCell>
          <TableCell className="hidden md:table-cell">{card.issueDate}</TableCell>
          <TableCell>{getStatusBadge(card.status)}</TableCell>
          <TableCell className="hidden md:table-cell">{card.lastSeen}</TableCell>
          <TableCell className="hidden lg:table-cell">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              {card.location}
            </div>
          </TableCell>
          <TableCell className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onViewDetails(card)}>
                  {t("viewDetails")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onViewHistory(card)}>
                  {t("viewHistory")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {card.status !== "active" && (
                  <DropdownMenuItem onClick={() => onStatusChange(card.id, "active")}>
                    {t("markAsActive")}
                  </DropdownMenuItem>
                )}
                {card.status !== "suspended" && (
                  <DropdownMenuItem onClick={() => onStatusChange(card.id, "suspended")}>
                    {t("suspendCard")}
                  </DropdownMenuItem>
                )}
                {card.status !== "lost" && (
                  <DropdownMenuItem onClick={() => onStatusChange(card.id, "lost")}>
                    {t("reportAsLost")}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
