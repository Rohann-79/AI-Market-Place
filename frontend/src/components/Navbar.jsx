// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { 
  HomeIcon, 
  CubeIcon, 
  CurrencyDollarIcon, 
  UserCircleIcon, 
  Bars3Icon, 
  XMarkIcon 
} from '@heroicons/react/24/outline';

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-white">
            <CubeIcon className="h-8 w-8" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              NexusAI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/models" className="nav-link group">
              <CubeIcon className="h-5 w-5 group-hover:text-blue-300 transition-colors duration-200" />
              <span className="group-hover:text-blue-300 transition-colors duration-200">Models</span>
            </Link>
            <Link to="/sell" className="nav-link group">
              <CurrencyDollarIcon className="h-5 w-5 group-hover:text-blue-300 transition-colors duration-200" />
              <span className="group-hover:text-blue-300 transition-colors duration-200">Sell Model</span>
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="nav-link group">
                  <UserCircleIcon className="h-5 w-5 group-hover:text-blue-300 transition-colors duration-200" />
                  <span className="group-hover:text-blue-300 transition-colors duration-200">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link to="/models" className="mobile-nav-link">
              <CubeIcon className="h-5 w-5" />
              <span>Models</span>
            </Link>
            <Link to="/sell" className="mobile-nav-link">
              <CurrencyDollarIcon className="h-5 w-5" />
              <span>Sell Model</span>
            </Link>
            {user ? (
              <>
                <Link to="/profile" className="mobile-nav-link">
                  <UserCircleIcon className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100/10 rounded-lg transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 text-green-400 hover:bg-green-100/10 rounded-lg transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .nav-link {
          @apply flex items-center space-x-1 text-white/90 hover:text-white transition-colors duration-200;
        }
        .mobile-nav-link {
          @apply flex items-center space-x-2 px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;