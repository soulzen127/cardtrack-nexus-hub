
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
          <Label htmlFor="email">{t("email")}</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={onEmailChange}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">{t("password")}</Label>
            <Link 
              to="/forgot-password" 
              className="text-sm font-medium text-primary hover:underline"
            >
              {t("forgotPassword")}
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="••••••••"
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
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full mt-6" 
        disabled={isLoading}
      >
        {isLoading ? t("signingIn") : t("signIn")}
      </Button>

      <div className="mt-4 text-center text-sm">
        {t("dontHaveAccount")} <Link to="/signup" className="text-primary hover:underline">{t("createAccount")}</Link>
      </div>
    </form>
  );
};
