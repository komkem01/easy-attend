import React from 'react';
import { User, BookOpen, Users, Calendar, FileText, BarChart3, Settings, Bell } from 'lucide-react';

interface TeacherSidebarProps {
  activeItem?: string;
  onItemClick: (item: string) => void;
}

const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ activeItem, onItemClick }) => {
  const menuItems = [
    { id: 'dashboard', label: 'แดชบอร์ด', icon: BarChart3 },
    { id: 'classrooms', label: 'ห้องเรียน', icon: BookOpen },
    { id: 'attendance', label: 'เช็คชื่อ', icon: Users },
    { id: 'assignments', label: 'มอบหมายงาน', icon: FileText },
    { id: 'reports', label: 'รายงาน', icon: BarChart3 },
    { id: 'notifications', label: 'การแจ้งเตือน', icon: Bell },
    { id: 'settings', label: 'ตั้งค่า', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Easy Attend</h1>
        <p className="text-sm text-gray-600">ระบบครู</p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors ${
                activeItem === item.id 
                  ? 'bg-blue-50 text-blue-600 border-r-3 border-blue-600' 
                  : 'text-gray-700'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
          <div>
            <p className="text-sm font-medium text-gray-800">ครูผู้สอน</p>
            <p className="text-xs text-gray-600">teacher@school.ac.th</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;