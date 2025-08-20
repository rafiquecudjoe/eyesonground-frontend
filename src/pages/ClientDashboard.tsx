
import { Navigate, Route, Routes } from "react-router-dom";
import { ClientDashboardLayout } from "@/components/client-dashboard/ClientDashboardLayout";
import { ServiceHistory } from "@/components/client-dashboard/ServiceHistory";
import { ServiceDetail } from "@/components/client-dashboard/ServiceDetail";
import { CreateService } from "@/components/client-dashboard/CreateService";
import { Messages } from "@/components/client-dashboard/Messages";
import { Profile } from "@/components/client-dashboard/Profile";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // If the user is at the root client dashboard path, redirect to the first tab
    if (location.pathname === "/client-dashboard") {
      navigate("/client-dashboard/service-history");
    }
  }, [location.pathname, navigate]);

  return (
    <ClientDashboardLayout>
      <Routes>
        <Route path="/" element={<ServiceHistory />} />
        <Route path="/service-history" element={<ServiceHistory />} />
        <Route path="/service-history/:serviceId" element={<ServiceDetail />} />
        <Route path="/create-service" element={<CreateService />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </ClientDashboardLayout>
  );
};

export default ClientDashboard;
