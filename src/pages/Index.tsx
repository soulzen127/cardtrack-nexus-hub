
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    if (isAuthenticated) {
      navigate("/portal");
    }
  }, [navigate]);
  
  // Always redirect to login if not authenticated
  return <Navigate to="/login" replace />;
}
