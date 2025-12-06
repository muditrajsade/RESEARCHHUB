import React, { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from './ui/dropdown-menu';
import { 
  Bell, 
  Settings, 
  User, 
  BookOpen, 
  TrendingUp, 
  Search,
  Heart,
  Bookmark,
  LogOut,
  Menu
} from 'lucide-react';
import { mockUser } from '../mock/mockData';
import { useNavigate } from 'react-router-dom';
const Header = ({ activeTab, onTabChange, onUserProfileClick }) => {
  let nvg = useNavigate();
  const [notifications] = useState([
    { id: 1, type: 'like', message: 'Someone liked your bookmark', time: '2h ago' },
    { id: 2, type: 'recommendation', message: 'New papers in AI Safety', time: '4h ago' },
    { id: 3, type: 'follow', message: 'New paper from followed author', time: '1d ago' }
  ]);

  const tabs = [
    { id: 'feed', label: 'Feed', icon: BookOpen },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'liked', label: 'Liked', icon: Heart },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <BookOpen size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Research IT</h1>
                <p className="text-xs text-gray-500">Research Discovery</p>
              </div>
            </div>
          </div>

          {/* Navigation Tabs - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* Right side - Notifications and User Menu */}
          <div className="flex items-center space-x-3">
            

            {/* User Menu */}
            <button onClick={()=>{
              nvg('/login')

            }}>Login/signup</button>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <DropdownMenuItem
                      key={tab.id}
                      onClick={() => onTabChange(tab.id)}
                      className={activeTab === tab.id ? 'bg-blue-50 text-blue-600' : ''}
                    >
                      <Icon size={16} className="mr-2" />
                      {tab.label}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;