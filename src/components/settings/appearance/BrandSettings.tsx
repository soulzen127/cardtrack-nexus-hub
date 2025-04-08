
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PaletteIcon } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

export const BrandSettings = () => {
  const { t } = useI18n();
  
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">UI Customization</h3>
      <Separator />
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="logo">{t("brandLogo")}</Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                <PaletteIcon className="h-8 w-8 text-muted-foreground" />
              </div>
              <Button variant="outline" size="sm">
                {t("uploadLogo")}
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
      </div>
    </div>
  );
};
