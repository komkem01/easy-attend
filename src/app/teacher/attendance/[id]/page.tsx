'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TeacherLayout from '@/components/teacher/TeacherLayout';
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
  Edit,
  Play,
  QrCode,
  Settings,
  Trash2,
  X
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

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    sessionDate: '',
    sessionTime: ''
  });

  const [session, setSession] = useState<AttendanceSession>({
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
  const [notification, setNotification] = useState<{type: 'success' | 'error' | 'info'; message: string} | null>(null);

  const handleBack = () => {
    router.push('/teacher/attendance');
  };

  const handleStatusChange = (studentId: string, newStatus: 'present' | 'absent' | 'late' | 'excused') => {
    const student = students.find(s => s.id === studentId);
    const statusText = {
      'present': 'มาเรียน',
      'absent': 'ขาดเรียน', 
      'late': 'มาสาย',
      'excused': 'ลา'
    };

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

    if (student) {
      showNotification('info', `เปลี่ยนสถานะ ${student.name} เป็น ${statusText[newStatus]} แล้ว`);
    }
  };

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message });
    
    // เล่นเสียงแจ้งเตือน
    if (type === 'success') {
      // เสียงแจ้งเตือนสำเร็จ
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DwxmwhBTuV2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DwxmwhBTuV2/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DwxmwhBTuV2/LNeSsF');
      audio.volume = 0.3;
      audio.play().catch(() => {}); // ไม่ error หากเล่นเสียงไม่ได้
    }
    
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSave = () => {
    if (session.status === 'ended') {
      showNotification('info', 'ไม่สามารถบันทึกได้ เนื่องจากรอบเช็คชื่อสิ้นสุดแล้ว');
      return;
    }

    console.log('Saving attendance:', students);
    
    // แสดงการโหลด
    showNotification('info', 'กำลังบันทึกการเช็คชื่อ...');
    
    // จำลองการบันทึกข้อมูล
    setTimeout(() => {
      // ในการใช้งานจริงจะเรียก API
      showNotification('success', '✅ บันทึกการเช็คชื่อเรียบร้อยแล้ว');
      
      // แสดงสถิติการเช็คชื่อ
      setTimeout(() => {
        const presentCount = students.filter(s => s.status === 'present').length;
        const totalCount = students.length;
        showNotification('info', `📊 มาเรียน ${presentCount}/${totalCount} คน`);
      }, 1500);
    }, 1000);
  };

  const handleEndSession = () => {
    if (confirm('คุณต้องการสิ้นสุดรอบเช็คชื่อนี้หรือไม่?\n\nเมื่อสิ้นสุดแล้วจะไม่สามารถแก้ไขข้อมูลได้อีก')) {
      // เปลี่ยนสถานะ session เป็น ended
      setSession(prev => ({
        ...prev,
        status: 'ended'
      }));
      
      // แสดงการแจ้งเตือนขั้นตอนการสิ้นสุด
      showNotification('info', 'กำลังดำเนินการสิ้นสุดรอบเช็คชื่อ...');
      
      // จำลองการส่งข้อมูลไป API
      setTimeout(() => {
        console.log('Ending session with data:', { session, students });
        // ในการใช้งานจริงจะเรียก API เพื่อบันทึกข้อมูลสุดท้าย
        
        showNotification('success', '🎉 สิ้นสุดรอบเช็คชื่อเรียบร้อยแล้ว');
        
        // กลับไปหน้ารายการหลังจากแสดงการแจ้งเตือน
        setTimeout(() => {
          router.push('/teacher/attendance');
        }, 2000);
      }, 1000);
    }
  };

  const handleEditSession = () => {
    if (!editFormData.title.trim()) {
      showNotification('error', 'กรุณาระบุชื่อรอบเช็คชื่อ');
      return;
    }

    // ตรวจสอบสิทธิ์ก่อนแก้ไข
    if (!students.every(s => s.status === 'waiting')) {
      showNotification('error', 'ไม่สามารถแก้ไขได้เนื่องจากมีนักเรียนเช็คชื่อแล้ว');
      setShowEditModal(false);
      return;
    }

    // อัปเดตข้อมูล session
    setSession(prev => ({
      ...prev,
      title: editFormData.title,
      sessionDate: editFormData.sessionDate,
      startTime: editFormData.sessionTime
    }));

    // ปิด modal และแสดงการแจ้งเตือน
    setShowEditModal(false);
    showNotification('success', '✅ อัปเดตข้อมูลรอบเช็คชื่อเรียบร้อยแล้ว');
    
    // ในการใช้งานจริงจะเรียก API
    console.log('Updated session data:', editFormData);
  };

  const handleDeleteSession = () => {
    // ตรวจสอบสิทธิ์ก่อนลบ
    if (!students.every(s => s.status === 'waiting') || session.status === 'ended') {
      const reason = session.status === 'ended' 
        ? 'ไม่สามารถลบได้เนื่องจากรอบเช็คชื่อสิ้นสุดแล้ว'
        : 'ไม่สามารถลบได้เนื่องจากมีนักเรียนเช็คชื่อแล้ว';
      showNotification('error', reason);
      setShowDeleteModal(false);
      return;
    }

    // แสดงการแจ้งเตือนการลบ
    setShowDeleteModal(false);
    showNotification('info', 'กำลังลบรอบเช็คชื่อ...');
    
    setTimeout(() => {
      // ในการใช้งานจริงจะเรียก API เพื่อลบข้อมูล
      console.log('Deleting session:', sessionId);
      
      showNotification('success', '🗑️ ลบรอบเช็คชื่อเรียบร้อยแล้ว');
      
      // กลับไปหน้ารายการหลังจากลบ
      setTimeout(() => {
        router.push('/teacher/attendance');
      }, 1500);
    }, 1000);
  };



  const handleBulkAction = () => {
    if (!bulkAction || selectedStudents.length === 0) {
      showNotification('error', 'กรุณาเลือกนักเรียนและการดำเนินการ');
      return;
    }

    setStudents(prev => prev.map(student => 
      selectedStudents.includes(student.id) 
        ? { 
            ...student, 
            status: bulkAction as any,
            checkInTime: (bulkAction === 'present' || bulkAction === 'late') 
              ? new Date().toLocaleTimeString('th-TH', { hour12: false })
              : undefined
          }
        : student
    ));
    
    setSelectedStudents([]);
    setBulkAction('');
    showNotification('success', `อัปเดตสถานะของนักเรียน ${selectedStudents.length} คนเรียบร้อยแล้ว`);
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
      showNotification('info', 'ยกเลิกการเลือกนักเรียนทั้งหมดแล้ว');
    } else {
      setSelectedStudents(students.map(s => s.id));
      showNotification('info', `เลือกนักเรียนทั้งหมด ${students.length} คน`);
    }
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
      activeMenuItem="attendance"
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
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-4">
          <button 
            onClick={handleSave}
            disabled={session.status === 'ended'}
            className={`px-6 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-medium transform hover:scale-105 ${
              session.status === 'ended' 
                ? 'bg-gray-400 text-white cursor-not-allowed opacity-60 scale-100 hover:scale-100' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            <Save className="w-4 h-4" />
            {session.status === 'ended' ? 'บันทึกแล้ว' : 'บันทึกการเช็คชื่อ'}
          </button>
          
          {session.status === 'active' && (
            <button 
              onClick={handleEndSession}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5"
            >
              <Users className="w-4 h-4" />
              สิ้นสุดรอบเช็คชื่อ
            </button>
          )}
          
          {session.status === 'ended' && (
            <div className="px-6 py-2 bg-green-50 border-2 border-green-200 rounded-lg flex items-center gap-2 text-green-700 animate-pulse">
              <CheckCircle className="w-4 h-4 text-green-600" />
              รอบเช็คชื่อสิ้นสุดแล้ว
            </div>
          )}

          {/* Edit and Delete buttons */}
          <div className="flex gap-2 border-l pl-3">
            {/* แก้ไขได้เฉพาะเมื่อยังไม่มีใครเช็คชื่อ */}
            {students.every(s => s.status === 'waiting') ? (
              <button 
                onClick={() => {
                  setEditFormData({
                    title: session.title,
                    sessionDate: session.sessionDate,
                    sessionTime: session.startTime
                  });
                  setShowEditModal(true);
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 font-medium"
                title="แก้ไขข้อมูลรอบเช็คชื่อ"
              >
                <Settings className="w-4 h-4" />
                แก้ไข
              </button>
            ) : (
              <div 
                className="px-4 py-2 bg-gray-50 text-gray-400 rounded-lg flex items-center gap-2 font-medium cursor-not-allowed"
                title="ไม่สามารถแก้ไขได้เนื่องจากมีนักเรียนเช็คชื่อแล้ว"
              >
                <Settings className="w-4 h-4" />
                แก้ไข
              </div>
            )}
            
            {/* ลบได้เฉพาะเมื่อยังไม่มีใครเช็คชื่อและสถานะไม่ใช่ ended */}
            {students.every(s => s.status === 'waiting') && session.status !== 'ended' ? (
              <button 
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all duration-200 flex items-center gap-2 font-medium"
                title="ลบรอบเช็คชื่อ"
              >
                <Trash2 className="w-4 h-4" />
                ลบ
              </button>
            ) : (
              <div 
                className="px-4 py-2 bg-red-50 text-red-300 rounded-lg flex items-center gap-2 font-medium cursor-not-allowed"
                title={session.status === 'ended' ? 'ไม่สามารถลบได้เนื่องจากรอบเช็คชื่อสิ้นสุดแล้ว' : 'ไม่สามารถลบได้เนื่องจากมีนักเรียนเช็คชื่อแล้ว'}
              >
                <Trash2 className="w-4 h-4" />
                ลบ
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Session Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">ข้อมูลรอบเช็คชื่อ</h2>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 text-sm rounded-full flex items-center gap-1 ${
                  session.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {session.status === 'active' ? (
                    <>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      กำลังเช็คชื่อ
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      สิ้นสุดแล้ว
                    </>
                  )}
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
              <div className="flex items-center justify-between mb-4">
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
                    <option value="excused">ทำเครื่องหมายลา</option>
                  </select>
                  <button 
                    onClick={handleBulkAction}
                    disabled={!bulkAction || selectedStudents.length === 0}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    ดำเนินการ
                  </button>
                </div>
              </div>
              
              {/* Select All Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedStudents.length === students.length && students.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-600">
                  เลือกทั้งหมด ({selectedStudents.length}/{students.length})
                </span>
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
                          const studentName = students.find(s => s.id === student.id)?.name || '';
                          if (e.target.checked) {
                            setSelectedStudents(prev => [...prev, student.id]);
                            if (selectedStudents.length + 1 === 1) {
                              showNotification('info', `เลือก ${studentName}`);
                            }
                          } else {
                            setSelectedStudents(prev => prev.filter(id => id !== student.id));
                            if (selectedStudents.length === 1) {
                              showNotification('info', `ยกเลิกการเลือก ${studentName}`);
                            }
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
              <span>บันทึกการเช็คชื่อ</span>
            </button>
            
            <button
              onClick={handleEndSession}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
            >
              <Users className="h-4 w-4" />
              <span>สิ้นสุดรอบเช็คชื่อ</span>
            </button>
          </div>

          {/* QR Code Info */}
          {session.status === 'active' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">รหัสเช็คชื่อ</h3>
              <div 
                className="bg-white border rounded p-3 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(session.qrCode);
                    showNotification('success', 'คัดลอกรหัสเช็คชื่อแล้ว');
                  } catch (error) {
                    // Fallback สำหรับ browser เก่า
                    const textArea = document.createElement('textarea');
                    textArea.value = session.qrCode;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    showNotification('success', 'คัดลอกรหัสเช็คชื่อแล้ว');
                  }
                }}
                title="คลิกเพื่อคัดลอก"
              >
                <div className="text-lg font-mono font-bold text-blue-600">
                  {session.qrCode}
                </div>
              </div>
              <p className="text-sm text-blue-700 mt-2">
                นักเรียนสามารถใช้รหัสนี้เพื่อเช็คชื่อผ่านมือถือ
                <br />
                <span className="text-xs">คลิกเพื่อคัดลอกรหัส</span>
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

      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-xl transition-all duration-500 transform animate-in slide-in-from-right ${
          notification.type === 'success' ? 'bg-green-600 text-white border-l-4 border-green-400' : 
          notification.type === 'error' ? 'bg-red-600 text-white border-l-4 border-red-400' : 
          'bg-blue-600 text-white border-l-4 border-blue-400'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {notification.type === 'success' && (
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              {notification.type === 'error' && (
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              {notification.type === 'info' && (
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{notification.message}</p>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="flex-shrink-0 ml-4 text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Progress bar */}
          <div className="mt-2 w-full bg-white/20 rounded-full h-1">
            <div className="bg-white h-1 rounded-full animate-pulse" style={{
              width: '100%',
              animation: 'shrink 3s linear forwards'
            }}></div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes scale-in {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md animate-scale-in">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-900">แก้ไขรอบเช็คชื่อ</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อรอบเช็คชื่อ
                </label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="ระบุชื่อรอบเช็คชื่อ"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  วันที่
                </label>
                <input
                  type="date"
                  value={editFormData.sessionDate}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, sessionDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เวลา
                </label>
                <input
                  type="time"
                  value={editFormData.sessionTime}
                  onChange={(e) => setEditFormData(prev => ({ ...prev, sessionTime: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleEditSession}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md animate-scale-in">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <Trash2 className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">ลบรอบเช็คชื่อ</h3>
                  <p className="text-gray-600 text-sm">การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-red-900 mb-2">คุณต้องการลบรอบเช็คชื่อนี้หรือไม่?</h4>
                <p className="text-red-700 text-sm mb-2">• {session.title}</p>
                <p className="text-red-700 text-sm mb-2">• วันที่: {new Date(session.sessionDate).toLocaleDateString('th-TH')}</p>
                <p className="text-red-700 text-sm">• ข้อมูลการเช็คชื่อทั้งหมดจะถูกลบถาวร</p>
              </div>
            </div>
            
            <div className="flex gap-3 p-6 border-t bg-gray-50 rounded-b-lg">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleDeleteSession}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                ลบรอบเช็คชื่อ
              </button>
            </div>
          </div>
        </div>
      )}
    </TeacherLayout>
  );
}