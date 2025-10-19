import React from 'react';
import { User, BookOpen, Users, Calendar, FileText, BarChart3, Settings, Bell, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TeacherSidebarProps {
  activeItem?: string;
  onItemClick: (item: string) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ activeItem, onItemClick, isMobile = false, onClose }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any stored session data
    localStorage.clear();
    sessionStorage.clear();
    // Redirect to login page
    router.push('/');
  };
  const menuItems = [
    { id: 'dashboard', label: 'แดชบอร์ด', icon: BarChart3 },
    { id: 'classrooms', label: 'ห้องเรียน', icon: BookOpen },
    { id: 'attendance', label: 'เช็คชื่อ', icon: Users },
    { id: 'my-attendance', label: 'ประวัติเข้าเรียน', icon: User },
    { id: 'assignments', label: 'มอบหมายงาน', icon: FileText },
    { id: 'reports', label: 'รายงาน', icon: BarChart3 },
    { id: 'notifications', label: 'การแจ้งเตือน', icon: Bell },
    { id: 'settings', label: 'ตั้งค่า', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Easy Attend</h1>
            <p className="text-sm text-gray-600">ระบบครู</p>
          </div>
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const getPath = (id: string) => {
            switch(id) {
              case 'dashboard': return '/teacher/dashboard';
              case 'classrooms': return '/teacher/classrooms';
              case 'attendance': return '/teacher/attendance';
              case 'my-attendance': return '/teacher/my-attendance';
              case 'assignments': return '/teacher/assignments';
              case 'reports': return '/teacher/reports';
              case 'notifications': return '/teacher/notifications';
              case 'settings': return '/teacher/settings';
              default: return '/teacher/dashboard';
            }
          };
          
          return (
            <Link
              key={item.id}
              href={getPath(item.id)}
              onClick={(e) => {
                console.log('Menu clicked:', item.id);
                onItemClick(item.id);
              }}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-blue-50 transition-colors cursor-pointer ${
                activeItem === item.id 
                  ? 'bg-blue-50 text-blue-600 border-r-3 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">ครูผู้สอน</p>
              <p className="text-xs text-gray-600">teacher@school.ac.th</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded"
            title="ออกจากระบบ"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherSidebar;