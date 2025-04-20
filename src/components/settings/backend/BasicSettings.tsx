
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export const BasicSettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">基本設定</h3>
        <Separator />
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="systemName">系統名稱</Label>
              <Input id="systemName" defaultValue="CardTrack Nexus Hub" />
              <p className="text-sm text-muted-foreground">設定平台的顯示名稱</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">時區設定</Label>
              <Select defaultValue="asia_taipei">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="請選擇時區" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia_taipei">Asia/Taipei (GMT+8)</SelectItem>
                  <SelectItem value="asia_tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                  <SelectItem value="america_los_angeles">America/Los_Angeles (GMT-7)</SelectItem>
                  <SelectItem value="europe_london">Europe/London (GMT+1)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">設定系統使用的時區</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateFormat">日期時間格式</Label>
              <Select defaultValue="yyyy_mm_dd">
                <SelectTrigger id="dateFormat">
                  <SelectValue placeholder="請選擇日期格式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yyyy_mm_dd">YYYY-MM-DD</SelectItem>
                  <SelectItem value="dd_mm_yyyy">DD-MM-YYYY</SelectItem>
                  <SelectItem value="mm_dd_yyyy">MM-DD-YYYY</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">設定系統顯示的日期和時間格式</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
