
import React from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Mail } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface SocialLoginButtonsProps {
  onSocialLogin: (provider: string) => void;
  isLoading: boolean;
}

const socialIcons = {
  Google: (
    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" fill="#4285f4"/>
    </svg>
  ),
  Facebook: <Facebook className="h-4 w-4 mr-2" />,
  LINE: (
    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M392.6 55.65C349.1 19.6 287.7 0 224 0S98.9 19.6 55.4 55.65C19.6 92.95 0 146.55 0 207.75c0 61.75 25.2 116.35 64 151.35c.7 .85 2.1 3.15 2.7 3.85c12.9 15.05 27.9 27.95 44.7 37.95c16.9 10.05 36.9 18.85 59.6 23.25c12.9 2.55 26.2-5.85 28.5-18.65c2.1-12.65-6.3-25.25-18.9-27.65c-16.5-3.35-30.5-9.45-41.9-15.65c-11.3-6.25-20-13.25-27.8-21.25c-.1-.1-.3-.2-.4-.3c-27.8-25.75-44.5-66.75-44.5-112.95c0-44.45 14.7-82.95 40.1-110.25C133.1 91.75 176.2 76.75 224 76.75s90.9 15 116.9 40.85c25.4 27.3 40.1 65.8 40.1 110.25c0 41.95-13.9 84.27-38.3 107.95c-1 .92-1.8 1.9-3.1 2.9c-19 14.25-53.9 34.35-102.5 38.65c-13.3 1.3-22.1 14.5-19.5 27.55c2.4 12.45 14.9 21.25 27.5 18.65c25.5-2.55 46.4-8.75 62.9-15.35c16.5-6.55 28.4-13.35 39.8-21.25c1.1-.65 1.9-1.45 3-2.15c.7-.75 2.1-2.65 2.7-3.35c38.7-35 64-89.6 64-151.35c0-61.2-19.6-114.8-55.4-152.1h0zM193.2 301.45c8.6 1.15 15.8-4.75 16.2-13.15c.3-8.55-6.9-15.25-15.7-16.35l-27.2-2.75v-45.5l27.2-2.75c8.7-1.15 16-7.85 15.7-16.35c-.3-8.4-7.5-14.35-16.2-13.15l-40.6 4.05c-9.2 1.05-15.7 8.8-15.7 17.55v69.8c0 8.75 6.5 16.5 15.7 17.55l40.6 4.05zm26.1-15.65c1.8 7.3 8.9 11.75 16.4 10.15c7.5-1.65 12.1-8.85 10.3-16.1l-17.8-89.95c-1.8-7.3-8.9-11.75-16.4-10.15c-7.5 1.65-12.1 8.85-10.3 16.1l17.8 89.95zm68.3-3.5c4.2 6.05 12.8 7.55 19.1 3.35c6.3-4.25 7.9-12.8 3.7-18.85l-12.5-17.85l12.5-17.85c4.2-6.05 2.6-14.6-3.7-18.85c-6.3-4.2-14.9-2.7-19.1 3.35l-15.2 21.75c-1.5 2.25-2.4 4.85-2.4 7.6s.9 5.35 2.4 7.6l15.2 21.75zm50.6-16.5c0-7.55-6.3-13.65-14-13.65s-14 6.1-14 13.65s6.3 13.65 14 13.65s14-6.1 14-13.65z" fill="#06C755"/>
    </svg>
  ),
  Instagram: (
    <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" fill="#E1306C"/>
    </svg>
  )
};

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ onSocialLogin, isLoading }) => {
  const { t } = useI18n();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => onSocialLogin("Google")}
          disabled={isLoading}
          className="w-full"
        >
          {socialIcons.Google}
          Google
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => onSocialLogin("Facebook")}
          disabled={isLoading}
          className="w-full"
        >
          {socialIcons.Facebook}
          Facebook
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => onSocialLogin("LINE")}
          disabled={isLoading}
          className="w-full"
        >
          {socialIcons.LINE}
          LINE
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => onSocialLogin("Instagram")}
          disabled={isLoading}
          className="w-full"
        >
          {socialIcons.Instagram}
          Instagram
        </Button>
      </div>
    </div>
  );
};
