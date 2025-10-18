import React from 'react';
import { Bell, Search, User } from 'lucide-react';

interface TeacherHeaderProps {
  title: string;
  subtitle?: string;
}

const TeacherHeader: React.FC<TeacherHeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 fixed top-0 left-64 right-0 z-30">
      <div className="flex items-center justify-between h-full px-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหา..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Profile */}
          <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700">ครูผู้สอน</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TeacherHeader;