
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { PaletteIcon, UploadIcon, ImageIcon } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { toast } from "sonner";

export const BrandSettings = () => {
  const { t } = useI18n();
  
  // State for the company logo and favicon
  const [companyLogo, setCompanyLogo] = useState<string | null>(localStorage.getItem('companyLogo'));
  const [favicon, setFavicon] = useState<string | null>(localStorage.getItem('favicon'));
  
  // Function to handle file uploads
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, fileType: 'logo' | 'favicon') => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      toast.error(`${fileType === 'logo' ? 'Logo' : 'Favicon'} must be JPG, PNG, or SVG format`);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        if (fileType === 'logo') {
          setCompanyLogo(result);
          localStorage.setItem('companyLogo', result);
          toast.success(t("uploadLogo") + " successful");
        } else {
          setFavicon(result);
          localStorage.setItem('favicon', result);
          
          // Also update the favicon in the document
          const existingFavicon = document.querySelector("link[rel='icon']");
          if (existingFavicon) {
            (existingFavicon as HTMLLinkElement).href = result;
          } else {
            const newFavicon = document.createElement('link');
            newFavicon.rel = 'icon';
            newFavicon.href = result;
            document.head.appendChild(newFavicon);
          }
          
          toast.success("Favicon updated successfully");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">UI Customization</h3>
      <Separator />
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="logo">{t("brandLogo")}</Label>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                {companyLogo ? (
                  <img src={companyLogo} alt="Company Logo" className="h-full w-full object-contain" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <label htmlFor="logo-upload" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="cursor-pointer" type="button" onClick={() => document.getElementById('logo-upload')?.click()}>
                    <UploadIcon className="mr-1 h-4 w-4" />
                    {t("uploadLogo")}
                  </Button>
                </div>
                <input 
                  id="logo-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/png,image/jpeg,image/svg+xml" 
                  onChange={(e) => handleFileUpload(e, 'logo')}
                />
                <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG, SVG</p>
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="favicon">Favicon</Label>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                {favicon ? (
                  <img src={favicon} alt="Favicon" className="h-full w-full object-contain" />
                ) : (
                  <PaletteIcon className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <label htmlFor="favicon-upload" className="cursor-pointer">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="cursor-pointer" type="button" onClick={() => document.getElementById('favicon-upload')?.click()}>
                    Upload Favicon
                  </Button>
                </div>
                <input 
                  id="favicon-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/png,image/jpeg,image/svg+xml" 
                  onChange={(e) => handleFileUpload(e, 'favicon')}
                />
                <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG, SVG</p>
              </label>
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
