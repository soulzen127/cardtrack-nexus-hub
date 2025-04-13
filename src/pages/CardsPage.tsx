
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  CreditCard, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Upload, 
  MoreHorizontal,
  MapPin,
  FileUp,
  Database,
  Files,
  FileText,
  FileSpreadsheet
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import CardDetailsDialog from "@/components/cards/CardDetailsDialog";
import CardHistoryDialog from "@/components/cards/CardHistoryDialog";
import RegisterCardDialog from "@/components/cards/RegisterCardDialog";
import { useI18n } from "@/hooks/use-i18n";

// Mock card data
const initialCards = [
  { id: "C001", cardNumber: "1234-5678-9012-3456", status: "active", holder: "John Smith", issueDate: "2023-01-15", lastSeen: "5 minutes ago", location: "Taipei, Taiwan" },
  { id: "C002", cardNumber: "2345-6789-0123-4567", status: "active", holder: "Jane Doe", issueDate: "2023-02-20", lastSeen: "1 hour ago", location: "Kaohsiung, Taiwan" },
  { id: "C003", cardNumber: "3456-7890-1234-5678", status: "suspended", holder: "Bob Johnson", issueDate: "2023-03-10", lastSeen: "2 days ago", location: "Taichung, Taiwan" },
  { id: "C004", cardNumber: "4567-8901-2345-6789", status: "lost", holder: "Alice Williams", issueDate: "2023-04-05", lastSeen: "7 days ago", location: "Hsinchu, Taiwan" },
  { id: "C005", cardNumber: "5678-9012-3456-7890", status: "active", holder: "Charlie Brown", issueDate: "2023-05-12", lastSeen: "30 minutes ago", location: "Tainan, Taiwan" },
];

export default function CardsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCard, setSelectedCard] = useState<any>(null);
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

  const openCardDetails = (card: any) => {
    setSelectedCard(card);
    setIsDetailsOpen(true);
  };

  const openCardHistory = (card: any) => {
    setSelectedCard(card);
    setIsHistoryOpen(true);
  };

  const handleViewHistory = (card: any) => {
    setSelectedCard(card);
    setIsDetailsOpen(false);
    setIsHistoryOpen(true);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">{t("cardManagement")}</h1>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsRegisterOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t("registerCard")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsImportDialogOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              {t("import")}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsExportDialogOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              {t("export")}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("cardsOverview")}</CardTitle>
            <CardDescription>{t("manageAndMonitorCards")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("searchByCardOrHolder")}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

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
                  {filteredCards.length > 0 ? (
                    filteredCards.map((card) => (
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
                              <DropdownMenuItem onClick={() => openCardDetails(card)}>
                                {t("viewDetails")}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => openCardHistory(card)}>
                                {t("viewHistory")}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {card.status !== "active" && (
                                <DropdownMenuItem onClick={() => handleStatusChange(card.id, "active")}>
                                  {t("markAsActive")}
                                </DropdownMenuItem>
                              )}
                              {card.status !== "suspended" && (
                                <DropdownMenuItem onClick={() => handleStatusChange(card.id, "suspended")}>
                                  {t("suspendCard")}
                                </DropdownMenuItem>
                              )}
                              {card.status !== "lost" && (
                                <DropdownMenuItem onClick={() => handleStatusChange(card.id, "lost")}>
                                  {t("reportAsLost")}
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        {t("noCardsFound")}
                      </TableCell>
                    </TableRow>
                  )}
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
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("import")}</DialogTitle>
            <DialogDescription>{t("selectImportSource")}</DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            <div className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <div className="p-2 bg-primary/10 rounded-full">
                <FileUp className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{t("fileUpload")}</h3>
                <p className="text-sm text-muted-foreground">{t("importFromFile")}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <div className="p-2 bg-primary/10 rounded-full">
                <Database className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{t("databaseImport")}</h3>
                <p className="text-sm text-muted-foreground">{t("importFromDatabase")}</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t">
              <label className="block text-sm font-medium">{t("chooseFile")}</label>
              <Input type="file" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={() => {
              toast.success(t("importStarted"), {
                description: t("processingYourImport")
              });
              setIsImportDialogOpen(false);
            }}>
              {t("processImport")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("export")}</DialogTitle>
            <DialogDescription>{t("selectExportDestination")}</DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            <div className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <div className="p-2 bg-primary/10 rounded-full">
                <Files className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{t("csvExport")}</h3>
                <p className="text-sm text-muted-foreground">{t("exportToFile")}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <div className="p-2 bg-primary/10 rounded-full">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{t("pdfExport")}</h3>
                <p className="text-sm text-muted-foreground">{t("exportToFile")}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
              <div className="p-2 bg-primary/10 rounded-full">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{t("excelExport")}</h3>
                <p className="text-sm text-muted-foreground">{t("exportToFile")}</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t">
              <label className="block text-sm font-medium">{t("selectExportDestination")}</label>
              <Input type="text" placeholder="C:/Users/Documents/Exports" />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={() => {
              toast.success(t("exportComplete"), {
                description: t("yourExportIsReadyToDownload")
              });
              setIsExportDialogOpen(false);
            }}>
              {t("downloadExport")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
