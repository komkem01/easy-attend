'use client';

import React, { useState } from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  X, 
  Camera,
  School,
  BookOpen,
  Award
} from 'lucide-react';

export default function StudentProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'นาย สมชาย',
    lastName: 'ใจดี',
    studentId: '65001234567',
    email: 'somchai.jaidee@student.ac.th',
    phone: '081-234-5678',
    dateOfBirth: '2005-03-15',
    address: '123 ถนนสุขุมวิท เขตวัฒนา กรุงเทพฯ 10110',
    emergencyContact: 'นาง สมศรี ใจดี',
    emergencyPhone: '081-987-6543',
    year: '3',
    major: 'วิทยาศาสตร์-คณิตศาสตร์',
    advisor: 'อ.ดร.วิชัย เก่งเก้า'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Here would be the actual save logic
    setIsEditing(false);
    alert('บันทึกข้อมูลเรียบร้อยแล้ว');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  // Mock academic stats
  const academicStats = {
    gpa: '3.45',
    totalCredits: 84,
    completedCourses: 28,
    currentSemester: '2/2567'
  };

  return (
    <StudentLayout 
      title="โปรไฟล์" 
      subtitle="จัดการข้อมูลส่วนตัว"
      activeMenuItem="profile"
    >
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <User className="w-16 h-16 text-gray-400" />
              </div>
              <button className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 text-white p-2 rounded-full shadow-lg transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {formData.firstName} {formData.lastName}
                  </h2>
                  <p className="text-gray-600">รหัสนักเรียน: {formData.studentId}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    ชั้น {formData.year} สาขา{formData.major}
                  </p>
                </div>
                
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    แก้ไขข้อมูล
                  </button>
                ) : (
                  <div className="mt-4 sm:mt-0 flex gap-2">
                    <button
                      onClick={handleSave}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      บันทึก
                    </button>
                    <button
                      onClick={handleCancel}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <X className="w-4 h-4 mr-2" />
                      ยกเลิก
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Academic Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">GPA</p>
                <p className="text-2xl font-bold text-gray-900">{academicStats.gpa}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">หน่วยกิต</p>
                <p className="text-2xl font-bold text-gray-900">{academicStats.totalCredits}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <School className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">วิชาที่เรียนจบ</p>
                <p className="text-2xl font-bold text-gray-900">{academicStats.completedCourses}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">ภาคเรียน</p>
                <p className="text-lg font-bold text-gray-900">{academicStats.currentSemester}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">ข้อมูลส่วนตัว</h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อ
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.firstName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  นามสกุล
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.lastName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  อีเมล
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  เบอร์โทรศัพท์
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.phone}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  วันเกิด
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">
                    {new Date(formData.dateOfBirth).toLocaleDateString('th-TH')}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชั้นปี
                </label>
                {isEditing ? (
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="1">ชั้นปีที่ 1</option>
                    <option value="2">ชั้นปีที่ 2</option>
                    <option value="3">ชั้นปีที่ 3</option>
                    <option value="4">ชั้นปีที่ 4</option>
                    <option value="5">ชั้นปีที่ 5</option>
                    <option value="6">ชั้นปีที่ 6</option>
                  </select>
                ) : (
                  <p className="text-gray-900">ชั้นปีที่ {formData.year}</p>
                )}
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline w-4 h-4 mr-1" />
                ที่อยู่
              </label>
              {isEditing ? (
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              ) : (
                <p className="text-gray-900">{formData.address}</p>
              )}
            </div>
          </div>
        </div>

        {/* Academic Information */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">ข้อมูลการศึกษา</h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  สาขาวิชา
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.major}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  อาจารย์ที่ปรึกษา
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="advisor"
                    value={formData.advisor}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.advisor}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">ผู้ติดต่อฉุกเฉิน</h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อผู้ติดต่อฉุกเฉิน
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.emergencyContact}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เบอร์โทรฉุกเฉิน
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                ) : (
                  <p className="text-gray-900">{formData.emergencyPhone}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}