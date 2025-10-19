'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TeacherLayout from '@/components/TeacherLayout';
import { 
  ArrowLeft,
  Calendar, 
  Clock, 
  Users, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  UserCheck,
  Save,
  Download,
  RefreshCw,
  Edit,
  Play,
  Pause,
  QrCode
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  studentId: string;
  status: 'present' | 'absent' | 'late' | 'excused' | 'waiting';
  checkInTime?: string;
  notes?: string;
}

interface AttendanceSession {
  id: string;
  title: string;
  classroomName: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'ended' | 'scheduled';
  allowLateCheck: boolean;
  lateThreshold: number;
  qrCode: string;
}

export default function AttendanceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;

  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'นายสมชาย ใจดี',
      studentId: '6501001',
      status: 'present',
      checkInTime: '08:05:32'
    },
    {
      id: '2',
      name: 'นางสาวสมหญิง รักเรียน',
      studentId: '6501002',
      status: 'late',
      checkInTime: '08:18:45'
    },
    {
      id: '3',
      name: 'นายทดสอบ ไม่มาเรียน',
      studentId: '6501003',
      status: 'absent'
    },
    {
      id: '4',
      name: 'นางสาวทดลอง มาสาย',
      studentId: '6501004',
      status: 'waiting'
    }
  ]);

  const [session] = useState<AttendanceSession>({
    id: sessionId,
    title: 'เช็คชื่อบทที่ 5: สมการกำลังสอง',
    classroomName: 'คณิตศาสตร์ ม.3/1',
    sessionDate: '2024-10-18',
    startTime: '08:00',
    endTime: '09:30',
    status: 'active',
    allowLateCheck: true,
    lateThreshold: 15,
    qrCode: 'ATT-' + Math.random().toString(36).substr(2, 6).toUpperCase()
  });

  const [showQRCode, setShowQRCode] = useState(false);
  const [bulkAction, setBulkAction] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const handleBack = () => {
    router.push('/attendance');
  };

  const handleStatusChange = (studentId: string, newStatus: 'present' | 'absent' | 'late' | 'excused') => {
    setStudents(prev => prev.map(student => 
      student.id === studentId 
        ? { 
            ...student, 
            status: newStatus,
            checkInTime: newStatus === 'present' || newStatus === 'late' 
              ? new Date().toLocaleTimeString('th-TH', { hour12: false })
              : undefined
          }
        : student
    ));
  };

  const handleSave = () => {
    console.log('Saving attendance:', students);
    // ในการใช้งานจริงจะเรียก API
    alert('บันทึกการเช็คชื่อเรียบร้อยแล้ว');
  };

  const handleEndSession = () => {
    console.log('Ending session');
    // ในการใช้งานจริงจะเรียก API
    router.push('/attendance');
  };

  const handleExport = () => {
    console.log('Exporting attendance');
    // ในการใช้งานจริงจะเรียก API
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'late':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'absent':
        return <XCircle className="h-5 w-5 text-red-600" />;
      case 'excused':
        return <AlertTriangle className="h-5 w-5 text-blue-600" />;
      case 'waiting':
        return <Clock className="h-5 w-5 text-gray-400" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'excused':
        return 'bg-blue-100 text-blue-800';
      case 'waiting':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      case 'excused':
        return 'ลา';
      case 'waiting':
        return 'รอเช็คชื่อ';
      default:
        return 'ไม่ทราบ';
    }
  };

  const statusCounts = {
    present: students.filter(s => s.status === 'present').length,
    late: students.filter(s => s.status === 'late').length,
    absent: students.filter(s => s.status === 'absent').length,
    excused: students.filter(s => s.status === 'excused').length,
    waiting: students.filter(s => s.status === 'waiting').length
  };

  const attendanceRate = students.length > 0 
    ? ((statusCounts.present + statusCounts.late) / students.length) * 100
    : 0;

  return (
    <TeacherLayout
      title={session.title}
      subtitle={`${session.classroomName} • ${new Date(session.sessionDate).toLocaleDateString('th-TH')}`}
    >
      {/* Header */}
      <div className="mb-6">
        <button 
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          กลับไปหน้าเช็คชื่อ
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Session Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">ข้อมูลรอบเช็คชื่อ</h2>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 text-sm rounded-full ${
                  session.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {session.status === 'active' ? 'กำลังเช็คชื่อ' : 'สิ้นสุดแล้ว'}
                </span>
                {session.status === 'active' && (
                  <button
                    onClick={() => setShowQRCode(true)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
                  >
                    <QrCode className="h-4 w-4 inline mr-1" />
                    QR Code
                  </button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  {students.length} คน
                </span>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{statusCounts.present}</div>
              <div className="text-sm text-gray-600">มาเรียน</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.late}</div>
              <div className="text-sm text-gray-600">มาสาย</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{statusCounts.absent}</div>
              <div className="text-sm text-gray-600">ขาดเรียน</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.excused}</div>
              <div className="text-sm text-gray-600">ลา</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{attendanceRate.toFixed(1)}%</div>
              <div className="text-sm text-gray-600">เข้าเรียน</div>
            </div>
          </div>

          {/* Students List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">รายชื่อนักเรียน</h2>
                <div className="flex items-center space-x-2">
                  <select
                    value={bulkAction}
                    onChange={(e) => setBulkAction(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                  >
                    <option value="">เลือกการดำเนินการ</option>
                    <option value="present">ทำเครื่องหมายมาเรียน</option>
                    <option value="absent">ทำเครื่องหมายขาดเรียน</option>
                    <option value="late">ทำเครื่องหมายมาสาย</option>
                  </select>
                  <button className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg text-sm hover:bg-gray-200">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {students.map((student) => (
                <div key={student.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStudents(prev => [...prev, student.id]);
                          } else {
                            setSelectedStudents(prev => prev.filter(id => id !== student.id));
                          }
                        }}
                        className="h-4 w-4 text-blue-600"
                      />
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.studentId}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {student.checkInTime && (
                        <span className="text-sm text-gray-500">
                          เช็คชื่อ: {student.checkInTime}
                        </span>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(student.status)}
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(student.status)}`}>
                          {getStatusText(student.status)}
                        </span>
                      </div>
                      
                      <select
                        value={student.status}
                        onChange={(e) => handleStatusChange(student.id, e.target.value as any)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="waiting">รอเช็คชื่อ</option>
                        <option value="present">มาเรียน</option>
                        <option value="late">มาสาย</option>
                        <option value="absent">ขาดเรียน</option>
                        <option value="excused">ลา</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <div className="bg-white rounded-lg shadow p-4 space-y-3">
            <h3 className="font-medium text-gray-900">การดำเนินการ</h3>
            
            <button
              onClick={handleSave}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>บันทึก</span>
            </button>
            
            <button
              onClick={handleExport}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>ส่งออก</span>
            </button>
            
            {session.status === 'active' && (
              <button
                onClick={handleEndSession}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
              >
                <Pause className="h-4 w-4" />
                <span>สิ้นสุดรอบ</span>
              </button>
            )}
          </div>

          {/* QR Code Info */}
          {session.status === 'active' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">รหัสเช็คชื่อ</h3>
              <div className="bg-white border rounded p-3 text-center">
                <div className="text-lg font-mono font-bold text-blue-600">
                  {session.qrCode}
                </div>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                นักเรียนสามารถใช้รหัสนี้เพื่อเช็คชื่อผ่านมือถือ
              </p>
            </div>
          )}

          {/* Late Check Info */}
          {session.allowLateCheck && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-medium text-yellow-800 mb-2">การเช็คชื่อสาย</h3>
              <p className="text-sm text-yellow-700">
                อนุญาตให้เช็คชื่อสายได้ {session.lateThreshold} นาที
              </p>
            </div>
          )}
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRCode && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-6 border w-full max-w-md shadow-lg rounded-lg bg-white">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">QR Code เช็คชื่อ</h3>
              
              {/* QR Code Placeholder */}
              <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <QrCode className="h-16 w-16 text-gray-400" />
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
                <div className="text-lg font-mono font-bold text-gray-900">
                  {session.qrCode}
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                นักเรียนสแกน QR Code นี้เพื่อเช็คชื่อ
              </p>
              
              <button
                onClick={() => setShowQRCode(false)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                ปิด
              </button>
            </div>
          </div>
        </div>
      )}
    </TeacherLayout>
  );
}