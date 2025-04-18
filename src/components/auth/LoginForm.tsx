
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { Separator } from "@/components/ui/separator";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This is just a mock login. In a real app, you would use proper authentication
      console.log("Logging in with:", { email, password });
      
      // Simple validation
      if (!email || !password) {
        throw new Error(t("emailPasswordRequired"));
      }
      
      // Mock admin credentials for testing
      if (email === "admin@example.com" && password === "password") {
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("user_role", "admin");
        localStorage.setItem("user_name", "Admin User");
        toast.success(t("loginSuccessAdmin"));
        navigate("/portal");
      } else if (email === "supervisor@example.com" && password === "password") {
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("user_role", "supervisor");
        localStorage.setItem("user_name", "Supervisor User");
        toast.success(t("loginSuccessSupervisor"));
        navigate("/portal");
      } else if (email.includes("@example.com") && password === "password") {
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("user_role", "user");
        localStorage.setItem("user_name", "Regular User");
        toast.success(t("loginSuccess"));
        navigate("/portal");
      } else {
        throw new Error(t("invalidCredentials"));
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error.message || t("loginFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // In a real implementation, this would use OAuth providers
    console.log(`Logging in with ${provider}`);
    setTimeout(() => {
      localStorage.setItem("authenticated", "true");
      localStorage.setItem("user_role", "user");
      localStorage.setItem("user_name", `${provider} User`);
      localStorage.setItem("loginProvider", provider);
      // Correctly pass the provider to the translation function
      toast.success(t("loginSuccessSocial", { provider: provider }));
      navigate("/portal");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleGuestLogin = () => {
    setIsLoading(true);
    // Guest login implementation
    setTimeout(() => {
      localStorage.setItem("authenticated", "true");
      localStorage.setItem("user_role", "guest");
      localStorage.setItem("user_name", "Guest User");
      toast.success(t("loginSuccessGuest"));
      navigate("/portal");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-2">
          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleSocialLogin("Google")}
              disabled={isLoading}
              className="w-full"
            >
              <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" fill="#4285f4"/>
              </svg>
              Google
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleSocialLogin("Facebook")}
              disabled={isLoading}
              className="w-full"
            >
              <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" fill="#1877f2"/>
              </svg>
              Facebook
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/signup")}
              disabled={isLoading}
              className="w-full"
            >
              {t("registerNewAccount")}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleGuestLogin}
              disabled={isLoading}
              className="w-full"
            >
              {t("guestLogin")}
            </Button>
          </div>
          
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("orContinueWith")}
            </span>
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full" 
              onClick={toggleShowPassword}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? t("signingIn") : t("signIn")}
        </Button>
        <CardDescription className="text-center">
          {t("dontHaveAccount")} <Link to="/signup" className="text-primary hover:underline">{t("createAccount")}</Link>
        </CardDescription>
      </CardFooter>
    </form>
  );
};
