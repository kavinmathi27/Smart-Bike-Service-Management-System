import React from 'react';
import { Moon, Sun, Wrench, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

const Header = ({ darkMode, setDarkMode }) => {
  const { bike } = useBooking();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-md md:max-w-4xl">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Wrench size={24} />
          </div>
          <h1 className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">MotoCare</h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-300 mr-2">
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link to="/admin" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Admin Panel
                  </Link>
                ) : (
                  <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Dashboard
                  </Link>
                )}
                
                <Link to="/spare-parts" className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <Package size={16} />
                  <span>Spare Parts</span>
                </Link>
                
                <Link to="/profile" className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <UserIcon size={16} />
                  <span>Profile</span>
                </Link>

                <button 
                  onClick={logout}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium transition-colors ml-2"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-bold">
                Login
              </Link>
            )}
          </nav>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
