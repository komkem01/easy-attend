'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import StudentSidebar from './StudentSidebar';
import StudentHeader from './StudentHeader';

interface StudentLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  activeMenuItem?: string;
  onMenuItemClick?: (item: string) => void;
}

const StudentLayout: React.FC<StudentLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  activeMenuItem,
  onMenuItemClick
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getActiveMenuItem = () => {
    if (activeMenuItem) return activeMenuItem;
    if (pathname.startsWith('/student/classrooms')) return 'classrooms';
    if (pathname.startsWith('/student/attendance')) return 'attendance';
    if (pathname.startsWith('/student/assignments')) return 'assignments';
    if (pathname.startsWith('/student/schedule')) return 'schedule';
    if (pathname.startsWith('/student/grades')) return 'grades';
    if (pathname.startsWith('/student/profile')) return 'profile';
    return 'dashboard';
  };

  const handleMenuItemClick = (item: string) => {
    console.log('StudentLayout handleMenuItemClick:', item);
    
    if (onMenuItemClick) {
      onMenuItemClick(item);
      return;
    }
    
    switch (item) {
      case 'dashboard':
        router.push('/student/dashboard');
        break;
      case 'classrooms':
        router.push('/student/classrooms');
        break;
      case 'attendance':
        router.push('/student/attendance');
        break;
      case 'assignments':
        router.push('/student/assignments');
        break;
      case 'schedule':
        router.push('/student/schedule');
        break;
      case 'grades':
        router.push('/student/grades');
        break;
      case 'profile':
        router.push('/student/profile');
        break;
      default:
        router.push('/student/dashboard');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuItemClick = (item: string) => {
    handleMenuItemClick(item);
    closeMobileMenu();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <StudentSidebar 
          activeItem={getActiveMenuItem()} 
          onItemClick={handleMenuItemClick} 
        />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMobileMenu}
          />
          {/* Mobile Sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 z-50">
            <StudentSidebar 
              activeItem={getActiveMenuItem()} 
              onItemClick={handleMobileMenuItemClick}
              isMobile={true}
              onClose={closeMobileMenu}
            />
          </div>
        </div>
      )}

      <StudentHeader 
        title={title} 
        subtitle={subtitle}
        onMobileMenuToggle={toggleMobileMenu}
      />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;