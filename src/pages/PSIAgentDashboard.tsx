
import { Navigate, Route, Routes } from "react-router-dom";
import { PSIAgentDashboardLayout } from "@/components/psi-dashboard/PSIAgentDashboardLayout";
import { ServiceRequests } from "@/components/psi-dashboard/ServiceRequests";
import { ServicesHistory } from "@/components/psi-dashboard/ServicesHistory";
import { Messages } from "@/components/psi-dashboard/Messages";
import { ServiceDetail } from "@/components/psi-dashboard/ServiceDetail";
import { Profile } from "@/components/psi-dashboard/Profile";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PSIAgentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // If the user is at the root PSI dashboard path, redirect to the first tab
    if (location.pathname === "/psi-dashboard") {
      navigate("/psi-dashboard/services-history");
    }
  }, [location.pathname, navigate]);

  return (
    <PSIAgentDashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/psi-dashboard/services-history" replace />} />
        <Route path="/service-requests" element={<ServiceRequests />} />
        <Route path="/services-history" element={<ServicesHistory />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/service-detail/:serviceId" element={<ServiceDetail />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </PSIAgentDashboardLayout>
  );
};

export default PSIAgentDashboard;
