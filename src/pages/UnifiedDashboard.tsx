import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "@/components/unified-dashboard/DashboardLayout";
import { RequestHistory } from "@/components/unified-dashboard/RequestHistory";
import { History } from "@/components/unified-dashboard/History";
import { CreateRequest } from "@/components/unified-dashboard/CreateRequest";
import { Messages } from "@/components/unified-dashboard/Messages";
import { Profile } from "@/components/unified-dashboard/Profile";
import { Settings } from "@/components/unified-dashboard/Settings";
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
    const defaultRoute = userType === "client" ? "/my-requests" : "/my-assignments";
    
    if (location.pathname === basePath || location.pathname === `${basePath}/`) {
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
            <Route path="/" element={<Navigate to="/client-dashboard/my-requests" replace />} />
            <Route path="/create-request" element={<CreateRequest />} />
            <Route path="/my-requests" element={<RequestHistory userType="client" />} />
            <Route path="/history" element={<History userType="client" />} />
            <Route path="/messages" element={<Messages userType="client" />} />
            <Route path="/profile" element={<Profile userType="client" />} />
            <Route path="/settings" element={<Settings userType="client" />} />
          </>
        )}
        
        {/* Agent Routes */}
        {userType === "agent" && (
          <>
            <Route path="/" element={<Navigate to="/psi-dashboard/my-assignments" replace />} />
            <Route path="/my-assignments" element={<RequestHistory userType="agent" />} />
            <Route path="/history" element={<History userType="agent" />} />
            <Route path="/messages" element={<Messages userType="agent" />} />
            <Route path="/profile" element={<Profile userType="agent" />} />
            <Route path="/settings" element={<Settings userType="agent" />} />
          </>
        )}
      </Routes>
    </DashboardLayout>
  );
};

export default UnifiedDashboard;