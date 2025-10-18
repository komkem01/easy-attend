'use client';

import React from 'react';
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

  const getActiveMenuItem = () => {
    if (activeMenuItem) return activeMenuItem;
    if (pathname.startsWith('/classrooms')) return 'classrooms';
    if (pathname.startsWith('/attendance')) return 'attendance';
    if (pathname.startsWith('/assignments')) return 'assignments';
    if (pathname.startsWith('/reports')) return 'reports';
    if (pathname.startsWith('/notifications')) return 'notifications';
    if (pathname.startsWith('/settings')) return 'settings';
    return 'dashboard';
  };

  const handleMenuItemClick = (item: string) => {
    if (onMenuItemClick) {
      onMenuItemClick(item);
      return;
    }
    
    switch (item) {
      case 'dashboard':
        router.push('/dashboard');
        break;
      case 'classrooms':
        router.push('/classrooms');
        break;
      case 'attendance':
        router.push('/attendance');
        break;
      case 'assignments':
        router.push('/assignments');
        break;
      case 'reports':
        router.push('/reports');
        break;
      case 'notifications':
        router.push('/notifications');
        break;
      case 'settings':
        router.push('/settings');
        break;
      default:
        router.push('/dashboard');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <TeacherSidebar 
        activeItem={getActiveMenuItem()} 
        onItemClick={handleMenuItemClick} 
      />
      <TeacherHeader title={title} subtitle={subtitle} />
      
      <main className="ml-64 pt-16">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default TeacherLayout;