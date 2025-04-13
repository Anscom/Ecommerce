import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react"; // Import icons from lucide-react

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn); // Toggle the login state
  };

  return (
    <header className="w-full bg-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 text-white text-xl font-semibold">
            MyWebsite
          </div>

          {/* Desktop Navbar */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="text-white hover:text-indigo-200">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-indigo-200">
              About
            </Link>
            <Link to="/services" className="text-white hover:text-indigo-200">
              Services
            </Link>
            <Link to="/contact" className="text-white hover:text-indigo-200">
              Contact
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="text-white hover:text-indigo-200">
              <ShoppingCart className="w-6 h-6" />
            </Link>

            {/* User Profile with login/logout */}
            <button
              onClick={handleLoginLogout}
              className="text-white flex items-center hover:text-indigo-200"
            >
              {isLoggedIn ? (
                <>
                  <User className="w-6 h-6 mr-2" />
                  <span>Profile</span>
                </>
              ) : (
                <>
                  <User className="w-6 h-6 mr-2" />
                  <span>Login</span>
                </>
              )}
            </button>
          </nav>

          {/* Mobile Header Icons */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="text-white">
              <ShoppingCart className="w-6 h-6" />
            </Link>

            {/* User Icon */}
            <button onClick={handleLoginLogout} className="text-white">
              <User className="w-6 h-6" />
            </button>

            {/* Hamburger Menu */}
            <button onClick={toggleMenu} className="text-white">
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}

      <motion.div
        className={`md:hidden bg-indigo-700 text-white space-y-4 py-4 px-6 absolute w-full top-16 transition-all ${
          menuOpen ? "block" : "hidden"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <div className="space-y-2">
          <Link
            to="/"
            className="block hover:text-indigo-200"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block hover:text-indigo-200"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            to="/services"
            className="block hover:text-indigo-200"
            onClick={toggleMenu}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="block hover:text-indigo-200"
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </div>
      </motion.div>
    </header>
  );
};

export default NavigationBar;
