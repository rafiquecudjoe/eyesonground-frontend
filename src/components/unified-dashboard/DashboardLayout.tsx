import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  userType 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r border-gray-200">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
            {userType && (
              <p className="text-sm text-gray-600 mt-1">{userType}</p>
            )}
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;