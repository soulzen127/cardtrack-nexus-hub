
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/LoginForm";
import { LanguageSelector } from "@/components/language/LanguageSelector";
import { useI18n } from "@/hooks/use-i18n";

export default function LoginPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  
  // If user is already logged in, redirect to portal
  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    console.log("LoginPage: authentication check:", isAuthenticated);
    
    if (isAuthenticated) {
      console.log("LoginPage: user is authenticated, navigating to portal");
      navigate("/portal", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector minimal />
      </div>
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-md">
          <CardHeader className="space-y-1">
            <div className="flex flex-col items-center mb-4">
              <h1 className="text-3xl font-bold tracking-tight text-cardtrack-700">CardTrack</h1>
              {/* Logo will appear here, uploaded by user */}
              <div className="mt-2 w-24 h-24 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                {localStorage.getItem('systemLogo') ? (
                  <img 
                    src={localStorage.getItem('systemLogo') || ''} 
                    alt="System Logo" 
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-muted-foreground text-xs">{t("logo")}</div>
                )}
              </div>
            </div>
            <CardTitle className="text-2xl text-center">{t("login") || "登入"}</CardTitle>
            <CardDescription className="text-center">
              {t("loginDescription") || "登入您的帳號繼續使用卡片追蹤系統"}
            </CardDescription>
          </CardHeader>
          <LoginForm />
        </Card>
      </div>
    </div>
  );
}
