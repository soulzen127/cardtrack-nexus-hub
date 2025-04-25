
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    const isInitialized = localStorage.getItem("system_initialized") === "true";
    
    console.log("Index: auth check:", isAuthenticated, "initialized:", isInitialized);
    
    if (isAuthenticated) {
      if (!isInitialized) {
        console.log("Index: system needs initialization, going to settings");
        navigate("/settings", { replace: true });
      } else {
        console.log("Index: system ready, going to portal");
        navigate("/portal", { replace: true });
      }
    }
  }, [navigate]);
  
  return <Navigate to="/login" replace />;
}
