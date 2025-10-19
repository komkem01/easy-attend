'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function JoinAttendancePage() {
  const [joinMethod, setJoinMethod] = useState('code') // code, qr
  const [inputCode, setInputCode] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const [attendanceStatus, setAttendanceStatus] = useState<'none' | 'success' | 'error'>('none')
  const [sessionInfo, setSessionInfo] = useState<any>(null)

  // Available attendance sessions (จริงๆ จะ fetch จาก API)
  const availableSessions = [
    {
      id: '1',
      classroomName: 'คณิตศาสตร์ ม.6/1',
      teacherName: 'อาจารย์สมชาย ใจดี',
      startTime: '14:30',
      isActive: true
    },
    {
      id: '2', 
      classroomName: 'ฟิสิกส์ ม.5/2',
      teacherName: 'อาจารย์สมหญิง เก่งกาจ',
      startTime: '15:30',
      isActive: true
    }
  ]

  const handleJoinByCode = async () => {
    if (!inputCode.trim()) return
    
    setIsJoining(true)
    // Simulate API call
    setTimeout(() => {
      // Mock successful join
      setSessionInfo({
        classroomName: 'คณิตศาสตร์ ม.6/1',
        teacherName: 'อาจารย์สมชาย ใจดี',
        time: new Date().toLocaleTimeString('th-TH')
      })
      setAttendanceStatus('success')
      setIsJoining(false)
    }, 1500)
  }

  const handleQuickJoin = (sessionId: string) => {
    const session = availableSessions.find(s => s.id === sessionId)
    if (session) {
      setIsJoining(true)
      setTimeout(() => {
        setSessionInfo({
          classroomName: session.classroomName,
          teacherName: session.teacherName,
          time: new Date().toLocaleTimeString('th-TH')
        })
        setAttendanceStatus('success')
        setIsJoining(false)
      }, 1000)
    }
  }

  if (attendanceStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">เช็คชื่อสำเร็จ!</h2>
          <p className="text-gray-600 mb-6">คุณได้เช็คชื่อเรียบร้อยแล้ว</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">วิชา:</span>
                <span className="ml-2 font-medium text-gray-900">{sessionInfo?.classroomName}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">ครูผู้สอน:</span>
                <span className="ml-2 font-medium text-gray-900">{sessionInfo?.teacherName}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">เวลาเช็คชื่อ:</span>
                <span className="ml-2 font-medium text-gray-900">{sessionInfo?.time}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link 
              href="/my-attendance"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors block"
            >
              ดูประวัติการเข้าเรียน
            </Link>
            <Link 
              href="/dashboard"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition-colors block"
            >
              กลับสู่หน้าหลัก
            </Link>
          </div>
        </div>
      </div>
    )
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
              <h1 className="text-xl font-bold text-gray-900">เช็คชื่อเข้าเรียน</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Join - Available Sessions */}
        {availableSessions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">รอบเช็คชื่อที่เปิดอยู่</h2>
            <div className="space-y-3">
              {availableSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{session.classroomName}</h3>
                    <p className="text-sm text-gray-600">{session.teacherName}</p>
                    <p className="text-xs text-gray-500">เริ่มเมื่อ {session.startTime}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      ● เปิดอยู่
                    </div>
                    <button
                      onClick={() => handleQuickJoin(session.id)}
                      disabled={isJoining}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      {isJoining ? 'กำลังเช็คชื่อ...' : 'เช็คชื่อ'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Manual Join Methods */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">เช็คชื่อด้วยวิธีอื่น</h2>
          
          {/* Method Selection */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div 
              onClick={() => setJoinMethod('code')}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                joinMethod === 'code' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <span className="text-3xl mb-3 block">🔢</span>
                <h3 className="font-semibold text-gray-900">ป้อนรหัส</h3>
                <p className="text-sm text-gray-500">ป้อนรหัสที่ครูให้</p>
              </div>
            </div>

            <div 
              onClick={() => setJoinMethod('qr')}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                joinMethod === 'qr' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-center">
                <span className="text-3xl mb-3 block">📱</span>
                <h3 className="font-semibold text-gray-900">สแกน QR Code</h3>
                <p className="text-sm text-gray-500">ใช้กล้องสแกน QR</p>
              </div>
            </div>
          </div>

          {/* Join Form */}
          {joinMethod === 'code' && (
            <div className="max-w-md mx-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    รหัสเช็คชื่อ
                  </label>
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-2xl font-bold tracking-wider text-gray-900 bg-white"
                    placeholder="ABC123"
                    maxLength={6}
                  />
                </div>
                
                <button
                  onClick={handleJoinByCode}
                  disabled={!inputCode.trim() || isJoining}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium text-lg transition-colors"
                >
                  {isJoining ? 'กำลังเช็คชื่อ...' : 'เช็คชื่อ'}
                </button>
              </div>
            </div>
          )}

          {joinMethod === 'qr' && (
            <div className="max-w-md mx-auto text-center">
              <div className="bg-gray-100 rounded-2xl p-8 mb-4">
                <div className="w-48 h-48 bg-gray-300 rounded-lg mx-auto flex items-center justify-center mb-4">
                  <span className="text-gray-500">Camera View</span>
                </div>
                <p className="text-sm text-gray-600">วางกล้องให้ตรงกับ QR Code</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                เปิดกล้อง
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 วิธีการเช็คชื่อ</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• ครูจะเปิดรอบเช็คชื่อในแต่ละคาบเรียน</li>
            <li>• คุณสามารถเช็คชื่อได้ด้วยการกดปุ่ม, ป้อนรหัส หรือสแกน QR Code</li>
            <li>• ตรวจสอบให้แน่ใจว่าเข้าห้องเรียนที่ถูกต้อง</li>
            <li>• หากมีปัญหาให้ติดต่อครูผู้สอน</li>
          </ul>
        </div>
      </div>
    </div>
  )
}