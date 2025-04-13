
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useI18n } from "@/hooks/use-i18n";
import { LanguageSelector } from "@/components/language/LanguageSelector";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState<"request" | "reset">("request");
  const { t } = useI18n();

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // This is just a mock. In a real app, you would use proper authentication
      console.log("Requesting password reset for:", email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, generate a "temporary password" and show it
      const tempPass = Math.random().toString(36).slice(-8);
      setTemporaryPassword(tempPass);
      setIsSubmitted(true);
      
      toast.success(t("passwordResetLinkSent"));
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(t("failedToSendResetLink"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate passwords
      if (newPassword !== confirmPassword) {
        throw new Error(t("passwordsDoNotMatch"));
      }
      
      if (newPassword.length < 8) {
        throw new Error(t("passwordTooShort"));
      }
      
      // In a real app, you would validate the temporary code and set the new password
      console.log("Resetting password with temp code:", temporaryPassword);
      console.log("New password:", newPassword);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(t("passwordResetSuccess"));
      
      // In a real app, you would redirect to login
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error: any) {
      console.error("Reset password error:", error);
      toast.error(error.message || t("passwordResetFailed"));
    } finally {
      setIsLoading(false);
    }
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
            {step === "request" ? (
              <>
                <CardTitle className="text-2xl text-center">{t("resetYourPassword")}</CardTitle>
                <CardDescription className="text-center">
                  {!isSubmitted 
                    ? t("enterEmailForReset") 
                    : t("checkEmailForResetLink")}
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle className="text-2xl text-center">{t("createNewPassword")}</CardTitle>
                <CardDescription className="text-center">
                  {t("enterNewPasswordBelow")}
                </CardDescription>
              </>
            )}
          </CardHeader>
          
          {step === "request" && !isSubmitted ? (
            <form onSubmit={handleRequestReset}>
              <CardContent className="space-y-4">
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
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? t("sending") : t("sendResetLink")}
                </Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  <Link to="/login" className="text-primary hover:underline">
                    {t("backToLogin")}
                  </Link>
                </p>
              </CardFooter>
            </form>
          ) : step === "request" && isSubmitted ? (
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg text-center">
                <p className="text-sm">
                  {t("passwordResetEmailSentTo")} <strong>{email}</strong>
                </p>
                <p className="text-sm mt-2">
                  {t("checkEmailAndFollowInstructions")}
                </p>
                
                {/* For demo purposes only - this simulates receiving a temporary password */}
                <div className="mt-4 p-3 bg-background rounded border">
                  <p className="font-semibold text-sm">{t("temporaryPasswordDemo")}</p>
                  <p className="font-mono text-sm mt-1 select-all">{temporaryPassword}</p>
                  <p className="text-xs text-muted-foreground mt-2">{t("copyThisPassword")}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={() => setStep("reset")}
                  className="w-full mt-4" 
                >
                  {t("proceedToResetPassword")}
                </Button>
                <Button 
                  variant="outline"
                  asChild
                  className="w-full" 
                >
                  <Link to="/login">{t("backToLogin")}</Link>
                </Button>
              </div>
            </CardContent>
          ) : (
            <form onSubmit={handleResetPassword}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="temp-code">{t("temporaryPassword")}</Label>
                  <Input
                    id="temp-code"
                    type="text"
                    value={temporaryPassword}
                    onChange={(e) => setTemporaryPassword(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">{t("enterTemporaryPasswordFromEmail")}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">{t("newPassword")}</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t("confirmPassword")}</Label>
                  <Input
                    id="confirm-password"
                    type="password"
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
                  {isLoading ? t("resettingPassword") : t("resetPassword")}
                </Button>
                <p className="mt-4 text-center text-sm text-muted-foreground">
                  <Link to="/login" className="text-primary hover:underline">
                    {t("backToLogin")}
                  </Link>
                </p>
              </CardFooter>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
