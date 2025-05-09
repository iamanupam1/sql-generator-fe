"use client";
import { Code, Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserDatabase } from "@/app/user-provider";

const Navbar = () => {
  const { user } = useUserDatabase();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/nlqconvert", label: "NLQConvert" },
    { href: "/querygraph", label: "QueryGraph" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900 shadow-lg" : "bg-transparent"
      }`}
    >
      <div
        className="relative mx-auto px-4 sm:px-6 py-4 
    max-w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl xl:max-w-7xl"
      >
        <div className="flex items-center justify-between py-4 md:py-6">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center">
              <Code className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              <h1 className="ml-2 text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                DataMind AI
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 text-md font-bold ${
                    isActive
                      ? "text-white shadow-md"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Elements - Only visible on desktop */}
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              {/* Divider */}
              <div className="h-6 w-px bg-gray-700"></div>

              {/* Pro Badge */}
              <div className="flex items-center bg-gray-800 rounded-full px-3 py-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-gray-300 text-xs sm:text-sm ml-2">
                  Pro
                </span>
              </div>

              {/* User Avatar */}
              <Link
                href="/profile"
                className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm cursor-pointer"
              >
                JD
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center justify-center mobile-menu-container"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-400" />
            ) : (
              <Menu className="h-6 w-6 text-gray-400" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 mobile-menu-container ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-3 py-4 border-t border-gray-800">
            {/* User Profile Section - Mobile Only */}
            <div className="flex items-center px-4 py-3 bg-gray-800 bg-opacity-50 rounded-md">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                JD
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">John Doe</p>
                <div className="flex items-center mt-1">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-300 text-xs ml-2">Pro</span>
                </div>
              </div>
            </div>

            {/* Primary Nav Links */}
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                    isActive
                      ? "text-white shadow-lg shadow-gray-900/40"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <>
                      {/* Underline effect */}
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transition-all duration-300"></span>

                      {/* Pointer Triangle */}
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-400 rotate-45"></span>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
