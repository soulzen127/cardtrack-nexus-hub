
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { useI18n } from "@/hooks/use-i18n";

// Import refactored components
import { CardHeader as CardsPageHeader } from "@/components/cards/CardHeader";
import { CardsSearch } from "@/components/cards/CardsSearch";
import { CardsList } from "@/components/cards/CardsList";
import { ImportDialog } from "@/components/cards/import-export/ImportDialog";
import { ExportDialog } from "@/components/cards/import-export/ExportDialog";
import CardDetailsDialog from "@/components/cards/CardDetailsDialog";
import CardHistoryDialog from "@/components/cards/CardHistoryDialog";
import RegisterCardDialog from "@/components/cards/RegisterCardDialog";
import { Card as CardModel, initialCards } from "@/components/cards/CardModel";

export default function CardsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState<CardModel | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [cards, setCards] = useState(initialCards);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const { t } = useI18n();

  const filteredCards = cards.filter(card => 
    card.cardNumber.includes(searchTerm) || 
    card.holder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (cardId: string, newStatus: string) => {
    // Update card status in local state
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === cardId ? { ...card, status: newStatus } : card
      )
    );
    
    toast.success(`${t("card")} ${cardId} ${t("statusChangedTo")} ${t(newStatus)}`, {
      description: t("cardStatusUpdatedSuccessfully"),
    });
  };

  const openCardDetails = (card: CardModel) => {
    setSelectedCard(card);
    setIsDetailsOpen(true);
  };

  const openCardHistory = (card: CardModel) => {
    setSelectedCard(card);
    setIsHistoryOpen(true);
  };

  const handleViewHistory = (card: CardModel) => {
    setSelectedCard(card);
    setIsDetailsOpen(false);
    setIsHistoryOpen(true);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <CardsPageHeader 
          onRegisterCard={() => setIsRegisterOpen(true)}
          onImport={() => setIsImportDialogOpen(true)}
          onExport={() => setIsExportDialogOpen(true)}
        />

        <Card>
          <CardHeader>
            <CardTitle>{t("cardsOverview")}</CardTitle>
            <CardDescription>{t("manageAndMonitorCards")}</CardDescription>
          </CardHeader>
          <CardContent>
            <CardsSearch 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("cardNumber")}</TableHead>
                    <TableHead>{t("holder")}</TableHead>
                    <TableHead className="hidden md:table-cell">{t("issueDate")}</TableHead>
                    <TableHead>{t("status")}</TableHead>
                    <TableHead className="hidden md:table-cell">{t("lastSeen")}</TableHead>
                    <TableHead className="hidden lg:table-cell">{t("location")}</TableHead>
                    <TableHead className="text-right">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <CardsList 
                    cards={filteredCards}
                    onStatusChange={handleStatusChange}
                    onViewDetails={openCardDetails}
                    onViewHistory={openCardHistory}
                  />
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Card Details Dialog */}
      <CardDetailsDialog 
        card={selectedCard}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onViewHistory={handleViewHistory}
      />

      {/* Card History Dialog */}
      <CardHistoryDialog
        card={selectedCard}
        open={isHistoryOpen}
        onOpenChange={setIsHistoryOpen}
      />

      {/* Register Card Dialog */}
      <RegisterCardDialog
        open={isRegisterOpen}
        onOpenChange={setIsRegisterOpen}
      />

      {/* Import Dialog */}
      <ImportDialog
        open={isImportDialogOpen}
        onOpenChange={setIsImportDialogOpen}
      />

      {/* Export Dialog */}
      <ExportDialog
        open={isExportDialogOpen}
        onOpenChange={setIsExportDialogOpen}
      />
    </MainLayout>
  );
}
