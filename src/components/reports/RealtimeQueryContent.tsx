
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Play, Download, Save } from "lucide-react";

interface RealtimeQueryContentProps {
  onRunQuery: () => void;
}

interface QueryResult {
  id: number;
  name: string;
  location: string;
  timestamp: string;
  [key: string]: string | number; // Add index signature for any other properties
}

export function RealtimeQueryContent({ onRunQuery }: RealtimeQueryContentProps) {
  const [queryType, setQueryType] = useState("sql");
  const [queryResults, setQueryResults] = useState<QueryResult[] | null>(null);
  
  // Sample mock data for demo purposes
  const mockResults: QueryResult[] = [
    { id: 1, name: "John Doe", location: "Building A", timestamp: "2023-04-18 09:32:45" },
    { id: 2, name: "Jane Smith", location: "Building B", timestamp: "2023-04-18 10:15:22" },
    { id: 3, name: "Robert Johnson", location: "Building A", timestamp: "2023-04-18 11:05:37" },
  ];
  
  const handleRunQuery = () => {
    // This would normally send the query to the backend
    setQueryResults(mockResults);
    if (onRunQuery) {
      onRunQuery();
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Real-time Data Query</CardTitle>
          <CardDescription>
            Run custom queries against your live data. Use SQL or our query builder.
          </CardDescription>
          
          <Tabs value={queryType} onValueChange={setQueryType} className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="sql" className="flex-1">SQL Query</TabsTrigger>
              <TabsTrigger value="builder" className="flex-1">Query Builder</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          <TabsContent value="sql" className="mt-0">
            <Textarea
              placeholder="SELECT * FROM card_events WHERE timestamp > NOW() - INTERVAL '24 HOURS'"
              className="min-h-[200px] font-mono text-sm"
            />
          </TabsContent>
          
          <TabsContent value="builder" className="mt-0">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Select Table</label>
                  <select className="w-full rounded-md border border-input bg-transparent px-3 py-2 mt-1">
                    <option>card_events</option>
                    <option>cards</option>
                    <option>locations</option>
                    <option>users</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Time Range</label>
                  <select className="w-full rounded-md border border-input bg-transparent px-3 py-2 mt-1">
                    <option>Last 24 Hours</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Custom Range</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Filter Conditions</label>
                <div className="flex items-center gap-2 mt-1">
                  <select className="rounded-md border border-input bg-transparent px-3 py-2">
                    <option>location</option>
                    <option>card_id</option>
                    <option>event_type</option>
                  </select>
                  
                  <select className="rounded-md border border-input bg-transparent px-3 py-2">
                    <option>equals</option>
                    <option>contains</option>
                    <option>in</option>
                    <option>not equals</option>
                  </select>
                  
                  <input 
                    type="text" 
                    placeholder="Value" 
                    className="flex-1 rounded-md border border-input bg-transparent px-3 py-2"
                  />
                  
                  <Button variant="outline" size="sm">+</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <div className="mt-6 flex justify-end space-x-2">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save Query
            </Button>
            <Button onClick={handleRunQuery}>
              <Play className="h-4 w-4 mr-2" />
              Run Query
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {queryResults && (
        <Card>
          <CardHeader>
            <CardTitle>Query Results</CardTitle>
            <CardDescription>
              {queryResults.length} records found
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {queryResults.length > 0 && Object.keys(queryResults[0]).map((key) => (
                    <TableHead key={key}>{key}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {queryResults.map((row, i) => (
                  <TableRow key={i}>
                    {Object.values(row).map((value, j) => (
                      <TableCell key={j}>{String(value)}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          
          <CardFooter>
            <div className="flex justify-end w-full">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
