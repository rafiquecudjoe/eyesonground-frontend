import { ReactNode, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, Menu, Pencil, Eye, Globe, MessageSquare, FileText, History, Plus, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children?: ReactNode;
  userType: "client" | "agent";
}

export const DashboardLayout = ({ children, userType }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };
  
  const handleLogout = () => {
    console.log("Logging out");
    navigate("/login");
  };

  const getNavigationItems = () => {
    if (userType === "client") {
      return [
        { 
          path: "/client-dashboard/create-request", 
          label: "New Request", 
          icon: Search,
          description: "Post a new inspection request"
        },
        { 
          path: "/client-dashboard/my-requests", 
          label: "Active Requests", 
          icon: FileText,
          description: "Track active inspection requests"
        },
        { 
          path: "/client-dashboard/history", 
          label: "Completed", 
          icon: History,
          description: "View completed inspections"
        },
        { 
          path: "/client-dashboard/messages", 
          label: "Messages", 
          icon: MessageSquare,
          description: "Chat with agents"
        }
      ];
    } else {
      return [
        { 
          path: "/psi-dashboard/my-assignments", 
          label: "Current Jobs", 
          icon: FileText,
          description: "Current & upcoming inspections"
        },
        { 
          path: "/psi-dashboard/history", 
          label: "Completed", 
          icon: History,
          description: "View completed assignments"
        },
        { 
          path: "/psi-dashboard/messages", 
          label: "Messages", 
          icon: MessageSquare,
          description: "Chat with clients"
        }
      ];
    }
  };

  const navigationItems = getNavigationItems();
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[rgba(249,250,251,1)] to-[rgba(234,241,255,0.3)]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-[rgba(42,100,186,0.1)] shadow-lg">
        <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 text-[rgba(13,38,75,1)] hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-lg flex items-center justify-center shadow-lg relative">
              <Eye className="w-5 h-5 text-white" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <Globe className="w-1.5 h-1.5 text-[rgba(42,100,186,1)]" />
              </div>
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-wide">EYESONGROUND</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`relative px-4 py-3 rounded-xl transition-all duration-300 group ${
                    isActive(item.path.split('/').pop() || '') 
                      ? 'bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white shadow-lg' 
                      : 'text-[rgba(13,38,75,0.7)] hover:text-[rgba(42,100,186,1)] hover:bg-[rgba(42,100,186,0.05)]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <Badge className="bg-red-500 text-white text-xs h-5 min-w-5 flex items-center justify-center">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
          
          {/* Mobile Navigation */}
          {isMobile && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 text-[rgba(13,38,75,1)] hover:bg-[rgba(42,100,186,0.1)] rounded-lg transition-colors">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] bg-white/95 backdrop-blur-md">
                <div className="flex flex-col gap-4 py-4">
                  <div className="px-2 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-lg flex items-center justify-center">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                      {item.badge && item.badge > 0 && (
                    </div>
                  </div>
                  
                  {navigationItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link 
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive(item.path.split('/').pop() || '') 
                            ? 'bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white shadow-lg' 
                            : 'text-[rgba(13,38,75,0.7)] hover:bg-[rgba(42,100,186,0.1)]'
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <IconComponent className="h-5 w-5" />
                        <div className="flex-1">
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs opacity-70">{item.description}</div>
                        </div>
                        {item.badge && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    );
                  })}
                  
                  <div className="border-t border-[rgba(42,100,186,0.1)] pt-4 mt-4">
                    <Link 
                      to={`/${userType === 'client' ? 'client' : 'psi'}-dashboard/profile`}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-[rgba(13,38,75,0.7)] hover:bg-[rgba(42,100,186,0.1)] transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Pencil className="h-5 w-5" />
                      <span className="font-medium">My Profile</span>
                    </Link>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
          
          {/* User Menu */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell className="h-5 w-5 text-[rgba(13,38,75,0.7)] hover:text-[rgba(42,100,186,1)] cursor-pointer transition-colors" />
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs rounded-full">2</span>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="flex items-center gap-2 hover:bg-[rgba(42,100,186,0.05)] p-2 rounded-xl transition-colors">
                  <Avatar className="h-8 w-8 border-2 border-[rgba(42,100,186,0.2)]">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white font-bold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium text-[rgba(13,38,75,1)]">John Doe</span>
                    <span className="text-xs text-[rgba(13,38,75,0.6)]">
                      {userType === 'client' ? 'Client Account' : 'PSI Agent'}
                    </span>
                  </div>
                  <svg className="w-4 h-4 ml-1 text-[rgba(13,38,75,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-md border-[rgba(42,100,186,0.1)]">
                <DropdownMenuItem asChild>
                  <Link to={`/${userType === 'client' ? 'client' : 'psi'}-dashboard/profile`} className="cursor-pointer flex items-center">
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[rgba(1,9,21,1)] to-[rgba(13,38,75,1)] w-full overflow-hidden pt-8 pb-6 px-4 md:px-8 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-10 w-20 h-20 bg-[rgba(42,100,186,0.3)] rounded-full blur-xl"></div>
          <div className="absolute bottom-4 right-10 w-16 h-16 bg-[rgba(42,100,186,0.2)] rounded-full blur-lg"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-center text-white/80 text-sm">
            <span>&copy; {new Date().getFullYear()} EyesOnGround. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};