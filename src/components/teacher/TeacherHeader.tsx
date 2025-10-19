import React from 'react';
import { Bell, Search, User, LogOut, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TeacherHeaderProps {
  title: string;
  subtitle?: string;
  onMobileMenuToggle?: () => void;
}

const TeacherHeader: React.FC<TeacherHeaderProps> = ({ title, subtitle, onMobileMenuToggle }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any stored session data
    localStorage.clear();
    sessionStorage.clear();
    // Redirect to login page
    router.push('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 fixed top-0 lg:left-64 right-0 left-0 z-30">
      <div className="flex items-center justify-between h-full px-4 sm:px-6">
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          {onMobileMenuToggle && (
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
          )}
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">{title}</h1>
            {subtitle && <p className="text-xs sm:text-sm text-gray-600">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search - Hidden on mobile */}
          <div className="relative hidden md:block">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหา..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          
          {/* Search icon for mobile */}
          <button className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Search className="h-5 w-5" />
          </button>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Profile */}
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">ครูผู้สอน</span>
            </button>
            
            {/* Logout */}
            <button 
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-100"
              title="ออกจากระบบ"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TeacherHeader;