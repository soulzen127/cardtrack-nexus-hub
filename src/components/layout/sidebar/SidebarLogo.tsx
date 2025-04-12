
import React from "react";
import { Link } from "react-router-dom";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarLogoProps {
  isOpen: boolean;
  companyLogo: string | null;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function SidebarLogo({ isOpen, companyLogo, onLogoUpload }: SidebarLogoProps) {
  return (
    <div className="flex flex-col items-center justify-between h-28 px-4 border-b border-sidebar-border">
      {companyLogo && (
        <div className={cn(
          "w-full flex justify-center my-2",
          !isOpen && "lg:hidden"
        )}>
          <Avatar className="h-12 w-12">
            <AvatarImage src={companyLogo} alt="Company Logo" />
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <Link to="/dashboard" className={cn(
        "flex items-center space-x-2",
        !isOpen && "lg:justify-center lg:w-full"
      )}>
        {isOpen ? (
          <>
            <span className="text-xl font-bold tracking-tight">CardTrack</span>
            <label htmlFor="logo-upload" className="cursor-pointer ml-2">
              <Settings size={14} className="text-sidebar-foreground/60 hover:text-sidebar-foreground" />
              <input 
                id="logo-upload" 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={onLogoUpload}
              />
            </label>
          </>
        ) : (
          <span className="lg:text-xl lg:font-bold">CT</span>
        )}
      </Link>
    </div>
  );
}
