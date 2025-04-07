
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, RefreshCw, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface QueryResult {
  id: number;
  cardId: string;
  location: string;
  timestamp: string;
  action: string;
}

export function RealtimeQueryContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [queryResults, setQueryResults] = useState<QueryResult[]>([
    { id: 1, cardId: "CARD-001", location: "Main Office", timestamp: "2023-04-07 14:32:15", action: "Entry" },
    { id: 2, cardId: "CARD-042", location: "Warehouse B", timestamp: "2023-04-07 14:25:10", action: "Exit" },
    { id: 3, cardId: "CARD-053", location: "Conference Room", timestamp: "2023-04-07 14:10:45", action: "Entry" },
  ]);

  const handleSearch = () => {
    setIsLoading(true);
    
    // Simulate API call for real-time query
    setTimeout(() => {
      // Mock filtering based on search query
      const filteredResults = [
        { id: 1, cardId: "CARD-001", location: "Main Office", timestamp: "2023-04-07 14:32:15", action: "Entry" },
        { id: 2, cardId: "CARD-042", location: "Warehouse B", timestamp: "2023-04-07 14:25:10", action: "Exit" },
        { id: 3, cardId: "CARD-053", location: "Conference Room", timestamp: "2023-04-07 14:10:45", action: "Entry" },
      ].filter(item => 
        searchQuery === "" || 
        item.cardId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setQueryResults(filteredResults);
      setIsLoading(false);
      
      if (filteredResults.length === 0) {
        toast.info("No results found for your query");
      } else {
        toast.success(`Found ${filteredResults.length} results`);
      }
    }, 1000);
  };

  const refreshData = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Mock refreshed data
      setQueryResults([
        { id: 1, cardId: "CARD-001", location: "Main Office", timestamp: "2023-04-07 14:32:15", action: "Entry" },
        { id: 2, cardId: "CARD-042", location: "Warehouse B", timestamp: "2023-04-07 14:25:10", action: "Exit" },
        { id: 3, cardId: "CARD-053", location: "Conference Room", timestamp: "2023-04-07 14:10:45", action: "Entry" },
        { id: 4, cardId: "CARD-007", location: "Cafeteria", timestamp: "2023-04-07 14:38:22", action: "Entry" },
      ]);
      
      setIsLoading(false);
      toast.success("Data refreshed successfully");
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by card ID, location..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
          </div>
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              "Search"
            )}
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshData} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Real-Time Query Results</CardTitle>
          <CardDescription>
            Showing {queryResults.length} results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Card ID</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {queryResults.length > 0 ? (
                queryResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.cardId}</TableCell>
                    <TableCell>{result.location}</TableCell>
                    <TableCell>{result.timestamp}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${
                          result.action === "Entry" 
                            ? "bg-green-100 text-green-800 hover:bg-green-200" 
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      >
                        {result.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">Showing the most recent data</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
