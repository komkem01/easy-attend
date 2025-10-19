'use client'

import { useState } from 'react'
import TeacherLayout from '@/components/TeacherLayout'
import { Bell, CheckCircle, AlertTriangle, Info, X, Eye, EyeOff } from 'lucide-react'

export default function NotificationsPage() {
  const [filter, setFilter] = useState('all')
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'info',
      title: 'การเช็คชื่อใหม่',
      message: 'มีนักเรียนเช็คชื่อในห้องเรียนคณิตศาสตร์ ม.6/1',
      time: '2024-10-19 14:35',
      isRead: false,
      classroom: 'คณิตศาสตร์ ม.6/1'
    },
    {
      id: '2',
      type: 'warning',
      title: 'นักเรียนมาสาย',
      message: 'นักเรียน สมชาย ใจดี มาสาย 15 นาที ในวิชาฟิสิกส์ ม.5/2',
      time: '2024-10-19 13:45',
      isRead: false,
      classroom: 'ฟิสิกส์ ม.5/2'
    },
    {
      id: '3',
      type: 'success',
      title: 'รายงานสำเร็จ',
      message: 'รายงานการเข้าเรียนประจำสัปดาห์ถูกส่งเรียบร้อยแล้ว',
      time: '2024-10-19 10:00',
      isRead: true,
      classroom: null
    },
    {
      id: '4',
      type: 'info',
      title: 'ข้อมูลใหม่',
      message: 'มีนักเรียนใหม่เข้าร่วมในห้องเรียนเคมี ม.6/1',
      time: '2024-10-18 16:20',
      isRead: true,
      classroom: 'เคมี ม.6/1'
    },
    {
      id: '5',
      type: 'warning',
      title: 'การเข้าเรียนต่ำ',
      message: 'นักเรียน สมหญิง เก่งกาจ มีอัตราการเข้าเรียนต่ำกว่า 80%',
      time: '2024-10-18 09:15',
      isRead: false,
      classroom: 'คณิตศาสตร์ ม.6/1'
    }
  ])

  const getTypeInfo = (type: string) => {
    switch (type) {
      case 'success':
        return { 
          icon: CheckCircle, 
          color: 'text-green-600', 
          bg: 'bg-green-50', 
          border: 'border-green-200' 
        }
      case 'warning':
        return { 
          icon: AlertTriangle, 
          color: 'text-yellow-600', 
          bg: 'bg-yellow-50', 
          border: 'border-yellow-200' 
        }
      case 'info':
      default:
        return { 
          icon: Info, 
          color: 'text-blue-600', 
          bg: 'bg-blue-50', 
          border: 'border-blue-200' 
        }
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.isRead
    if (filter === 'read') return notification.isRead
    return true
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <TeacherLayout 
      title="การแจ้งเตือน" 
      subtitle={`มี ${unreadCount} การแจ้งเตือนที่ยังไม่ได้อ่าน`}
      activeMenuItem="notifications"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                การแจ้งเตือนทั้งหมด ({notifications.length})
              </h2>
            </div>
            
            <div className="flex items-center space-x-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-900 bg-white"
              >
                <option value="all">ทั้งหมด</option>
                <option value="unread">ยังไม่อ่าน ({unreadCount})</option>
                <option value="read">อ่านแล้ว</option>
              </select>
              
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  อ่านทั้งหมด
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'unread' ? 'ไม่มีการแจ้งเตือนใหม่' : 'ไม่มีการแจ้งเตือน'}
              </h3>
              <p className="text-gray-500">
                {filter === 'unread' 
                  ? 'คุณได้อ่านการแจ้งเตือนทั้งหมดแล้ว' 
                  : 'ยังไม่มีการแจ้งเตือนในขณะนี้'
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const typeInfo = getTypeInfo(notification.type)
              const Icon = typeInfo.icon
              
              return (
                <div
                  key={notification.id}
                  className={`bg-white rounded-lg shadow-sm border transition-all hover:shadow-md ${
                    notification.isRead 
                      ? 'border-gray-200' 
                      : `${typeInfo.border} border-l-4`
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-2 rounded-lg ${typeInfo.bg}`}>
                          <Icon className={`h-5 w-5 ${typeInfo.color}`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className={`font-semibold ${
                              notification.isRead ? 'text-gray-700' : 'text-gray-900'
                            }`}>
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </div>
                          
                          <p className={`mb-3 ${
                            notification.isRead ? 'text-gray-500' : 'text-gray-700'
                          }`}>
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>🕐 {new Date(notification.time).toLocaleString('th-TH')}</span>
                            {notification.classroom && (
                              <span>📚 {notification.classroom}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.isRead && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="ทำเครื่องหมายว่าอ่านแล้ว"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="ลบการแจ้งเตือน"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Summary */}
        {notifications.length > 0 && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-3">📊 สรุปการแจ้งเตือน</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-blue-800">ทั้งหมด:</span>
                <span className="ml-2 font-semibold">{notifications.length} รายการ</span>
              </div>
              <div>
                <span className="text-blue-800">ยังไม่อ่าน:</span>
                <span className="ml-2 font-semibold text-red-600">{unreadCount} รายการ</span>
              </div>
              <div>
                <span className="text-blue-800">อ่านแล้ว:</span>
                <span className="ml-2 font-semibold text-green-600">{notifications.length - unreadCount} รายการ</span>
              </div>
              <div>
                <span className="text-blue-800">วันนี้:</span>
                <span className="ml-2 font-semibold text-blue-600">
                  {notifications.filter(n => n.time.startsWith('2024-10-19')).length} รายการ
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  )
}