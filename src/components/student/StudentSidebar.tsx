import React from 'react';
import { User, BookOpen, Users, Calendar, FileText, BarChart3, Settings, Bell, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface StudentSidebarProps {
  activeItem?: string;
  onItemClick: (item: string) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({ activeItem, onItemClick, isMobile = false, onClose }) => {
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
    { id: 'classrooms', label: 'ห้องเรียนของฉัน', icon: BookOpen },
    { id: 'attendance', label: 'เช็คชื่อ & ประวัติ', icon: Users },
    { id: 'assignments', label: 'งานที่ได้รับ', icon: FileText },
    { id: 'schedule', label: 'ตารางเรียน', icon: Calendar },
    { id: 'grades', label: 'ผลการเรียน', icon: BarChart3 },
    { id: 'profile', label: 'โปรไฟล์', icon: User },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-green-800">Easy Attend</h1>
            <p className="text-sm text-green-600">ระบบนักเรียน</p>
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
              case 'dashboard': return '/student/dashboard';
              case 'classrooms': return '/student/classrooms';
              case 'attendance': return '/student/attendance';
              case 'assignments': return '/student/assignments';
              case 'schedule': return '/student/schedule';
              case 'grades': return '/student/grades';
              case 'profile': return '/student/profile';
              default: return '/student/dashboard';
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
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-green-50 transition-colors cursor-pointer ${
                activeItem === item.id 
                  ? 'bg-green-50 text-green-600 border-r-3 border-green-600' 
                  : 'text-gray-700 hover:text-green-600'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </div>
  );
};

export default StudentSidebar;