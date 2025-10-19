'use client';

import React, { useState } from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  User
} from 'lucide-react';

export default function StudentSchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Mock schedule data
  const scheduleData = [
    {
      id: 1,
      subject: 'คณิตศาสตร์ 1',
      teacher: 'อ.สมชาย',
      room: 'ห้อง 201 อาคาร A',
      day: 'monday',
      startTime: '09:00',
      endTime: '10:30',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      subject: 'คณิตศาสตร์ 1',
      teacher: 'อ.สมชาย',
      room: 'ห้อง 201 อาคาร A',
      day: 'wednesday',
      startTime: '09:00',
      endTime: '10:30',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      subject: 'คณิตศาสตร์ 1',
      teacher: 'อ.สมชาย',
      room: 'ห้อง 201 อาคาร A',
      day: 'friday',
      startTime: '09:00',
      endTime: '10:30',
      color: 'bg-blue-500'
    },
    {
      id: 4,
      subject: 'ฟิสิกส์ 2',
      teacher: 'อ.สมหญิง',
      room: 'ห้อง 301 อาคาร B',
      day: 'tuesday',
      startTime: '13:00',
      endTime: '14:30',
      color: 'bg-purple-500'
    },
    {
      id: 5,
      subject: 'ฟิสิกส์ 2',
      teacher: 'อ.สมหญิง',
      room: 'ห้อง 301 อาคาร B',
      day: 'thursday',
      startTime: '13:00',
      endTime: '14:30',
      color: 'bg-purple-500'
    },
    {
      id: 6,
      subject: 'เคมี 1',
      teacher: 'อ.วิชัย',
      room: 'ห้องแลป เคมี อาคาร C',
      day: 'wednesday',
      startTime: '15:00',
      endTime: '16:30',
      color: 'bg-green-500'
    },
    {
      id: 7,
      subject: 'เคมี 1',
      teacher: 'อ.วิชัย',
      room: 'ห้องแลป เคมี อาคาร C',
      day: 'friday',
      startTime: '15:00',
      endTime: '16:30',
      color: 'bg-green-500'
    }
  ];

  const days = [
    { key: 'monday', name: 'จันทร์', shortName: 'จ' },
    { key: 'tuesday', name: 'อังคาร', shortName: 'อ' },
    { key: 'wednesday', name: 'พุธ', shortName: 'พ' },
    { key: 'thursday', name: 'พฤหัสบดี', shortName: 'พฤ' },
    { key: 'friday', name: 'ศุกร์', shortName: 'ศ' },
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const getWeekDates = (date: Date) => {
    const monday = new Date(date);
    monday.setDate(date.getDate() - date.getDay() + 1);
    
    const weekDates = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(monday);
      day.setDate(monday.getDate() + i);
      weekDates.push(day);
    }
    return weekDates;
  };

  const weekDates = getWeekDates(currentWeek);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const goToCurrentWeek = () => {
    setCurrentWeek(new Date());
  };

  const getClassesForDay = (dayKey: string) => {
    return scheduleData.filter(item => item.day === dayKey);
  };

  const formatWeekRange = () => {
    const firstDay = weekDates[0];
    const lastDay = weekDates[4];
    return `${firstDay.getDate()}/${firstDay.getMonth() + 1} - ${lastDay.getDate()}/${lastDay.getMonth() + 1}/${lastDay.getFullYear()}`;
  };

  return (
    <StudentLayout 
      title="ตารางเรียน" 
      subtitle="ตารางเรียนรายสัปดาห์"
      activeMenuItem="schedule"
    >
      <div className="space-y-6">
        {/* Week Navigation */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
          <button
            onClick={() => navigateWeek('prev')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900">
              สัปดาห์ที่ {formatWeekRange()}
            </h2>
            <button
              onClick={goToCurrentWeek}
              className="mt-1 text-sm text-green-600 hover:text-green-700 focus:outline-none"
            >
              กลับสัปดาห์ปัจจุบัน
            </button>
          </div>

          <button
            onClick={() => navigateWeek('next')}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Schedule Grid - Desktop */}
        <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-6 border-b border-gray-200">
            <div className="p-4 bg-gray-50 font-medium text-sm text-gray-700">เวลา</div>
            {days.map((day, index) => (
              <div key={day.key} className="p-4 bg-gray-50 text-center">
                <div className="font-medium text-sm text-gray-700">{day.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {weekDates[index]?.getDate()}/{weekDates[index]?.getMonth() + 1}
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            {timeSlots.map((time, timeIndex) => (
              <div key={time} className="grid grid-cols-6 border-b border-gray-100 min-h-[60px]">
                <div className="p-4 bg-gray-50 text-sm text-gray-600 font-medium border-r border-gray-200">
                  {time}
                </div>
                {days.map((day) => {
                  const classes = getClassesForDay(day.key).filter(cls => {
                    const classHour = parseInt(cls.startTime.split(':')[0]);
                    const slotHour = parseInt(time.split(':')[0]);
                    return classHour === slotHour;
                  });

                  return (
                    <div key={`${day.key}-${time}`} className="border-r border-gray-100 relative">
                      {classes.map((cls) => (
                        <div
                          key={cls.id}
                          className={`absolute inset-1 ${cls.color} text-white text-xs p-2 rounded shadow-sm`}
                          style={{ height: '90px' }} // Span across time slots
                        >
                          <div className="font-semibold truncate">{cls.subject}</div>
                          <div className="flex items-center mt-1 opacity-90">
                            <User className="h-3 w-3 mr-1" />
                            <span className="truncate">{cls.teacher}</span>
                          </div>
                          <div className="flex items-center mt-1 opacity-90">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="truncate">{cls.room}</span>
                          </div>
                          <div className="flex items-center mt-1 opacity-90">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{cls.startTime}-{cls.endTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Schedule List - Mobile */}
        <div className="lg:hidden space-y-4">
          {days.map((day, index) => (
            <div key={day.key} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{day.name}</h3>
                  <span className="text-sm text-gray-500">
                    {weekDates[index]?.getDate()}/{weekDates[index]?.getMonth() + 1}
                  </span>
                </div>
              </div>

              <div className="p-4">
                {getClassesForDay(day.key).length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">ไม่มีคาบเรียน</p>
                ) : (
                  <div className="space-y-3">
                    {getClassesForDay(day.key).map((cls) => (
                      <div key={cls.id} className={`${cls.color} text-white p-3 rounded-md`}>
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{cls.subject}</h4>
                          <div className="flex items-center text-sm opacity-90">
                            <Clock className="h-4 w-4 mr-1" />
                            {cls.startTime}-{cls.endTime}
                          </div>
                        </div>
                        <div className="space-y-1 text-sm opacity-90">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            {cls.teacher}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            {cls.room}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Today's Classes Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">คาบเรียนวันนี้</h3>
          </div>

          {(() => {
            const today = new Date();
            const todayKey = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][today.getDay()];
            const todayClasses = getClassesForDay(todayKey);

            if (todayClasses.length === 0) {
              return (
                <p className="text-gray-500 text-center py-4">วันนี้ไม่มีคาบเรียน</p>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {todayClasses.map((cls) => (
                  <div key={cls.id} className="border border-gray-200 rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                      <h4 className="font-medium text-gray-900">{cls.subject}</h4>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        {cls.teacher}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        {cls.startTime} - {cls.endTime}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        {cls.room}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </StudentLayout>
  );
}