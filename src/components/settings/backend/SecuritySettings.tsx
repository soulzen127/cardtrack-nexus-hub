
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SecuritySettings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">安全設定</h3>
        <Separator />
        
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="text-base font-medium">密碼策略</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minLength">最小密碼長度</Label>
                <Input id="minLength" type="number" defaultValue="8" min="6" max="24" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="expiryDays">密碼有效期 (天)</Label>
                <Input id="expiryDays" type="number" defaultValue="90" min="30" max="365" />
                <p className="text-sm text-muted-foreground">設定為 0 表示永不過期</p>
              </div>
            </div>
            
            <div className="space-y-2 mt-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="requireUppercase" defaultChecked />
                <Label htmlFor="requireUppercase">要求包含大寫字母</Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="requireNumber" defaultChecked />
                <Label htmlFor="requireNumber">要求包含數字</Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="requireSpecial" defaultChecked />
                <Label htmlFor="requireSpecial">要求包含特殊字符</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <h4 className="text-base font-medium">IP 白名單/黑名單</h4>
            <div className="space-y-2">
              <Label htmlFor="ipWhitelist">IP 白名單</Label>
              <Input id="ipWhitelist" placeholder="192.168.1.1, 192.168.1.2" />
              <p className="text-sm text-muted-foreground">允許訪問的 IP 地址，以逗號分隔。留空表示允許所有 IP</p>
            </div>
            
            <div className="space-y-2 mt-2">
              <Label htmlFor="ipBlacklist">IP 黑名單</Label>
              <Input id="ipBlacklist" placeholder="192.168.1.10, 10.0.0.5" />
              <p className="text-sm text-muted-foreground">禁止訪問的 IP 地址，以逗號分隔</p>
            </div>
          </div>
          
          <div className="space-y-2 pt-4">
            <h4 className="text-base font-medium">Session/Token 管理</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session 超時時間 (分鐘)</Label>
                <Input id="sessionTimeout" type="number" defaultValue="30" min="5" max="1440" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jwtExpiry">JWT Token 有效期 (小時)</Label>
                <Input id="jwtExpiry" type="number" defaultValue="24" min="1" max="168" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
