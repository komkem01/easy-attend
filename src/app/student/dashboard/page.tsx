'use client';

import React, { useState } from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  CheckCircle, 
  Clock,
  AlertCircle,
  TrendingUp,
  Users
} from 'lucide-react';

export default function StudentDashboard() {
  // Mock data - ในการใช้งานจริงจะดึงจาก API
  const studentStats = {
    todayClasses: 4,
    completedAssignments: 8,
    pendingAssignments: 3,
    attendanceRate: 92
  };

  const todaySchedule = [
    {
      id: '1',
      subject: 'คณิตศาสตร์',
      teacher: 'อาจารย์สมชาย',
      time: '08:00 - 09:30',
      room: 'ห้อง 301',
      status: 'completed'
    },
    {
      id: '2',
      subject: 'ฟิสิกส์',
      teacher: 'อาจารย์สมหญิง',
      time: '09:45 - 11:15',
      room: 'ห้อง 302',
      status: 'current'
    },
    {
      id: '3',
      subject: 'เคมี',
      teacher: 'อาจารย์สมศรี',
      time: '13:00 - 14:30',
      room: 'ห้อง 303',
      status: 'upcoming'
    },
    {
      id: '4',
      subject: 'ภาษาอังกฤษ',
      teacher: 'อาจารย์สมพร',
      time: '14:45 - 16:15',
      room: 'ห้อง 304',
      status: 'upcoming'
    }
  ];

  const recentAssignments = [
    {
      id: '1',
      title: 'แบบฝึกหัดบทที่ 5: สมการกำลังสอง',
      subject: 'คณิตศาสตร์',
      dueDate: '2024-10-25',
      status: 'pending',
      timeLeft: '3 วัน'
    },
    {
      id: '2',
      title: 'รายงานการทดลอง: แรงและการเคลื่อนที่',
      subject: 'ฟิสิกส์',
      dueDate: '2024-10-28',
      status: 'pending',
      timeLeft: '6 วัน'
    },
    {
      id: '3',
      title: 'แบบทดสอบเคมีอินทรีย์',
      subject: 'เคมี',
      dueDate: '2024-10-22',
      status: 'completed',
      score: '85/100'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'current':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'เสร็จแล้ว';
      case 'current':
        return 'กำลังเรียน';
      case 'upcoming':
        return 'กำลังจะเรียน';
      case 'pending':
        return 'รอส่ง';
      default:
        return 'ไม่ทราบสถานะ';
    }
  };

  return (
    <StudentLayout
      title="แดชบอร์ดนักเรียน"
      subtitle="ภาพรวมการเรียนและกิจกรรมของคุณ"
      activeMenuItem="dashboard"
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">วิชาเรียนวันนี้</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{studentStats.todayClasses}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">งานที่ส่งแล้ว</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{studentStats.completedAssignments}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">งานรอส่ง</p>
              <p className="text-xl sm:text-2xl font-bold text-orange-600">{studentStats.pendingAssignments}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">เปอร์เซ็นต์เข้าเรียน</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{studentStats.attendanceRate}%</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">ตารางเรียนวันนี้</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {todaySchedule.map((schedule) => (
                <div key={schedule.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900">{schedule.subject}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{schedule.teacher}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(schedule.status)}`}>
                      {getStatusText(schedule.status)}
                    </span>
                  </div>
                  <div className="flex items-center text-xs sm:text-sm text-gray-500 space-x-4">
                    <span>🕐 {schedule.time}</span>
                    <span>📍 {schedule.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Assignments */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">งานล่าสุด</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {recentAssignments.map((assignment) => (
                <div key={assignment.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 truncate">{assignment.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{assignment.subject}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ml-2 ${getStatusColor(assignment.status)}`}>
                      {getStatusText(assignment.status)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                    <span>📅 กำหนดส่ง: {new Date(assignment.dueDate).toLocaleDateString('th-TH')}</span>
                    {assignment.status === 'pending' && (
                      <span className="text-orange-600 font-medium">เหลือ {assignment.timeLeft}</span>
                    )}
                    {assignment.status === 'completed' && assignment.score && (
                      <span className="text-green-600 font-medium">คะแนน: {assignment.score}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 sm:mt-8 bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-medium text-green-800 mb-3 sm:mb-4">การดำเนินการด่วน</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <button className="flex items-center justify-center space-x-2 p-3 bg-white text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <Users className="h-5 w-5" />
            <span className="text-sm sm:text-base">เช็คชื่อเข้าเรียน</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-3 bg-white text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <FileText className="h-5 w-5" />
            <span className="text-sm sm:text-base">ส่งงาน</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-3 bg-white text-green-700 rounded-lg hover:bg-green-100 transition-colors">
            <Calendar className="h-5 w-5" />
            <span className="text-sm sm:text-base">ดูตารางเรียน</span>
          </button>
        </div>
      </div>
    </StudentLayout>
  );
}