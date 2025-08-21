import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "@/components/unified-dashboard/DashboardLayout";
import { Marketplace } from "@/components/unified-dashboard/Marketplace";
import { RequestHistory } from "@/components/unified-dashboard/RequestHistory";
import { CreateRequest } from "@/components/unified-dashboard/CreateRequest";
import { Messages } from "@/components/unified-dashboard/Messages";
import { Profile } from "@/components/unified-dashboard/Profile";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface UnifiedDashboardProps {
  userType: "client" | "agent";
}

const UnifiedDashboard = ({ userType }: UnifiedDashboardProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const basePath = userType === "client" ? "/client-dashboard" : "/psi-dashboard";
    const defaultRoute = userType === "client" ? "/marketplace" : "/available-jobs";
    
    if (location.pathname === basePath) {
      navigate(`${basePath}${defaultRoute}`);
    }
  }, [location.pathname, navigate, userType]);

  const basePath = userType === "client" ? "client-dashboard" : "psi-dashboard";

  return (
    <DashboardLayout userType={userType}>
      <Routes>
        {/* Client Routes */}
        {userType === "client" && (
          <>
            <Route path="/" element={<Navigate to="/client-dashboard/marketplace" replace />} />
            <Route path="/marketplace" element={<Marketplace userType="client" />} />
            <Route path="/my-requests" element={<RequestHistory userType="client" />} />
            <Route path="/history" element={<RequestHistory userType="client" />} />
            <Route path="/create-request" element={<CreateRequest />} />
            <Route path="/messages" element={<Messages userType="client" />} />
            <Route path="/profile" element={<Profile userType="client" />} />
          </>
        )}
        
        {/* Agent Routes */}
        {userType === "agent" && (
          <>
            <Route path="/" element={<Navigate to="/psi-dashboard/available-jobs" replace />} />
            <Route path="/available-jobs" element={<Marketplace userType="agent" />} />
            <Route path="/my-assignments" element={<RequestHistory userType="agent" />} />
            <Route path="/earnings" element={<RequestHistory userType="agent" />} />
            <Route path="/messages" element={<Messages userType="agent" />} />
            <Route path="/profile" element={<Profile userType="agent" />} />
          </>
        )}
      </Routes>
    </DashboardLayout>
  );
};

export default UnifiedDashboard;