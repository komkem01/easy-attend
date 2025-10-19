'use client';

import React, { useState } from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import { 
  Calendar, 
  Clock, 
  Check, 
  X, 
  QrCode, 
  Users, 
  BookOpen,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Timer
} from 'lucide-react';

export default function StudentAttendancePage() {
  const [activeTab, setActiveTab] = useState<'join' | 'history' | 'stats'>('join');
  const [joinCode, setJoinCode] = useState('');

  // Mock data for attendance history
  const attendanceHistory = [
    {
      id: 1,
      className: 'คณิตศาสตร์ 1',
      date: '2024-10-19',
      time: '09:00-10:30',
      status: 'present',
      teacher: 'อ.สมชาย',
      location: 'ห้อง 201',
      attendanceCode: 'MTH001',
      lateMinutes: 0
    },
    {
      id: 2,
      className: 'ฟิสิกส์ 2',
      date: '2024-10-18',
      time: '13:00-14:30',
      status: 'late',
      teacher: 'อ.สมหญิง',
      location: 'ห้อง 301',
      attendanceCode: 'PHY002',
      lateMinutes: 5
    },
    {
      id: 3,
      className: 'เคมี 1',
      date: '2024-10-17',
      time: '10:30-12:00',
      status: 'absent',
      teacher: 'อ.วิชัย',
      location: 'ห้องแลป เคมี',
      attendanceCode: 'CHE001',
      lateMinutes: 0
    },
    {
      id: 4,
      className: 'คณิตศาสตร์ 1',
      date: '2024-10-16',
      time: '09:00-10:30',
      status: 'present',
      teacher: 'อ.สมชาย',
      location: 'ห้อง 201',
      attendanceCode: 'MTH002',
      lateMinutes: 0
    },
    {
      id: 5,
      className: 'ฟิสิกส์ 2',
      date: '2024-10-15',
      time: '13:00-14:30',
      status: 'present',
      teacher: 'อ.สมหญิง',
      location: 'ห้อง 301',
      attendanceCode: 'PHY003',
      lateMinutes: 0
    },
    {
      id: 6,
      className: 'ภาษาอังกฤษ 1',
      date: '2024-10-14',
      time: '08:00-09:30',
      status: 'late',
      teacher: 'อ.จินดา',
      location: 'ห้อง 105',
      attendanceCode: 'ENG001',
      lateMinutes: 12
    },
    {
      id: 7,
      className: 'เคมี 1',
      date: '2024-10-13',
      time: '10:30-12:00',
      status: 'present',
      teacher: 'อ.วิชัย',
      location: 'ห้องแลป เคมี',
      attendanceCode: 'CHE002',
      lateMinutes: 0
    },
    {
      id: 8,
      className: 'คณิตศาสตร์ 1',
      date: '2024-10-12',
      time: '09:00-10:30',
      status: 'absent',
      teacher: 'อ.สมชาย',
      location: 'ห้อง 201',
      attendanceCode: 'MTH003',
      lateMinutes: 0
    }
  ];

  // Calculate statistics
  const totalClasses = attendanceHistory.length;
  const presentCount = attendanceHistory.filter(h => h.status === 'present').length;
  const lateCount = attendanceHistory.filter(h => h.status === 'late').length;
  const absentCount = attendanceHistory.filter(h => h.status === 'absent').length;
  const attendanceRate = totalClasses > 0 ? ((presentCount + lateCount) / totalClasses * 100) : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'text-green-600 bg-green-50';
      case 'late':
        return 'text-yellow-600 bg-yellow-50';
      case 'absent':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'present':
        return 'มาเรียน';
      case 'late':
        return 'มาสาย';
      case 'absent':
        return 'ขาดเรียน';
      default:
        return 'ไม่ทราบ';
    }
  };

  const handleJoinAttendance = () => {
    if (!joinCode.trim()) {
      alert('กรุณาใส่รหัสเข้าร่วมเช็คชื่อ');
      return;
    }
    
    // Here would be the actual join logic
    alert(`กำลังเข้าร่วมเช็คชื่อด้วยรหัส: ${joinCode}`);
  };

  return (
    <StudentLayout 
      title="เช็คชื่อ" 
      subtitle="เข้าร่วมเช็คชื่อและดูประวัติการเข้าเรียน"
      activeMenuItem="attendance"
    >
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">เข้าเรียนทั้งหมด</p>
                <p className="text-2xl font-bold text-gray-900">{totalClasses}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">เข้าเรียนตรงเวลา</p>
                <p className="text-2xl font-bold text-green-600">{presentCount}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">มาสาย</p>
                <p className="text-2xl font-bold text-yellow-600">{lateCount}</p>
              </div>
              <Timer className="h-8 w-8 text-yellow-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">เปอร์เซ็นต์การเข้าเรียน</p>
                <p className="text-2xl font-bold text-purple-600">{attendanceRate.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('join')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'join'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <QrCode className="h-4 w-4" />
                เข้าร่วมเช็คชื่อ
              </div>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                ประวัติการเข้าเรียน
              </div>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'stats'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                สถิติการเข้าเรียน
              </div>
            </button>
          </nav>
        </div>

        {/* Join Attendance Tab */}
        {activeTab === 'join' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Join Form */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="text-center mb-8">
                  <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-green-400 to-green-600 mb-6">
                    <QrCode className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    เข้าร่วมเช็คชื่อ
                  </h3>
                  <p className="text-gray-600">
                    กรอกรหัสที่ได้รับจากครูเพื่อเข้าร่วมเช็คชื่อ
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label htmlFor="joinCode" className="block text-sm font-semibold text-gray-700 mb-3">
                      รหัสเข้าร่วมเช็คชื่อ
                    </label>
                    <input
                      type="text"
                      id="joinCode"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                      placeholder="ABC123"
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-center text-2xl font-bold tracking-widest bg-gray-50"
                      maxLength={6}
                    />
                  </div>

                  <button
                    onClick={handleJoinAttendance}
                    className="w-full flex justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transform hover:scale-105 transition-all duration-200"
                  >
                    <Users className="h-6 w-6 mr-3" />
                    เข้าร่วมเช็คชื่อ
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4">วิธีใช้งาน</h4>
                  <div className="space-y-3 text-blue-800">
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">1</span>
                      <p className="text-sm">รอครูเปิดรอบเช็คชื่อและประกาศรหัส</p>
                    </div>
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">2</span>
                      <p className="text-sm">กรอกรหัสเช็คชื่อที่ได้รับจากครู</p>
                    </div>
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">3</span>
                      <p className="text-sm">กดปุ่ม &ldquo;เข้าร่วมเช็คชื่อ&rdquo; เพื่อยืนยัน</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6 border border-yellow-200">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-1 mr-3" />
                    <div>
                      <h4 className="text-sm font-semibold text-yellow-800 mb-2">หมายเหตุ</h4>
                      <p className="text-sm text-yellow-700">
                        รหัสเช็คชื่อมีอายุการใช้งานจำกัด กรุณาเข้าร่วมเช็คชื่อทันทีที่ได้รับรหัสจากครู
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                  <h4 className="text-lg font-semibold text-green-900 mb-3">สถิติการเข้าเรียนของคุณ</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{attendanceRate.toFixed(0)}%</p>
                      <p className="text-sm text-green-700">เข้าเรียนสม่ำเสมอ</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{totalClasses}</p>
                      <p className="text-sm text-blue-700">ครั้งทั้งหมด</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Attendance History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">ประวัติการเข้าเรียน</h3>
                <p className="text-sm text-gray-600 mt-1">รายการการเข้าเรียนทั้งหมด {attendanceHistory.length} ครั้ง</p>
              </div>

              {/* Desktop View */}
              <div className="hidden md:block">
                <div className="space-y-0">
                  {attendanceHistory.map((record, index) => (
                    <div key={record.id} className={`p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(record.status)}`}>
                            {record.status === 'present' && <CheckCircle2 className="h-6 w-6" />}
                            {record.status === 'absent' && <XCircle className="h-6 w-6" />}
                            {record.status === 'late' && <Timer className="h-6 w-6" />}
                          </div>
                          
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{record.className}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {record.teacher}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(record.date).toLocaleDateString('th-TH')}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {record.time}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(record.status)}`}>
                            {getStatusText(record.status)}
                            {record.status === 'late' && record.lateMinutes && (
                              <span className="ml-1">({record.lateMinutes} นาที)</span>
                            )}
                          </span>
                          <p className="text-xs text-gray-500 mt-2">{record.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile View */}
              <div className="md:hidden">
                <div className="divide-y divide-gray-200">
                  {attendanceHistory.map((record) => (
                    <div key={record.id} className="p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(record.status)}`}>
                          {record.status === 'present' && <CheckCircle2 className="h-5 w-5" />}
                          {record.status === 'absent' && <XCircle className="h-5 w-5" />}
                          {record.status === 'late' && <Timer className="h-5 w-5" />}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900 mb-1">
                            {record.className}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">{record.teacher}</p>
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center text-xs text-gray-600">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(record.date).toLocaleDateString('th-TH')}
                              </div>
                              <div className="flex items-center text-xs text-gray-600">
                                <Clock className="h-3 w-3 mr-1" />
                                {record.time}
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                              {getStatusText(record.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Attendance Rate Progress */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">เปอร์เซ็นต์การเข้าเรียนรวม</h3>
              <div className="relative">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>ความคืบหน้า</span>
                  <span>{attendanceRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`h-4 rounded-full transition-all duration-500 ${
                      attendanceRate >= 90 ? 'bg-green-500' : 
                      attendanceRate >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${attendanceRate}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {attendanceRate >= 90 ? 'ยอดเยี่ยม! การเข้าเรียนสม่ำเสมอมาก' : 
                   attendanceRate >= 80 ? 'ดี แต่ควรปรับปรุงการเข้าเรียนให้สม่ำเสมอมากขึ้น' : 
                   'ควรปรับปรุงการเข้าเรียนอย่างเร่งด่วน'}
                </p>
              </div>
            </div>

            {/* Weekly Attendance Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">สถิติการเข้าเรียนรายประเภท</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-3" />
                      <span className="font-medium text-green-900">เข้าเรียนตรงเวลา</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-600">{presentCount}</span>
                      <p className="text-xs text-green-600">ครั้ง</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center">
                      <Timer className="h-5 w-5 text-yellow-600 mr-3" />
                      <span className="font-medium text-yellow-900">มาสาย</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-yellow-600">{lateCount}</span>
                      <p className="text-xs text-yellow-600">ครั้ง</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <XCircle className="h-5 w-5 text-red-600 mr-3" />
                      <span className="font-medium text-red-900">ขาดเรียน</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-red-600">{absentCount}</span>
                      <p className="text-xs text-red-600">ครั้ง</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">การเข้าเรียนล่าสุด</h3>
                <div className="space-y-3">
                  {attendanceHistory.slice(0, 3).map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(record.status)}`}>
                          {record.status === 'present' && <Check className="h-4 w-4" />}
                          {record.status === 'absent' && <X className="h-4 w-4" />}
                          {record.status === 'late' && <Clock className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{record.className}</p>
                          <p className="text-xs text-gray-500">{new Date(record.date).toLocaleDateString('th-TH')}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(record.status)}`}>
                        {getStatusText(record.status)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">คำแนะนำสำหรับการเข้าเรียน</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attendanceRate >= 90 ? (
                  <>
                    <div className="flex items-start">
                      <Award className="h-5 w-5 text-blue-600 mt-1 mr-2" />
                      <p className="text-sm text-blue-800">ยอดเยี่ยม! รักษาการเข้าเรียนสม่ำเสมอต่อไป</p>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mt-1 mr-2" />
                      <p className="text-sm text-blue-800">คุณเป็นแบบอย่างที่ดีสำหรับเพื่อนร่วมชั้น</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-1 mr-2" />
                      <p className="text-sm text-blue-800">ตั้งปลุกให้เร็วขึ้น 15-30 นาทีเพื่อมาถึงทันเวลา</p>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-600 mt-1 mr-2" />
                      <p className="text-sm text-blue-800">เตรียมของใช้ในการเรียนไว้ตั้งแต่คืนก่อน</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}