'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState('this-month')
  const [reportType, setReportType] = useState('overview')
  const [selectedSchool, setSelectedSchool] = useState('all')
  const [isExporting, setIsExporting] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState<'excel' | 'pdf'>('excel')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success')

  // Mock data - รอการเชื่อมต่อกับ API จริง
  const [overallStats] = useState({
    totalStudents: 1247,
    totalClasses: 42,
    avgAttendanceRate: 91.5,
    totalSessions: 348,
    bestClass: 'ม.3/1',
    worstClass: 'ม.2/5',
    onTimeRate: 88.2,
    lateRate: 8.3,
    absentRate: 3.5
  })

  const [classroomStats] = useState([
    { id: '1', name: 'ม.1/1', subject: 'คณิตศาสตร์', students: 32, attendanceRate: 95.2, sessions: 24, teacher: 'อ.สมศรี' },
    { id: '2', name: 'ม.1/2', subject: 'ภาษาไทย', students: 30, attendanceRate: 92.8, sessions: 22, teacher: 'อ.วิชัย' },
    { id: '3', name: 'ม.2/1', subject: 'วิทยาศาสตร์', students: 28, attendanceRate: 89.5, sessions: 20, teacher: 'อ.มาลี' },
    { id: '4', name: 'ม.2/2', subject: 'สังคมศึกษา', students: 31, attendanceRate: 87.2, sessions: 18, teacher: 'อ.นิรันดร์' },
    { id: '5', name: 'ม.3/1', subject: 'ฟิสิกส์', students: 26, attendanceRate: 96.8, sessions: 26, teacher: 'อ.ประยุทธ์' },
    { id: '6', name: 'ม.3/2', subject: 'เคมี', students: 29, attendanceRate: 85.1, sessions: 21, teacher: 'อ.อัญชลี' },
  ])

  const [weeklyTrend] = useState([
    { week: 'สัปดาห์ที่ 1', attendance: 93.2 },
    { week: 'สัปดาห์ที่ 2', attendance: 91.8 },
    { week: 'สัปดาห์ที่ 3', attendance: 89.5 },
    { week: 'สัปดาห์ที่ 4', attendance: 92.1 },
  ])

  const getAttendanceColor = (rate: number) => {
    if (rate >= 95) return 'text-green-600 bg-green-100'
    if (rate >= 90) return 'text-blue-600 bg-blue-100'
    if (rate >= 85) return 'text-yellow-600 bg-yellow-100'
    if (rate >= 80) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const getAttendanceBadge = (rate: number) => {
    if (rate >= 95) return { text: 'ดีเยี่ยม', color: 'bg-green-500' }
    if (rate >= 90) return { text: 'ดี', color: 'bg-blue-500' }
    if (rate >= 85) return { text: 'พอใช้', color: 'bg-yellow-500' }
    if (rate >= 80) return { text: 'ต้องปรับปรุง', color: 'bg-orange-500' }
    return { text: 'ต้องแก้ไขด่วน', color: 'bg-red-500' }
  }

  // Export Functions
  const exportReport = async (format: 'excel' | 'pdf') => {
    setIsExporting(true)
    setExportProgress(0)
    setExportFormat(format)
    setShowExportModal(true)


    // Simulate export progress
    const progressSteps = [10, 25, 50, 75, 90, 100]
    for (let i = 0; i < progressSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500))
      setExportProgress(progressSteps[i])
    }

    // Simulate file download
    const fileName = `attendance-report-${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : 'pdf'}`
    
    // Create blob and download
    const blob = new Blob(['Sample report data'], { type: format === 'excel' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : 'application/pdf' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    setTimeout(() => {
      setIsExporting(false)
      setShowExportModal(false)
      setExportProgress(0)
      showNotification(`รายงานถูกส่งออกเป็น ${format.toUpperCase()} เรียบร้อยแล้ว! 📁`, 'success')
    }, 1000)
  }

  // Refresh Data
  const refreshData = async () => {
    setIsRefreshing(true)
    
    // Show loading toast
    showNotification('กำลังรีเฟรชข้อมูล...', 'info')
    
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsRefreshing(false)
    
    // Show success toast
    showNotification('ข้อมูลได้รับการอัปเดตเรียบร้อยแล้ว! 🎉', 'success')
  }

  // Toast notification function
  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  // Export individual classroom
  const exportClassroomReport = async (classroomId: string, classroomName: string) => {
    setIsExporting(true)
    
    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const fileName = `${classroomName}-report-${new Date().toISOString().split('T')[0]}.xlsx`
    const blob = new Blob(['Classroom report data'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
    
    setIsExporting(false)
    showNotification(`รายงานห้อง ${classroomName} ถูกส่งออกเรียบร้อยแล้ว! 📊`, 'success')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/dashboard" className="text-blue-600 hover:text-blue-700 mb-3 inline-block">
                ← กลับสู่หน้าหลัก
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                📊 รายงานระบบเช็คชื่อ
              </h1>
              <p className="text-gray-600">
                ภาพรวมการเข้าเรียนของทุกห้องเรียนในระบบ
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => exportReport('excel')}
                disabled={isExporting}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    กำลังส่งออก...
                  </>
                ) : (
                  <>📥 ส่งออกรายงาน</>
                )}
              </button>
              <button 
                onClick={refreshData}
                disabled={isRefreshing}
                className="bg-white hover:bg-gray-50 disabled:opacity-50 text-gray-700 px-6 py-2 rounded-lg font-medium border border-gray-300 transition-colors flex items-center"
              >
                {isRefreshing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-2"></div>
                    กำลังรีเฟรช...
                  </>
                ) : (
                  <>🔄 รีเฟรช</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">🎛️</span>
            ตัวกรองข้อมูล
            <span className="text-xs text-gray-500 ml-2">
              ({timeRange}, {reportType}, {selectedSchool})
            </span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📅 ช่วงเวลา
              </label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                style={{ 
                  color: '#1f2937',
                  backgroundColor: '#ffffff',
                  fontSize: '14px'
                }}
              >
                <option value="today">วันนี้</option>
                <option value="this-week">สัปดาห์นี้</option>
                <option value="this-month">เดือนนี้</option>
                <option value="last-month">เดือนที่แล้ว</option>
                <option value="this-semester">ภาคเรียนนี้</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📋 ประเภทรายงาน
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                style={{ 
                  color: '#1f2937',
                  backgroundColor: '#ffffff',
                  fontSize: '14px'
                }}
              >
                <option value="overview">ภาพรวม</option>
                <option value="attendance">การเข้าเรียน</option>
                <option value="performance">ผลงาน</option>
                <option value="comparison">เปรียบเทียบ</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏫 โรงเรียน/แผนก
              </label>
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 font-medium"
                style={{ 
                  color: '#1f2937',
                  backgroundColor: '#ffffff',
                  fontSize: '14px'
                }}
              >
                <option value="all">ทั้งหมด</option>
                <option value="math">แผนกคณิตศาสตร์</option>
                <option value="science">แผนกวิทยาศาสตร์</option>
                <option value="language">แผนกภาษา</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="text-4xl font-bold mb-2">{overallStats.totalClasses}</div>
              <div className="text-blue-100 text-sm">ห้องเรียนทั้งหมด</div>
              <div className="mt-2 text-xs text-blue-200">🏫 ในระบบ</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="text-4xl font-bold mb-2">{overallStats.totalStudents}</div>
              <div className="text-green-100 text-sm">นักเรียนทั้งหมด</div>
              <div className="mt-2 text-xs text-green-200">👥 ที่ลงทะเบียน</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="text-4xl font-bold mb-2">{overallStats.avgAttendanceRate}%</div>
              <div className="text-purple-100 text-sm">อัตราเข้าเรียนเฉลี่ย</div>
              <div className="mt-2 text-xs text-purple-200">📊 ทุกห้องเรียน</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mr-10 -mt-10"></div>
            <div className="relative">
              <div className="text-4xl font-bold mb-2">{overallStats.totalSessions}</div>
              <div className="text-orange-100 text-sm">คาบเรียนทั้งหมด</div>
              <div className="mt-2 text-xs text-orange-200">📚 เดือนนี้</div>
            </div>
          </div>
        </div>

        {/* Weekly Trend Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
            <span className="mr-2">📈</span>
            แนวโน้มการเข้าเรียน (4 สัปดาห์ล่าสุด)
          </h3>
          
          <div className="grid md:grid-cols-4 gap-4">
            {weeklyTrend.map((week, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-2">{week.week}</div>
                <div className="text-2xl font-bold text-blue-600 mb-2">{week.attendance}%</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${week.attendance}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🏆</span>
              </div>
              <div>
                <h3 className="font-bold text-green-800">ห้องเรียนยอดเยี่ยม</h3>
                <p className="text-green-600 text-sm">การเข้าเรียนดีที่สุด</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-green-800 mb-1">{overallStats.bestClass}</div>
            <div className="text-green-600 text-sm">อัตราเข้าเรียน 96.8%</div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">⏰</span>
              </div>
              <div>
                <h3 className="font-bold text-blue-800">ความตรงต่อเวลา</h3>
                <p className="text-blue-600 text-sm">เข้าเรียนตรงเวลา</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-800 mb-1">{overallStats.onTimeRate}%</div>
            <div className="text-blue-600 text-sm">ของนักเรียนทั้งหมด</div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">⚠️</span>
              </div>
              <div>
                <h3 className="font-bold text-yellow-800">ต้องติดตาม</h3>
                <p className="text-yellow-600 text-sm">ห้องที่ควรปรับปรุง</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-yellow-800 mb-1">{overallStats.worstClass}</div>
            <div className="text-yellow-600 text-sm">อัตราเข้าเรียน 85.1%</div>
          </div>
        </div>

        {/* Classroom Performance Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 flex items-center">
              <span className="mr-2">📊</span>
              ผลงานการเข้าเรียนแต่ละห้อง
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ห้องเรียน
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    วิชา
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ครูผู้สอน
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    จำนวนนักเรียน
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    คาบเรียน
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    อัตราเข้าเรียน
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    การดำเนินการ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {classroomStats.map((classroom) => {
                  const badge = getAttendanceBadge(classroom.attendanceRate)
                  return (
                    <tr key={classroom.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{classroom.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{classroom.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{classroom.teacher}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">{classroom.students}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{classroom.sessions}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAttendanceColor(classroom.attendanceRate)}`}>
                          {classroom.attendanceRate}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${badge.color}`}>
                          {badge.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link 
                          href={`/classrooms/${classroom.id}/reports`}
                          className="text-blue-600 hover:text-blue-900 mr-3 transition-colors"
                        >
                          ดูรายละเอียด
                        </Link>
                        <button 
                          onClick={() => exportClassroomReport(classroom.id, classroom.name)}
                          disabled={isExporting}
                          className="text-green-600 hover:text-green-900 disabled:opacity-50 transition-colors"
                        >
                          ส่งออก
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Export Progress Modal */}
        {showExportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">กำลังส่งออกรายงาน</h3>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>ส่งออกเป็น {exportFormat.toUpperCase()}</span>
                  <span>{exportProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${exportProgress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                {exportProgress < 100 ? 'กำลังประมวลผลข้อมูล...' : 'เสร็จสิ้น! กำลังดาวน์โหลดไฟล์...'}
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-16 right-4 z-50 max-w-sm w-full">
            <div className={`
              transform transition-all duration-300 ease-in-out
              ${showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
              rounded-lg shadow-lg overflow-hidden
              ${toastType === 'success' ? 'bg-green-500' : ''}
              ${toastType === 'error' ? 'bg-red-500' : ''}
              ${toastType === 'info' ? 'bg-blue-500' : ''}
            `}>
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {toastType === 'success' && (
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {toastType === 'error' && (
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                    {toastType === 'info' && (
                      <svg className="h-6 w-6 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-white">
                      {toastMessage}
                    </p>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    <button
                      onClick={() => setShowToast(false)}
                      className="inline-flex rounded-md p-1.5 text-white hover:bg-white hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
