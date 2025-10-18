'use client';

import React, { useState } from 'react';
import TeacherLayout from '@/components/TeacherLayout';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Plus
} from 'lucide-react';

interface DashboardStats {
  totalClassrooms: number;
  totalStudents: number;
  todayAttendance: number;
  pendingAssignments: number;
  recentActivities: Array<{
    id: string;
    type: 'attendance' | 'assignment' | 'grade';
    message: string;
    time: string;
    className: string;
  }>;
}

export default function Dashboard() {
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');

  // Mock data - ในการใช้งานจริงจะดึงจาก API
  const stats: DashboardStats = {
    totalClassrooms: 5,
    totalStudents: 147,
    todayAttendance: 92,
    pendingAssignments: 23,
    recentActivities: [
      {
        id: '1',
        type: 'attendance',
        message: 'เช็คชื่อวิชาคณิตศาสตร์ ม.3/1 เสร็จสิ้น',
        time: '10:30',
        className: 'คณิตศาสตร์ ม.3/1'
      },
      {
        id: '2',
        type: 'assignment',
        message: 'งานใหม่: แบบฝึกหัดบทที่ 5',
        time: '09:15',
        className: 'คณิตศาสตร์ ม.3/2'
      },
      {
        id: '3',
        type: 'grade',
        message: 'ตรวจงานเสร็จ 15 คน',
        time: '08:45',
        className: 'ฟิสิกส์ ม.5/1'
      }
    ]
  };

  const quickActions = [
    {
      title: 'เช็คชื่อใหม่',
      description: 'เปิดรอบเช็คชื่อสำหรับห้องเรียน',
      icon: Users,
      color: 'bg-blue-500',
      href: '/attendance/create'
    },
    {
      title: 'สร้างงานใหม่',
      description: 'มอบหมายงานให้นักเรียน',
      icon: FileText,
      color: 'bg-green-500',
      href: '/assignments/create'
    },
    {
      title: 'สร้างห้องเรียน',
      description: 'เพิ่มห้องเรียนใหม่',
      icon: BookOpen,
      color: 'bg-purple-500',
      href: '/classrooms/create'
    },
    {
      title: 'ดูรายงาน',
      description: 'สรุปผลการเรียนและการเข้าเรียน',
      icon: BarChart3,
      color: 'bg-orange-500',
      href: '/reports'
    }
  ];

  const handleMenuClick = (item: string) => {
    setActiveMenuItem(item);
    // ในการใช้งานจริงจะใช้ router.push()
  };

  return (
    <TeacherLayout
      title="แดชบอร์ด"
      subtitle="ภาพรวมการจัดการเรียนการสอน"
      activeMenuItem={activeMenuItem}
      onMenuItemClick={handleMenuClick}
    >
      {/* สถิติหลัก */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ห้องเรียนทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalClassrooms}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">นักเรียนทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">เข้าเรียนวันนี้</p>
              <p className="text-2xl font-bold text-gray-900">{stats.todayAttendance}%</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">งานรอตรวจ</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingAssignments}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* การดำเนินการด่วน */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">การดำเนินการด่วน</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left"
                  >
                    <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* กิจกรรมล่าสุด */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">กิจกรรมล่าสุด</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.recentActivities.map((activity) => {
                const getIcon = () => {
                  switch (activity.type) {
                    case 'attendance':
                      return <CheckCircle className="h-5 w-5 text-green-500" />;
                    case 'assignment':
                      return <FileText className="h-5 w-5 text-blue-500" />;
                    case 'grade':
                      return <BarChart3 className="h-5 w-5 text-purple-500" />;
                    default:
                      return <Clock className="h-5 w-5 text-gray-500" />;
                  }
                };

                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getIcon()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.message}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.className} • {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ห้องเรียนที่ต้องดูแล */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">ห้องเรียนที่ต้องดูแล</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              ดูทั้งหมด
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* ตัวอย่างการ์ดห้องเรียน */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">คณิตศาสตร์ ม.3/{i}</h3>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    ใช้งาน
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>นักเรียน:</span>
                    <span>32 คน</span>
                  </div>
                  <div className="flex justify-between">
                    <span>เข้าเรียนวันนี้:</span>
                    <span>28 คน (87.5%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>งานรอตรวจ:</span>
                    <span>8 งาน</span>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-100">
                    เช็คชื่อ
                  </button>
                  <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-100">
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}