'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ClassroomsPage() {
  const [classrooms, setClassrooms] = useState([
    {
      id: '1',
      name: 'คณิตศาสตร์ ม.6/1',
      code: 'MATH601',
      subject: 'คณิตศาสตร์',
      grade: 'ม.6',
      section: '1',
      studentCount: 32,
      activeAttendance: true,
      lastActivity: '2024-10-17T14:30:00',
      createdAt: '2024-10-01',
      color: 'blue'
    },
    {
      id: '2', 
      name: 'ฟิสิกส์ ม.5/2',
      code: 'PHY502',
      subject: 'ฟิสิกส์',
      grade: 'ม.5',
      section: '2',
      studentCount: 28,
      activeAttendance: false,
      lastActivity: '2024-10-16T15:45:00',
      createdAt: '2024-10-05',
      color: 'green'
    },
    {
      id: '3',
      name: 'เคมี ม.6/2',
      code: 'CHEM602',
      subject: 'เคมี',
      grade: 'ม.6',
      section: '2',
      studentCount: 25,
      activeAttendance: false,
      lastActivity: '2024-10-17T10:30:00',
      createdAt: '2024-10-10',
      color: 'purple'
    }
  ])
  const [filteredClassrooms, setFilteredClassrooms] = useState(classrooms)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGrade, setFilterGrade] = useState('all')

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newClassroom, setNewClassroom] = useState({
    name: '',
    subject: '',
    grade: '',
    section: ''
  })

  const handleCreateClassroom = () => {
    if (newClassroom.subject && newClassroom.grade && newClassroom.section) {
      const newId = (classrooms.length + 1).toString()
      const classroom = {
        id: newId,
        name: `${newClassroom.subject} ${newClassroom.grade}/${newClassroom.section}`,
        code: `${newClassroom.subject.substring(0,3).toUpperCase()}${newClassroom.grade.replace('ม.', '')}${newClassroom.section}`.replace(/[^A-Z0-9]/g, ''),
        subject: newClassroom.subject,
        grade: newClassroom.grade,
        section: newClassroom.section,
        studentCount: 0,
        activeAttendance: false,
        lastActivity: new Date().toISOString(),
        createdAt: new Date().toISOString().split('T')[0],
        color: ['blue', 'green', 'purple', 'orange', 'red'][Math.floor(Math.random() * 5)]
      }
      
      const updatedClassrooms = [...classrooms, classroom]
      setClassrooms(updatedClassrooms)
      setFilteredClassrooms(updatedClassrooms)
      setShowCreateForm(false)
      setNewClassroom({ name: '', subject: '', grade: '', section: '' })
    }
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterClassrooms(term, filterGrade)
  }

  const handleGradeFilter = (grade: string) => {
    setFilterGrade(grade)
    filterClassrooms(searchTerm, grade)
  }

  const filterClassrooms = (search: string, grade: string) => {
    let filtered = classrooms.filter(classroom => {
      const matchesSearch = classroom.name.toLowerCase().includes(search.toLowerCase()) ||
                           classroom.code.toLowerCase().includes(search.toLowerCase()) ||
                           classroom.subject.toLowerCase().includes(search.toLowerCase())
      const matchesGrade = grade === 'all' || classroom.grade === grade
      return matchesSearch && matchesGrade
    })
    setFilteredClassrooms(filtered)
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'from-blue-500 to-blue-600'
      case 'green': return 'from-green-500 to-green-600'
      case 'purple': return 'from-purple-500 to-purple-600'
      case 'orange': return 'from-orange-500 to-orange-600'
      case 'red': return 'from-red-500 to-red-600'
      default: return 'from-blue-500 to-blue-600'
    }
  }

  const formatLastActivity = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'เมื่อสักครู่'
    if (diffInHours < 24) return `${diffInHours} ชั่วโมงที่แล้ว`
    const days = Math.floor(diffInHours / 24)
    return `${days} วันที่แล้ว`
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>+</span>
              <span>สร้างห้องเรียนใหม่</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{classrooms.length}</div>
            <div className="text-sm text-gray-500">ห้องเรียนทั้งหมด</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {classrooms.reduce((sum, c) => sum + c.studentCount, 0)}
            </div>
            <div className="text-sm text-gray-500">นักเรียนทั้งหมด</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {classrooms.filter(c => c.activeAttendance).length}
            </div>
            <div className="text-sm text-gray-500">กำลังเช็คชื่อ</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(classrooms.map(c => c.grade)).size}
            </div>
            <div className="text-sm text-gray-500">ระดับชั้น</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ค้นหาห้องเรียน
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="ค้นหาชื่อวิชา รหัสห้อง..."
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                กรองตามระดับชั้น
              </label>
              <select
                value={filterGrade}
                onChange={(e) => handleGradeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="all">ทุกระดับชั้น</option>
                <option value="ม.1">มัธยมศึกษาปีที่ 1</option>
                <option value="ม.2">มัธยมศึกษาปีที่ 2</option>
                <option value="ม.3">มัธยมศึกษาปีที่ 3</option>
                <option value="ม.4">มัธยมศึกษาปีที่ 4</option>
                <option value="ม.5">มัธยมศึกษาปีที่ 5</option>
                <option value="ม.6">มัธยมศึกษาปีที่ 6</option>
              </select>
            </div>
          </div>
          
          {/* Clear Filters */}
          {(searchTerm || filterGrade !== 'all') && (
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilterGrade('all')
                  setFilteredClassrooms(classrooms)
                }}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>ล้างตัวกรอง</span>
              </button>
            </div>
          )}
        </div>

        {/* Results Info */}
        {(searchTerm || filterGrade !== 'all') && (
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              แสดงผลลัพธ์ {filteredClassrooms.length} ห้องเรียน
              {searchTerm && ` สำหรับคำค้นหา "${searchTerm}"`}
              {filterGrade !== 'all' && ` ชั้น ${filterGrade}`}
            </p>
          </div>
        )}

        {/* Classroom Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClassrooms.map((classroom) => (
            <div key={classroom.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
              {/* Color Header */}
              <div className={`h-2 bg-gradient-to-r ${getColorClasses(classroom.color)}`}></div>
              
              <div className="p-6">
                {/* Header with Status */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{classroom.name}</h3>
                      {classroom.activeAttendance && (
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full animate-pulse">
                          ● Live
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 font-mono">{classroom.code}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                      👥 {classroom.studentCount} คน
                    </div>
                  </div>
                </div>

                {/* Subject Info */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">📚 {classroom.subject}</span>
                    <span className="text-gray-600">🎓 {classroom.grade}/{classroom.section}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link 
                    href={`/attendance/create?classroom=${classroom.id}`}
                    className={`w-full ${
                      classroom.activeAttendance 
                        ? 'bg-orange-500 hover:bg-orange-600' 
                        : 'bg-green-500 hover:bg-green-600'
                    } text-white py-2.5 px-4 rounded-lg text-center block transition-colors font-medium flex items-center justify-center space-x-2`}
                  >
                    <span>{classroom.activeAttendance ? '📊' : '✅'}</span>
                    <span>{classroom.activeAttendance ? 'ดูการเช็คชื่อ' : 'เปิดเช็คชื่อ'}</span>
                  </Link>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Link 
                      href={`/classrooms/${classroom.id}/students`}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-3 rounded-lg text-center text-sm transition-colors font-medium flex items-center justify-center space-x-1"
                    >
                      <span>👥</span>
                      <span>นักเรียน</span>
                    </Link>
                    <Link 
                      href={`/classrooms/${classroom.id}/reports`}
                      className="bg-purple-50 hover:bg-purple-100 text-purple-700 py-2 px-3 rounded-lg text-center text-sm transition-colors font-medium flex items-center justify-center space-x-1"
                    >
                      <span>📊</span>
                      <span>รายงาน</span>
                    </Link>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center text-xs text-gray-400">
                    <span>สร้างเมื่อ: {new Date(classroom.createdAt).toLocaleDateString('th-TH')}</span>
                    <span>ใช้งานล่าสุด: {formatLastActivity(classroom.lastActivity)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredClassrooms.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-gray-400">🏛️</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterGrade !== 'all' ? 'ไม่พบห้องเรียนที่ค้นหา' : 'ยังไม่มีห้องเรียน'}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || filterGrade !== 'all' 
                  ? 'ลองเปลี่ยนคำค้นหาหรือตัวกรอง' 
                  : 'เริ่มต้นด้วยการสร้างห้องเรียนแรกของคุณ'
                }
              </p>
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
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">สร้างห้องเรียนใหม่</h2>
              <p className="text-gray-600">กรอกข้อมูลห้องเรียนที่ต้องการสร้าง</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <span className="flex items-center space-x-2">
                    <span>📚</span>
                    <span>ชื่อวิชา</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={newClassroom.subject}
                  onChange={(e) => setNewClassroom({...newClassroom, subject: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  placeholder="เช่น คณิตศาสตร์, ฟิสิกส์, เคมี"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center space-x-2">
                      <span>🎓</span>
                      <span>ระดับชั้น</span>
                    </span>
                  </label>
                  <select
                    value={newClassroom.grade}
                    onChange={(e) => setNewClassroom({...newClassroom, grade: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                  >
                    <option value="">เลือกชั้น</option>
                    <option value="ม.1">มัธยมศึกษาปีที่ 1</option>
                    <option value="ม.2">มัธยมศึกษาปีที่ 2</option>
                    <option value="ม.3">มัธยมศึกษาปีที่ 3</option>
                    <option value="ม.4">มัธยมศึกษาปีที่ 4</option>
                    <option value="ม.5">มัธยมศึกษาปีที่ 5</option>
                    <option value="ม.6">มัธยมศึกษาปีที่ 6</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <span className="flex items-center space-x-2">
                      <span>🚪</span>
                      <span>ห้อง</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    value={newClassroom.section}
                    onChange={(e) => setNewClassroom({...newClassroom, section: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    placeholder="1, 2, 3..."
                  />
                </div>
              </div>

              {/* Preview */}
              {newClassroom.subject && newClassroom.grade && newClassroom.section && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 mb-2">ตัวอย่าง:</p>
                  <div className="bg-white rounded-lg p-3">
                    <h3 className="font-semibold text-gray-900">
                      {newClassroom.subject} {newClassroom.grade}/{newClassroom.section}
                    </h3>
                    <p className="text-sm text-gray-500 font-mono">
                      {`${newClassroom.subject.substring(0,3).toUpperCase()}${newClassroom.grade.replace('ม.', '')}${newClassroom.section}`.replace(/[^A-Z0-9]/g, '')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-8">
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleCreateClassroom}
                disabled={!newClassroom.subject || !newClassroom.grade || !newClassroom.section}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                สร้างห้องเรียน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}