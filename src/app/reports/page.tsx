'use client';

import React, { useState } from 'react';
import TeacherLayout from '@/components/TeacherLayout';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  Users, 
  TrendingUp,
  FileText,
  Filter,
  RefreshCw,
  PieChart,
  Activity
} from 'lucide-react';

interface ReportData {
  classroom: string;
  totalSessions: number;
  averageAttendance: number;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
}

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedClassroom, setSelectedClassroom] = useState('all');

  // Mock data
  const reportData: ReportData[] = [
    {
      classroom: 'คณิตศาสตร์ ม.3/1',
      totalSessions: 20,
      averageAttendance: 87.5,
      totalStudents: 32,
      presentCount: 560,
      absentCount: 48,
      lateCount: 32,
      excusedCount: 0
    },
    {
      classroom: 'ฟิสิกส์ ม.5/1',
      totalSessions: 18,
      averageAttendance: 92.3,
      totalStudents: 28,
      presentCount: 465,
      absentCount: 24,
      lateCount: 15,
      excusedCount: 0
    },
    {
      classroom: 'เคมี ม.4/2',
      totalSessions: 16,
      averageAttendance: 83.3,
      totalStudents: 30,
      presentCount: 400,
      absentCount: 60,
      lateCount: 20,
      excusedCount: 0
    }
  ];

  const classrooms = [
    { id: 'all', name: 'ทุกห้องเรียน' },
    { id: '1', name: 'คณิตศาสตร์ ม.3/1' },
    { id: '2', name: 'ฟิสิกส์ ม.5/1' },
    { id: '3', name: 'เคมี ม.4/2' }
  ];

  const periods = [
    { value: 'week', label: 'สัปดาห์นี้' },
    { value: 'month', label: 'เดือนนี้' },
    { value: 'semester', label: 'ภาคเรียนนี้' },
    { value: 'year', label: 'ปีการศึกษานี้' }
  ];

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    console.log(`Exporting report as ${format}`);
    alert(`กำลังดาวน์โหลดรายงานในรูปแบบ ${format.toUpperCase()}`);
  };

  // Calculate totals
  const totals = reportData.reduce((acc, curr) => ({
    totalStudents: acc.totalStudents + curr.totalStudents,
    presentCount: acc.presentCount + curr.presentCount,
    absentCount: acc.absentCount + curr.absentCount,
    lateCount: acc.lateCount + curr.lateCount,
    totalSessions: acc.totalSessions + curr.totalSessions
  }), {
    totalStudents: 0,
    presentCount: 0,
    absentCount: 0,
    lateCount: 0,
    totalSessions: 0
  });

  const overallAttendance = reportData.length > 0 
    ? reportData.reduce((sum, r) => sum + r.averageAttendance, 0) / reportData.length 
    : 0;

  return (
    <TeacherLayout
      title="รายงานการเข้าเรียน"
      subtitle="สถิติและรายงานการเข้าเรียนของนักเรียน"
      activeMenuItem="reports"
    >
      {/* Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Calendar className="h-4 w-4 text-gray-500" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm sm:text-base"
            >
              {periods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={selectedClassroom}
              onChange={(e) => setSelectedClassroom(e.target.value)}
              className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm sm:text-base"
            >
              {classrooms.map((classroom) => (
                <option key={classroom.id} value={classroom.id}>
                  {classroom.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
          <button className="flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm sm:text-base">
            <RefreshCw className="h-4 w-4" />
            <span>รีเฟรช</span>
          </button>
          <div className="relative">
            <button className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm sm:text-base">
              <Download className="h-4 w-4" />
              <span>ดาวน์โหลด</span>
            </button>
            {/* Dropdown menu for export options */}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">เปอร์เซ็นต์เข้าเรียนรวม</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{overallAttendance.toFixed(1)}%</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">นักเรียนทั้งหมด</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{totals.totalStudents}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">รอบเช็คชื่อทั้งหมด</p>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{totals.totalSessions}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">การเข้าเรียนรวม</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{totals.presentCount + totals.lateCount}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Activity className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
        {/* Classroom Statistics */}
        <div className="xl:col-span-2 bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">สถิติการเข้าเรียนรายห้อง</h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="space-y-4">
              {reportData.map((data, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{data.classroom}</h3>
                    <span className="text-sm font-medium text-gray-600">
                      {data.averageAttendance.toFixed(1)}% เข้าเรียน
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {/* Present */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>มาเรียน</span>
                      </div>
                      <span>{data.presentCount} ครั้ง</span>
                    </div>

                    {/* Late */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>มาสาย</span>
                      </div>
                      <span>{data.lateCount} ครั้ง</span>
                    </div>

                    {/* Absent */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>ขาดเรียน</span>
                      </div>
                      <span>{data.absentCount} ครั้ง</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${data.averageAttendance}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sm:space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900">สรุปการเข้าเรียน</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">มาเรียน</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{totals.presentCount}</div>
                    <div className="text-xs text-gray-500">
                      {((totals.presentCount / (totals.presentCount + totals.lateCount + totals.absentCount)) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">มาสาย</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{totals.lateCount}</div>
                    <div className="text-xs text-gray-500">
                      {((totals.lateCount / (totals.presentCount + totals.lateCount + totals.absentCount)) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">ขาดเรียน</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{totals.absentCount}</div>
                    <div className="text-xs text-gray-500">
                      {((totals.absentCount / (totals.presentCount + totals.lateCount + totals.absentCount)) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Export Options */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">ส่งออกรายงาน</h2>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={() => handleExport('pdf')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-medium">PDF Report</span>
                </div>
                <Download className="h-4 w-4 text-gray-400" />
              </button>

              <button
                onClick={() => handleExport('excel')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Excel File</span>
                </div>
                <Download className="h-4 w-4 text-gray-400" />
              </button>

              <button
                onClick={() => handleExport('csv')}
                className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <PieChart className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">CSV Data</span>
                </div>
                <Download className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">การดำเนินการด่วน</h3>
            <div className="space-y-2 text-sm text-blue-700">
              <button className="w-full text-left hover:underline">
                📊 ดูรายงานรายวัน
              </button>
              <button className="w-full text-left hover:underline">
                📈 เปรียบเทียบภาคเรียน
              </button>
              <button className="w-full text-left hover:underline">
                🎯 ตั้งเป้าหมายการเข้าเรียน
              </button>
            </div>
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}