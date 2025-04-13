
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
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
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            
            {/* Routes that require admin/supervisor access */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/users" element={<UsersPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
