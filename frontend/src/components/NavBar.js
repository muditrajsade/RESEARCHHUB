import React from 'react';
import { Search, Home, User, Bell } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-slate-900 to-slate-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900">ResearchHub</span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  size="sm"
                  className={`flex items-center space-x-2 transition-colors ${
                    isActive 
                      ? 'text-slate-900 bg-slate-100' 
                      : 'text-gray-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon size={20} />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              );
            })}

            {/* User Profile */}
            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-slate-900 text-white text-sm">
                  {mockUserProfile.avatar}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:inline text-sm font-medium text-gray-700">
                {mockUserProfile.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;