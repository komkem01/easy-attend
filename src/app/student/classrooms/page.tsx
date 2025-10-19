'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import StudentLayout from '@/components/student/StudentLayout';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Clock, 
  User,
  Mail,
  Phone,
  MapPin,
  Plus,
  Search
} from 'lucide-react';

export default function StudentClassroomsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCode, setJoinCode] = useState('');

  // Mock data for enrolled classrooms
  const classrooms = [
    {
      id: 1,
      name: 'คณิตศาสตร์ 1',
      subject: 'Mathematics',
      teacher: 'อ.สมชาย สุขใส',
      email: 'somchai@school.ac.th',
      phone: '02-123-4567',
      room: 'ห้อง 201 อาคาร A',
      schedule: 'จันทร์, พุธ, ศุกร์ 09:00-10:30',
      students: 32,
      description: 'เรียนพื้นฐานคณิตศาสตร์ระดับมัธยมศึกษาตอนปลาย',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'ฟิสิกส์ 2',
      subject: 'Physics',
      teacher: 'อ.สมหญิง วิทยา',
      email: 'somying@school.ac.th',
      phone: '02-123-4568',
      room: 'ห้อง 301 อาคาร B',
      schedule: 'อังคาร, พฤหัสบดี 13:00-14:30',
      students: 28,
      description: 'ศึกษาเรื่องกลศาสตร์และเทอร์โมไดนามิกส์',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      name: 'เคมี 1',
      subject: 'Chemistry',
      teacher: 'อ.วิชัย เก่งเก้า',
      email: 'wichai@school.ac.th',
      phone: '02-123-4569',
      room: 'ห้องแลป เคมี อาคาร C',
      schedule: 'พุธ, ศุกร์ 15:00-16:30',
      students: 25,
      description: 'เรียนเคมีพื้นฐานและเคมีอินทรีย์',
      color: 'bg-green-500'
    }
  ];

  const filteredClassrooms = classrooms.filter(classroom =>
    classroom.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classroom.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    classroom.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleJoinClassroom = () => {
    if (!joinCode.trim()) {
      alert('กรุณาใส่รหัสห้องเรียน');
      return;
    }
    
    // Here would be the actual join logic
    alert(`กำลังเข้าร่วมห้องเรียนด้วยรหัส: ${joinCode}`);
    setJoinCode('');
    setShowJoinModal(false);
  };

  return (
    <StudentLayout 
      title="ห้องเรียน" 
      subtitle="ห้องเรียนที่เข้าร่วม"
      activeMenuItem="classrooms"
    >
      <div className="space-y-6">
        {/* Header with Search and Join Button */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500"
                placeholder="ค้นหาห้องเรียน ครู หรือวิชา..."
              />
            </div>
          </div>
          <button
            onClick={() => setShowJoinModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            เข้าร่วมห้องเรียน
          </button>
        </div>

        {/* Classrooms Grid */}
        {filteredClassrooms.length === 0 ? (
          <div className="text-center py-12">
            {searchTerm ? (
              <>
                <Search className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">ไม่พบห้องเรียน</h3>
                <p className="mt-1 text-sm text-gray-500">
                  ไม่พบห้องเรียนที่ตรงกับคำค้นหา &ldquo;{searchTerm}&rdquo;
                </p>
              </>
            ) : (
              <>
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">ยังไม่ได้เข้าร่วมห้องเรียน</h3>
                <p className="mt-1 text-sm text-gray-500">
                  เริ่มต้นโดยการเข้าร่วมห้องเรียนแรกของคุณ
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClassrooms.map((classroom) => (
              <div key={classroom.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`${classroom.color} h-32 p-6 text-white relative`}>
                  <div className="absolute top-4 right-4">
                    <BookOpen className="h-8 w-8 opacity-75" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{classroom.name}</h3>
                  <p className="text-sm opacity-90">{classroom.subject}</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{classroom.teacher}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="truncate">{classroom.email}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{classroom.phone}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{classroom.room}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{classroom.schedule}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{classroom.students} นักเรียน</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-700">{classroom.description}</p>
                  </div>
                  
                  <div className="mt-6 flex gap-2">
                    <Link 
                      href={`/student/classrooms/${classroom.id}`}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-center"
                    >
                      เข้าห้องเรียน
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Join Classroom Modal */}
        {showJoinModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowJoinModal(false)}></div>
              </div>
              
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <Plus className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      เข้าร่วมห้องเรียน
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        ใส่รหัสห้องเรียนที่ได้รับจากครู
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    placeholder="รหัสห้องเรียน (เช่น CLASS123)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-center text-lg font-mono"
                    maxLength={10}
                  />
                </div>
                <div className="mt-5 sm:mt-6 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleJoinClassroom}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    เข้าร่วม
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowJoinModal(false);
                      setJoinCode('');
                    }}
                    className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    ยกเลิก
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}