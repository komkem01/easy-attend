'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ClassroomStudentsPage() {
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
    teacherName: 'อาจารย์สมชาย ใจดี'
  })

  const [students, setStudents] = useState([
    {
      id: '1',
      studentId: 'S001',
      name: 'นาย ก ใจดี',
      email: 'student1@school.ac.th',
      phone: '081-234-5678',
      seatNumber: '1',
      joinedAt: '2024-10-01',
      attendanceRate: 95,
      lastAttendance: '2024-10-17T14:30:00',
      status: 'active'
    },
    {
      id: '2',
      studentId: 'S002',
      name: 'นาง ข สบาย',
      email: 'student2@school.ac.th',
      phone: '081-234-5679',
      seatNumber: '2',
      joinedAt: '2024-10-01',
      attendanceRate: 88,
      lastAttendance: '2024-10-17T14:30:00',
      status: 'active'
    },
    {
      id: '3',
      studentId: 'S003',
      name: 'นางสาว ค มั่นใจ',
      email: 'student3@school.ac.th',
      phone: '081-234-5680',
      seatNumber: '3',
      joinedAt: '2024-10-02',
      attendanceRate: 78,
      lastAttendance: '2024-10-16T14:30:00',
      status: 'active'
    },
    {
      id: '4',
      studentId: 'S004',
      name: 'นาย ง รู้จริง',
      email: 'student4@school.ac.th',
      phone: '081-234-5681',
      seatNumber: '4',
      joinedAt: '2024-10-03',
      attendanceRate: 92,
      lastAttendance: '2024-10-15T14:30:00',
      status: 'inactive'
    },
    // ... more students
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name') // name, studentId, attendanceRate, joinedAt
  const [sortOrder, setSortOrder] = useState('asc') // asc, desc
  const [filterStatus, setFilterStatus] = useState('all') // all, active, inactive
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])

  const [newStudent, setNewStudent] = useState({
    studentId: '',
    name: '',
    email: '',
    phone: ''
  })

  // Filter and sort students
  const filteredStudents = students
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = filterStatus === 'all' || student.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof typeof a]
      let bValue = b[sortBy as keyof typeof b]
      
      if (typeof aValue === 'string') aValue = aValue.toLowerCase()
      if (typeof bValue === 'string') bValue = bValue.toLowerCase()
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

  const handleAddStudent = () => {
    if (newStudent.studentId && newStudent.name) {
      const student = {
        id: (students.length + 1).toString(),
        studentId: newStudent.studentId,
        name: newStudent.name,
        email: newStudent.email || `${newStudent.studentId}@school.ac.th`,
        phone: newStudent.phone || '',
        seatNumber: (students.length + 1).toString(),
        joinedAt: new Date().toISOString().split('T')[0],
        attendanceRate: 0,
        lastAttendance: new Date().toISOString(),
        status: 'active' as const
      }
      
      setStudents([...students, student])
      setNewStudent({ studentId: '', name: '', email: '', phone: '' })
      setShowAddForm(false)
    }
  }

  const handleRemoveStudents = () => {
    setStudents(students.filter(s => !selectedStudents.includes(s.id)))
    setSelectedStudents([])
  }

  const handleToggleStatus = (studentId: string) => {
    setStudents(prev => prev.map(s => 
      s.id === studentId 
        ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
        : s
    ))
  }

  const getAttendanceColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600 bg-green-100'
    if (rate >= 80) return 'text-yellow-600 bg-yellow-100'
    if (rate >= 70) return 'text-orange-600 bg-orange-100'
    return 'text-red-600 bg-red-100'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('th-TH')
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
                <h1 className="text-xl font-bold text-gray-900">จัดการนักเรียน</h1>
                <p className="text-sm text-gray-500">{classroom.name} - {classroom.teacherName}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {selectedStudents.length > 0 && (
                <button
                  onClick={handleRemoveStudents}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  ลบ ({selectedStudents.length})
                </button>
              )}
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <span>+</span>
                <span>เพิ่มนักเรียน</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{students.length}</div>
            <div className="text-sm text-gray-500">นักเรียนทั้งหมด</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {students.filter(s => s.status === 'active').length}
            </div>
            <div className="text-sm text-gray-500">กำลังเรียน</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(students.reduce((sum, s) => sum + s.attendanceRate, 0) / students.length)}%
            </div>
            <div className="text-sm text-gray-500">อัตราเข้าเรียนเฉลี่ย</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {students.filter(s => s.attendanceRate >= 90).length}
            </div>
            <div className="text-sm text-gray-500">เข้าเรียนดี (&gt;90%)</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ค้นหานักเรียน
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="ค้นหาชื่อ, รหัสนักเรียน, อีเมล..."
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
                จัดเรียงตาม
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="name">ชื่อ</option>
                <option value="studentId">รหัสนักเรียน</option>
                <option value="attendanceRate">อัตราเข้าเรียน</option>
                <option value="joinedAt">วันที่เข้าร่วม</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                สถานะ
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="all">ทั้งหมด</option>
                <option value="active">กำลังเรียน</option>
                <option value="inactive">ไม่ได้เรียน</option>
              </select>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">
                รายชื่อนักเรียน ({filteredStudents.length} คน)
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title={`เรียงจาก ${sortOrder === 'asc' ? 'น้อยไปมาก' : 'มากไปน้อย'}`}
                >
                  <svg className={`w-4 h-4 transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedStudents(filteredStudents.map(s => s.id))
                        } else {
                          setSelectedStudents([])
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    นักเรียน
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ติดต่อ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    อัตราเข้าเรียน
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    เข้าร่วมเมื่อ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สถานะ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    การกระทำ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStudents([...selectedStudents, student.id])
                          } else {
                            setSelectedStudents(selectedStudents.filter(id => id !== student.id))
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {student.seatNumber}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">รหัส: {student.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.email}</div>
                      <div className="text-sm text-gray-500">{student.phone || 'ไม่ระบุ'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAttendanceColor(student.attendanceRate)}`}>
                        {student.attendanceRate}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(student.joinedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {student.status === 'active' ? 'กำลังเรียน' : 'ไม่ได้เรียน'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToggleStatus(student.id)}
                          className={`px-3 py-1 rounded text-xs transition-colors ${
                            student.status === 'active'
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {student.status === 'active' ? 'หยุดเรียน' : 'กลับมาเรียน'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-gray-400">👥</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่พบนักเรียน</h3>
              <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-900 mb-6">เพิ่มนักเรียนใหม่</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รหัสนักเรียน *
                </label>
                <input
                  type="text"
                  value={newStudent.studentId}
                  onChange={(e) => setNewStudent({...newStudent, studentId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="เช่น S001, S002"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อ-นามสกุล *
                </label>
                <input
                  type="text"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="เช่น นาย สมชาย ใจดี"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  อีเมล
                </label>
                <input
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="student@school.ac.th"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  value={newStudent.phone}
                  onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="081-234-5678"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleAddStudent}
                disabled={!newStudent.studentId || !newStudent.name}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                เพิ่ม
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}