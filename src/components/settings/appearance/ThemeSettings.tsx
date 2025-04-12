
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/hooks/use-i18n";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export const ThemeSettings = () => {
  const { t } = useI18n();
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [primaryColor, setPrimaryColor] = useState("#1E6CB4");
  
  // Load theme settings from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setSelectedTheme(savedTheme);
    
    const savedColor = localStorage.getItem('primaryColor') || '#1E6CB4';
    setPrimaryColor(savedColor);
    
    // Apply theme to document
    document.documentElement.className = savedTheme;
    
    // Apply custom color if needed
    if (savedTheme === 'dark-tech') {
      applyDarkTechTheme();
    }
  }, []);
  
  // Handle theme change
  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
    
    // Save to localStorage
    localStorage.setItem('theme', value);
    
    // Apply theme class to document
    document.documentElement.className = value;
    
    // Apply dark tech theme styles if needed
    if (value === 'dark-tech') {
      applyDarkTechTheme();
    }
    
    toast.success(t("themeUpdated"));
  };
  
  // Apply dark tech theme styles
  const applyDarkTechTheme = () => {
    document.documentElement.style.setProperty('--background', '240 20% 3.9%');
    document.documentElement.style.setProperty('--foreground', '0 0% 98%');
    document.documentElement.style.setProperty('--card', '240 17% 7%');
    document.documentElement.style.setProperty('--card-foreground', '0 0% 98%');
    document.documentElement.style.setProperty('--popover', '240 10% 5%');
    document.documentElement.style.setProperty('--popover-foreground', '0 0% 98%');
    document.documentElement.style.setProperty('--primary', '217 91% 60%');
    document.documentElement.style.setProperty('--primary-foreground', '210 40% 98%');
    document.documentElement.style.setProperty('--secondary', '240 3.7% 15.9%');
    document.documentElement.style.setProperty('--secondary-foreground', '0 0% 98%');
    document.documentElement.style.setProperty('--muted', '240 3.7% 15.9%');
    document.documentElement.style.setProperty('--muted-foreground', '240 5% 64.9%');
    document.documentElement.style.setProperty('--accent', '213 76% 56%');
    document.documentElement.style.setProperty('--accent-foreground', '210 40% 98%');
    document.documentElement.style.setProperty('--border', '240 3.7% 15.9%');
  };
  
  // Handle primary color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryColor(e.target.value);
    localStorage.setItem('primaryColor', e.target.value);
  };
  
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium">{t("themeSettings")}</h3>
      <Separator />
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="theme">{t("theme")}</Label>
            <Select value={selectedTheme} onValueChange={handleThemeChange}>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">{t("light")}</SelectItem>
                <SelectItem value="dark">{t("dark")}</SelectItem>
                <SelectItem value="dark-tech">{t("darkTech")}</SelectItem>
                <SelectItem value="system">{t("system")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="primaryColor">{t("primaryColor")}</Label>
            <div className="flex space-x-2">
              <Input 
                id="primaryColor" 
                type="color" 
                value={primaryColor} 
                onChange={handleColorChange}
                className="w-16 h-10 p-1" 
              />
              <Input 
                value={primaryColor} 
                onChange={handleColorChange}
                className="flex-1"
              />
            </div>
          </div>
        </div>
        
        {/* Theme Preview */}
        <div className="mt-4 space-y-2">
          <Label>{t("themePreview")}</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Light Theme Preview */}
            <Card className="overflow-hidden">
              <div className="h-6 bg-gradient-to-r from-blue-500 to-indigo-600 w-full"></div>
              <CardContent className="p-4">
                <p className="text-sm font-semibold mb-2">{t("light")}</p>
                <div className="flex flex-wrap gap-2">
                  <div className="w-6 h-6 rounded-full bg-white border"></div>
                  <div className="w-6 h-6 rounded-full bg-slate-100"></div>
                  <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                  <div className="w-6 h-6 rounded-full bg-slate-800"></div>
                </div>
              </CardContent>
            </Card>
            
            {/* Dark Theme Preview */}
            <Card className="overflow-hidden bg-slate-900 text-white">
              <div className="h-6 bg-gradient-to-r from-indigo-600 to-purple-600 w-full"></div>
              <CardContent className="p-4">
                <p className="text-sm font-semibold mb-2">{t("dark")}</p>
                <div className="flex flex-wrap gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-950 border border-slate-800"></div>
                  <div className="w-6 h-6 rounded-full bg-slate-900"></div>
                  <div className="w-6 h-6 rounded-full bg-slate-800"></div>
                  <div className="w-6 h-6 rounded-full bg-white"></div>
                </div>
              </CardContent>
            </Card>
            
            {/* Dark Tech Theme Preview */}
            <Card className="overflow-hidden bg-[#0a0a14] text-[#e0e0ff]">
              <div className="h-6 bg-gradient-to-r from-blue-600 to-cyan-400 w-full"></div>
              <CardContent className="p-4">
                <p className="text-sm font-semibold mb-2">{t("darkTech")}</p>
                <div className="flex flex-wrap gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#0a0a14] border border-blue-900"></div>
                  <div className="w-6 h-6 rounded-full bg-[#111127]"></div>
                  <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                  <div className="w-6 h-6 rounded-full bg-cyan-400"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
