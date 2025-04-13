
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, Download, Eye, Filter, FileText, Search } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type RecordStatus = "pending" | "acknowledged" | "resolved";

interface RecordItem {
  id: number;
  type: "card_event" | "system_log" | "alert";
  title: string;
  description: string;
  timestamp: string;
  status: RecordStatus;
  cardId?: string;
  cardHolder?: string;
  user?: string;
  ipAddress?: string;
  location?: string;
  details?: {
    date: string;
    time: string;
    content: string;
    reason: string;
    process: string;
    responsible: string;
    location: string;
    equipment: string;
  };
}

export default function RecordsPage() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("card_events");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RecordItem | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"acknowledge" | "resolve">("acknowledge");
  const [actionNote, setActionNote] = useState("");
  
  const mockRecords: RecordItem[] = [
    {
      id: 1,
      type: "alert",
      title: "Geofence Violation",
      description: "Card #C001 entered restricted area",
      timestamp: "2023-04-18 10:42:33",
      status: "pending",
      cardId: "C001",
      cardHolder: "John Smith",
      location: "Building A, Restricted Zone",
      details: {
        date: "2023-04-18",
        time: "10:42:33",
        content: "Card entered a restricted area without proper authorization",
        reason: "Unauthorized access attempt",
        process: "Security team dispatched to location",
        responsible: "Security Team Alpha",
        location: "Building A, Level 3, Server Room",
        equipment: "Card Reader #SR-04, Access Control Panel #A12"
      }
    },
    {
      id: 2,
      type: "card_event",
      title: "Card Registered",
      description: "New card registered to system",
      timestamp: "2023-04-17 09:15:22",
      status: "acknowledged",
      cardId: "C002",
      cardHolder: "Jane Davis",
      location: "Admin Office",
    },
    {
      id: 3,
      type: "system_log",
      title: "System Backup",
      description: "Automated database backup completed",
      timestamp: "2023-04-17 03:00:00",
      status: "resolved",
      user: "system",
      ipAddress: "192.168.1.5",
    },
    {
      id: 4,
      type: "alert",
      title: "Suspicious Activity",
      description: "Multiple failed access attempts",
      timestamp: "2023-04-16 18:32:11",
      status: "acknowledged",
      cardId: "C005",
      cardHolder: "Guest User",
      location: "Main Entrance",
    },
    {
      id: 5,
      type: "system_log",
      title: "User Login",
      description: "Administrative login detected",
      timestamp: "2023-04-16 14:22:05",
      status: "resolved",
      user: "admin@example.com",
      ipAddress: "10.0.0.15",
    },
  ];
  
  const filteredRecords = mockRecords.filter(record => {
    // Filter by tab
    if (activeTab === "card_events" && record.type !== "card_event") return false;
    if (activeTab === "system_logs" && record.type !== "system_log") return false;
    if (activeTab === "alerts" && record.type !== "alert") return false;
    
    // Search term can match title, description, cardId, etc.
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      return (
        record.title.toLowerCase().includes(lowercaseSearch) ||
        record.description.toLowerCase().includes(lowercaseSearch) ||
        (record.cardId && record.cardId.toLowerCase().includes(lowercaseSearch)) ||
        (record.cardHolder && record.cardHolder.toLowerCase().includes(lowercaseSearch)) ||
        (record.user && record.user.toLowerCase().includes(lowercaseSearch))
      );
    }
    
    return true;
  });
  
  const handleViewDetails = (record: RecordItem) => {
    setSelectedRecord(record);
    setIsDetailsOpen(true);
  };
  
  const handleAction = (record: RecordItem, action: "acknowledge" | "resolve") => {
    setSelectedRecord(record);
    setActionType(action);
    setActionNote("");
    setIsActionDialogOpen(true);
  };
  
  const executeAction = () => {
    if (!selectedRecord) return;
    
    if (actionType === "acknowledge") {
      toast.success(`Record #${selectedRecord.id} has been acknowledged`);
    } else {
      toast.success(`Record #${selectedRecord.id} has been resolved`);
    }
    
    setIsActionDialogOpen(false);
  };
  
  const exportRecords = () => {
    toast.success("Records exported successfully");
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <h1 className="text-2xl font-bold tracking-tight">{t("recordsAndLogs")}</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setIsFilterOpen(true)}>
              <Filter className="h-4 w-4 mr-2" />
              {t("filters")}
            </Button>
            <Button variant="outline" size="sm" onClick={exportRecords}>
              <Download className="h-4 w-4 mr-2" />
              {t("export")}
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("recordsDatabase")}</CardTitle>
            <CardDescription>
              {t("browseSearchExport")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  placeholder={t("searchRecords")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
                <Button type="submit" size="icon" variant="ghost">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <Tabs defaultValue="card_events" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="card_events">
                    <FileText className="h-4 w-4 mr-2" />
                    {t("cardEvents")}
                  </TabsTrigger>
                  <TabsTrigger value="system_logs">
                    <FileText className="h-4 w-4 mr-2" />
                    {t("systemLogs")}
                  </TabsTrigger>
                  <TabsTrigger value="alerts">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {t("alerts")}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value={activeTab}>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {activeTab === "card_events" && (
                          <>
                            <TableHead>{t("cardID")}</TableHead>
                            <TableHead>{t("cardHolder")}</TableHead>
                            <TableHead>{t("eventType")}</TableHead>
                            <TableHead>{t("timestamp")}</TableHead>
                            <TableHead>{t("location")}</TableHead>
                          </>
                        )}
                        
                        {activeTab === "system_logs" && (
                          <>
                            <TableHead>{t("eventType")}</TableHead>
                            <TableHead>{t("description")}</TableHead>
                            <TableHead>{t("timestamp")}</TableHead>
                            <TableHead>{t("user")}</TableHead>
                            <TableHead>{t("ipAddress")}</TableHead>
                          </>
                        )}
                        
                        {activeTab === "alerts" && (
                          <>
                            <TableHead>{t("eventType")}</TableHead>
                            <TableHead>{t("description")}</TableHead>
                            <TableHead>{t("timestamp")}</TableHead>
                            <TableHead>{t("status")}</TableHead>
                            <TableHead>{t("actions")}</TableHead>
                          </>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRecords.map((record) => (
                        <TableRow key={record.id}>
                          {activeTab === "card_events" && (
                            <>
                              <TableCell>{record.cardId}</TableCell>
                              <TableCell>{record.cardHolder}</TableCell>
                              <TableCell>{record.title}</TableCell>
                              <TableCell>{record.timestamp}</TableCell>
                              <TableCell>{record.location}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleViewDetails(record)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </>
                          )}
                          
                          {activeTab === "system_logs" && (
                            <>
                              <TableCell>{record.title}</TableCell>
                              <TableCell>{record.description}</TableCell>
                              <TableCell>{record.timestamp}</TableCell>
                              <TableCell>{record.user}</TableCell>
                              <TableCell>{record.ipAddress}</TableCell>
                              <TableCell>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleViewDetails(record)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </>
                          )}
                          
                          {activeTab === "alerts" && (
                            <>
                              <TableCell>{record.title}</TableCell>
                              <TableCell>{record.description}</TableCell>
                              <TableCell>{record.timestamp}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  record.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                  record.status === "acknowledged" ? "bg-blue-100 text-blue-800" :
                                  "bg-green-100 text-green-800"
                                }`}>
                                  {t(record.status)}
                                </span>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-1">
                                  {record.status === "pending" && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => handleAction(record, "acknowledge")}
                                    >
                                      {t("acknowledge")}
                                    </Button>
                                  )}
                                  
                                  {(record.status === "pending" || record.status === "acknowledged") && (
                                    <Button 
                                      variant="ghost" 
                                      size="sm" 
                                      onClick={() => handleAction(record, "resolve")}
                                    >
                                      {t("resolve")}
                                    </Button>
                                  )}
                                  
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleViewDetails(record)}
                                  >
                                    {t("viewDetails")}
                                  </Button>
                                </div>
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="text-sm text-muted-foreground">
                      {t("showingRecords")}
                    </div>
                    <Button variant="outline" size="sm" disabled>
                      {t("previous")}
                    </Button>
                    <Button variant="outline" size="sm">
                      {t("next")}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedRecord?.title}</DialogTitle>
            <DialogDescription>
              {selectedRecord?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">{t("timestamp")}</Label>
                <p className="text-sm font-medium">{selectedRecord?.timestamp}</p>
              </div>
              
              <div>
                <Label className="text-sm text-muted-foreground">{t("status")}</Label>
                <p className="text-sm font-medium">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    selectedRecord?.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    selectedRecord?.status === "acknowledged" ? "bg-blue-100 text-blue-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {selectedRecord?.status && t(selectedRecord.status)}
                  </span>
                </p>
              </div>
              
              {selectedRecord?.type === "alert" && selectedRecord.details && (
                <div className="col-span-2 space-y-4 border rounded-md p-4">
                  <h3 className="font-medium">{t("detailedInformation")}</h3>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                    <div>
                      <Label className="text-xs text-muted-foreground">{t("date")}</Label>
                      <p>{selectedRecord.details.date}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">{t("time")}</Label>
                      <p>{selectedRecord.details.time}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs text-muted-foreground">{t("eventContent")}</Label>
                      <p>{selectedRecord.details.content}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs text-muted-foreground">{t("eventReason")}</Label>
                      <p>{selectedRecord.details.reason}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs text-muted-foreground">{t("handlingProcess")}</Label>
                      <p>{selectedRecord.details.process}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">{t("responsiblePerson")}</Label>
                      <p>{selectedRecord.details.responsible}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">{t("location")}</Label>
                      <p>{selectedRecord.details.location}</p>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs text-muted-foreground">{t("relatedEquipment")}</Label>
                      <p>{selectedRecord.details.equipment}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedRecord?.cardId && (
                <div>
                  <Label className="text-sm text-muted-foreground">{t("cardID")}</Label>
                  <p className="text-sm font-medium">{selectedRecord.cardId}</p>
                </div>
              )}
              
              {selectedRecord?.cardHolder && (
                <div>
                  <Label className="text-sm text-muted-foreground">{t("cardHolder")}</Label>
                  <p className="text-sm font-medium">{selectedRecord.cardHolder}</p>
                </div>
              )}
              
              {selectedRecord?.user && (
                <div>
                  <Label className="text-sm text-muted-foreground">{t("user")}</Label>
                  <p className="text-sm font-medium">{selectedRecord.user}</p>
                </div>
              )}
              
              {selectedRecord?.ipAddress && (
                <div>
                  <Label className="text-sm text-muted-foreground">{t("ipAddress")}</Label>
                  <p className="text-sm font-medium">{selectedRecord.ipAddress}</p>
                </div>
              )}
              
              {selectedRecord?.location && (
                <div className="col-span-2">
                  <Label className="text-sm text-muted-foreground">{t("location")}</Label>
                  <p className="text-sm font-medium">{selectedRecord.location}</p>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              {t("close")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Action Dialog (Acknowledge/Resolve) */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {actionType === "acknowledge" ? t("acknowledgeRecord") : t("resolveRecord")}
            </DialogTitle>
            <DialogDescription>
              {actionType === "acknowledge" 
                ? t("markAsAcknowledged") 
                : t("markAsResolved")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">{selectedRecord?.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedRecord?.description}</p>
              <p className="text-sm text-muted-foreground">{selectedRecord?.timestamp}</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="action-note">
                {actionType === "acknowledge" ? t("acknowledgementNote") : t("resolutionNote")}
              </Label>
              <Input 
                id="action-note" 
                placeholder={actionType === "acknowledge" ? t("enterAcknowledgementNote") : t("enterResolutionDetails")}
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
              />
            </div>
            
            {actionType === "resolve" && (
              <div className="space-y-2">
                <Label htmlFor="resolution-status">{t("resolutionStatus")}</Label>
                <Select>
                  <SelectTrigger id="resolution-status">
                    <SelectValue placeholder={t("selectStatus")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="resolved">{t("fullyResolved")}</SelectItem>
                    <SelectItem value="partial">{t("partiallyResolved")}</SelectItem>
                    <SelectItem value="workaround">{t("workaroundApplied")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Checkbox id="notify-staff" />
              <Label htmlFor="notify-staff">
                {t("notifyRelevantStaff")}
              </Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsActionDialogOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={executeAction}>
              {actionType === "acknowledge" ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {t("acknowledge")}
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {t("resolve")}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Filter Dialog */}
      <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t("advancedFilters")}</DialogTitle>
            <DialogDescription>
              {t("narrowDownRecords")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="date-range">{t("dateRange")}</Label>
              <Select defaultValue="today">
                <SelectTrigger id="date-range">
                  <SelectValue placeholder={t("selectDateRange")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">{t("today")}</SelectItem>
                  <SelectItem value="this-week">{t("thisWeek")}</SelectItem>
                  <SelectItem value="this-month">{t("thisMonth")}</SelectItem>
                  <SelectItem value="custom">{t("customRange")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="record-type">{t("recordType")}</Label>
              <Select defaultValue="all">
                <SelectTrigger id="record-type">
                  <SelectValue placeholder={t("selectType")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("allTypes")}</SelectItem>
                  <SelectItem value="access">{t("accessEvents")}</SelectItem>
                  <SelectItem value="location">{t("locationUpdates")}</SelectItem>
                  <SelectItem value="status">{t("statusChanges")}</SelectItem>
                  <SelectItem value="alert">{t("alerts")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="card-id">{t("cardID")}</Label>
                <Input id="card-id" placeholder={t("enterCardID")} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">{t("location")}</Label>
                <Input id="location" placeholder={t("enterLocation")} />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>{t("status")}</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="status-pending" defaultChecked />
                  <Label htmlFor="status-pending" className="text-sm font-normal">
                    {t("pending")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="status-acknowledged" defaultChecked />
                  <Label htmlFor="status-acknowledged" className="text-sm font-normal">
                    {t("acknowledged")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="status-resolved" defaultChecked />
                  <Label htmlFor="status-resolved" className="text-sm font-normal">
                    {t("resolved")}
                  </Label>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFilterOpen(false)}>
              {t("reset")}
            </Button>
            <Button onClick={() => setIsFilterOpen(false)}>
              {t("applyFilters")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
