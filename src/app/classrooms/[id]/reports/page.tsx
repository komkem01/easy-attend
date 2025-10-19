'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ClassroomReportsPage() {
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

  const [dateRange, setDateRange] = useState('this-month') // this-week, this-month, last-month, custom
  const [reportType, setReportType] = useState('overview') // overview, detailed, individual
  const [viewMode, setViewMode] = useState('cards') // cards, table, chart
  const [selectedMetric, setSelectedMetric] = useState('attendance') // attendance, punctuality, trends
  
  // Export notification states
  const [exportStatus, setExportStatus] = useState<{
    isExporting: boolean
    format: string
    progress: number
    success: boolean
    error: string | null
    currentMessage: string
  }>({
    isExporting: false,
    format: '',
    progress: 0,
    success: false,
    error: null,
    currentMessage: ''
  })

  // Mock attendance data
  const [attendanceStats] = useState({
    totalSessions: 24,
    averageAttendance: 87.5,
    onTimeRate: 92.3,
    lateRate: 5.2,
    absentRate: 2.5,
    bestAttendanceDay: 'จันทร์',
    worstAttendanceDay: 'ศุกร์'
  })

  const [dailyStats] = useState([
    { date: '2024-10-14', present: 30, late: 2, absent: 0, rate: 100 },
    { date: '2024-10-15', present: 28, late: 3, absent: 1, rate: 96.9 },
    { date: '2024-10-16', present: 29, late: 1, absent: 2, rate: 93.8 },
    { date: '2024-10-17', present: 31, late: 1, absent: 0, rate: 100 },
  ])

  const [studentStats] = useState([
    { id: '1', name: 'นาย ก ใจดี', present: 22, late: 1, absent: 1, rate: 95.8, trend: 'up' },
    { id: '2', name: 'นาง ข สบาย', present: 21, late: 2, absent: 1, rate: 91.7, trend: 'stable' },
    { id: '3', name: 'นางสาว ค มั่นใจ', present: 19, late: 3, absent: 2, rate: 83.3, trend: 'down' },
    { id: '4', name: 'นาย ง รู้จริง', present: 23, late: 1, absent: 0, rate: 100, trend: 'up' },
    { id: '5', name: 'นางสาว จ เก่งกาจ', present: 20, late: 2, absent: 2, rate: 87.5, trend: 'stable' },
  ])

  const [attendanceData] = useState([
    { id: '1', name: 'นาย ก ใจดี', studentId: 'STD001', present: 22, late: 1, absent: 1, attendanceRate: 95.8 },
    { id: '2', name: 'นาง ข สบาย', studentId: 'STD002', present: 21, late: 2, absent: 1, attendanceRate: 91.7 },
    { id: '3', name: 'นางสาว ค มั่นใจ', studentId: 'STD003', present: 19, late: 3, absent: 2, attendanceRate: 83.3 },
    { id: '4', name: 'นาย ง รู้จริง', studentId: 'STD004', present: 23, late: 1, absent: 0, attendanceRate: 100 },
    { id: '5', name: 'นางสาว จ เก่งกาจ', studentId: 'STD005', present: 20, late: 2, absent: 2, attendanceRate: 87.5 },
    { id: '6', name: 'นาย ฉ เรียนดี', studentId: 'STD006', present: 18, late: 4, absent: 2, attendanceRate: 83.3 },
  ])

  const [weeklyPattern] = useState([
    { day: 'จันทร์', average: 95.2, sessions: 4 },
    { day: 'อังคาร', average: 89.3, sessions: 4 },
    { day: 'พุธ', average: 87.1, sessions: 4 },
    { day: 'พฤหัสบดี', average: 85.7, sessions: 4 },
    { day: 'ศุกร์', average: 82.9, sessions: 4 },
  ])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈'
      case 'down': return '📉'
      case 'stable': return '➡️'
      default: return '➡️'
    }
  }

  const getAttendanceColor = (rate: number) => {
    if (rate >= 95) return 'text-green-600 bg-green-100'
    if (rate >= 90) return 'text-blue-600 bg-blue-100'
    if (rate >= 80) return 'text-yellow-600 bg-yellow-100'
    if (rate >= 70) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const exportReport = async (format: 'excel' | 'pdf') => {
    // Reset previous state
    setExportStatus({
      isExporting: true,
      format: format.toUpperCase(),
      progress: 0,
      success: false,
      error: null,
      currentMessage: 'กำลังเริ่มต้น...'
    })

    try {
      // Simulate export process with progress
      const steps = format === 'excel' ? [
        { progress: 15, message: 'กำลังเตรียมข้อมูลการเข้าเรียน...' },
        { progress: 35, message: 'กำลังสร้างตาราง Excel...' },
        { progress: 55, message: 'กำลังจัดรูปแบบเซลล์...' },
        { progress: 75, message: 'กำลังเพิ่มกราฟและแผนภูมิ...' },
        { progress: 90, message: 'กำลังบันทึกไฟล์ Excel...' },
        { progress: 100, message: 'สร้างไฟล์ Excel เสร็จสิ้น! 📊' }
      ] : [
        { progress: 20, message: 'กำลังเตรียมเลย์เอาต์ PDF...' },
        { progress: 40, message: 'กำลังสร้างหน้ารายงาน...' },
        { progress: 60, message: 'กำลังเพิ่มกราฟและตาราง...' },
        { progress: 80, message: 'กำลังจัดรูปแบบ PDF...' },
        { progress: 100, message: 'สร้างไฟล์ PDF เสร็จสิ้น! 📄' }
      ]

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 800))
        setExportStatus(prev => ({
          ...prev,
          progress: step.progress,
          currentMessage: step.message
        }))
      }

      // Simulate successful export
      setExportStatus(prev => ({
        ...prev,
        isExporting: false,
        success: true,
        currentMessage: `ส่งออกรายงาน ${format.toUpperCase()} สำเร็จ!`
      }))

      // Auto hide success notification after 5 seconds
      setTimeout(() => {
        setExportStatus(prev => ({
          ...prev,
          success: false,
          currentMessage: ''
        }))
      }, 5000)

    } catch (error) {
      setExportStatus(prev => ({
        ...prev,
        isExporting: false,
        error: 'เกิดข้อผิดพลาดในการส่งออกรายงาน กรุณาลองใหม่อีกครั้ง',
        currentMessage: 'เกิดข้อผิดพลาด'
      }))

      // Auto hide error notification after 5 seconds
      setTimeout(() => {
        setExportStatus(prev => ({
          ...prev,
          error: null,
          currentMessage: ''
        }))
      }, 5000)
    }
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
                <h1 className="text-xl font-bold text-gray-900">รายงานการเข้าเรียน</h1>
                <p className="text-sm text-gray-500">{classroom.name} - {classroom.teacherName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => exportReport('excel')}
                disabled={exportStatus.isExporting}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                {exportStatus.isExporting && exportStatus.format === 'EXCEL' ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>กำลังส่งออก...</span>
                  </>
                ) : (
                  <>
                    <span>📊</span>
                    <span>Excel</span>
                  </>
                )}
              </button>
              <button
                onClick={() => exportReport('pdf')}
                disabled={exportStatus.isExporting}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                {exportStatus.isExporting && exportStatus.format === 'PDF' ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>กำลังส่งออก...</span>
                  </>
                ) : (
                  <>
                    <span>📄</span>
                    <span>PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Filter Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="grid md:grid-cols-3 gap-4 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📅 ช่วงเวลา
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                >
                  <option value="this-week">สัปดาห์นี้</option>
                  <option value="this-month">เดือนนี้</option>
                  <option value="last-month">เดือนที่แล้ว</option>
                  <option value="this-semester">ภาคเรียนนี้</option>
                  <option value="custom">กำหนดเอง</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📊 ประเภทรายงาน
                </label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                >
                  <option value="overview">ภาพรวม</option>
                  <option value="detailed">รายละเอียด</option>
                  <option value="individual">รายบุคคล</option>
                  <option value="comparative">เปรียบเทียบ</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  📈 ตัวชี้วัด
                </label>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                >
                  <option value="attendance">การเข้าเรียน</option>
                  <option value="punctuality">ความตรงต่อเวลา</option>
                  <option value="trends">แนวโน้ม</option>
                  <option value="patterns">รูปแบบ</option>
                </select>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                👁️ รูปแบบการแสดงผล
              </label>
              <div className="flex bg-gray-100 rounded-lg p-1">
                {[
                  { key: 'cards', icon: '📋', label: 'การ์ด' },
                  { key: 'table', icon: '📊', label: 'ตาราง' },
                  { key: 'chart', icon: '📈', label: 'กราฟ' }
                ].map((mode) => (
                  <button
                    key={mode.key}
                    onClick={() => setViewMode(mode.key)}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === mode.key
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span className="mr-1">{mode.icon}</span>
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="text-4xl font-bold mb-2">{attendanceStats.totalSessions}</div>
              <div className="text-blue-100 text-sm">คาบเรียนทั้งหมด</div>
              <div className="mt-2 text-xs text-blue-200">📚 ภาคเรียนนี้</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="text-4xl font-bold mb-2">{attendanceStats.averageAttendance}%</div>
              <div className="text-green-100 text-sm">อัตราเข้าเรียนเฉลี่ย</div>
              <div className="mt-2 text-xs text-green-200">📊 ระดับดีเยี่ยม</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="text-4xl font-bold mb-2">{attendanceStats.onTimeRate}%</div>
              <div className="text-purple-100 text-sm">เข้าเรียนตรงเวลา</div>
              <div className="mt-2 text-xs text-purple-200">⏰ ความตรงต่อเวลา</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="text-4xl font-bold mb-2">{attendanceStats.lateRate}%</div>
              <div className="text-orange-100 text-sm">เข้าเรียนสาย</div>
              <div className="mt-2 text-xs text-orange-200">🚶‍♂️ ควรปรับปรุง</div>
            </div>
          </div>
        </div>

        {/* Quick Insights Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🔍</span>
            ข้อมูลเชิงลึกเร็ว
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-green-600">📈</span>
                <span className="font-medium text-green-800">วันที่ดีที่สุด</span>
              </div>
              <p className="text-sm text-green-700">
                วัน{attendanceStats.bestAttendanceDay} มีการเข้าเรียนดีที่สุด
              </p>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-yellow-600">⚠️</span>
                <span className="font-medium text-yellow-800">จุดที่ต้องปรับปรุง</span>
              </div>
              <p className="text-sm text-yellow-700">
                วัน{attendanceStats.worstAttendanceDay} ควรให้ความสนใจเพิ่มเติม
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-blue-600">💡</span>
                <span className="font-medium text-blue-800">คำแนะนำ</span>
              </div>
              <p className="text-sm text-blue-700">
                อัตราเข้าเรียนอยู่ในระดับดี ควรรักษาไว้
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Charts & Analytics Section */}
        {viewMode === 'chart' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <span className="mr-2">📊</span>
              กราฟแสดงผลการเข้าเรียน
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Attendance Trend Chart */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">📈</span>
                  แนวโน้มการเข้าเรียน (7 วันล่าสุด)
                </h4>
                <div className="h-48 flex items-end justify-center space-x-2">
                  {[85, 92, 78, 95, 88, 90, 87].map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="bg-blue-500 rounded-t w-8 min-h-[4px]"
                        style={{ height: `${(value / 100) * 120}px` }}
                      ></div>
                      <div className="text-xs text-gray-600 mt-2 text-center">
                        {['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'][index]}
                      </div>
                      <div className="text-xs font-medium text-gray-800">
                        {value}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attendance Distribution */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-4 flex items-center">
                  <span className="mr-2">🎯</span>
                  การกระจายตัวของการเข้าเรียน
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      เข้าเรียนตรงเวลา
                    </span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      เข้าเรียนสาย
                    </span>
                    <span className="font-medium">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      ขาดเรียน
                    </span>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Student Performance Cards */}
        {viewMode === 'cards' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                <span className="mr-2">🏆</span>
                ผลงานนักเรียนแบบการ์ด
              </h3>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white">
                <option>เรียงตามคะแนน</option>
                <option>เรียงตามชื่อ</option>
                <option>เรียงตามการเข้าเรียน</option>
              </select>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {attendanceData.map((student) => (
                <div key={student.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{student.name}</div>
                      <div className="text-sm text-gray-500">{student.studentId}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">การเข้าเรียน</span>
                      <span className="font-medium">{student.attendanceRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          student.attendanceRate >= 80 ? 'bg-green-500' :
                          student.attendanceRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${student.attendanceRate}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>เข้า: {student.present}</span>
                      <span>สาย: {student.late}</span>
                      <span>ขาด: {student.absent}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Daily Attendance Section (Table View) */}
        {viewMode === 'table' && (
          <>
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">การเข้าเรียนรายวัน</h3>
            <div className="space-y-3">
              {dailyStats.map((day, index) => (
                <div key={day.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {new Date(day.date).toLocaleDateString('th-TH', { 
                          weekday: 'long', 
                          day: 'numeric',
                          month: 'short'
                        })}
                      </div>
                      <div className="text-sm text-gray-500">
                        มา {day.present} | สาย {day.late} | ขาด {day.absent}
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAttendanceColor(day.rate)}`}>
                    {day.rate}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Pattern */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">รูปแบบการเข้าเรียนตามวัน</h3>
            <div className="space-y-3">
              {weeklyPattern.map((day) => (
                <div key={day.day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-white">
                        {day.day.substring(0, 1)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{day.day}</div>
                      <div className="text-sm text-gray-500">{day.sessions} คาบ</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAttendanceColor(day.average)}`}>
                      {day.average}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${day.average}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Student Performance Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900">ผลการเข้าเรียนรายนักเรียน</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    อันดับ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    นักเรียน
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    มา
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สาย
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ขาด
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    อัตราเข้าเรียน
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    แนวโน้ม
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentStats
                  .sort((a, b) => b.rate - a.rate)
                  .map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-green-600 font-medium">{student.present}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-yellow-600 font-medium">{student.late}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-red-600 font-medium">{student.absent}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAttendanceColor(student.rate)}`}>
                        {student.rate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        <span>{getTrendIcon(student.trend)}</span>
                        <span className={`text-xs ${
                          student.trend === 'up' ? 'text-green-600' :
                          student.trend === 'down' ? 'text-red-600' :
                          'text-gray-600'
                        }`}>
                          {student.trend === 'up' ? 'ดีขึ้น' :
                           student.trend === 'down' ? 'แย่ลง' : 'คงที่'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}

        {/* Summary Insights - Always visible */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-4">📊 สรุปและข้อเสนอแนะ</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-blue-800">
            <div>
              <h4 className="font-semibold mb-2">📈 จุดแข็ง</h4>
              <ul className="space-y-1">
                <li>• อัตราการเข้าเรียนโดยรวมอยู่ในระดับดี ({attendanceStats.averageAttendance}%)</li>
                <li>• นักเรียนส่วนใหญ่เข้าเรียนตรงเวลา ({attendanceStats.onTimeRate}%)</li>
                <li>• วัน{attendanceStats.bestAttendanceDay}มีการเข้าเรียนดีที่สุด</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">⚠️ จุดที่ควรปรับปรุง</h4>
              <ul className="space-y-1">
                <li>• ควรติดตามนักเรียนที่มีอัตราการเข้าเรียนต่ำกว่า 80%</li>
                <li>• วัน{attendanceStats.worstAttendanceDay}มีการเข้าเรียนต่ำสุด ควรหาสาเหตุ</li>
                <li>• สร้างแรงจูงใจเพื่อลดอัตราการขาดเรียน</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Export Progress Modal */}
      {exportStatus.isExporting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                กำลังส่งออกรายงาน {exportStatus.format}
              </h3>
              
              <p className="text-gray-600 mb-2">
                {exportStatus.currentMessage}
              </p>
              
              <p className="text-sm text-gray-500 mb-6">
                กรุณารอสักครู่ ระบบกำลังประมวลผลข้อมูล
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${exportStatus.progress}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm text-gray-500">
                <span>ความคืบหน้า</span>
                <span>{exportStatus.progress}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {exportStatus.success && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-500">
          <div className="bg-white border-l-4 border-green-500 rounded-lg shadow-lg p-4 max-w-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">ส่งออกรายงานสำเร็จ!</h4>
                <p className="text-sm text-gray-500">
                  รายงาน {exportStatus.format} ถูกส่งออกเรียบร้อยแล้ว
                </p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => setExportStatus(prev => ({ ...prev, success: false, currentMessage: '' }))}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {exportStatus.error && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-500">
          <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-lg p-4 max-w-md">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-medium text-gray-900">เกิดข้อผิดพลาด!</h4>
                <p className="text-sm text-gray-500">{exportStatus.error}</p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={() => setExportStatus(prev => ({ ...prev, error: null, currentMessage: '' }))}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification - Alternative Style */}
      {(exportStatus.success || exportStatus.error) && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className={`
            px-6 py-3 rounded-full shadow-lg transition-all duration-500 transform
            ${exportStatus.success 
              ? 'bg-green-500 text-white animate-bounce' 
              : 'bg-red-500 text-white animate-pulse'
            }
          `}>
            <div className="flex items-center space-x-2">
              {exportStatus.success ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">ส่งออกรายงาน {exportStatus.format} สำเร็จ! 🎉</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">ส่งออกรายงานล้มเหลว ❌</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}