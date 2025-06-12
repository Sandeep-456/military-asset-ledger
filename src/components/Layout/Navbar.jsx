
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Shield, LogOut, User, Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'text-green-400 border-green-400' : 'text-gray-300 hover:text-white';
  };

  const navigationItems = [
    { path: '/dashboard', label: 'Dashboard', roles: ['Admin', 'Base Commander', 'Logistics Officer'] },
    { path: '/purchases', label: 'Purchases', roles: ['Admin', 'Base Commander', 'Logistics Officer'] },
    { path: '/transfers', label: 'Transfers', roles: ['Admin', 'Base Commander', 'Logistics Officer'] },
    { path: '/assignments', label: 'Assignments', roles: ['Admin', 'Base Commander', 'Logistics Officer'] },
    { path: '/users', label: 'User Management', roles: ['Admin'] }
  ];

  const visibleItems = navigationItems.filter(item => 
    item.roles.includes(user?.role)
  );

  return (
    <nav className="bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-green-400" />
              <span className="font-bold text-xl text-white">Military Asset Management</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {visibleItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium border-b-2 border-transparent transition-colors duration-200 ${isActive(item.path)}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-300">
              <User className="h-5 w-5" />
              <span className="text-sm">
                {user?.username} ({user?.role})
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm">Logout</span>
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800">
              {visibleItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    location.pathname === item.path 
                      ? 'text-green-400 bg-gray-700' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
