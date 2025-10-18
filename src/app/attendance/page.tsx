'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TeacherLayout from '@/components/TeacherLayout';
import { 
  Plus, 
  Search, 
  Calendar, 
  Users, 
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Play,
  Pause,
  Eye,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react';

interface AttendanceSession {
  id: string;
  title: string;
  classroomName: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'ended' | 'scheduled';
  attendees: number;
  totalStudents: number;
  createdAt: string;
}

export default function AttendancePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  // Mock attendance sessions data
  const sessions: AttendanceSession[] = [
    {
      id: '1',
      title: 'เช็คชื่อบทที่ 5: สมการกำลังสอง',
      classroomName: 'คณิตศาสตร์ ม.3/1',
      sessionDate: '2024-10-18',
      startTime: '08:00',
      endTime: '09:30',
      status: 'active',
      attendees: 28,
      totalStudents: 32,
      createdAt: '2024-10-18T07:45:00'
    },
    {
      id: '2',
      title: 'เช็คชื่อการทดลอง: แรงและการเคลื่อนที่',
      classroomName: 'ฟิสิกส์ ม.5/1',
      sessionDate: '2024-10-18',
      startTime: '10:00',
      endTime: '11:30',
      status: 'scheduled',
      attendees: 0,
      totalStudents: 28,
      createdAt: '2024-10-17T15:30:00'
    },
    {
      id: '3',
      title: 'เช็คชื่อบทที่ 3: เคมีอินทรีย์',
      classroomName: 'เคมี ม.4/2',
      sessionDate: '2024-10-17',
      startTime: '13:00',
      endTime: '14:30',
      status: 'ended',
      attendees: 26,
      totalStudents: 30,
      createdAt: '2024-10-17T12:45:00'
    }
  ];

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.classroomName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || session.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'ended':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'กำลังเช็คชื่อ';
      case 'ended':
        return 'สิ้นสุดแล้ว';
      case 'scheduled':
        return 'กำหนดการ';
      default:
        return 'ไม่ทราบสถานะ';
    }
  };

  const getAttendancePercentage = (attendees: number, total: number) => {
    return total > 0 ? (attendees / total) * 100 : 0;
  };

  const handleCreateAttendance = () => {
    router.push('/attendance/create');
  };

  const handleViewSession = (sessionId: string) => {
    router.push(`/attendance/${sessionId}`);
  };

  const handleEditSession = (sessionId: string) => {
    router.push(`/attendance/${sessionId}/edit`);
  };

  const handleEndSession = (sessionId: string) => {
    console.log('Ending session:', sessionId);
    // ในการใช้งานจริงจะเรียก API
  };

  const handleDeleteSession = (sessionId: string) => {
    console.log('Deleting session:', sessionId);
    // ในการใช้งานจริงจะเรียก API
  };

  return (
    <TeacherLayout
      title="จัดการเช็คชื่อ"
      subtitle="สร้างและติดตามการเช็คชื่อของนักเรียน"
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">รอบทั้งหมด</p>
              <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
            </div>
            <Calendar className="h-8 w-8 text-gray-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">กำลังเช็คชื่อ</p>
              <p className="text-2xl font-bold text-green-600">
                {sessions.filter(s => s.status === 'active').length}
              </p>
            </div>
            <Play className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">กำหนดการ</p>
              <p className="text-2xl font-bold text-blue-600">
                {sessions.filter(s => s.status === 'scheduled').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">เข้าเรียนเฉลี่ย</p>
              <p className="text-2xl font-bold text-purple-600">
                {sessions.length > 0 
                  ? (sessions.reduce((sum, s) => sum + getAttendancePercentage(s.attendees, s.totalStudents), 0) / sessions.length).toFixed(1)
                  : 0
                }%
              </p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหารอบเช็คชื่อ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">ทุกสถานะ</option>
            <option value="active">กำลังเช็คชื่อ</option>
            <option value="scheduled">กำหนดการ</option>
            <option value="ended">สิ้นสุดแล้ว</option>
          </select>
        </div>

        <button
          onClick={handleCreateAttendance}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>เปิดรอบเช็คชื่อ</span>
        </button>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {session.title}
                      </h3>
                      <p className="text-sm text-gray-600">{session.classroomName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                        {getStatusText(session.status)}
                      </span>
                      <div className="relative">
                        <button
                          onClick={() => setSelectedSession(
                            selectedSession === session.id ? null : session.id
                          )}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <MoreVertical className="h-4 w-4 text-gray-500" />
                        </button>
                        
                        {selectedSession === session.id && (
                          <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                            <button 
                              onClick={() => handleViewSession(session.id)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                            >
                              <Eye className="h-4 w-4" />
                              <span>ดูรายละเอียด</span>
                            </button>
                            <button 
                              onClick={() => handleEditSession(session.id)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                            >
                              <Edit className="h-4 w-4" />
                              <span>แก้ไข</span>
                            </button>
                            {session.status === 'active' && (
                              <button 
                                onClick={() => handleEndSession(session.id)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                              >
                                <Pause className="h-4 w-4" />
                                <span>สิ้นสุดรอบ</span>
                              </button>
                            )}
                            <hr className="my-1" />
                            <button 
                              onClick={() => handleDeleteSession(session.id)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center space-x-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>ลบ</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(session.sessionDate).toLocaleDateString('th-TH')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {session.startTime} - {session.endTime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {session.attendees}/{session.totalStudents} คน
                      </span>
                    </div>
                  </div>

                  {/* Attendance Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>ความคืบหน้าการเข้าเรียน</span>
                      <span>{getAttendancePercentage(session.attendees, session.totalStudents).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          session.status === 'active' ? 'bg-green-500' : 
                          session.status === 'ended' ? 'bg-blue-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${getAttendancePercentage(session.attendees, session.totalStudents)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      สร้างเมื่อ: {new Date(session.createdAt).toLocaleString('th-TH')}
                    </span>
                    <div className="flex space-x-2">
                      {session.status === 'active' && (
                        <button 
                          onClick={() => handleViewSession(session.id)}
                          className="bg-green-50 text-green-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-green-100 transition-colors"
                        >
                          ดูการเช็คชื่อ
                        </button>
                      )}
                      {session.status === 'scheduled' && (
                        <button 
                          onClick={() => handleViewSession(session.id)}
                          className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors"
                        >
                          เริ่มเช็คชื่อ
                        </button>
                      )}
                      {session.status === 'ended' && (
                        <button 
                          onClick={() => handleViewSession(session.id)}
                          className="bg-gray-50 text-gray-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                        >
                          ดูผลลัพธ์
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบรอบเช็คชื่อ</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'ไม่มีรอบเช็คชื่อที่ตรงกับคำค้นหา' : 'คุณยังไม่ได้สร้างรอบเช็คชื่อ'}
          </p>
          <button
            onClick={handleCreateAttendance}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            เปิดรอบเช็คชื่อแรก
          </button>
        </div>
      )}
    </TeacherLayout>
  );
}