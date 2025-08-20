
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="shadow-[0px_4px_4px_rgba(0,0,0,0.25)] flex w-full items-stretch gap-5 overflow-hidden text-2xl font-light flex-wrap justify-between px-[51px] py-[23px] border-b-2 border-[rgba(42,100,186,0.19)] max-md:max-w-full max-md:px-5">
      <Link
        to="/"
        className="flex items-center gap-3 text-[rgba(13,38,75,1)] justify-center my-auto"
      >
        <img
          src="https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
          alt="EyesOnGround Logo"
          className="aspect-square object-cover w-12 h-12 rounded-xl shadow-lg border-2 border-white/20"
        />
        <span className="self-stretch my-auto font-semibold tracking-wide">EYESONGROUND</span>
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
