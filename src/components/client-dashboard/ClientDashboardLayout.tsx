
import { ReactNode, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, Menu, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface ClientDashboardLayoutProps {
  children?: ReactNode;
}

export const ClientDashboardLayout = ({ children }: ClientDashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };
  
  const handleLogout = () => {
    // In a real app, this would handle logout logic
    console.log("Logging out");
    // Redirect to login page after logout
    // navigate("/login");
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)] border-b-2 border-[rgba(42,100,186,0.19)]">
        <div className="container mx-auto px-[51px] py-[23px] flex items-center justify-between max-md:px-5">
          <Link
            to="/"
            className="flex items-center gap-4 text-[rgba(13,38,75,1)] justify-center my-auto"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/113b119e8f2edb03a62904cfa33b3c300948ba0a?placeholderIfAbsent=true"
              alt="PSI Company Logo"
              className="aspect-[1] object-contain w-10 self-stretch shrink-0 my-auto"
            />
            <span className="self-stretch my-auto text-2xl font-light max-sm:hidden">PSI COMPANY</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/client-dashboard/service-history" 
              className={`py-4 text-base font-medium ${isActive('/service-history') ? 'text-[rgba(13,38,75,1)] border-b-2 border-[rgba(13,38,75,1)]' : 'text-gray-600 hover:text-[rgba(42,100,186,1)] transition-colors'}`}
            >
              Services History
            </Link>
            <Link 
              to="/client-dashboard/create-service" 
              className={`py-4 text-base font-medium ${isActive('/create-service') ? 'text-[rgba(13,38,75,1)] border-b-2 border-[rgba(13,38,75,1)]' : 'text-gray-600 hover:text-[rgba(42,100,186,1)] transition-colors'}`}
            >
              Create a service
            </Link>
            <Link 
              to="/client-dashboard/messages" 
              className={`py-4 text-base font-medium ${isActive('/messages') ? 'text-[rgba(13,38,75,1)] border-b-2 border-[rgba(13,38,75,1)]' : 'text-gray-600 hover:text-[rgba(42,100,186,1)] transition-colors'}`}
            >
              Messages
            </Link>
          </nav>
          
          {/* Mobile Navigation */}
          {isMobile && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="md:hidden p-2 text-gray-600">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <div className="flex flex-col gap-6 py-4">
                  <Link 
                    to="/client-dashboard/service-history"
                    className={`text-lg font-medium px-2 py-2 ${isActive('/service-history') ? 'text-[rgba(13,38,75,1)] bg-gray-100 rounded' : 'text-gray-600'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Services History
                  </Link>
                  <Link 
                    to="/client-dashboard/create-service"
                    className={`text-lg font-medium px-2 py-2 ${isActive('/create-service') ? 'text-[rgba(13,38,75,1)] bg-gray-100 rounded' : 'text-gray-600'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Create a service
                  </Link>
                  <Link 
                    to="/client-dashboard/messages"
                    className={`text-lg font-medium px-2 py-2 ${isActive('/messages') ? 'text-[rgba(13,38,75,1)] bg-gray-100 rounded' : 'text-gray-600'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Messages
                  </Link>
                  <Link 
                    to="/client-dashboard/profile"
                    className={`text-lg font-medium px-2 py-2 ${isActive('/profile') ? 'text-[rgba(13,38,75,1)] bg-gray-100 rounded' : 'text-gray-600'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-lg font-medium px-2 py-2 text-left text-red-600"
                  >
                    Logout
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          )}
          
          <div className="flex items-stretch gap-[21px]">
            <div className="relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs rounded-full">2</span>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-[rgba(13,38,75,1)] text-white">JD</AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex items-center">
                      <span className="text-sm font-medium text-gray-700">John Doe</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/client-dashboard/profile" className="cursor-pointer flex items-center">
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
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 bg-[rgba(249,250,251,1)]">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <footer className="bg-[rgba(1,9,21,1)] w-full overflow-hidden pt-10 pb-8 px-[52px] max-md:px-5">
        <div className="container mx-auto">
          <div className="flex items-center justify-center text-white text-sm">
            <span>&copy; {new Date().getFullYear()} PSI COMPANY. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
