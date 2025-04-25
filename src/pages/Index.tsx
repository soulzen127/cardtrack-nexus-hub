
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    console.log("Index: authentication check:", isAuthenticated);
    
    if (isAuthenticated) {
      // If authenticated, directly go to portal page
      console.log("Index: user is authenticated, navigating to portal");
      navigate("/portal", { replace: true });
    }
  }, [navigate]);
  
  // Always redirect to login if not authenticated
  console.log("Index: redirecting to login");
  return <Navigate to="/login" replace />;
}
