import React, { useState } from "react";
import Link from "next/link";
import { removeCookie } from "@/utils/storage.util";
import  Router  from "next/router";
import { useAppSelector } from "@/redux/store";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector( (state)=> state.authenticationSlice.user);
  console.log({user});

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    try{
        removeCookie("authToken");
        Router.push("/login");

    }catch(error){
        console.log("Error during logout")
    }

  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold text-blue-600 cursor-pointer">Zenkoders</span>
            </Link>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex space-x-4">
            <Link href="/">
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Home</span>
            </Link>
            <Link href="/products">
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer">Products</span>
            </Link>
            <Link href="/about">
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer">About</span>
            </Link>
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <label htmlFor="">{user?.username}</label>
            <Link href="/login">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer" 
                onClick={handleLogout}>
                Sign Out
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/">
              <span className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md cursor-pointer">
                Home
              </span>
            </Link>
            <Link href="/products">
              <span className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md cursor-pointer">
                Products
              </span>
            </Link>
            <Link href="/about">
              <span className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md cursor-pointer">
                About
              </span>
            </Link>
            <Link href="/login">
              <span className="block bg-blue-600 text-white text-center px-3 py-2 rounded-md cursor-pointer" onClick={handleLogout}>
                Sign Out
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
