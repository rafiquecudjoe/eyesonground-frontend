
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  
  // Check login status on component mount and when storage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const storedUserType = localStorage.getItem('userType') || sessionStorage.getItem('userType');
      setIsLoggedIn(!!storedUserType);
      setUserType(storedUserType);
    };

    checkLoginStatus();

    // Listen for storage changes (when user logs out)
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom logout event
    window.addEventListener('userLogout', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogout', handleStorageChange);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex w-full items-stretch gap-5 overflow-hidden text-2xl font-light flex-wrap justify-between px-[51px] py-[23px] border-b-2 border-[rgba(42,100,186,0.19)] max-md:max-w-full max-md:px-5">
      <Link
        to="/"
        className="flex items-center gap-3 text-[rgba(13,38,75,1)] justify-center my-auto"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] rounded-lg flex items-center justify-center shadow-lg relative">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center">
            <svg className="w-1.5 h-1.5 text-[rgba(42,100,186,1)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>
        <span className="self-stretch my-auto font-bold tracking-wide">EYESONGROUND</span>
      </Link>

      {/* Mobile Menu Button */}
      <button 
        onClick={toggleMenu} 
        className="hidden max-md:flex items-center justify-center"
      >
        {isMenuOpen ? (
          <X className="w-8 h-8 text-[rgba(13,38,75,1)]" />
        ) : (
          <Menu className="w-8 h-8 text-[rgba(13,38,75,1)]" />
        )}
      </button>

      {/* Desktop Navigation */}
      <nav className="flex items-center gap-8 text-[rgba(13,38,75,1)] justify-center flex-wrap mt-1 max-md:hidden">
        <Link
          to="/"
          className="self-stretch my-auto hover:text-[rgba(42,100,186,1)] transition-colors"
        >
          Home
        </Link>
        <HashLink
          to="/#about"
          className="self-stretch my-auto hover:text-[rgba(42,100,186,1)] transition-colors"
        >
          About us
        </HashLink>
        <HashLink
          to="/#reviews"
          className="self-stretch my-auto hover:text-[rgba(42,100,186,1)] transition-colors"
        >
          Reviews
        </HashLink>
        <Link
          to="/#services"
          className="self-stretch my-auto hover:text-[rgba(42,100,186,1)] transition-colors"
        >
          Services
        </Link>
        <Link
          to="/account-type"
          className="self-stretch my-auto hover:text-[rgba(42,100,186,1)] transition-colors"
        >
          Get Started
        </Link>
      </nav>

      {/* Desktop Action Buttons */}
      <div className="flex items-stretch gap-[21px] text-base font-normal max-md:hidden">
        {/* Back to Dashboard button for logged-in users */}
        {isLoggedIn && (
          <Link
            to={userType === 'client' ? '/client-dashboard' : '/psi-dashboard'}
            className="self-stretch bg-gradient-to-r from-green-500 to-emerald-600 min-h-[47px] gap-2.5 overflow-hidden text-white flex items-center justify-center pl-[21px] pr-5 py-[13px] rounded-xl max-md:pl-5 hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <ArrowRight className="h-4 w-4" />
            Back to Dashboard
          </Link>
        )}
        
        <Link
          to="/account-type"
          className="self-stretch bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] min-h-[47px] gap-2.5 overflow-hidden text-white flex items-center justify-center pl-[21px] pr-5 py-[13px] rounded-xl max-md:pl-5 hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Start Inspecting
        </Link>
        <Link
          to="/login"
          className="self-stretch border-2 min-h-[47px] gap-2.5 overflow-hidden text-[rgba(13,38,75,1)] flex items-center justify-center pl-[55px] pr-[54px] py-[13px] rounded-xl border-[rgba(13,38,75,1)] border-solid max-md:px-5 hover:bg-[rgba(13,38,75,0.05)] transition-all duration-300 hover:shadow-md"
        >
          Log in
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="hidden max-md:flex flex-col w-full mt-4 bg-white border-t border-[rgba(42,100,186,0.19)] pt-4">
          <nav className="flex flex-col w-full gap-4 text-[rgba(13,38,75,1)]">
            <Link
              to="/"
              className="py-2 hover:text-[rgba(42,100,186,1)] transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <HashLink
              to="/#about"
              className="py-2 hover:text-[rgba(42,100,186,1)] transition-colors"
              onClick={toggleMenu}
            >
              About us
            </HashLink>
            <HashLink
              to="/#services"
              className="py-2 hover:text-[rgba(42,100,186,1)] transition-colors"
              onClick={toggleMenu}
            >
              Services
            </HashLink>
            <Link
              to="/account-type"
              className="py-2 hover:text-[rgba(42,100,186,1)] transition-colors"
              onClick={toggleMenu}
            >
              Get Started
            </Link>
          </nav>
          
          <div className="flex flex-col mt-4 gap-3 w-full">
            {/* Back to Dashboard button for mobile logged-in users */}
            {isLoggedIn && (
              <Link
                to={userType === 'client' ? '/client-dashboard' : '/psi-dashboard'}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl text-center hover:from-green-600 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-2"
                onClick={toggleMenu}
              >
                <ArrowRight className="h-4 w-4" />
                Back to Dashboard
              </Link>
            )}
            
            <Link
              to="/account-type"
              className="bg-gradient-to-r from-[rgba(42,100,186,1)] to-[rgba(13,38,75,1)] text-white py-3 rounded-xl text-center hover:from-[rgba(42,100,186,0.9)] hover:to-[rgba(13,38,75,0.9)] transition-all duration-300"
              onClick={toggleMenu}
            >
              Start Inspecting
            </Link>
            <Link
              to="/login"
              className="border-2 border-[rgba(13,38,75,1)] text-[rgba(13,38,75,1)] py-3 rounded-xl text-center hover:bg-[rgba(13,38,75,0.05)] transition-all duration-300"
              onClick={toggleMenu}
            >
              Log in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
