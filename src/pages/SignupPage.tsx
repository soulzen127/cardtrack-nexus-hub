
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useI18n } from "@/hooks/use-i18n";
import { LanguageSelector } from "@/components/language/LanguageSelector";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate passwords
      if (password !== confirmPassword) {
        throw new Error(t("passwordsDoNotMatch"));
      }
      
      if (password.length < 8) {
        throw new Error(t("passwordTooShort"));
      }
      
      // This is just a mock. In a real app, you would use proper authentication
      console.log("Signing up with:", { email, password, fullName });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem("authenticated", "true");
      localStorage.setItem("user_role", "user");
      localStorage.setItem("user_name", fullName);
      
      toast.success(t("accountCreated"));
      navigate("/portal");
    } catch (error: any) {
      console.error("Signup error:", error);
      toast.error(error.message || t("signupFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="absolute top-4 right-4">
          <LanguageSelector minimal />
        </div>
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <h1 className="text-3xl font-bold tracking-tight text-cardtrack-700">CardTrack</h1>
            </div>
            <CardTitle className="text-2xl text-center">{t("createAccount")}</CardTitle>
            <CardDescription className="text-center">
              {t("enterDetailsBelow")}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t("fullName")}</Label>
                <Input
                  id="name"
                  placeholder={t("enterYourName")}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("createPassword")}
                    value={password}
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
              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder={t("confirmYourPassword")}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? t("creatingAccount") : t("createAccount")}
              </Button>
              <p className="mt-4 text-center text-sm text-muted-foreground">
                {t("alreadyHaveAccount")} <Link to="/login" className="text-primary hover:underline">{t("signIn")}</Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
