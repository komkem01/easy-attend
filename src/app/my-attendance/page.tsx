'use client'

import { useState } from 'react'
import Link from 'next/link'
import TeacherLayout from '@/components/TeacherLayout'

export default function MyAttendancePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('this-month')
  const [selectedClassroom, setSelectedClassroom] = useState('all')

  // Mock data - จริงๆ จะ fetch จาก API
  const classrooms = [
    { id: '1', name: 'คณิตศาสตร์ ม.6/1' },
    { id: '2', name: 'ฟิสิกส์ ม.5/2' },
    { id: '3', name: 'เคมี ม.6/1' }
  ]

  const attendanceHistory = [
    {
      id: '1',
      date: '2024-10-16',
      classroomName: 'คณิตศาสตร์ ม.6/1',
      teacherName: 'อาจารย์สมชาย ใจดี',
      status: 'present',
      checkTime: '14:35',
      sessionTime: '14:30-16:00'
    },
    {
      id: '2',
      date: '2024-10-15', 
      classroomName: 'ฟิสิกส์ ม.5/2',
      teacherName: 'อาจารย์สมหญิง เก่งกาจ',
      status: 'late',
      checkTime: '15:45',
      sessionTime: '15:30-17:00'
    },
    {
      id: '3',
      date: '2024-10-15',
      classroomName: 'คณิตศาสตร์ ม.6/1',
      teacherName: 'อาจารย์สมชาย ใจดี',
      status: 'present',
      checkTime: '14:32',
      sessionTime: '14:30-16:00'
    },
    {
      id: '4',
      date: '2024-10-14',
      classroomName: 'เคมี ม.6/1',
      teacherName: 'อาจารย์สมศรี รู้จริง',
      status: 'absent',
      checkTime: null,
      sessionTime: '13:00-14:30'
    },
    {
      id: '5',
      date: '2024-10-14',
      classroomName: 'คณิตศาสตร์ ม.6/1',
      teacherName: 'อาจารย์สมชาย ใจดี',
      status: 'excused',
      checkTime: null,
      sessionTime: '14:30-16:00'
    }
  ]

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'present':
        return { text: 'มา', color: 'bg-green-100 text-green-800 border-green-200', icon: '✓' }
      case 'late':
        return { text: 'สาย', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '⏰' }
      case 'absent':
        return { text: 'ขาด', color: 'bg-red-100 text-red-800 border-red-200', icon: '✗' }
      case 'excused':
        return { text: 'ลา', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: '📄' }
      default:
        return { text: 'ไม่ทราบ', color: 'bg-gray-100 text-gray-800 border-gray-200', icon: '?' }
    }
  }

  // Filter attendance based on selected filters
  const filteredAttendance = attendanceHistory.filter(record => {
    if (selectedClassroom !== 'all' && record.classroomName !== classrooms.find(c => c.id === selectedClassroom)?.name) {
      return false
    }
    // Add period filtering logic here
    return true
  })

  // Calculate statistics
  const totalSessions = filteredAttendance.length
  const presentCount = filteredAttendance.filter(r => r.status === 'present').length
  const lateCount = filteredAttendance.filter(r => r.status === 'late').length
  const absentCount = filteredAttendance.filter(r => r.status === 'absent').length
  const excusedCount = filteredAttendance.filter(r => r.status === 'excused').length
  const attendanceRate = totalSessions > 0 ? Math.round(((presentCount + lateCount + excusedCount) / totalSessions) * 100) : 0

  return (
    <TeacherLayout 
      title="ประวัติการเข้าเรียน" 
      subtitle="ดูประวัติการเข้าเรียนของคุณ"
      activeMenuItem="my-attendance"
    >
      <div className="max-w-7xl mx-auto">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-600">{presentCount}</div>
            <div className="text-xs sm:text-sm text-gray-500">มา</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{lateCount}</div>
            <div className="text-xs sm:text-sm text-gray-500">สาย</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-red-600">{absentCount}</div>
            <div className="text-xs sm:text-sm text-gray-500">ขาด</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">{attendanceRate}%</div>
            <div className="text-xs sm:text-sm text-gray-500">อัตราเข้าเรียน</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                ช่วงเวลา
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm sm:text-base"
              >
                <option value="this-week">สัปดาห์นี้</option>
                <option value="this-month">เดือนนี้</option>
                <option value="last-month">เดือนที่แล้ว</option>
                <option value="this-semester">ภาคเรียนนี้</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                วิชา
              </label>
              <select
                value={selectedClassroom}
                onChange={(e) => setSelectedClassroom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm sm:text-base"
              >
                <option value="all">ทุกวิชา</option>
                {classrooms.map(classroom => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">ประวัติการเช็คชื่อ</h2>
          
          {filteredAttendance.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-gray-400">📋</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีข้อมูลการเช็คชื่อ</h3>
              <p className="text-gray-500">ยังไม่มีประวัติการเช็คชื่อในช่วงเวลาที่เลือก</p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {filteredAttendance.map((record) => {
                const statusInfo = getStatusInfo(record.status)
                return (
                  <div key={record.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-blue-300 transition-colors">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                      <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900">{record.classroomName}</h3>
                          <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border flex items-center space-x-1 ${statusInfo.color} w-fit`}>
                            <span>{statusInfo.icon}</span>
                            <span>{statusInfo.text}</span>
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600">{record.teacherName}</p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 mt-2 text-xs sm:text-sm text-gray-500">
                          <span>📅 {new Date(record.date).toLocaleDateString('th-TH')}</span>
                          <span>🕐 {record.sessionTime}</span>
                          {record.checkTime && (
                            <span>✅ เช็คชื่อเมื่อ {record.checkTime}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">📊 สรุปสถิติ</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-blue-800">จำนวนคาบทั้งหมด:</span>
              <span className="ml-2 font-semibold">{totalSessions} คาบ</span>
            </div>
            <div>
              <span className="text-blue-800">เข้าเรียนตรงเวลา:</span>
              <span className="ml-2 font-semibold text-green-600">{presentCount} คาบ</span>
            </div>
            <div>
              <span className="text-blue-800">เข้าเรียนสาย:</span>
              <span className="ml-2 font-semibold text-yellow-600">{lateCount} คาบ</span>
            </div>
            <div>
              <span className="text-blue-800">อัตราการเข้าเรียน:</span>
              <span className="ml-2 font-semibold text-blue-600">{attendanceRate}%</span>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
}