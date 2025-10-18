'use client';

import React, { useState } from 'react';
import TeacherLayout from '@/components/TeacherLayout';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  MoreVertical,
  Download,
  Upload,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  phone?: string;
  enrolledAt: string;
  lastActivity: string;
  attendanceRate: number;
  totalSessions: number;
  presentSessions: number;
  absentSessions: number;
  lateSessions: number;
  isActive: boolean;
}

export default function ClassroomStudentsPage() {
  const [activeMenuItem, setActiveMenuItem] = useState('classrooms');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  // Mock classroom data
  const classroom = {
    id: '1',
    name: 'คณิตศาสตร์ ม.3/1',
    subject: 'คณิตศาสตร์',
    code: 'MATH301'
  };

  // Mock students data
  const students: Student[] = [
    {
      id: '1',
      name: 'นายสมชาย ใจดี',
      email: 'somchai@student.ac.th',
      studentId: '6501001',
      phone: '081-234-5678',
      enrolledAt: '2024-01-15',
      lastActivity: '2024-10-20',
      attendanceRate: 92.5,
      totalSessions: 20,
      presentSessions: 18,
      absentSessions: 1,
      lateSessions: 1,
      isActive: true
    },
    {
      id: '2',
      name: 'นางสาวสมหญิง รักเรียน',
      email: 'somying@student.ac.th',
      studentId: '6501002',
      phone: '082-345-6789',
      enrolledAt: '2024-01-15',
      lastActivity: '2024-10-19',
      attendanceRate: 87.5,
      totalSessions: 20,
      presentSessions: 17,
      absentSessions: 2,
      lateSessions: 1,
      isActive: true
    },
    {
      id: '3',
      name: 'นายทดสอบ ไม่มาเรียน',
      email: 'test@student.ac.th',
      studentId: '6501003',
      enrolledAt: '2024-01-15',
      lastActivity: '2024-10-10',
      attendanceRate: 45.0,
      totalSessions: 20,
      presentSessions: 9,
      absentSessions: 10,
      lateSessions: 1,
      isActive: false
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.includes(searchTerm) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMenuClick = (item: string) => {
    setActiveMenuItem(item);
  };

  const getAttendanceColor = (rate: number) => {
    if (rate >= 80) return 'text-green-600';
    if (rate >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <TeacherLayout
      title={`จัดการนักเรียน - ${classroom.name}`}
      subtitle={`รายชื่อนักเรียนในห้องเรียน รหัส: ${classroom.code}`}
      activeMenuItem={activeMenuItem}
      onMenuItemClick={handleMenuClick}
    >
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">นักเรียนทั้งหมด</p>
              <p className="text-2xl font-bold text-blue-600">{students.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ใช้งานอยู่</p>
              <p className="text-2xl font-bold text-green-600">
                {students.filter(s => s.isActive).length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">เข้าเรียนเฉลี่ย</p>
              <p className="text-2xl font-bold text-purple-600">
                {(students.reduce((sum, s) => sum + s.attendanceRate, 0) / students.length).toFixed(1)}%
              </p>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">เสี่ยงไม่ผ่าน</p>
              <p className="text-2xl font-bold text-red-600">
                {students.filter(s => s.attendanceRate < 60).length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหานักเรียน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowBulkModal(true)}
            className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Upload className="h-4 w-4" />
            <span>นำเข้าจาก CSV</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-4 w-4" />
            <span>ส่งออก</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>เพิ่มนักเรียน</span>
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">รายชื่อนักเรียน</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  นักเรียน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  รหัสนักเรียน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  การเข้าเรียน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  กิจกรรมล่าสุด
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  การจัดการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {student.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center space-x-4">
                          <span className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span>{student.email}</span>
                          </span>
                          {student.phone && (
                            <span className="flex items-center space-x-1">
                              <Phone className="h-3 w-3" />
                              <span>{student.phone}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {student.studentId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className={`font-medium ${getAttendanceColor(student.attendanceRate)}`}>
                        {student.attendanceRate.toFixed(1)}%
                      </div>
                      <div className="text-gray-500 text-xs">
                        มา {student.presentSessions} / ขาด {student.absentSessions} / สาย {student.lateSessions}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(student.isActive)}`}>
                      {student.isActive ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(student.lastActivity).toLocaleDateString('th-TH')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative">
                      <button
                        onClick={() => setSelectedStudent(
                          selectedStudent === student.id ? null : student.id
                        )}
                        className="p-1 hover:bg-gray-100 rounded-full"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </button>
                      
                      {selectedStudent === student.id && (
                        <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2">
                            <Edit className="h-4 w-4" />
                            <span>แก้ไขข้อมูล</span>
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>ดูประวัติการเข้าเรียน</span>
                          </button>
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2">
                            <Mail className="h-4 w-4" />
                            <span>ส่งแจ้งเตือน</span>
                          </button>
                          <hr className="my-1" />
                          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center space-x-2">
                            <Trash2 className="h-4 w-4" />
                            <span>ลบออกจากห้อง</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบนักเรียน</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'ไม่มีนักเรียนที่ตรงกับคำค้นหา' : 'ยังไม่มีนักเรียนในห้องเรียนนี้'}
          </p>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            เพิ่มนักเรียนคนแรก
          </button>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          onSubmit={(data) => {
            console.log('Adding student:', data);
            setShowAddModal(false);
          }}
        />
      )}

      {/* Bulk Import Modal */}
      {showBulkModal && (
        <BulkImportModal
          onClose={() => setShowBulkModal(false)}
          onSubmit={(data) => {
            console.log('Bulk importing:', data);
            setShowBulkModal(false);
          }}
        />
      )}
    </TeacherLayout>
  );
}

// Add Student Modal Component
interface AddStudentModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

function AddStudentModal({ onClose, onSubmit }: AddStudentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-6 border w-full max-w-md shadow-lg rounded-lg bg-white">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">เพิ่มนักเรียนใหม่</h3>
          <p className="text-sm text-gray-600">กรอกข้อมูลนักเรียนที่จะเพิ่มเข้าห้องเรียน</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อ-นามสกุล *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="นายสมชาย ใจดี"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              รหัสนักเรียน *
            </label>
            <input
              type="text"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="6501001"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              อีเมล *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="student@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              เบอร์โทรศัพท์
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="081-234-5678"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              เพิ่มนักเรียน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Bulk Import Modal Component
interface BulkImportModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

function BulkImportModal({ onClose, onSubmit }: BulkImportModalProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file drop
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-6 border w-full max-w-lg shadow-lg rounded-lg bg-white">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">นำเข้ารายชื่อจาก CSV</h3>
          <p className="text-sm text-gray-600">อัปโหลดไฟล์ CSV ที่มีรายชื่อนักเรียน</p>
        </div>

        <div className="space-y-4">
          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">ลากไฟล์มาวางที่นี่ หรือ</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              เลือกไฟล์
            </button>
            <p className="text-xs text-gray-500 mt-2">รองรับไฟล์ .csv เท่านั้น</p>
          </div>

          {/* CSV Template */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">รูปแบบไฟล์ CSV:</h4>
            <div className="bg-white border rounded p-2 text-xs font-mono">
              name,student_id,email,phone<br />
              นายสมชาย ใจดี,6501001,somchai@student.ac.th,081-234-5678<br />
              นางสาวสมหญิง รักเรียน,6501002,somying@student.ac.th,082-345-6789
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm mt-2">
              ดาวน์โหลดแบบฟอร์ม CSV
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            ยกเลิก
          </button>
          <button
            onClick={() => onSubmit({})}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            นำเข้าข้อมูล
          </button>
        </div>
      </div>
    </div>
  );
}