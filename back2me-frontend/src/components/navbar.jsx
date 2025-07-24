import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // You can manage this with your auth state

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'FindItem', path: '/find' },
    { name: 'ReportItem', path: '/report' },
    { name: 'Services', path: '/services' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src={logo} 
                alt="Back2Me Logo" 
                className="h-12 w-16.5 object-cover"
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
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop User Profile / Auth Buttons */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                  <div className="h-6 w-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs">👤</span>
                  </div>
                  <span className="text-sm font-medium">Profile</span>
                </button>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-3xl text-sm font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-3xl text-sm font-medium transition-colors duration-200"
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
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
            >
              {isMenuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t border-gray-200">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <button className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                      <div className="h-5 w-5 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-xs">👤</span>
                      </div>
                      <span>Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setIsLoggedIn(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setIsLoggedIn(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
