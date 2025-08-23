import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Eye, 
  Menu, 
  X, 
  Home, 
  FileText, 
  History, 
  MessageSquare, 
  User, 
  LogOut,
  Plus,
  Briefcase,
  Settings,
  Bell,
  Search,
  ShoppingBag,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: "client" | "agent";
}

export const DashboardLayout = ({ children, userType }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const basePath = userType === "client" ? "/client-dashboard" : "/agent-dashboard";

  const clientNavItems = [
    { 
      path: `${basePath}/marketplace`, 
      label: "Marketplace", 
      icon: ShoppingBag,
      description: "Browse inspection services"
    },
    { 
      path: `${basePath}/create-request`, 
      label: "Post Request", 
      icon: Plus,
      description: "Create new inspection ad"
    },
    { 
      path: `${basePath}/my-requests`, 
      label: "My Ads", 
      icon: FileText,
      description: "Your posted requests"
    },
    { 
      path: `${basePath}/history`, 
      label: "Completed", 
      icon: History,
      description: "Completed inspections"
    },
    { 
      path: `${basePath}/messages`, 
      label: "Messages", 
      icon: MessageSquare,
      description: "Chat with agents"
    },
    { 
      path: `${basePath}/profile`, 
      label: "Profile", 
      icon: User,
      description: "Account settings"
    },
    { 
      path: `${basePath}/settings`, 
      label: "Settings", 
      icon: Settings,
      description: "App preferences"
    }
  ];

  const agentNavItems = [
    { 
      path: `${basePath}/marketplace`, 
      label: "Job Marketplace", 
      icon: ShoppingBag,
      description: "Browse available jobs"
    },
    { 
      path: `${basePath}/my-assignments`, 
      label: "My Jobs", 
      icon: Briefcase,
      description: "Active assignments"
    },
    { 
      path: `${basePath}/earnings`, 
      label: "Earnings", 
      icon: Target,
      description: "Track your income"
    },
    { 
      path: `${basePath}/history`, 
      label: "Completed", 
      icon: History,
      description: "Completed work"
    },
    { 
      path: `${basePath}/messages`, 
      label: "Messages", 
      icon: MessageSquare,
      description: "Chat with clients"
    },
    { 
      path: `${basePath}/profile`, 
      label: "Profile", 
      icon: User,
      description: "Account settings"
    },
    { 
      path: `${basePath}/settings`, 
      label: "Settings", 
      icon: Settings,
      description: "App preferences"
    }
  ];

  const navItems = userType === "client" ? clientNavItems : agentNavItems;

  const handleLogout = () => {
    // Clear user data from storage
    localStorage.removeItem('userType');
    sessionStorage.removeItem('userType');
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('userLogout'));
    
    toast.success("Logged out successfully");
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-[rgba(42,100,186,0.02)]">
      {/* Mobile Header */}
      {isMobile && (
        <header className="bg-white/80 backdrop-blur-sm border-b border-[rgba(42,100,186,0.1)] p-4 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-lg flex items-center justify-center shadow-lg relative">
                <Eye className="w-5 h-5 text-white" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                  <svg className="w-1.5 h-1.5 text-[rgba(42,100,186,1)]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
              <span className="font-bold text-[rgba(13,38,75,1)]">EYESONGROUND</span>
            </Link>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5 text-[rgba(13,38,75,0.7)]" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>
      )}

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${isMobile 
            ? `fixed inset-y-0 left-0 z-40 w-80 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'w-80 flex-shrink-0'
          }
          bg-white/90 backdrop-blur-sm border-r border-[rgba(42,100,186,0.1)] shadow-xl
        `}>
          <div className="flex flex-col h-full">
            {/* Desktop Header */}
            {!isMobile && (
              <div className="p-6 border-b border-[rgba(42,100,186,0.1)]">
                <Link to="/" className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-xl flex items-center justify-center shadow-lg relative">
                    <Eye className="w-6 h-6 text-white" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-md">
                      <svg className="w-2 h-2 text-[rgba(42,100,186,1)]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-[rgba(13,38,75,1)] tracking-wide">EYESONGROUND</span>
                </Link>
                
                {/* User Info */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] rounded-xl">
                  <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white font-bold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-[rgba(13,38,75,1)]">John Doe</p>
                    <Badge className={`${userType === 'agent' ? 'bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white' : 'bg-[rgba(42,100,186,0.1)] text-[rgba(42,100,186,1)]'} text-xs`}>
                      {userType === 'client' ? 'Client' : 'Agent'}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Header */}
            {isMobile && (
              <div className="p-6 border-b border-[rgba(42,100,186,0.1)]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[rgba(13,38,75,1)]">Dashboard</h2>
                  <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* User Info */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[rgba(42,100,186,0.1)] to-[rgba(13,38,75,0.1)] rounded-xl">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white font-bold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-[rgba(13,38,75,1)]">John Doe</p>
                    <Badge className={`${userType === 'agent' ? 'bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white' : 'bg-[rgba(42,100,186,0.1)] text-[rgba(42,100,186,1)]'} text-xs`}>
                      {userType === 'client' ? 'Client' : 'Agent'}
                    </Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 p-6">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = isActivePath(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => isMobile && setSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                        ${isActive 
                          ? 'bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white shadow-lg' 
                          : 'text-[rgba(13,38,75,0.8)] hover:bg-[rgba(42,100,186,0.1)] hover:text-[rgba(13,38,75,1)]'
                        }
                      `}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-[rgba(42,100,186,1)]'}`} />
                      <div className="flex-1">
                        <p className={`font-medium ${isActive ? 'text-white' : 'text-[rgba(13,38,75,1)]'}`}>
                          {item.label}
                        </p>
                        <p className={`text-xs ${isActive ? 'text-white/80' : 'text-[rgba(13,38,75,0.6)]'}`}>
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-[rgba(42,100,186,0.1)]">
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-red-300 text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30" 
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-h-screen">
          {/* Desktop Header */}
          {!isMobile && (
            <header className="bg-white/80 backdrop-blur-sm border-b border-[rgba(42,100,186,0.1)] p-6 sticky top-0 z-20">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-[rgba(13,38,75,1)]">
                    {userType === "client" ? "Client Dashboard" : "Agent Dashboard"}
                  </h1>
                  <p className="text-[rgba(13,38,75,0.7)]">
                    {userType === "client" 
                      ? "Manage your inspection requests and reports" 
                      : "Manage your assignments and earnings"}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Search */}
                  <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[rgba(13,38,75,0.5)] h-4 w-4" />
                    <Input
                      placeholder="Search..."
                      className="pl-10 w-64 rounded-xl border-[rgba(42,100,186,0.2)] bg-white/80"
                    />
                  </div>
                  
                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5 text-[rgba(13,38,75,0.7)]" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </Button>
                  
                  {/* Profile */}
                  <Avatar className="h-10 w-10 border-2 border-[rgba(42,100,186,0.2)] cursor-pointer hover:border-[rgba(42,100,186,0.4)] transition-colors">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white font-bold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </header>
          )}

          {/* Page Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;