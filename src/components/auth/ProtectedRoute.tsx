
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useAccessControl } from "@/hooks/use-access-control";

interface ProtectedRouteProps {
  requiredRole?: "admin" | "manager" | "operator" | "viewer";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  requiredRole = "viewer" 
}) => {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const { hasAccess, isLoading } = useAccessControl({ requiredRole });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = localStorage.getItem("authenticated") === "true";
      console.log("ProtectedRoute: checking auth status:", authenticated);
      setIsAuthenticated(authenticated);
      
      // Check system initialization status for /portal access
      const isSystemInitialized = localStorage.getItem("system_initialized") === "true";
      console.log("ProtectedRoute: system initialized:", isSystemInitialized);
      
      if (!authenticated) {
        console.log("ProtectedRoute: not authenticated, redirecting to login");
        setIsChecking(false);
        return;
      }

      // Special handling for /portal route
      if (location.pathname === "/portal") {
        if (!isSystemInitialized) {
          console.log("ProtectedRoute: system not initialized, setting as admin");
          localStorage.setItem("user_role", "admin");
        }
        setIsChecking(false);
        return;
      }

      // For all other routes, ensure system is initialized
      if (!isSystemInitialized && location.pathname !== "/settings") {
        console.log("ProtectedRoute: redirecting to settings for initialization");
        toast.info("請先完成系統設定");
      }
      
      setIsChecking(false);
    };
    
    checkAuth();
  }, [location.pathname]);
  
  if (isChecking || isLoading) {
    return <div className="flex h-screen items-center justify-center">載入中...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  if (!hasAccess && location.pathname !== "/portal") {
    console.log("ProtectedRoute: insufficient permissions");
    toast.error("您沒有權限訪問此頁面");
    return <Navigate to="/portal" replace />;
  }
  
  return <Outlet />;
};
