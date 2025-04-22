
import React from "react";
import { Globe } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage, Language, languageLabels, languageFlags } from "@/contexts/LanguageContext";

interface LanguageSelectorProps {
  minimal?: boolean;
}

export function LanguageSelector({ minimal = false }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={minimal ? "icon" : "default"}
          className="flex items-center space-x-1"
        >
          {minimal ? (
            <Globe size={20} />
          ) : (
            <>
              <span className="text-xl mr-1">{languageFlags[language]}</span>
              <span className="ml-1">{languageLabels[language]}</span>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {(Object.keys(languageLabels) as Language[]).map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`flex items-center space-x-2 ${language === lang ? "bg-accent" : ""}`}
          >
            <span className="text-xl">{languageFlags[lang]}</span>
            <span>{languageLabels[lang]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
