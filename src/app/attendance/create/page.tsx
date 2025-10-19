'use client';

import React, { useState } from 'react';
import TeacherLayout from '@/components/TeacherLayout';
import { 
  Calendar, 
  Clock, 
  Users, 
  Settings, 
  Plus,
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface AttendanceSessionForm {
  classroomId: string;
  title: string;
  description: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  allowLateCheck: boolean;
  lateThreshold: number;
}

export default function CreateAttendancePage() {
  const [activeMenuItem, setActiveMenuItem] = useState('attendance');
  const [formData, setFormData] = useState<AttendanceSessionForm>({
    classroomId: '',
    title: '',
    description: '',
    sessionDate: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    allowLateCheck: true,
    lateThreshold: 15
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock classrooms data
  const classrooms = [
    { id: '1', name: 'คณิตศาสตร์ ม.3/1', subject: 'คณิตศาสตร์', studentsCount: 32 },
    { id: '2', name: 'ฟิสิกส์ ม.5/1', subject: 'ฟิสิกส์', studentsCount: 28 },
    { id: '3', name: 'เคมี ม.4/2', subject: 'เคมี', studentsCount: 30 }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating attendance session:', formData);
    
    // ในการใช้งานจริงจะเรียก API
    setTimeout(() => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        // Redirect to attendance management or classroom detail
      }, 2000);
    }, 1000);
  };

  const handleMenuClick = (item: string) => {
    setActiveMenuItem(item);
  };

  return (
    <TeacherLayout
      title="เปิดรอบเช็คชื่อ"
      subtitle="สร้างรอบเช็คชื่อใหม่สำหรับห้องเรียน"
      activeMenuItem={activeMenuItem}
      onMenuItemClick={handleMenuClick}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปหน้าเช็คชื่อ
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">ข้อมูลรอบเช็คชื่อ</h2>
                <p className="text-sm text-gray-600">กรอกรายละเอียดการเช็คชื่อที่จะเปิด</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Classroom Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                        {classroom.name} ({classroom.studentsCount} คน)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Session Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    หัวข้อการเช็คชื่อ *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="เช่น เช็คชื่อบทที่ 5: สมการกำลังสอง"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    รายละเอียดเพิ่มเติม
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="อธิบายเกี่ยวกับการเช็คชื่อครั้งนี้..."
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      วันที่ *
                    </label>
                    <input
                      type="date"
                      value={formData.sessionDate}
                      onChange={(e) => setFormData({ ...formData, sessionDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      เวลาเริ่ม *
                    </label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      เวลาสิ้นสุด *
                    </label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Late Check Settings */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">การเช็คชื่อสาย</h3>
                      <p className="text-sm text-gray-600">อนุญาตให้นักเรียนเช็คชื่อหลังเวลาที่กำหนด</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.allowLateCheck}
                        onChange={(e) => setFormData({ ...formData, allowLateCheck: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {formData.allowLateCheck && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ระยะเวลาที่อนุญาตให้เช็คชื่อสาย (นาที)
                      </label>
                      <select
                        value={formData.lateThreshold}
                        onChange={(e) => setFormData({ ...formData, lateThreshold: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                      >
                        <option value={5}>5 นาที</option>
                        <option value={10}>10 นาที</option>
                        <option value={15}>15 นาที</option>
                        <option value={30}>30 นาที</option>
                        <option value={60}>1 ชั่วโมง</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>เปิดรอบเช็คชื่อ</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-900">ตัวอย่าง</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formData.sessionDate ? new Date(formData.sessionDate).toLocaleDateString('th-TH') : 'ยังไม่ได้เลือกวันที่'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formData.startTime && formData.endTime 
                        ? `${formData.startTime} - ${formData.endTime}`
                        : 'ยังไม่ได้เลือกเวลา'
                      }
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {formData.classroomId 
                        ? classrooms.find(c => c.id === formData.classroomId)?.name 
                        : 'ยังไม่ได้เลือกห้องเรียน'
                      }
                    </span>
                  </div>
                  {formData.allowLateCheck && (
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">
                        อนุญาตเช็คชื่อสาย {formData.lateThreshold} นาที
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">💡 เคล็ดลับ</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• ตั้งเวลาเริ่มก่อนเวลาเรียน 5-10 นาที</li>
                <li>• ใช้หัวข้อที่อธิบายบทเรียนชัดเจน</li>
                <li>• อนุญาตเช็คชื่อสายสำหรับยามฉุกเฉิน</li>
                <li>• ตรวจสอบรายชื่อนักเรียนก่อนเปิด</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-6 border w-full max-w-md shadow-lg rounded-lg bg-white">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">เปิดรอบเช็คชื่อสำเร็จ!</h3>
                <p className="text-sm text-gray-600 mb-4">
                  รอบเช็คชื่อได้ถูกสร้างเรียบร้อยแล้ว นักเรียนสามารถเข้าร่วมเช็คชื่อได้
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-gray-900">รหัสเช็คชื่อ:</p>
                  <p className="text-lg font-mono font-bold text-blue-600">ATT-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}
