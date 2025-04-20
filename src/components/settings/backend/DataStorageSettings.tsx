
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const DataStorageSettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">資料儲存設定</h3>
        <Separator />
        
        <Tabs defaultValue="timeseries">
          <TabsList className="mb-4">
            <TabsTrigger value="timeseries">時序資料庫設定</TabsTrigger>
            <TabsTrigger value="relational">關聯式資料庫設定</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeseries">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeseriesType">時序資料庫類型</Label>
                  <Select>
                    <SelectTrigger id="timeseriesType">
                      <SelectValue placeholder="請選擇資料庫類型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="influxdb">InfluxDB</SelectItem>
                      <SelectItem value="timescaledb">TimescaleDB</SelectItem>
                      <SelectItem value="prometheus">Prometheus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeseriesHost">伺服器位址</Label>
                  <Input id="timeseriesHost" placeholder="http://localhost:8086" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeseriesUsername">使用者名稱</Label>
                  <Input id="timeseriesUsername" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeseriesPassword">密碼</Label>
                  <Input id="timeseriesPassword" type="password" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeseriesDb">資料庫名稱</Label>
                  <Input id="timeseriesDb" defaultValue="cardtrack" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeseriesRetention">資料保留策略</Label>
                  <Select>
                    <SelectTrigger id="timeseriesRetention">
                      <SelectValue placeholder="請選擇保留策略" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30d">30 天</SelectItem>
                      <SelectItem value="90d">90 天</SelectItem>
                      <SelectItem value="180d">180 天</SelectItem>
                      <SelectItem value="365d">1 年</SelectItem>
                      <SelectItem value="infinite">永久保留</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="relational">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="relationalType">資料庫類型</Label>
                  <Select>
                    <SelectTrigger id="relationalType">
                      <SelectValue placeholder="請選擇資料庫類型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="postgresql">PostgreSQL</SelectItem>
                      <SelectItem value="mysql">MySQL</SelectItem>
                      <SelectItem value="sqlite">SQLite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="relationalHost">伺服器位址</Label>
                  <Input id="relationalHost" placeholder="localhost" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="relationalPort">埠號</Label>
                  <Input id="relationalPort" type="number" defaultValue="5432" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="relationalDb">資料庫名稱</Label>
                  <Input id="relationalDb" defaultValue="cardtrack" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="relationalUsername">使用者名稱</Label>
                  <Input id="relationalUsername" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="relationalPassword">密碼</Label>
                  <Input id="relationalPassword" type="password" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
