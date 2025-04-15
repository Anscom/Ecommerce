import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  UserPlus,
  LogIn,
  Lock,
} from "lucide-react"; // Import icons from lucide-react
import { useAuthStore } from "../stores/useAuthStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const isAdmin = user?.role === "admin";
  const { cart } = useCartStore();
  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if the user is logged in

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn); // Toggle the login state
  };

  return (
    <header className="w-full bg-gray-500 shadow-md ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <div className="flex-shrink-0 text-white text-xl font-semibold">
              URBAN JUNGLE CO.
            </div>
          </Link>

          {/* Desktop Navbar */}
          <nav className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="text-white hover:text-indigo-200 self-center"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-white hover:text-indigo-200 self-center"
            >
              Products
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-indigo-200 self-center"
            >
              Contact
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="text-white hover:text-indigo-200 self-center relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItemsInCart > 0 && (
                <span
                  className="absolute -top-3 -right-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
    text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out"
                >
                  {totalItemsInCart}
                </span>
              )}
            </Link>

            {isAdmin && (
              <Link
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
                to={"/secret-dashboard"}
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {/* User Profile with login/logout */}
            {user ? (
              <button
                onClick={logout}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
    rounded-md flex items-center transition duration-300 ease-in-out"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Log Out</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
      rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <UserPlus className="mr-2" size={18} />
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
      rounded-md flex items-center transition duration-300 ease-in-out"
                >
                  <LogIn className="mr-2" size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Header Icons */}
          <div className="md:hidden flex items-center space-x-4">
            {isAdmin && (
              <Link
                className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
                to={"/secret-dashboard"}
              >
                <Lock className="inline-block mr-1" size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}
            {/* Cart Icon */}
            <Link to="/cart" className="text-white relative">
              <ShoppingCart className="w-6 h-6" />
              {totalItemsInCart > 0 && (
                <span
                  className="absolute -top-3 -right-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
    text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out"
                >
                  {totalItemsInCart}
                </span>
              )}
            </Link>

            {user ? (
              <button
                onClick={() => {
                  const confirmLogout = window.confirm(
                    "Are you sure you want to log out?"
                  );
                  if (confirmLogout) {
                    logout();
                  }
                }}
                className="text-white"
                title="Log out"
              >
                <LogOut className="w-6 h-6" />
              </button>
            ) : (
              <Link to="/login" className="text-white">
                <LogIn className="w-6 h-6" />
              </Link>
            )}

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
        className={`md:hidden bg-gray-500 text-white space-y-4 py-4 px-6 absolute w-full top-16 transition-all ${
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
            to="/products"
            className="block hover:text-indigo-200"
            onClick={toggleMenu}
          >
            Products
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

export default Navbar;
