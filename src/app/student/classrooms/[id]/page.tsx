'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import StudentLayout from '@/components/student/StudentLayout';
import { 
  BookOpen, 
  User, 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  TrendingUp,
  Award,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Bell
} from 'lucide-react';
import Link from 'next/link';

export default function StudentClassroomDetailPage() {
  const params = useParams();
  const classroomId = params.id as string;

  // Mock classroom data
  const classroom = {
    id: classroomId,
    name: 'คณิตศาสตร์ 1',
    subject: 'Mathematics',
    teacher: 'อ.สมชาย สุขใส',
    email: 'somchai@school.ac.th',
    phone: '02-123-4567',
    room: 'ห้อง 201 อาคาร A',
    schedule: 'จันทร์, พุธ, ศุกร์ 09:00-10:30',
    students: 32,
    description: 'เรียนพื้นฐานคณิตศาสตร์ระดับมัธยมศึกษาตอนปลาย',
    color: 'bg-blue-500',
    semester: '2/2567',
    credits: 3
  };

  // Mock recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'assignment',
      title: 'การบ้านที่ 5: สมการกำลังสอง',
      dueDate: '2024-10-25',
      status: 'pending'
    },
    {
      id: 2,
      type: 'attendance',
      title: 'เช็คชื่อ: บทที่ 4 ฟังก์ชัน',
      date: '2024-10-18',
      status: 'present'
    },
    {
      id: 3,
      type: 'grade',
      title: 'สอบย่อย 2',
      score: 18,
      maxScore: 20,
      date: '2024-10-15'
    },
    {
      id: 4,
      type: 'announcement',
      title: 'ประกาศเลื่อนการสอบกลางภาค',
      date: '2024-10-16'
    }
  ];

  // Mock upcoming classes
  const upcomingClasses = [
    {
      date: '2024-10-21',
      time: '09:00-10:30',
      topic: 'บทที่ 6: อนุกรม'
    },
    {
      date: '2024-10-23',
      time: '09:00-10:30',
      topic: 'บทที่ 6: แบบฝึกหัด'
    },
    {
      date: '2024-10-25',
      time: '09:00-10:30',
      topic: 'สอบย่อย 3'
    }
  ];

  // Mock statistics
  const stats = {
    attendance: 92.5,
    assignments: 8,
    assignmentsCompleted: 7,
    currentGrade: 'A-',
    gpa: 3.7
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <FileText className="h-4 w-4" />;
      case 'attendance':
        return <Users className="h-4 w-4" />;
      case 'grade':
        return <Award className="h-4 w-4" />;
      case 'announcement':
        return <Bell className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string, status?: string) => {
    if (type === 'assignment') {
      return status === 'pending' ? 'text-yellow-600 bg-yellow-50' : 'text-green-600 bg-green-50';
    }
    if (type === 'attendance') {
      return status === 'present' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50';
    }
    if (type === 'grade') {
      return 'text-purple-600 bg-purple-50';
    }
    if (type === 'announcement') {
      return 'text-blue-600 bg-blue-50';
    }
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <StudentLayout 
      title={classroom.name}
      subtitle={`${classroom.subject} • ${classroom.teacher}`}
      activeMenuItem="classrooms"
    >
      <div className="space-y-6">
        {/* Classroom Header */}
        <div className={`${classroom.color} rounded-lg p-6 text-white`}>
          <div className="flex flex-col md:flex-row items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{classroom.name}</h1>
              <p className="text-lg opacity-90 mb-2">{classroom.subject}</p>
              <p className="opacity-80">{classroom.description}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <BookOpen className="h-12 w-12 opacity-75" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center opacity-90">
              <User className="h-4 w-4 mr-2" />
              <span>{classroom.teacher}</span>
            </div>
            <div className="flex items-center opacity-90">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{classroom.room}</span>
            </div>
            <div className="flex items-center opacity-90">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{classroom.schedule}</span>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">การเข้าเรียน</p>
                <p className="text-2xl font-bold text-green-600">{stats.attendance}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">งานที่ส่ง</p>
                <p className="text-2xl font-bold text-blue-600">{stats.assignmentsCompleted}/{stats.assignments}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">เกรด</p>
                <p className="text-2xl font-bold text-purple-600">{stats.currentGrade}</p>
              </div>
              <Award className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">GPA</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.gpa}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">กิจกรรมล่าสุด</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${getActivityColor(activity.type, activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        {activity.type === 'assignment' && activity.dueDate && (
                          <p className="text-xs text-gray-500">
                            ครบกำหนด: {new Date(activity.dueDate).toLocaleDateString('th-TH')}
                          </p>
                        )}
                        {activity.type === 'grade' && activity.score && (
                          <p className="text-xs text-gray-500">
                            คะแนน: {activity.score}/{activity.maxScore}
                          </p>
                        )}
                        {(activity.type === 'attendance' || activity.type === 'announcement') && activity.date && (
                          <p className="text-xs text-gray-500">
                            {new Date(activity.date).toLocaleDateString('th-TH')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Link 
                  href="/student/assignments"
                  className="inline-flex items-center text-sm text-green-600 hover:text-green-700"
                >
                  ดูทั้งหมด
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">คาบเรียนถัดไป</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingClasses.map((cls, index) => (
                  <div key={index} className="border border-gray-200 rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{cls.topic}</h4>
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{new Date(cls.date).toLocaleDateString('th-TH')} • {cls.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Link 
                  href="/student/schedule"
                  className="inline-flex items-center text-sm text-green-600 hover:text-green-700"
                >
                  ดูตารางเรียนทั้งหมด
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Teacher Information */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">ข้อมูลครูผู้สอน</h3>
          </div>
          <div className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-gray-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{classroom.teacher}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">{classroom.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="text-sm">{classroom.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/student/attendance"
              className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Users className="h-5 w-5 mr-2 text-green-600" />
              <span className="font-medium">เช็คชื่อ</span>
            </Link>
            
            <Link 
              href="/student/assignments"
              className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              <span className="font-medium">งานที่ได้รับ</span>
            </Link>
            
            <Link 
              href="/student/grades"
              className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Award className="h-5 w-5 mr-2 text-purple-600" />
              <span className="font-medium">ดูคะแนน</span>
            </Link>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}