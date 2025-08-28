
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import AgentRegistration from "./pages/AgentRegistration";
import ClientRegistration from "./pages/ClientRegistration";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AccountTypeSelection from "./pages/AccountTypeSelection";
import UnifiedDashboard from "./pages/UnifiedDashboard";
import RequestConfirmation from "./pages/RequestConfirmation";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/psiregister" element={<AgentRegistration />} />
          <Route path="/clientregister" element={<ClientRegistration />} />
          <Route path="/account-type" element={<AccountTypeSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          
          {/* Handle legacy /dashboard routes */}
          <Route path="/dashboard" element={<Navigate to="/client-dashboard/overview" replace />} />
          <Route path="/dashboard/*" element={<Navigate to="/client-dashboard/overview" replace />} />
          
          <Route path="/client-dashboard/*" element={<UnifiedDashboard userType="client" />} />
          <Route path="/agent-dashboard/*" element={<UnifiedDashboard userType="agent" />} />
          <Route path="/request-confirmation" element={<RequestConfirmation />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
