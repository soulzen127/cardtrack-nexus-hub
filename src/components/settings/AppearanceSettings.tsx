
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { PaletteIcon } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

export const AppearanceSettings = () => {
  const { t } = useI18n();
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t("themeSettings")}</h3>
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="themeMode">{t("themeMode")}</Label>
              <Select defaultValue="light">
                <SelectTrigger id="themeMode">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="colorScheme">{t("colorScheme")}</Label>
              <Select defaultValue="blue">
                <SelectTrigger id="colorScheme">
                  <SelectValue placeholder="Select scheme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">{t("primaryColor")}</Label>
              <div className="flex space-x-2">
                <Input id="primaryColor" defaultValue="#1E6CB4" />
                <div className="w-10 h-10 rounded-md bg-cardtrack-500" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">{t("secondaryColor")}</Label>
              <div className="flex space-x-2">
                <Input id="secondaryColor" defaultValue="#319795" />
                <div className="w-10 h-10 rounded-md bg-cardtrack-teal" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accentColor">{t("accentColor")}</Label>
              <div className="flex space-x-2">
                <Input id="accentColor" defaultValue="#D69E2E" />
                <div className="w-10 h-10 rounded-md bg-cardtrack-amber" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-medium">UI Customization</h3>
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="logo">Logo</Label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                  <PaletteIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm">
                  Upload Logo
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="favicon">Favicon</Label>
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
                  <PaletteIcon className="h-4 w-4 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm">
                  Upload Favicon
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="appName">Application Name</Label>
            <Input id="appName" defaultValue="CardTrack Nexus Hub" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="loginMessage">Login Screen Message</Label>
            <Textarea id="loginMessage" placeholder="Welcome message displayed on the login screen" rows={3} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="compactMode">Compact Mode</Label>
              <p className="text-sm text-muted-foreground">Reduce spacing in UI elements</p>
            </div>
            <Switch id="compactMode" />
          </div>
        </div>
      </div>
    </div>
  );
};
