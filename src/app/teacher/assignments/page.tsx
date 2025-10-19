'use client';

import React, { useState } from 'react';
import TeacherLayout from '@/components/teacher/TeacherLayout';
import { 
  Plus, 
  Search, 
  Calendar, 
  FileText, 
  Users,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Clock,
  CheckCircle,
  AlertTriangle,
  Download
} from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description: string;
  classroomName: string;
  dueDate: string;
  maxScore: number;
  submissionsCount: number;
  totalStudents: number;
  status: 'active' | 'closed' | 'draft';
  createdAt: string;
}

export default function AssignmentsPage() {
  const [activeMenuItem, setActiveMenuItem] = useState('assignments');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Mock assignments data
  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'แบบฝึกหัดบทที่ 5: สมการกำลังสอง',
      description: 'ทำแบบฝึกหัดท้ายบทเรื่องสมการกำลังสอง ข้อ 1-20',
      classroomName: 'คณิตศาสตร์ ม.3/1',
      dueDate: '2024-10-25',
      maxScore: 100,
      submissionsCount: 28,
      totalStudents: 32,
      status: 'active',
      createdAt: '2024-10-20'
    },
    {
      id: '2',
      title: 'รายงานการทดลองฟิสิกส์: แรงและการเคลื่อนที่',
      description: 'เขียนรายงานการทดลองเรื่องแรงและการเคลื่อนที่ตามแบบฟอร์มที่กำหนด',
      classroomName: 'ฟิสิกส์ ม.5/1',
      dueDate: '2024-10-28',
      maxScore: 50,
      submissionsCount: 15,
      totalStudents: 28,
      status: 'active',
      createdAt: '2024-10-18'
    },
    {
      id: '3',
      title: 'แบบทดสอบเคมีอินทรีย์',
      description: 'แบบทดสอบออนไลน์เรื่องเคมีอินทรีย์ พื้นฐาน',
      classroomName: 'เคมี ม.4/2',
      dueDate: '2024-10-22',
      maxScore: 30,
      submissionsCount: 30,
      totalStudents: 30,
      status: 'closed',
      createdAt: '2024-10-15'
    }
  ];

  const filteredAssignments = assignments.filter(assignment =>
    assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assignment.classroomName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'เปิดรับงาน';
      case 'closed':
        return 'ปิดแล้ว';
      case 'draft':
        return 'แบบร่าง';
      default:
        return 'ไม่ทราบสถานะ';
    }
  };

  const handleMenuClick = (item: string) => {
    setActiveMenuItem(item);
  };

  const getSubmissionProgress = (submitted: number, total: number) => {
    return (submitted / total) * 100;
  };

  return (
    <TeacherLayout
      title="มอบหมายงาน"
      subtitle="สร้าง จัดการ และตรวจงานของนักเรียน"
      activeMenuItem={activeMenuItem}
      onMenuItemClick={handleMenuClick}
    >
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex-1 w-full sm:max-w-md">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหางาน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm sm:text-base"
            />
          </div>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors text-sm sm:text-base"
        >
          <Plus className="h-4 w-4" />
          <span>สร้างงานใหม่</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">งานทั้งหมด</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{assignments.length}</p>
            </div>
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">เปิดรับงาน</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                {assignments.filter(a => a.status === 'active').length}
              </p>
            </div>
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">รอตรวจ</p>
              <p className="text-xl sm:text-2xl font-bold text-orange-600">
                {assignments.reduce((sum, a) => sum + (a.totalStudents - a.submissionsCount), 0)}
              </p>
            </div>
            <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">ครบกำหนดแล้ว</p>
              <p className="text-xl sm:text-2xl font-bold text-red-600">
                {assignments.filter(a => new Date(a.dueDate) < new Date() && a.status === 'active').length}
              </p>
            </div>
            <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredAssignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row items-start justify-between space-y-3 lg:space-y-0">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {assignment.title}
                      </h3>
                      <p className="text-sm text-gray-600">{assignment.classroomName}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(assignment.status)}`}>
                        {getStatusText(assignment.status)}
                      </span>
                      <div className="relative">
                        <button
                          onClick={() => setSelectedAssignment(
                            selectedAssignment === assignment.id ? null : assignment.id
                          )}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <MoreVertical className="h-4 w-4 text-gray-500" />
                        </button>
                        
                        {selectedAssignment === assignment.id && (
                          <div className="absolute right-0 top-8 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2">
                              <Eye className="h-4 w-4" />
                              <span>ดูรายละเอียด</span>
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2">
                              <Edit className="h-4 w-4" />
                              <span>แก้ไข</span>
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2">
                              <Download className="h-4 w-4" />
                              <span>ดาวน์โหลดงาน</span>
                            </button>
                            <hr className="my-1" />
                            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center space-x-2">
                              <Trash2 className="h-4 w-4" />
                              <span>ลบงาน</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {assignment.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        ครบกำหนด: {new Date(assignment.dueDate).toLocaleDateString('th-TH')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        คะแนนเต็ม: {assignment.maxScore} คะแนน
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        ส่งแล้ว: {assignment.submissionsCount}/{assignment.totalStudents} คน
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>ความคืบหน้าการส่งงาน</span>
                      <span>{Math.round(getSubmissionProgress(assignment.submissionsCount, assignment.totalStudents))}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getSubmissionProgress(assignment.submissionsCount, assignment.totalStudents)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      สร้างเมื่อ: {new Date(assignment.createdAt).toLocaleDateString('th-TH')}
                    </span>
                    <div className="flex space-x-2">
                      <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">
                        ดูงานที่ส่ง
                      </button>
                      <button className="bg-green-50 text-green-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-green-100 transition-colors">
                        ตรวจงาน
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบงานที่มอบหมาย</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'ไม่มีงานที่ตรงกับคำค้นหา' : 'คุณยังไม่ได้สร้างงานมอบหมาย'}
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            สร้างงานแรก
          </button>
        </div>
      )}

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <CreateAssignmentModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={(data) => {
            console.log('Creating assignment:', data);
            setShowCreateModal(false);
          }}
        />
      )}
    </TeacherLayout>
  );
}

// Create Assignment Modal Component
interface CreateAssignmentModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

function CreateAssignmentModal({ onClose, onSubmit }: CreateAssignmentModalProps) {
  const [formData, setFormData] = useState({
    classroomId: '',
    title: '',
    description: '',
    instructions: '',
    dueDate: '',
    maxScore: '',
    allowLateSubmission: true
  });

  const classrooms = [
    { id: '1', name: 'คณิตศาสตร์ ม.3/1' },
    { id: '2', name: 'ฟิสิกส์ ม.5/1' },
    { id: '3', name: 'เคมี ม.4/2' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-lg bg-white">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">สร้างงานมอบหมายใหม่</h3>
          <p className="text-sm text-gray-600">กรอกรายละเอียดงานที่ต้องการมอบหมายให้นักเรียน</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เลือกห้องเรียน *
              </label>
              <select
                value={formData.classroomId}
                onChange={(e) => setFormData({ ...formData, classroomId: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                required
              >
                <option value="">เลือกห้องเรียน</option>
                {classrooms.map((classroom) => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                คะแนนเต็ม
              </label>
              <input
                type="number"
                value={formData.maxScore}
                onChange={(e) => setFormData({ ...formData, maxScore: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                placeholder="100"
                min="1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              หัวข้องาน *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="เช่น แบบฝึกหัดบทที่ 5: สมการกำลังสอง"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              คำอธิบายงาน *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="อธิบายงานที่มอบหมายโดยย่อ..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              คำแนะนำการทำงาน
            </label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="ให้คำแนะนำรายละเอียดเกี่ยวกับการทำงาน..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วันครบกำหนด *
            </label>
            <input
              type="datetime-local"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.allowLateSubmission}
              onChange={(e) => setFormData({ ...formData, allowLateSubmission: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="text-sm text-gray-700">
              อนุญาตให้ส่งงานหลังครบกำหนด
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
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
              สร้างงาน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
