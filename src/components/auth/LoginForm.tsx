
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useI18n } from "@/hooks/use-i18n";
import { Separator } from "@/components/ui/separator";
import { SocialLoginButtons } from "./social/SocialLoginButtons";
import { LoginFormFields } from "./forms/LoginFormFields";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();
  
  const [isSystemInitialized, setIsSystemInitialized] = useState(
    localStorage.getItem("system_initialized") === "true"
  );

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    if (isAuthenticated) {
      navigate("/portal");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (!email || !password) {
        throw new Error(t("emailPasswordRequired"));
      }
      
      console.log("Logging in with:", { email, password });
      
      localStorage.setItem("authenticated", "true");
      
      if (!isSystemInitialized) {
        localStorage.setItem("user_role", "viewer");
        localStorage.setItem("user_name", email.split("@")[0]);
        toast.success(t("loginSuccessFirstTime"));
      } else {
        if (email.startsWith("admin")) {
          localStorage.setItem("user_role", "admin");
        } else if (email.startsWith("manager")) {
          localStorage.setItem("user_role", "manager");
        } else if (email.startsWith("operator")) {
          localStorage.setItem("user_role", "operator");
        } else {
          localStorage.setItem("user_role", "viewer");
        }
        localStorage.setItem("user_name", email.split("@")[0]);
        toast.success(t("loginSuccess"));
      }
      
      navigate("/portal");
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || t("loginFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    console.log(`Logging in with ${provider}`);
    
    setTimeout(() => {
      localStorage.setItem("authenticated", "true");
      
      if (!isSystemInitialized) {
        localStorage.setItem("user_role", "viewer");
      } else {
        localStorage.setItem("user_role", "viewer");
      }
      
      localStorage.setItem("user_name", `${provider} User`);
      localStorage.setItem("loginProvider", provider);
      
      toast.success(t("loginSuccessSocial", { provider: provider }));
      navigate("/portal");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <CardContent className="space-y-4">
        <SocialLoginButtons 
          onSocialLogin={handleSocialLogin}
          isLoading={isLoading}
        />
        
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {t("orContinueWith")}
          </span>
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
        </div>

        <LoginFormFields
          email={email}
          password={password}
          showPassword={showPassword}
          isLoading={isLoading}
          onEmailChange={(e) => setEmail(e.target.value)}
          onPasswordChange={(e) => setPassword(e.target.value)}
          onTogglePassword={() => setShowPassword(!showPassword)}
          onSubmit={handleSubmit}
        />
      </CardContent>
      <CardFooter className="px-0" />
    </>
  );
};
