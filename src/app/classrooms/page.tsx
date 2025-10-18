'use client';

import React, { useState } from 'react';
import TeacherLayout from '@/components/TeacherLayout';
import { 
  Plus, 
  Search, 
  Users, 
  Calendar, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  UserPlus,
  Settings,
  Copy,
  CheckCircle
} from 'lucide-react';

interface Classroom {
  id: string;
  name: string;
  subject: string;
  description: string;
  code: string;
  studentsCount: number;
  isActive: boolean;
  createdAt: string;
  lastActivity: string;
}

export default function ClassroomsPage() {
  const [activeMenuItem, setActiveMenuItem] = useState('classrooms');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinCodeModal, setShowJoinCodeModal] = useState<string | null>(null);
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(null);

  // Mock data
  const classrooms: Classroom[] = [
    {
      id: '1',
      name: 'คณิตศาสตร์ ม.3/1',
      subject: 'คณิตศาสตร์',
      description: 'การเรียนการสอนคณิตศาสตร์ชั้นมัธยมศึกษาปีที่ 3 ห้อง 1',
      code: 'MATH301',
      studentsCount: 32,
      isActive: true,
      createdAt: '2024-01-15',
      lastActivity: '2 ชั่วโมงที่แล้ว'
    },
    {
      id: '2',
      name: 'ฟิสิกส์ ม.5/1',
      subject: 'ฟิสิกส์',
      description: 'การเรียนการสอนฟิสิกส์ชั้นมัธยมศึกษาปีที่ 5 ห้อง 1',
      code: 'PHYS501',
      studentsCount: 28,
      isActive: true,
      createdAt: '2024-02-01',
      lastActivity: '1 วันที่แล้ว'
    },
    {
      id: '3',
      name: 'เคมี ม.4/2',
      subject: 'เคมี',
      description: 'การเรียนการสอนเคมีชั้นมัธยมศึกษาปีที่ 4 ห้อง 2',
      code: 'CHEM402',
      studentsCount: 30,
      isActive: false,
      createdAt: '2023-12-10',
      lastActivity: '1 สัปดาห์ที่แล้ว'
    }
  ];

  const filteredClassrooms = classrooms.filter(classroom =>
    classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classroom.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateClassroom = (data: any) => {
    console.log('Creating classroom:', data);
    setShowCreateModal(false);
    // ในการใช้งานจริงจะเรียก API
  };

  const handleCopyJoinCode = (code: string) => {
    navigator.clipboard.writeText(code);
    // แสดง toast notification
    alert(`คัดลอกรหัสห้องเรียน ${code} เรียบร้อยแล้ว`);
  };

  const handleMenuClick = (item: string) => {
    setActiveMenuItem(item);
  };

  return (
    <TeacherLayout
      title="จัดการห้องเรียน"
      subtitle="สร้าง จัดการ และติดตามห้องเรียนของคุณ"
      activeMenuItem={activeMenuItem}
      onMenuItemClick={handleMenuClick}
    >
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="ค้นหาห้องเรียน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>สร้างห้องเรียนใหม่</span>
        </button>
      </div>

      {/* Classrooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClassrooms.map((classroom) => (
          <div key={classroom.id} className="bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {classroom.name}
                  </h3>
                  <p className="text-sm text-gray-600">{classroom.subject}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    classroom.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {classroom.isActive ? 'ใช้งาน' : 'ไม่ใช้งาน'}
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setSelectedClassroom(
                        selectedClassroom === classroom.id ? null : classroom.id
                      )}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </button>
                    
                    {selectedClassroom === classroom.id && (
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
                          <UserPlus className="h-4 w-4" />
                          <span>จัดการนักเรียน</span>
                        </button>
                        <button
                          onClick={() => setShowJoinCodeModal(classroom.code)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Copy className="h-4 w-4" />
                          <span>รหัสเข้าร่วม</span>
                        </button>
                        <hr className="my-1" />
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center space-x-2">
                          <Trash2 className="h-4 w-4" />
                          <span>ลบห้องเรียน</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {classroom.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">นักเรียน:</span>
                  <span className="font-medium">{classroom.studentsCount} คน</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">รหัสห้อง:</span>
                  <span className="font-mono font-medium">{classroom.code}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">กิจกรรมล่าสุด:</span>
                  <span className="text-gray-500">{classroom.lastActivity}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-3 rounded-md text-sm font-medium hover:bg-blue-100 transition-colors">
                  เช็คชื่อ
                </button>
                <button className="flex-1 bg-gray-50 text-gray-600 py-2 px-3 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors">
                  ดูรายละเอียด
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredClassrooms.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบห้องเรียน</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'ไม่มีห้องเรียนที่ตรงกับคำค้นหา' : 'คุณยังไม่มีห้องเรียน'}
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            สร้างห้องเรียนแรก
          </button>
        </div>
      )}

      {/* Create Classroom Modal */}
      {showCreateModal && (
        <CreateClassroomModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateClassroom}
        />
      )}

      {/* Join Code Modal */}
      {showJoinCodeModal && (
        <JoinCodeModal
          code={showJoinCodeModal}
          onClose={() => setShowJoinCodeModal(null)}
          onCopy={handleCopyJoinCode}
        />
      )}
    </TeacherLayout>
  );
}

// Create Classroom Modal Component
interface CreateClassroomModalProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

function CreateClassroomModal({ onClose, onSubmit }: CreateClassroomModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-6 border w-full max-w-md shadow-lg rounded-lg bg-white">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">สร้างห้องเรียนใหม่</h3>
          <p className="text-sm text-gray-600">กรอกข้อมูลห้องเรียนที่จะสร้าง</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ชื่อห้องเรียน *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="เช่น คณิตศาสตร์ ม.3/1"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              วิชา *
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="เช่น คณิตศาสตร์"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              คำอธิบาย
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="อธิบายเกี่ยวกับห้องเรียนนี้..."
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
              สร้างห้องเรียน
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Join Code Modal Component
interface JoinCodeModalProps {
  code: string;
  onClose: () => void;
  onCopy: (code: string) => void;
}

function JoinCodeModal({ code, onClose, onCopy }: JoinCodeModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-6 border w-full max-w-md shadow-lg rounded-lg bg-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Copy className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">รหัสเข้าร่วมห้องเรียน</h3>
          <p className="text-sm text-gray-600 mb-6">
            แชร์รหัสนี้ให้นักเรียนเพื่อเข้าร่วมห้องเรียน
          </p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <div className="text-2xl font-mono font-bold text-gray-900 tracking-wider">
              {code}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              ปิด
            </button>
            <button
              onClick={() => onCopy(code)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <Copy className="h-4 w-4" />
              <span>คัดลอก</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}