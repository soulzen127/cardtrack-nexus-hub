
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { t } = useI18n();
  
  // Get redirect location from state if available
  const from = location.state?.from?.pathname || "/portal";
  
  const [isSystemInitialized, setIsSystemInitialized] = useState(
    localStorage.getItem("system_initialized") === "true"
  );

  useEffect(() => {
    // Check if already authenticated and redirect
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    if (isAuthenticated) {
      console.log("Already authenticated, redirecting to portal");
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
      
      console.log("Logging in with email:", email);
      
      // Set authentication state
      localStorage.setItem("authenticated", "true");
      
      // Handle first time login vs regular login differently
      if (!isSystemInitialized) {
        console.log("First time login, setting as admin");
        localStorage.setItem("user_role", "admin");
        localStorage.setItem("user_name", email.split("@")[0]);
        toast.success(t("loginSuccessFirstTime"));
      } else {
        // Determine user role based on email prefix for demo purposes
        // In a real application, this would be from your backend
        if (email.toLowerCase().startsWith("admin")) {
          localStorage.setItem("user_role", "admin");
        } else if (email.toLowerCase().startsWith("manager")) {
          localStorage.setItem("user_role", "manager");
        } else if (email.toLowerCase().startsWith("operator")) {
          localStorage.setItem("user_role", "operator");
        } else {
          localStorage.setItem("user_role", "viewer");
        }
        localStorage.setItem("user_name", email.split("@")[0]);
        toast.success(t("loginSuccess"));
      }
      
      // Navigate to the destination or portal page
      navigate(from);
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
      
      // Set role based on whether system is initialized
      if (!isSystemInitialized) {
        console.log("First time social login, setting as admin");
        localStorage.setItem("user_role", "admin");
      } else {
        console.log("Setting default role for social login");
        localStorage.setItem("user_role", "viewer");
      }
      
      localStorage.setItem("user_name", `${provider} User`);
      localStorage.setItem("loginProvider", provider);
      
      toast.success(t("loginSuccessSocial", { provider: provider }));
      navigate(from);
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
