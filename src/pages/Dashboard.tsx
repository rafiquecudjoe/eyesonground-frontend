import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { RequestHistory } from "@/components/dashboard/RequestHistory";
import { RequestDetails } from "@/components/dashboard/RequestDetails";
import { History } from "@/components/dashboard/History";
import { CreateRequest } from "@/components/dashboard/CreateRequest";
import { Messages } from "@/components/dashboard/Messages";
import { Profile } from "@/components/dashboard/Profile";
import { Settings } from "@/components/dashboard/Settings";
import { Marketplace } from "@/components/dashboard/Marketplace";
import { Earnings } from "@/components/dashboard/Earnings";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TokenStorage } from "@/lib/api/token-storage";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userType, setUserType] = useState<"client" | "agent" | null>(null);
  
  useEffect(() => {
    // Auto-detect user type from stored authentication data
    const userData = TokenStorage.getUserData();
    if (userData?.userType) {
      setUserType(userData.userType as "client" | "agent");
    } else {
      // If no user data, redirect to login
      navigate("/login");
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (userType && (location.pathname === "/dashboard" || location.pathname === "/dashboard/")) {
      navigate("overview", { replace: true });
    }
  }, [location.pathname, navigate, userType]);

  // Show loading while determining user type
  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <DashboardLayout userType={userType}>
      <Routes>
        {/* Client Routes */}
        {userType === "client" && (
          <>
            <Route path="/" element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<DashboardOverview userType="client" />} />
            <Route path="create-request" element={<CreateRequest />} />
            <Route path="my-ads" element={<RequestHistory userType="client" />} />
            <Route path="request/:id" element={<RequestDetails userType="client" />} />
            <Route path="history" element={<History userType="client" />} />
            <Route path="messages" element={<Messages userType="client" />} />
            <Route path="profile" element={<Profile userType="client" />} />
            <Route path="settings" element={<Settings userType="client" />} />
          </>
        )}
        
        {/* Agent Routes */}
        {userType === "agent" && (
          <>
            <Route path="/" element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<DashboardOverview userType="agent" />} />
            <Route path="post-board" element={<Marketplace userType="agent" />} />
            <Route path="my-assignments" element={<RequestHistory userType="agent" />} />
            <Route path="request/:id" element={<RequestDetails userType="agent" />} />
            <Route path="earnings" element={<Earnings />} />
            <Route path="history" element={<History userType="agent" />} />
            <Route path="messages" element={<Messages userType="agent" />} />
            <Route path="profile" element={<Profile userType="agent" />} />
            <Route path="settings" element={<Settings userType="agent" />} />
          </>
        )}
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;