'use client';

import React, { useState } from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import { 
  BookOpen, 
  TrendingUp, 
  Award, 
  BarChart3, 
  Filter,
  Calendar,
  User
} from 'lucide-react';

export default function StudentGradesPage() {
  const [selectedSemester, setSelectedSemester] = useState('current');

  // Mock grades data
  const gradesData = [
    {
      id: 1,
      subject: 'คณิตศาสตร์ 1',
      teacher: 'อ.สมชาย สุขใส',
      semester: 'current',
      assignments: [
        { name: 'การบ้านที่ 1', score: 9, maxScore: 10, date: '2024-01-15' },
        { name: 'การบ้านที่ 2', score: 8, maxScore: 10, date: '2024-01-20' },
        { name: 'สอบย่อย 1', score: 18, maxScore: 20, date: '2024-01-25' }
      ],
      totalScore: 35,
      maxTotalScore: 40,
      grade: 'A',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      subject: 'ฟิสิกส์ 2',
      teacher: 'อ.สมหญิง วิทยา',
      semester: 'current',
      assignments: [
        { name: 'รายงานการทดลอง 1', score: 16, maxScore: 20, date: '2024-01-12' },
        { name: 'แบบฝึกหัด 1', score: 14, maxScore: 15, date: '2024-01-18' },
        { name: 'สอบย่อย 1', score: 22, maxScore: 25, date: '2024-01-22' }
      ],
      totalScore: 52,
      maxTotalScore: 60,
      grade: 'B+',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      subject: 'เคมี 1',
      teacher: 'อ.วิชัย เก่งเก้า',
      semester: 'current',
      assignments: [
        { name: 'แบบฝึกหัดเคมีอินทรีย์', score: 13, maxScore: 15, date: '2024-01-10' },
        { name: 'รายงานการทดลอง 1', score: 17, maxScore: 20, date: '2024-01-16' }
      ],
      totalScore: 30,
      maxTotalScore: 35,
      grade: 'A-',
      color: 'bg-green-500'
    }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'text-green-600 bg-green-100';
      case 'A-':
        return 'text-green-600 bg-green-100';
      case 'B+':
        return 'text-blue-600 bg-blue-100';
      case 'B':
        return 'text-blue-600 bg-blue-100';
      case 'B-':
        return 'text-blue-600 bg-blue-100';
      case 'C+':
        return 'text-yellow-600 bg-yellow-100';
      case 'C':
        return 'text-yellow-600 bg-yellow-100';
      case 'C-':
        return 'text-yellow-600 bg-yellow-100';
      case 'D+':
        return 'text-orange-600 bg-orange-100';
      case 'D':
        return 'text-orange-600 bg-orange-100';
      case 'F':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const calculateGPA = () => {
    const gradePoints: { [key: string]: number } = {
      'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
    
    const totalPoints = gradesData.reduce((sum, subject) => {
      return sum + (gradePoints[subject.grade] || 0);
    }, 0);
    
    return (totalPoints / gradesData.length).toFixed(2);
  };

  const filteredGrades = gradesData.filter(grade => grade.semester === selectedSemester);

  return (
    <StudentLayout 
      title="คะแนน" 
      subtitle="ดูคะแนนและเกรดของแต่ละวิชา"
      activeMenuItem="grades"
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">GPA ภาคเรียนปัจจุบัน</p>
                <p className="text-2xl font-bold text-gray-900">{calculateGPA()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">จำนวนวิชา</p>
                <p className="text-2xl font-bold text-gray-900">{filteredGrades.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">คะแนนเฉลี่ย</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(() => {
                    const totalScore = filteredGrades.reduce((sum, subject) => sum + subject.totalScore, 0);
                    const totalMaxScore = filteredGrades.reduce((sum, subject) => sum + subject.maxTotalScore, 0);
                    return totalMaxScore > 0 ? ((totalScore / totalMaxScore) * 100).toFixed(1) : '0.0';
                  })()}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Semester Filter */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              เลือกภาคเรียน
            </h3>
          </div>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 rounded-md bg-white text-gray-900"
          >
            <option value="current">ภาคเรียนปัจจุบัน (2/2567)</option>
            <option value="previous">ภาคเรียนก่อนหน้า (1/2567)</option>
            <option value="all">ทุกภาคเรียน</option>
          </select>
        </div>

        {/* Grades by Subject */}
        <div className="space-y-6">
          {filteredGrades.map((subject) => (
            <div key={subject.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`${subject.color} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{subject.subject}</h3>
                    <div className="flex items-center mt-2 opacity-90">
                      <User className="h-4 w-4 mr-2" />
                      <span>{subject.teacher}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold bg-white ${getGradeColor(subject.grade).replace('bg-', 'text-').replace('-100', '-600')}`}>
                      {subject.grade}
                    </div>
                    <div className="mt-2 text-sm text-white opacity-90">
                      {subject.totalScore}/{subject.maxTotalScore} คะแนน
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">รายละเอียดคะแนน</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    คะแนนรวม: {((subject.totalScore / subject.maxTotalScore) * 100).toFixed(1)}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>ความคืบหน้า</span>
                    <span>{subject.totalScore}/{subject.maxTotalScore}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(subject.totalScore / subject.maxTotalScore) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Assignments List */}
                <div className="space-y-3">
                  {subject.assignments.map((assignment, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{assignment.name}</h5>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          (assignment.score / assignment.maxScore) >= 0.8 
                            ? 'bg-green-100 text-green-800'
                            : (assignment.score / assignment.maxScore) >= 0.6
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {assignment.score}/{assignment.maxScore}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{new Date(assignment.date).toLocaleDateString('th-TH')}</span>
                        <span className="ml-auto">
                          {((assignment.score / assignment.maxScore) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div 
                            className={`h-1 rounded-full transition-all duration-300 ${
                              (assignment.score / assignment.maxScore) >= 0.8 
                                ? 'bg-green-500'
                                : (assignment.score / assignment.maxScore) >= 0.6
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${(assignment.score / assignment.maxScore) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGrades.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">ไม่มีข้อมูลคะแนน</h3>
            <p className="mt-1 text-sm text-gray-500">
              ยังไม่มีคะแนนสำหรับภาคเรียนที่เลือก
            </p>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}