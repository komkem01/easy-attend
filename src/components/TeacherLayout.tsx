'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import TeacherSidebar from './TeacherSidebar';
import TeacherHeader from './TeacherHeader';

interface TeacherLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  activeMenuItem?: string;
  onMenuItemClick?: (item: string) => void;
}

const TeacherLayout: React.FC<TeacherLayoutProps> = ({ 
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
    if (pathname.startsWith('/classrooms')) return 'classrooms';
    if (pathname.startsWith('/attendance')) return 'attendance';
    if (pathname.startsWith('/my-attendance')) return 'my-attendance';
    if (pathname.startsWith('/assignments')) return 'assignments';
    if (pathname.startsWith('/reports')) return 'reports';
    if (pathname.startsWith('/notifications')) return 'notifications';
    if (pathname.startsWith('/settings')) return 'settings';
    return 'dashboard';
  };

  const handleMenuItemClick = (item: string) => {
    console.log('TeacherLayout handleMenuItemClick:', item);
    
    if (onMenuItemClick) {
      onMenuItemClick(item);
      return;
    }
    
    switch (item) {
      case 'dashboard':
        console.log('Navigating to dashboard');
        router.push('/dashboard');
        break;
      case 'classrooms':
        console.log('Navigating to classrooms');
        router.push('/classrooms');
        break;
      case 'attendance':
        console.log('Navigating to attendance');
        router.push('/attendance');
        break;
      case 'my-attendance':
        console.log('Navigating to my-attendance');
        router.push('/my-attendance');
        break;
      case 'assignments':
        console.log('Navigating to assignments');
        router.push('/assignments');
        break;
      case 'reports':
        console.log('Navigating to reports');
        router.push('/reports');
        break;
      case 'notifications':
        console.log('Navigating to notifications');
        router.push('/notifications');
        break;
      case 'settings':
        console.log('Navigating to settings');
        router.push('/settings');
        break;
      default:
        console.log('Default navigation to dashboard');
        router.push('/dashboard');
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
        <TeacherSidebar 
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
            <TeacherSidebar 
              activeItem={getActiveMenuItem()} 
              onItemClick={handleMobileMenuItemClick}
              isMobile={true}
              onClose={closeMobileMenu}
            />
          </div>
        </div>
      )}

      <TeacherHeader 
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

export default TeacherLayout;