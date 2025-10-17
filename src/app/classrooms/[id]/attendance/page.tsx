'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ClassroomAttendancePage() {
  const params = useParams()
  const classroomId = params.id as string

  // Mock data - จริงๆ จะ fetch จาก API
  const [classroom] = useState({
    id: classroomId,
    name: 'คณิตศาสตร์ ม.6/1',
    code: 'MATH601',
    subject: 'คณิตศาสตร์',
    grade: 'ม.6',
    section: '1',
    teacherName: 'อาจารย์สมชาย ใจดี',
    studentCount: 32
  })

  const [activeSession, setActiveSession] = useState({
    id: '1',
    startTime: '2024-10-17T14:30:00',
    endTime: null as string | null,
    method: 'code',
    sessionCode: 'ABC123',
    isActive: true
  })

  const [attendanceData, setAttendanceData] = useState([
    { id: '1', studentId: 'S001', name: 'นาย ก ใจดี', status: 'present', checkTime: '14:32:15', seatNumber: '1' },
    { id: '2', studentId: 'S002', name: 'นาง ข สบาย', status: 'present', checkTime: '14:31:45', seatNumber: '2' },
    { id: '3', studentId: 'S003', name: 'นางสาว ค มั่นใจ', status: 'late', checkTime: '14:45:20', seatNumber: '3' },
    { id: '4', studentId: 'S004', name: 'นาย ง รู้จริง', status: 'waiting', checkTime: null, seatNumber: '4' },
    { id: '5', studentId: 'S005', name: 'นางสาว จ เก่งกาจ', status: 'waiting', checkTime: null, seatNumber: '5' },
    { id: '6', studentId: 'S006', name: 'นาย ฉ ขยัน', status: 'present', checkTime: '14:33:10', seatNumber: '6' },
    // ... more students
  ])

  const [filter, setFilter] = useState('all') // all, present, waiting, late, absent
  const [autoRefresh, setAutoRefresh] = useState(true)

  // Auto refresh every 5 seconds when active
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (autoRefresh && activeSession.isActive) {
      interval = setInterval(() => {
        // Simulate real-time updates
        console.log('Refreshing attendance data...')
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [autoRefresh, activeSession.isActive])

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'present':
        return { 
          text: 'มา', 
          color: 'bg-green-100 text-green-800 border-green-200', 
          icon: '✅',
          count: attendanceData.filter(s => s.status === 'present').length
        }
      case 'late':
        return { 
          text: 'สาย', 
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
          icon: '⏰',
          count: attendanceData.filter(s => s.status === 'late').length
        }
      case 'absent':
        return { 
          text: 'ขาด', 
          color: 'bg-red-100 text-red-800 border-red-200', 
          icon: '❌',
          count: attendanceData.filter(s => s.status === 'absent').length
        }
      case 'waiting':
        return { 
          text: 'รอเช็คชื่อ', 
          color: 'bg-gray-100 text-gray-800 border-gray-200', 
          icon: '⏳',
          count: attendanceData.filter(s => s.status === 'waiting').length
        }
      default:
        return { text: 'ไม่ทราบ', color: 'bg-gray-100', icon: '?', count: 0 }
    }
  }

  const filteredAttendance = filter === 'all' 
    ? attendanceData 
    : attendanceData.filter(student => student.status === filter)

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('th-TH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const handleEndSession = () => {
    setActiveSession({...activeSession, isActive: false, endTime: new Date().toISOString()})
    setAutoRefresh(false)
  }

  const handleMarkAttendance = (studentId: string, status: 'present' | 'late' | 'absent') => {
    setAttendanceData(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, status, checkTime: new Date().toLocaleTimeString('th-TH') }
          : student
      )
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/classrooms" className="text-blue-600 hover:text-blue-700">
                ← กลับสู่จัดการห้องเรียน
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{classroom.name}</h1>
                <p className="text-sm text-gray-500">การเช็คชื่อ - {classroom.teacherName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {activeSession.isActive ? (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium animate-pulse">
                      ● กำลังเช็คชื่อ
                    </div>
                    <button
                      onClick={() => setAutoRefresh(!autoRefresh)}
                      className={`p-2 rounded-lg transition-colors ${
                        autoRefresh ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                      }`}
                      title="Auto Refresh"
                    >
                      <svg className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                  </div>
                  <button
                    onClick={handleEndSession}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    ปิดการเช็คชื่อ
                  </button>
                </>
              ) : (
                <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  ● เสร็จสิ้นแล้ว
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Session Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">ข้อมูลการเช็คชื่อ</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">เริ่มเมื่อ</label>
                  <p className="font-medium text-gray-900">
                    {formatTime(activeSession.startTime)}
                  </p>
                </div>

                {activeSession.method === 'code' && (
                  <div>
                    <label className="text-sm text-gray-500">รหัสเช็คชื่อ</label>
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <span className="text-2xl font-bold text-blue-600 font-mono">
                        {activeSession.sessionCode}
                      </span>
                    </div>
                  </div>
                )}

                {/* Quick Stats */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-xl font-bold text-green-600">
                        {getStatusInfo('present').count + getStatusInfo('late').count}
                      </div>
                      <div className="text-xs text-green-600">เข้าเรียน</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xl font-bold text-gray-600">
                        {getStatusInfo('waiting').count}
                      </div>
                      <div className="text-xs text-gray-600">รอเช็คชื่อ</div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>ความคืบหน้า</span>
                    <span>{Math.round(((attendanceData.length - getStatusInfo('waiting').count) / attendanceData.length) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${((attendanceData.length - getStatusInfo('waiting').count) / attendanceData.length) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Status Filter */}
            <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'ทั้งหมด', count: attendanceData.length },
                  { key: 'present', label: 'มา', count: getStatusInfo('present').count },
                  { key: 'late', label: 'สาย', count: getStatusInfo('late').count },
                  { key: 'waiting', label: 'รอเช็คชื่อ', count: getStatusInfo('waiting').count },
                  { key: 'absent', label: 'ขาด', count: getStatusInfo('absent').count }
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setFilter(item.key)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === item.key
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {item.label} ({item.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Attendance List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  รายชื่อนักเรียน ({filteredAttendance.length} คน)
                </h3>
                {activeSession.isActive && (
                  <div className="text-sm text-gray-500">
                    อัปเดตล่าสุด: {new Date().toLocaleTimeString('th-TH')}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {filteredAttendance.map((student) => {
                  const statusInfo = getStatusInfo(student.status)
                  return (
                    <div key={student.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {student.seatNumber}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{student.name}</h4>
                          <p className="text-sm text-gray-500">รหัส: {student.studentId}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {student.checkTime && (
                          <span className="text-xs text-gray-500">
                            เช็คชื่อเมื่อ {student.checkTime}
                          </span>
                        )}
                        
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusInfo.color} flex items-center space-x-1`}>
                          <span>{statusInfo.icon}</span>
                          <span>{statusInfo.text}</span>
                        </span>

                        {activeSession.isActive && student.status === 'waiting' && (
                          <div className="flex space-x-1">
                            <button
                              onClick={() => handleMarkAttendance(student.id, 'present')}
                              className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs transition-colors"
                              title="ทำเครื่องหมายมา"
                            >
                              ✓
                            </button>
                            <button
                              onClick={() => handleMarkAttendance(student.id, 'late')}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs transition-colors"
                              title="ทำเครื่องหมายสาย"
                            >
                              ⏰
                            </button>
                            <button
                              onClick={() => handleMarkAttendance(student.id, 'absent')}
                              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                              title="ทำเครื่องหมายขาด"
                            >
                              ✗
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {filteredAttendance.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl text-gray-400">👥</span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีนักเรียนในกลุ่มนี้</h3>
                  <p className="text-gray-500">ลองเปลี่ยนตัวกรองเพื่อดูนักเรียนกลุ่มอื่น</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}