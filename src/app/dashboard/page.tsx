'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [userRole] = useState('teacher') // จะมาจาก auth context จริงๆ
  const [user] = useState({
    name: 'อาจารย์สมชาย ใจดี',
    school: 'โรงเรียนสาธิตมหาวิทยาลัย',
    role: 'teacher'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">EA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Easy Attend</h1>
                <p className="text-sm text-gray-500">{user.school}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">สวัสดี, {user.name}</span>
              <button className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm transition-colors">
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ยินดีต้อนรับ {userRole === 'teacher' ? 'ครู' : 'นักเรียน'}{user.name}
          </h2>
          <p className="text-gray-600 mb-4">
            ระบบเช็คชื่อออนไลน์ - {user.school}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              📅 วันนี้: {new Date().toLocaleDateString('th-TH', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {userRole === 'teacher' ? (
            <>
              <Link href="/classrooms" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">จัดการห้องเรียน</h3>
                    <p className="text-gray-600 text-sm">สร้างห้องเรียน เพิ่มนักเรียน</p>
                  </div>
                </div>
              </Link>

              <Link href="/attendance/create" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">เปิดเช็คชื่อ</h3>
                    <p className="text-gray-600 text-sm">เริ่มรอบเช็คชื่อใหม่</p>
                  </div>
                </div>
              </Link>

              <Link href="/reports" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">รายงานการเข้าเรียน</h3>
                    <p className="text-gray-600 text-sm">ดูสถิติและรายงาน</p>
                  </div>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link href="/attendance/join" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">เช็คชื่อ</h3>
                    <p className="text-gray-600 text-sm">เข้าร่วมรอบเช็คชื่อ</p>
                  </div>
                </div>
              </Link>

              <Link href="/my-attendance" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">ประวัติการเข้าเรียน</h3>
                    <p className="text-gray-600 text-sm">ดูประวัติของฉัน</p>
                  </div>
                </div>
              </Link>

              <Link href="/classrooms" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                    <span className="text-2xl">🏛️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">ห้องเรียนของฉัน</h3>
                    <p className="text-gray-600 text-sm">ดูห้องเรียนที่เข้าร่วม</p>
                  </div>
                </div>
              </Link>
            </>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">กิจกรรมล่าสุด</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {userRole === 'teacher' ? 'เปิดรอบเช็คชื่อ' : 'เช็คชื่อเรียบร้อย'} - วิชาคณิตศาสตร์ ม.6/1
                </p>
                <p className="text-xs text-gray-500">10 นาทีที่แล้ว</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm">📝</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {userRole === 'teacher' ? 'สร้างห้องเรียนใหม่' : 'เข้าร่วมห้องเรียนใหม่'} - ฟิสิกส์ ม.5/2
                </p>
                <p className="text-xs text-gray-500">2 ชั่วโมงที่แล้ว</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}