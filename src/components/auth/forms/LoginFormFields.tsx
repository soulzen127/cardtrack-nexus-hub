
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";

interface LoginFormFieldsProps {
  email: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const LoginFormFields: React.FC<LoginFormFieldsProps> = ({
  email,
  password,
  showPassword,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit
}) => {
  const { t } = useI18n();

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Input
            id="email"
            type="email"
            placeholder="輸入您的使用者名稱"
            value={email}
            onChange={onEmailChange}
            className="pl-3"
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="輸入您的密碼"
              onChange={onPasswordChange}
              required
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full" 
              onClick={onTogglePassword}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex justify-end">
            <Link 
              to="/forgot-password" 
              className="text-sm text-primary hover:underline"
            >
              忘記密碼？
            </Link>
          </div>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full mt-6 bg-purple-600 hover:bg-purple-700" 
        disabled={isLoading}
      >
        {isLoading ? t("signingIn") : "登入"}
      </Button>
    </form>
  );
};
