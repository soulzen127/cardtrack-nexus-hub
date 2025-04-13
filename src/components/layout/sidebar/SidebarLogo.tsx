
import React from "react";
import { Link } from "react-router-dom";
import { Settings, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface SidebarLogoProps {
  isOpen: boolean;
  companyLogo: string | null;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SidebarLogo({ isOpen, companyLogo, onLogoUpload }: SidebarLogoProps) {
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a valid image file (JPEG, PNG, SVG, GIF)");
      return;
    }
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        // Save logo to localStorage (both for company and system logo)
        localStorage.setItem('companyLogo', result);
        localStorage.setItem('systemLogo', result);
        
        // Call the parent component's handler
        onLogoUpload(event);
        
        toast.success("Logo updated successfully");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center justify-between h-28 px-4 border-b border-sidebar-border">
      <Link to="/dashboard" className={cn(
        "flex flex-col items-center pt-3",
        !isOpen && "lg:w-full"
      )}>
        {isOpen ? (
          <span className="text-xl font-bold tracking-tight">CardTrack</span>
        ) : (
          <span className="lg:text-xl lg:font-bold">CT</span>
        )}
      </Link>
      
      <div className={cn(
        "w-full flex justify-center my-2",
        !isOpen && "lg:hidden"
      )}>
        <div className="relative group">
          <Avatar className="h-12 w-12 cursor-pointer border-2 border-transparent group-hover:border-primary">
            <AvatarImage src={companyLogo || ''} alt="Company Logo" />
            <AvatarFallback className="bg-muted">
              {isOpen ? "LOGO" : "CT"}
            </AvatarFallback>
          </Avatar>
          
          <label htmlFor="logo-upload" className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
            <Upload size={12} className="text-primary-foreground" />
            <input 
              id="logo-upload" 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleLogoUpload}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
