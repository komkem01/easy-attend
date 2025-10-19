'use client'

import { useState } from 'react'
import TeacherLayout from '@/components/teacher/TeacherLayout'
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Download, 
  Trash2, 
  Save,
  Eye,
  EyeOff,
  Camera,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    // Profile settings
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    email: 'teacher@school.ac.th',
    phone: '081-234-5678',
    address: 'โรงเรียนตัวอย่าง กรุงเทพมหานคร',
    profileImage: null,
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    attendanceAlerts: true,
    weeklyReports: true,
    studentUpdates: false,
    
    // Security settings
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    loginAlerts: true,
    
    // Appearance settings
    theme: 'light',
    language: 'th',
    timezone: 'Asia/Bangkok',
    dateFormat: 'DD/MM/YYYY',
    
    // Data settings
    autoBackup: true,
    dataRetention: '1year',
  })

  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    // Simulate saving settings
    console.log('Saving settings:', settings)
    alert('บันทึกการตั้งค่าเรียบร้อยแล้ว!')
  }

  const handleExportData = () => {
    // Simulate data export
    alert('กำลังเตรียมข้อมูลสำหรับการดาวน์โหลด...')
  }

  const handleDeleteAccount = () => {
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบบัญชีนี้? การดำเนินการนี้ไม่สามารถยกเลิกได้')) {
      alert('การลบบัญชีจะดำเนินการในอีก 30 วัน เพื่อให้คุณมีเวลาเปลี่ยนใจ')
    }
  }

  const tabs = [
    { id: 'profile', label: 'ข้อมูลส่วนตัว', icon: User },
    { id: 'notifications', label: 'การแจ้งเตือน', icon: Bell },
    { id: 'security', label: 'ความปลอดภัย', icon: Shield },
    { id: 'appearance', label: 'การแสดงผล', icon: Palette },
    { id: 'data', label: 'ข้อมูล', icon: Download },
  ]

  return (
    <TeacherLayout 
      title="ตั้งค่า" 
      subtitle="จัดการการตั้งค่าระบบและข้อมูลส่วนตัว"
      activeMenuItem="settings"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลส่วนตัว</h3>
                
                {/* Profile Image */}
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-600" />
                  </div>
                  <div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Camera className="h-4 w-4" />
                      <span>เปลี่ยนรูปภาพ</span>
                    </button>
                    <p className="text-sm text-gray-500 mt-2">รองรับไฟล์ JPG, PNG ขนาดไม่เกิน 5MB</p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ</label>
                    <input
                      type="text"
                      value={settings.firstName}
                      onChange={(e) => handleSettingChange('profile', 'firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">นามสกุล</label>
                    <input
                      type="text"
                      value={settings.lastName}
                      onChange={(e) => handleSettingChange('profile', 'lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={settings.phone}
                        onChange={(e) => handleSettingChange('profile', 'phone', e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ที่อยู่</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      value={settings.address}
                      onChange={(e) => handleSettingChange('profile', 'address', e.target.value)}
                      rows={3}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">การแจ้งเตือน</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-medium text-gray-900">การแจ้งเตือนทางอีเมล</h4>
                      <p className="text-sm text-gray-500">รับการแจ้งเตือนผ่านอีเมล</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => handleSettingChange('notifications', 'emailNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-medium text-gray-900">การแจ้งเตือนแบบ Push</h4>
                      <p className="text-sm text-gray-500">รับการแจ้งเตือนบนเบราว์เซอร์</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.pushNotifications}
                        onChange={(e) => handleSettingChange('notifications', 'pushNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-medium text-gray-900">การแจ้งเตือนการเข้าเรียน</h4>
                      <p className="text-sm text-gray-500">แจ้งเตือนเมื่อมีการเช็คชื่อ</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.attendanceAlerts}
                        onChange={(e) => handleSettingChange('notifications', 'attendanceAlerts', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-medium text-gray-900">รายงานประจำสัปดาห์</h4>
                      <p className="text-sm text-gray-500">ส่งรายงานสรุปทุกสัปดาห์</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.weeklyReports}
                        onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">ความปลอดภัย</h3>
                
                {/* Change Password */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">เปลี่ยนรหัสผ่าน</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">รหัสผ่านปัจจุบัน</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={settings.currentPassword}
                          onChange={(e) => handleSettingChange('security', 'currentPassword', e.target.value)}
                          className="w-full pr-10 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">รหัสผ่านใหม่</label>
                      <input
                        type="password"
                        value={settings.newPassword}
                        onChange={(e) => handleSettingChange('security', 'newPassword', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ยืนยันรหัสผ่านใหม่</label>
                      <input
                        type="password"
                        value={settings.confirmPassword}
                        onChange={(e) => handleSettingChange('security', 'confirmPassword', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                      />
                    </div>
                    
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      เปลี่ยนรหัสผ่าน
                    </button>
                  </div>
                </div>

                {/* Security Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-medium text-gray-900">การยืนยันตัวตนสองขั้นตอน</h4>
                      <p className="text-sm text-gray-500">เพิ่มความปลอดภัยด้วย OTP</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-medium text-gray-900">แจ้งเตือนการเข้าสู่ระบบ</h4>
                      <p className="text-sm text-gray-500">แจ้งเตือนเมื่อม��การเข้าสู่ระบบจากอุปกรณ์ใหม่</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.loginAlerts}
                        onChange={(e) => handleSettingChange('security', 'loginAlerts', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">การแสดงผล</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ธีม</label>
                    <select
                      value={settings.theme}
                      onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    >
                      <option value="light">สว่าง</option>
                      <option value="dark">มืด</option>
                      <option value="auto">อัตโนมัติ</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ภาษา</label>
                    <select
                      value={settings.language}
                      onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    >
                      <option value="th">ไทย</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">เขตเวลา</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange('appearance', 'timezone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    >
                      <option value="Asia/Bangkok">เอเชีย/กรุงเทพ</option>
                      <option value="Asia/Tokyo">เอเชีย/โตเกียว</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">รูปแบบวันที่</label>
                    <select
                      value={settings.dateFormat}
                      onChange={(e) => handleSettingChange('appearance', 'dateFormat', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    >
                      <option value="DD/MM/YYYY">วัน/เดือน/ปี</option>
                      <option value="MM/DD/YYYY">เดือน/วัน/ปี</option>
                      <option value="YYYY-MM-DD">ปี-เดือน-วัน</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">การจัดการข้อมูล</h3>
                
                <div className="space-y-6">
                  {/* Data Export */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <Download className="h-6 w-6 text-blue-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium text-blue-900">ส่งออกข้อมูล</h4>
                        <p className="text-sm text-blue-700 mt-2">ดาวน์โหลดข้อมูลทั้งหมดของคุณในรูปแบบ JSON</p>
                        <button
                          onClick={handleExportData}
                          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          ส่งออกข้อมูล
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Auto Backup */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div>
                      <h4 className="font-medium text-gray-900">การสำรองข้อมูลอัตโนมัติ</h4>
                      <p className="text-sm text-gray-500">สำรองข้อมูลอัตโนมัติทุกสัปดาห์</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.autoBackup}
                        onChange={(e) => handleSettingChange('data', 'autoBackup', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {/* Data Retention */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ระยะเวลาเก็บข้อมูล</label>
                    <select
                      value={settings.dataRetention}
                      onChange={(e) => handleSettingChange('data', 'dataRetention', e.target.value)}
                      className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white"
                    >
                      <option value="6months">6 เดือน</option>
                      <option value="1year">1 ปี</option>
                      <option value="2years">2 ปี</option>
                      <option value="forever">ตลอดไป</option>
                    </select>
                  </div>

                  {/* Delete Account */}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-start space-x-4">
                      <Trash2 className="h-6 w-6 text-red-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-medium text-red-900">ลบบัญชี</h4>
                        <p className="text-sm text-red-700 mt-2">
                          ลบบัญชีและข้อมูลทั้งหมดของคุณอย่างถาวร การดำเนินการนี้ไม่สามารถยกเลิกได้
                        </p>
                        <button
                          onClick={handleDeleteAccount}
                          className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          ลบบัญชี
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                <span>บันทึกการตั้งค่า</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  )
}