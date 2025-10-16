'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ClassroomsPage() {
  const [classrooms] = useState([
    {
      id: '1',
      name: 'คณิตศาสตร์ ม.6/1',
      code: 'MATH601',
      studentCount: 32,
      createdAt: '2024-10-01'
    },
    {
      id: '2', 
      name: 'ฟิสิกส์ ม.5/2',
      code: 'PHY502',
      studentCount: 28,
      createdAt: '2024-10-05'
    }
  ])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newClassroom, setNewClassroom] = useState({
    name: '',
    subject: '',
    grade: '',
    section: ''
  })

  const handleCreateClassroom = () => {
    // Logic การสร้างห้องเรียนใหม่
    console.log('Creating classroom:', newClassroom)
    setShowCreateForm(false)
    setNewClassroom({ name: '', subject: '', grade: '', section: '' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
                ← กลับสู่หน้าหลัก
              </Link>
              <h1 className="text-xl font-bold text-gray-900">จัดการห้องเรียน</h1>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              + สร้างห้องเรียนใหม่
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Classroom Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <div key={classroom.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{classroom.name}</h3>
                  <p className="text-sm text-gray-500">รหัสห้อง: {classroom.code}</p>
                </div>
                <div className="text-right">
                  <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {classroom.studentCount} คน
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link 
                  href={`/classrooms/${classroom.id}/attendance`}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-center block transition-colors"
                >
                  เปิดเช็คชื่อ
                </Link>
                
                <div className="flex space-x-2">
                  <Link 
                    href={`/classrooms/${classroom.id}/students`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-center text-sm transition-colors"
                  >
                    จัดการนักเรียน
                  </Link>
                  <Link 
                    href={`/classrooms/${classroom.id}/reports`}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-3 rounded-lg text-center text-sm transition-colors"
                  >
                    รายงาน
                  </Link>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  สร้างเมื่อ: {new Date(classroom.createdAt).toLocaleDateString('th-TH')}
                </p>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {classrooms.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-gray-400">🏛️</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">ยังไม่มีห้องเรียน</h3>
              <p className="text-gray-500 mb-4">เริ่มต้นด้วยการสร้างห้องเรียนแรกของคุณ</p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                สร้างห้องเรียนใหม่
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Create Classroom Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">สร้างห้องเรียนใหม่</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  วิชา
                </label>
                <input
                  type="text"
                  value={newClassroom.subject}
                  onChange={(e) => setNewClassroom({...newClassroom, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="เช่น คณิตศาสตร์"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ชั้น
                  </label>
                  <select
                    value={newClassroom.grade}
                    onChange={(e) => setNewClassroom({...newClassroom, grade: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">เลือกชั้น</option>
                    <option value="ม.1">ม.1</option>
                    <option value="ม.2">ม.2</option>
                    <option value="ม.3">ม.3</option>
                    <option value="ม.4">ม.4</option>
                    <option value="ม.5">ม.5</option>
                    <option value="ม.6">ม.6</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ห้อง
                  </label>
                  <input
                    type="text"
                    value={newClassroom.section}
                    onChange={(e) => setNewClassroom({...newClassroom, section: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="เช่น 1, 2, 3"
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleCreateClassroom}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                สร้าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}