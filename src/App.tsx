
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Dashboard from "./pages/Dashboard";
import CardsPage from "./pages/CardsPage";
import TrackingPage from "./pages/TrackingPage";
import RecordsPage from "./pages/RecordsPage";
import ReportsPage from "./pages/ReportsPage";
import AlertsPage from "./pages/AlertsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import PortalPage from "./pages/PortalPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import EventsPage from "./pages/EventsPage";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Initialize the app with some default settings if needed
const initializeApp = () => {
  // Check if we need to initialize system
  const isInitialized = localStorage.getItem("system_initialized");
  if (isInitialized === null) {
    console.log("App first load, setting initial state");
    // Set initial state
    localStorage.setItem("system_initialized", "false");
  }
};

const App = () => {
  useEffect(() => {
    // Initialize app on first load
    initializeApp();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                
                {/* Protected routes - require authentication */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/portal" element={<PortalPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/cards" element={<CardsPage />} />
                  <Route path="/tracking" element={<TrackingPage />} />
                  <Route path="/records" element={<RecordsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/events" element={<EventsPage />} />
                </Route>
                
                {/* Routes that require operator or higher access */}
                <Route element={<ProtectedRoute requiredRole="operator" />}>
                  <Route path="/reports" element={<ReportsPage />} />
                  <Route path="/alerts" element={<AlertsPage />} />
                </Route>
                
                {/* Routes that require admin access */}
                <Route element={<ProtectedRoute requiredRole="admin" />}>
                  <Route path="/users" element={<UsersPage />} />
                </Route>
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
