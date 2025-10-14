import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navigationItems = [
    { label: 'Dashboard', path: '/event-dashboard', icon: 'BarChart3' },
    { label: 'Monitoring', path: '/social-media-monitoring', icon: 'Activity' },
    { label: 'Reports', path: '/analytics-reports', icon: 'FileText' },
    { label: 'Account', path: '/account-settings', icon: 'Settings' }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">EventPulse</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isActivePath(item?.path)
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
          </nav>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={handleUserMenuToggle}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-sm font-medium text-white">{user?.firstName} {user?.lastName}</div>
                <div className="text-xs text-gray-300">{user?.jobTitle || 'Event Manager'}</div>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`text-gray-300 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {/* Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-black/90 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl z-50">
                <div className="p-3 border-b border-white/10">
                  <div className="text-sm font-medium text-white">{user?.firstName} {user?.lastName}</div>
                  <div className="text-xs text-gray-300">{user?.email}</div>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => handleNavigation('/account-settings')}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-white hover:bg-white/10 transition-all duration-300"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Account Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-red-400 hover:bg-white/10 transition-all duration-300"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {/* Handle mobile menu */}}
            >
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      <div className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-sm z-40 hidden">
        <div className="p-6">
          <nav className="space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-standard ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span className="font-medium">{item?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;