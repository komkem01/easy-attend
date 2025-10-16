'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Student {
  id: string
  name: string
  status: 'waiting' | 'present' | 'absent' | 'late' | 'excused'
}

export default function CreateAttendancePage() {
  const [selectedClassroom, setSelectedClassroom] = useState('')
  const [attendanceType, setAttendanceType] = useState('button') // button, qr, code
  const [sessionCode, setSessionCode] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [attendanceList, setAttendanceList] = useState<Student[]>([])
  
  const classrooms = [
    { id: '1', name: 'คณิตศาสตร์ ม.6/1', studentCount: 32 },
    { id: '2', name: 'ฟิสิกส์ ม.5/2', studentCount: 28 }
  ]

  // Generate random session code
  const generateSessionCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const startAttendanceSession = () => {
    if (!selectedClassroom) return
    
    const code = generateSessionCode()
    setSessionCode(code)
    setIsActive(true)
    
    // Initialize attendance list
    setAttendanceList([
      { id: '1', name: 'นาย ก ใจดี', status: 'waiting' },
      { id: '2', name: 'นาง ข สบาย', status: 'present' },
      { id: '3', name: 'นางสาว ค มั่นใจ', status: 'waiting' },
      // ... more students
    ])
  }

  const endAttendanceSession = () => {
    setIsActive(false)
  }

  const updateStudentStatus = (studentId: string, status: Student['status']) => {
    setAttendanceList(prev => 
      prev.map(student => 
        student.id === studentId ? { ...student, status } : student
      )
    )
  }

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'present': return 'bg-green-100 text-green-800 border-green-200'
      case 'absent': return 'bg-red-100 text-red-800 border-red-200'
      case 'late': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'excused': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: Student['status']) => {
    switch (status) {
      case 'present': return 'มา'
      case 'absent': return 'ขาด'
      case 'late': return 'สาย'
      case 'excused': return 'ลา'
      default: return 'รอเช็คชื่อ'
    }
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
              <h1 className="text-xl font-bold text-gray-900">
                {isActive ? 'กำลังเช็คชื่อ' : 'เปิดรอบเช็คชื่อ'}
              </h1>
            </div>
            {isActive && (
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  ● กำลังดำเนินการ
                </div>
                <button
                  onClick={endAttendanceSession}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  ปิดรอบเช็คชื่อ
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isActive ? (
          // Setup Form
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">ตั้งค่ารอบเช็คชื่อใหม่</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    เลือกห้องเรียน
                  </label>
                  <select
                    value={selectedClassroom}
                    onChange={(e) => setSelectedClassroom(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  >
                    <option value="">-- เลือกห้องเรียน --</option>
                    {classrooms.map(classroom => (
                      <option key={classroom.id} value={classroom.id}>
                        {classroom.name} ({classroom.studentCount} คน)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    วิธีการเช็คชื่อ
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div 
                      onClick={() => setAttendanceType('button')}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        attendanceType === 'button' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-2xl mb-2 block">👆</span>
                        <h3 className="font-medium text-gray-900">กดปุ่ม</h3>
                        <p className="text-sm text-gray-500">นักเรียนกดปุ่มเช็คชื่อ</p>
                      </div>
                    </div>

                    <div 
                      onClick={() => setAttendanceType('qr')}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        attendanceType === 'qr' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-2xl mb-2 block">📱</span>
                        <h3 className="font-medium text-gray-900">QR Code</h3>
                        <p className="text-sm text-gray-500">สแกน QR Code</p>
                      </div>
                    </div>

                    <div 
                      onClick={() => setAttendanceType('code')}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        attendanceType === 'code' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <span className="text-2xl mb-2 block">🔢</span>
                        <h3 className="font-medium text-gray-900">รหัส</h3>
                        <p className="text-sm text-gray-500">ป้อนรหัสเช็คชื่อ</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={startAttendanceSession}
                  disabled={!selectedClassroom}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium text-lg transition-colors"
                >
                  เริ่มรอบเช็คชื่อ
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Active Session
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Session Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">ข้อมูลรอบเช็คชื่อ</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500">ห้องเรียน</label>
                    <p className="font-medium text-gray-900">
                      {classrooms.find(c => c.id === selectedClassroom)?.name}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500">วิธีการ</label>
                    <p className="font-medium text-gray-900">
                      {attendanceType === 'button' && 'กดปุ่มเช็คชื่อ'}
                      {attendanceType === 'qr' && 'สแกน QR Code'}
                      {attendanceType === 'code' && 'ป้อนรหัส'}
                    </p>
                  </div>

                  {attendanceType === 'code' && (
                    <div>
                      <label className="text-sm text-gray-500">รหัสเช็คชื่อ</label>
                      <div className="bg-gray-100 p-3 rounded-lg text-center">
                        <span className="text-2xl font-bold text-blue-600">{sessionCode}</span>
                      </div>
                    </div>
                  )}

                  {attendanceType === 'qr' && (
                    <div>
                      <label className="text-sm text-gray-500">QR Code</label>
                      <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <div className="w-32 h-32 bg-gray-300 mx-auto rounded-lg flex items-center justify-center">
                          <span className="text-gray-500">QR Code</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {attendanceList.filter(s => s.status === 'present').length}
                        </div>
                        <div className="text-sm text-gray-500">เช็คชื่อแล้ว</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-400">
                          {attendanceList.filter(s => s.status === 'waiting').length}
                        </div>
                        <div className="text-sm text-gray-500">รอเช็คชื่อ</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Student List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">รายชื่อนักเรียน</h3>
                
                <div className="space-y-3">
                  {attendanceList.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {student.name.charAt(3)}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{student.name}</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(student.status)}`}>
                          {getStatusText(student.status)}
                        </span>
                        
                        {student.status === 'waiting' && (
                          <div className="flex space-x-1">
                            <button
                              onClick={() => updateStudentStatus(student.id, 'present')}
                              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs transition-colors"
                            >
                              มา
                            </button>
                            <button
                              onClick={() => updateStudentStatus(student.id, 'absent')}
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                            >
                              ขาด
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}