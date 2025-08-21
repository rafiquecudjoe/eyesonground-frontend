
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PSIAgentRegistration from "./pages/PSIAgentRegistration";
import ClientRegistration from "./pages/ClientRegistration";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import AccountTypeSelection from "./pages/AccountTypeSelection";
import UnifiedDashboard from "./pages/UnifiedDashboard";
import LogoSelection from "./pages/LogoSelection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/psiregister" element={<PSIAgentRegistration />} />
          <Route path="/clientregister" element={<ClientRegistration />} />
          <Route path="/account-type" element={<AccountTypeSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/client-dashboard/*" element={<UnifiedDashboard userType="client" />} />
          <Route path="/psi-dashboard/*" element={<UnifiedDashboard userType="agent" />} />
          <Route path="/logo-samples" element={<LogoSelection />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
