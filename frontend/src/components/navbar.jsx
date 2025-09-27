import React, { useState} from 'react';
import { Link, useLocation , useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { getUser, isLoggedIn, logout } from "../utils/auth";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const user = getUser();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'FindItem', path: '/find' },
    { name: 'ReportItem', path: '/report' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <div className="max-w-5xl mx-auto bg-black/20 backdrop-blur-md border border-white/10 shadow-lg rounded-full px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={logo} 
                alt="Back2Me Logo" 
                className="h-12 w-[60px] object-cover"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    location.pathname === link.path
                      ? 'text-[#3CB371]'
                      : 'text-white hover:text-[#36a163]'
                  } group`}
                >
                  {link.name}
                  {/* Animated underline */}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#36a163] transform transition-all duration-300 ease-in-out ${
                    location.pathname === link.path 
                      ? 'scale-x-100' 
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop User Profile / Auth Buttons */}
          <div className="hidden md:block relative">
            {isLoggedIn() ? (
              <div className="flex items-center space-x-4">
                {/* Wrap profile button and dropdown in a relative container */}
                <div className="relative">
                  {/* Profile button toggles dropdown */}
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="flex items-center space-x-2 text-white hover:text-green-400 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    <div className="h-8 w-8 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                      <img
                        src={user?.avatar || "https://via.placeholder.com/40"}
                        alt="profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <span className="text-sm font-medium">{user?.name || "Profile"}</span>
                  </button>

                  {/* Dropdown with arrow */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-black/20 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-50">
                      {/* Arrow */}
                      <div className="absolute -top-2 right-3 w-3 h-3 bg-black/20 backdrop-blur-md transform rotate-45 border-l border-t border-white/20"></div>

                      <button
                        onClick={() => {
                          navigate("/profile");
                          setShowDropdown(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-white hover:text-green-400 hover:bg-white/10 rounded-t-lg"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          navigate("/");
                          setShowDropdown(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-white hover:text-green-400 hover:bg-white/10 rounded-b-lg"
                      >
                        <LogOut size={18} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate("/login?mode=login")}
                  className="text-white hover:text-[#36a163] px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 relative group"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/login?mode=register")}
                  className="bg-[#3CB371]  hover:bg-[#36a163] text-white px-4 py-2 rounded-3xl text-sm font-medium transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>



          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-green-400 focus:outline-none focus:text-green-400 transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              {isMenuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4">
          <div className="max-w-5xl mx-auto bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-all duration-300 ease-in-out transform hover:translate-x-2 ${
                    location.pathname === link.path
                      ? 'text-green-400 bg-white/10'
                      : 'text-white hover:text-green-400 hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-white/20">
                {isLoggedIn() ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left text-white hover:text-green-400 hover:bg-white/10 transition-all duration-300 ease-in-out transform hover:translate-x-2"
                    >
                      <div className="h-5 w-5 bg-gray-600 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-gray-500">
                        <img
                          src={user?.avatar || "https://via.placeholder.com/40"}
                          alt="profile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <span>{user?.name || "Profile"}</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-left text-white hover:text-green-400 hover:bg-white/10 transition-all duration-300 ease-in-out transform hover:translate-x-2"
                    >
                      <LogOut size={18} className="mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => navigate("/login?mode=login")}
                      className="w-full text-left px-3 py-2 text-white hover:text-green-400 hover:bg-white/10 transition-all duration-300 ease-in-out transform hover:translate-x-2"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => navigate("/login?mode=register")}
                      className="w-full text-left px-3 py-2 bg-green-600 text-white hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:translate-x-2"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
