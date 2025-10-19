'use client';

import React, { useState } from 'react';
import StudentLayout from '@/components/student/StudentLayout';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Upload, 
  Download, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Eye,
  BookOpen,
  Target,
  TrendingUp,
  Award,
  CheckCircle2,
  Timer,
  Users,
  BarChart3,
  FileCheck,
  Edit3,
  PaperclipIcon,
  Bell,
  X,
  CheckCircle as CheckIcon,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function StudentAssignmentsPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'submitted' | 'completed'>('pending');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [notes, setNotes] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showGradeModal, setShowGradeModal] = useState(false);
  
  // Notification system
  const [notifications, setNotifications] = useState<{
    id: number;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
  }[]>([]);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Mock submission data
  const mockSubmissions = {
    1: { files: [], notes: '' },
    2: { 
      files: [
        { name: 'รายงานแรงโน้มถ่วง.pdf', size: 2543210, type: 'application/pdf' },
        { name: 'กราฟการทดลอง.jpg', size: 856743, type: 'image/jpeg' }
      ], 
      notes: 'ผลการทดลองออกมาตามที่คาดหวัง ข้อมูลมีความแม่นยำสูง' 
    },
    3: { 
      files: [
        { name: 'แบบฝึกหัดเคมี.pdf', size: 1234567, type: 'application/pdf' }
      ], 
      notes: 'ทำแบบฝึกหัดครบทุกข้อแล้วครับ' 
    },
    5: { 
      files: [
        { name: 'เรียงความประวัติศาสตร์.docx', size: 987654, type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
      ], 
      notes: 'เขียนตามหัวข้อที่กำหนด 1500 คำพอดี' 
    },
    6: { 
      files: [], 
      notes: 'ทำแบบทดสอบออนไลน์ผ่านระบบแล้ว' 
    }
  };

  // Mock data for assignments
  const assignments = [
    {
      id: 1,
      title: 'การบ้านที่ 1: พีชคणิต',
      subject: 'คณิตศาสตร์ 1',
      teacher: 'อ.สมชาย',
      dueDate: '2024-01-20',
      dueTime: '23:59',
      status: 'pending',
      description: 'แก้โจทย์พีชคณิตข้อ 1-10 ในหนังสือเรียน หน้า 45',
      points: 10,
      submissionType: 'file'
    },
    {
      id: 2,
      title: 'รายงานการทดลอง: แรงโน้มถ่วง',
      subject: 'ฟิสิกส์ 2',
      teacher: 'อ.สมหญิง',
      dueDate: '2024-01-18',
      dueTime: '16:00',
      status: 'submitted',
      description: 'เขียนรายงานการทดลองเรื่องแรงโน้มถ่วงของโลก',
      points: 20,
      submissionType: 'file',
      submittedDate: '2024-01-17',
      submittedTime: '14:30'
    },
    {
      id: 3,
      title: 'แบบฝึกหัดเคมีอินทรีย์',
      subject: 'เคมี 1',
      teacher: 'อ.วิชัย',
      dueDate: '2024-01-10',
      dueTime: '23:59',
      status: 'completed',
      description: 'แก้แบบฝึกหัดเคมีอินทรีย์บท 3',
      points: 15,
      grade: 13,
      submissionType: 'online',
      submittedDate: '2024-01-09',
      submittedTime: '20:15'
    },
    {
      id: 4,
      title: 'โครงงานวิทยาศาสตร์',
      subject: 'วิทยาศาสตร์',
      teacher: 'อ.นิรมล',
      dueDate: '2024-02-01',
      dueTime: '17:00',
      status: 'pending',
      description: 'ทำโครงงานเรื่องพลังงานทดแทน พร้อมนำเสนอ',
      points: 25,
      submissionType: 'presentation'
    },
    {
      id: 5,
      title: 'เรียงความ: ประวัติศาสตร์ไทย',
      subject: 'ประวัติศาสตร์',
      teacher: 'อ.สุชาติ',
      dueDate: '2024-01-25',
      dueTime: '23:59',
      status: 'submitted',
      description: 'เขียนเรียงความเรื่องราชวงศ์จักรี 1500 คำ',
      points: 20,
      submissionType: 'file',
      submittedDate: '2024-01-24',
      submittedTime: '19:45'
    },
    {
      id: 6,
      title: 'แบบทดสอบออนไลน์: ภาษาอังกฤษ',
      subject: 'ภาษาอังกฤษ',
      teacher: 'อ.จุฬาลักษณ์',
      dueDate: '2024-01-15',
      dueTime: '14:00',
      status: 'completed',
      description: 'ทำแบบทดสอบออนไลน์ Grammar และ Vocabulary',
      points: 30,
      grade: 28,
      submissionType: 'online',
      submittedDate: '2024-01-14',
      submittedTime: '13:30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'submitted':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'overdue':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'submitted':
        return <Upload className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'overdue':
        return <XCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'รอส่ง';
      case 'submitted':
        return 'ส่งแล้ว';
      case 'completed':
        return 'ตรวจแล้ว';
      case 'overdue':
        return 'เกินกำหนด';
      default:
        return 'ไม่ทราบ';
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (activeTab === 'pending') return assignment.status === 'pending';
    if (activeTab === 'submitted') return assignment.status === 'submitted';
    if (activeTab === 'completed') return assignment.status === 'completed';
    return true;
  });

  const isOverdue = (dueDate: string, dueTime: string) => {
    const due = new Date(`${dueDate}T${dueTime}`);
    return new Date() > due;
  };

  // Calculate statistics
  const totalAssignments = assignments.length;
  const pendingCount = assignments.filter(a => a.status === 'pending').length;
  const submittedCount = assignments.filter(a => a.status === 'submitted').length;
  const completedCount = assignments.filter(a => a.status === 'completed').length;
  const overdueCount = assignments.filter(a => 
    a.status === 'pending' && isOverdue(a.dueDate, a.dueTime)
  ).length;

  const totalPoints = assignments.filter(a => a.status === 'completed').reduce((sum, a) => sum + a.points, 0);
  const earnedPoints = assignments.filter(a => a.status === 'completed' && a.grade).reduce((sum, a) => sum + (a.grade || 0), 0);
  const averageScore = totalPoints > 0 ? (earnedPoints / totalPoints * 100) : 0;

  // File upload handlers
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const files = Array.from(event.dataTransfer.files);
    const validFiles = files.filter(file => {
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileType: string) => {
    if (fileType === 'application/pdf') {
      return '📄';
    } else if (fileType.startsWith('image/')) {
      return '🖼️';
    }
    return '📎';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Notification functions
  const addNotification = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string, duration = 5000) => {
    const id = Date.now();
    const newNotification = { id, type, title, message, duration };
    setNotifications(prev => [...prev, newNotification]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleSubmitAssignment = () => {
    // Simulate file upload process
    addNotification('info', 'กำลังส่งงาน', 'กรุณารอสักครู่...');
    
    setTimeout(() => {
      // Here you would normally upload files to server
      console.log('Submitting assignment:', {
        assignment: selectedAssignment,
        files: uploadedFiles,
        notes: notes
      });
      
      // Reset form and close modal
      setUploadedFiles([]);
      setNotes('');
      setShowUploadModal(false);
      setSelectedAssignment(null);
      
      // Show success notification
      addNotification('success', 'ส่งงานสำเร็จ!', `ส่งงาน "${selectedAssignment?.title}" เรียบร้อยแล้ว`);
    }, 2000);
  };

  // Handle page leave warning
  const handlePageLeave = () => {
    if (showUploadModal && (uploadedFiles.length > 0 || notes.trim() !== '')) {
      setShowExitConfirm(true);
    } else {
      // Navigate away or close
      window.history.back();
    }
  };

  // Add beforeunload event listener
  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (showUploadModal && (uploadedFiles.length > 0 || notes.trim() !== '')) {
        e.preventDefault();
        e.returnValue = 'คุณมีงานที่ยังไม่ได้บันทึก คุณต้องการออกจากหน้านี้หรือไม่?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [showUploadModal, uploadedFiles, notes]);

  // Handle file download
  const handleDownload = (filename: string) => {
    addNotification('info', 'กำลังดาวน์โหลด', `เริ่มดาวน์โหลดไฟล์ ${filename}`);
    
    // Simulate download process
    setTimeout(() => {
      // Create a blob URL and trigger download (simulation)
      const link = document.createElement('a');
      link.href = '#'; // In real app, this would be the file URL
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      addNotification('success', 'ดาวน์โหลดสำเร็จ', `ดาวน์โหลดไฟล์ ${filename} เรียบร้อยแล้ว`);
    }, 1500);
  };

  // Handle modal actions with notifications
  const handleViewDetail = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowDetailModal(true);
    addNotification('info', 'แสดงรายละเอียด', `เปิดรายละเอียดงาน "${assignment.title}"`);
  };

  const handleViewSubmission = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowSubmissionModal(true);
    addNotification('info', 'แสดงงานที่ส่ง', `เปิดดูงานที่ส่ง "${assignment.title}"`);
  };

  const handleViewGrade = (assignment: any) => {
    setSelectedAssignment(assignment);
    setShowGradeModal(true);
    addNotification('info', 'แสดงคะแนน', `เปิดดูคะแนนงาน "${assignment.title}"`);
  };



  return (
    <StudentLayout 
      title="งานที่ได้รับมอบหมาย" 
      subtitle="ดูและส่งงานที่ครูมอบหมาย"
      activeMenuItem="assignments"
    >
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">งานทั้งหมด</p>
                <p className="text-3xl font-bold text-blue-900">{totalAssignments}</p>
                <p className="text-xs text-blue-600 mt-1">งานที่ได้รับมอบหมาย</p>
              </div>
              <div className="bg-blue-200 p-3 rounded-full">
                <FileText className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">รอส่ง</p>
                <p className="text-3xl font-bold text-yellow-900">{pendingCount}</p>
                <p className="text-xs text-yellow-600 mt-1">
                  {overdueCount > 0 ? `เกินกำหนด ${overdueCount} งาน` : 'ทันกำหนดทุกงาน'}
                </p>
              </div>
              <div className="bg-yellow-200 p-3 rounded-full">
                <Timer className="h-6 w-6 text-yellow-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">ส่งแล้ว</p>
                <p className="text-3xl font-bold text-green-900">{submittedCount + completedCount}</p>
                <p className="text-xs text-green-600 mt-1">
                  เสร็จแล้ว {Math.round(((submittedCount + completedCount) / totalAssignments) * 100)}%
                </p>
              </div>
              <div className="bg-green-200 p-3 rounded-full">
                <CheckCircle2 className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">คะแนนเฉลี่ย</p>
                <p className="text-3xl font-bold text-purple-900">{averageScore.toFixed(1)}%</p>
                <p className="text-xs text-purple-600 mt-1">
                  {earnedPoints}/{totalPoints} คะแนน
                </p>
              </div>
              <div className="bg-purple-200 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </div>
        </div>
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md">
          <nav className="flex space-x-0 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex-1 py-4 px-6 font-medium text-sm transition-all duration-200 ${
                activeTab === 'pending'
                  ? 'bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-700 border-b-2 border-yellow-500'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Timer className="h-5 w-5" />
                <span>รอส่ง</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === 'pending' 
                    ? 'bg-yellow-200 text-yellow-800' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {pendingCount}
                </span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('submitted')}
              className={`flex-1 py-4 px-6 font-medium text-sm transition-all duration-200 ${
                activeTab === 'submitted'
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-b-2 border-blue-500'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Upload className="h-5 w-5" />
                <span>ส่งแล้ว</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === 'submitted' 
                    ? 'bg-blue-200 text-blue-800' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {submittedCount}
                </span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('completed')}
              className={`flex-1 py-4 px-6 font-medium text-sm transition-all duration-200 ${
                activeTab === 'completed'
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-b-2 border-green-500'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>ตรวจแล้ว</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === 'completed' 
                    ? 'bg-green-200 text-green-800' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {completedCount}
                </span>
              </div>
            </button>
          </nav>
        </div>

        {/* Assignments List */}
        <div className="space-y-6">
          {filteredAssignments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FileText className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">ไม่มีงาน</h3>
              <p className="text-sm text-gray-500 mb-6">
                {activeTab === 'pending' && 'ไม่มีงานที่รอส่ง ยอดเยี่ยม!'}
                {activeTab === 'submitted' && 'ไม่มีงานที่ส่งแล้ว'}
                {activeTab === 'completed' && 'ไม่มีงานที่ตรวจแล้ว'}
              </p>
              <div className="text-xs text-gray-400">
                {activeTab === 'pending' ? '🎉 คุณได้ส่งงานครบทุกงานแล้ว!' : 'รองานใหม่จากครู'}
              </div>
            </div>
          ) : (
            filteredAssignments.map((assignment, index) => {
              const overdue = assignment.status === 'pending' && isOverdue(assignment.dueDate, assignment.dueTime);
              const displayStatus = overdue ? 'overdue' : assignment.status;
              
              return (
                <div key={assignment.id} className={`bg-white rounded-lg shadow-md transition-all duration-200 hover:shadow-lg ${
                  overdue ? 'border-l-4 border-red-500' : 
                  assignment.status === 'completed' ? 'border-l-4 border-green-500' :
                  assignment.status === 'submitted' ? 'border-l-4 border-blue-500' :
                  'border-l-4 border-yellow-500'
                }`}>
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            overdue ? 'bg-red-100' : 
                            assignment.status === 'completed' ? 'bg-green-100' :
                            assignment.status === 'submitted' ? 'bg-blue-100' :
                            'bg-yellow-100'
                          }`}>
                            {overdue ? <XCircle className="h-6 w-6 text-red-600" /> :
                             assignment.status === 'completed' ? <CheckCircle2 className="h-6 w-6 text-green-600" /> :
                             assignment.status === 'submitted' ? <Upload className="h-6 w-6 text-blue-600" /> :
                             <Timer className="h-6 w-6 text-yellow-600" />}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                              <h3 className="text-xl font-bold text-gray-900">
                                {assignment.title}
                              </h3>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(displayStatus)}`}>
                                {getStatusIcon(displayStatus)}
                                <span className="ml-2">{getStatusText(displayStatus)}</span>
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                <span className="font-medium">{assignment.subject}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {assignment.teacher}
                              </span>
                              <span className="flex items-center gap-1">
                                <Target className="h-4 w-4" />
                                {assignment.points} คะแนน
                              </span>
                            </div>
                            
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {assignment.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Assignment Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-gray-600 mr-3" />
                        <div>
                          <p className="text-xs text-gray-500">กำหนดส่ง</p>
                          <p className="text-sm font-medium text-gray-900">
                            {new Date(assignment.dueDate).toLocaleDateString('th-TH')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Clock className="h-5 w-5 text-gray-600 mr-3" />
                        <div>
                          <p className="text-xs text-gray-500">เวลา</p>
                          <p className="text-sm font-medium text-gray-900">{assignment.dueTime}</p>
                        </div>
                      </div>

                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <FileText className="h-5 w-5 text-gray-600 mr-3" />
                        <div>
                          <p className="text-xs text-gray-500">ประเภทงาน</p>
                          <p className="text-sm font-medium text-gray-900">
                            {assignment.submissionType === 'file' ? 'ไฟล์เอกสาร' : 
                             assignment.submissionType === 'online' ? 'ออนไลน์' : 'นำเสนอ'}
                          </p>
                        </div>
                      </div>

                      {assignment.status === 'completed' && assignment.grade && (
                        <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                          <Award className="h-5 w-5 text-green-600 mr-3" />
                          <div>
                            <p className="text-xs text-green-600">คะแนนที่ได้</p>
                            <p className="text-sm font-bold text-green-700">
                              {assignment.grade}/{assignment.points}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {(assignment.status === 'submitted' || assignment.status === 'completed') && (
                      <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center text-sm text-blue-800">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          <span>ส่งงานเมื่อ: {new Date(assignment.submittedDate!).toLocaleDateString('th-TH')} เวลา {assignment.submittedTime}</span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      {assignment.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => {
                              setSelectedAssignment(assignment);
                              setShowUploadModal(true);
                            }}
                            className="flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            <Upload className="h-5 w-5 mr-2" />
                            ส่งงาน
                          </button>
                          <button 
                            onClick={() => handleViewDetail(assignment)}
                            className="flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                          >
                            <Eye className="h-5 w-5 mr-2" />
                            ดูรายละเอียด
                          </button>
                        </>
                      )}
                      
                      {assignment.status === 'submitted' && (
                        <>
                          <button 
                            onClick={() => handleViewSubmission(assignment)}
                            className="flex items-center justify-center px-6 py-3 border-2 border-blue-300 text-sm font-semibold rounded-lg text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                          >
                            <Eye className="h-5 w-5 mr-2" />
                            ดูงานที่ส่ง
                          </button>
                          <button 
                            onClick={() => {
                              const submission = mockSubmissions[assignment.id as keyof typeof mockSubmissions];
                              if (submission?.files.length > 0) {
                                handleDownload(submission.files[0].name);
                              }
                            }}
                            className="flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                          >
                            <Download className="h-5 w-5 mr-2" />
                            ดาวน์โหลดงาน
                          </button>
                        </>
                      )}
                      
                      {assignment.status === 'completed' && (
                        <>
                          <button 
                            onClick={() => handleViewSubmission(assignment)}
                            className="flex items-center justify-center px-6 py-3 border-2 border-green-300 text-sm font-semibold rounded-lg text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                          >
                            <Eye className="h-5 w-5 mr-2" />
                            ดูงานที่ส่ง
                          </button>
                          <button 
                            onClick={() => handleViewGrade(assignment)}
                            className="flex items-center justify-center px-6 py-3 border-2 border-purple-300 text-sm font-semibold rounded-lg text-purple-700 bg-purple-50 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                          >
                            <BarChart3 className="h-5 w-5 mr-2" />
                            ดูผลตรวจ
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Upload Modal */}
        {showUploadModal && selectedAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">ส่งงาน</h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedAssignment.title}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (uploadedFiles.length > 0 || notes.trim() !== '') {
                        setShowExitConfirm(true);
                      } else {
                        setShowUploadModal(false);
                      }
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Assignment Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">วิชา:</span>
                        <span className="ml-2 font-medium">{selectedAssignment.subject}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">คะแนน:</span>
                        <span className="ml-2 font-medium">{selectedAssignment.points} คะแนน</span>
                      </div>
                      <div>
                        <span className="text-gray-500">กำหนดส่ง:</span>
                        <span className="ml-2 font-medium">
                          {new Date(selectedAssignment.dueDate).toLocaleDateString('th-TH')} {selectedAssignment.dueTime}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">ประเภท:</span>
                        <span className="ml-2 font-medium">
                          {selectedAssignment.submissionType === 'file' ? 'ไฟล์เอกสาร' : 
                           selectedAssignment.submissionType === 'online' ? 'ออนไลน์' : 'นำเสนอ'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* File Upload Area */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      อัปโหลดไฟล์งาน
                    </label>
                    <div 
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                        isDragOver 
                          ? 'border-green-400 bg-green-50' 
                          : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById('file-input')?.click()}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <div className="bg-green-100 p-3 rounded-full">
                            <Upload className="h-8 w-8 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-900">
                            คลิกเพื่อเลือกไฟล์หรือลากไฟล์มาวาง
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            รองรับไฟล์: PDF, JPG, PNG, GIF
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            ขนาดไฟล์สูงสุด 10MB ต่อไฟล์
                          </p>
                        </div>
                      </div>
                      <input
                        id="file-input"
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.gif"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Uploaded Files List */}
                  {uploadedFiles.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        ไฟล์ที่เลือก ({uploadedFiles.length} ไฟล์)
                      </h4>
                      <div className="space-y-2">
                        {uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{getFileIcon(file.type)}</span>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-500">
                                  {formatFileSize(file.size)} • {file.type.split('/')[1].toUpperCase()}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-600 transition-colors"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      หมายเหตุ (ถ้ามี)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
                      rows={4}
                      placeholder="เพิ่มหมายเหตุหรือข้อความเพิ่มเติม..."
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-8">
                  <button
                    onClick={() => {
                      if (uploadedFiles.length > 0 || notes.trim() !== '') {
                        setShowExitConfirm(true);
                      } else {
                        setShowUploadModal(false);
                      }
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={handleSubmitAssignment}
                    disabled={uploadedFiles.length === 0}
                    className={`flex-1 px-6 py-3 text-sm font-semibold rounded-lg transition-colors ${
                      uploadedFiles.length === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-md hover:shadow-lg'
                    }`}
                  >
                    <div className="flex items-center justify-center">
                      <Upload className="h-5 w-5 mr-2" />
                      ส่งงาน ({uploadedFiles.length} ไฟล์)
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Assignment Detail Modal */}
        {showDetailModal && selectedAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">รายละเอียดงาน</h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedAssignment.subject}</p>
                  </div>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Assignment Title & Description */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">{selectedAssignment.title}</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed">{selectedAssignment.description}</p>
                    </div>
                  </div>

                  {/* Assignment Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center mb-2">
                        <Users className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-medium text-blue-900">ผู้สอน</span>
                      </div>
                      <p className="text-blue-800">{selectedAssignment.teacher}</p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center mb-2">
                        <Target className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-medium text-green-900">คะแนน</span>
                      </div>
                      <p className="text-green-800">{selectedAssignment.points} คะแนน</p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center mb-2">
                        <Calendar className="h-5 w-5 text-yellow-600 mr-2" />
                        <span className="font-medium text-yellow-900">กำหนดส่ง</span>
                      </div>
                      <p className="text-yellow-800">
                        {new Date(selectedAssignment.dueDate).toLocaleDateString('th-TH')}
                      </p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-purple-600 mr-2" />
                        <span className="font-medium text-purple-900">เวลา</span>
                      </div>
                      <p className="text-purple-800">{selectedAssignment.dueTime}</p>
                    </div>
                  </div>

                  {/* Submission Type */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border">
                    <div className="flex items-center mb-2">
                      <FileText className="h-5 w-5 text-gray-600 mr-2" />
                      <span className="font-medium text-gray-900">ประเภทการส่งงาน</span>
                    </div>
                    <p className="text-gray-700">
                      {selectedAssignment.submissionType === 'file' ? '📎 ส่งไฟล์เอกสาร' : 
                       selectedAssignment.submissionType === 'online' ? '💻 ทำออนไลน์' : '🎤 นำเสนอ'}
                    </p>
                  </div>

                  {/* Instructions */}
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-semibold text-blue-900 mb-2">📋 คำแนะนำการทำงาน</h5>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• อ่านโจทย์หรือหัวข้องานให้เข้าใจ</li>
                      <li>• ทำงานตามรูปแบบที่กำหนด</li>
                      <li>• ตรวจสอบความถูกต้องก่อนส่ง</li>
                      <li>• ส่งงานก่อนเวลาที่กำหนด</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    ปิด
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submission View Modal */}
        {showSubmissionModal && selectedAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">งานที่ส่งแล้ว</h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedAssignment.title}</p>
                  </div>
                  <button
                    onClick={() => setShowSubmissionModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Submission Info */}
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-semibold text-green-900">สถานะการส่ง</span>
                    </div>
                    <p className="text-green-800">
                      ส่งเมื่อ: {selectedAssignment.submittedDate ? new Date(selectedAssignment.submittedDate).toLocaleDateString('th-TH') : 'ยังไม่ส่ง'} 
                      เวลา {selectedAssignment.submittedTime}
                    </p>
                  </div>

                  {/* Submitted Files */}
                  {mockSubmissions[selectedAssignment.id as keyof typeof mockSubmissions]?.files && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">ไฟล์ที่ส่ง</h4>
                      <div className="space-y-2">
                        {mockSubmissions[selectedAssignment.id as keyof typeof mockSubmissions].files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{getFileIcon(file.type)}</span>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                <p className="text-xs text-gray-500">
                                  {formatFileSize(file.size)} • {file.type.split('/')[1]?.toUpperCase() || 'FILE'}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleDownload(file.name)}
                              className="text-blue-500 hover:text-blue-700 transition-colors"
                            >
                              <Download className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submission Notes */}
                  {mockSubmissions[selectedAssignment.id as keyof typeof mockSubmissions]?.notes && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">หมายเหตุจากนักเรียน</h4>
                      <div className="bg-gray-50 rounded-lg p-4 border">
                        <p className="text-gray-700">
                          {mockSubmissions[selectedAssignment.id as keyof typeof mockSubmissions].notes}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setShowSubmissionModal(false)}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    ปิด
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grade Modal */}
        {showGradeModal && selectedAssignment && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">ผลการตรวจงาน</h3>
                    <p className="text-sm text-gray-600 mt-1">{selectedAssignment.title}</p>
                  </div>
                  <button
                    onClick={() => setShowGradeModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Grade Display */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200 text-center">
                    <div className="mb-4">
                      <Award className="h-12 w-12 text-green-600 mx-auto mb-2" />
                      <h4 className="text-lg font-semibold text-green-900">คะแนนที่ได้</h4>
                    </div>
                    <div className="text-4xl font-bold text-green-700 mb-2">
                      {selectedAssignment.grade}/{selectedAssignment.points}
                    </div>
                    <div className="text-sm text-green-600">
                      เปอร์เซ็นต์: {selectedAssignment.grade ? Math.round((selectedAssignment.grade / selectedAssignment.points) * 100) : 0}%
                    </div>
                  </div>

                  {/* Grade Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center">
                      <div className="text-2xl font-bold text-blue-700">{selectedAssignment.points}</div>
                      <div className="text-sm text-blue-600">คะแนนเต็ม</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center">
                      <div className="text-2xl font-bold text-green-700">{selectedAssignment.grade}</div>
                      <div className="text-sm text-green-600">คะแนนที่ได้</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 text-center">
                      <div className="text-2xl font-bold text-yellow-700">
                        {selectedAssignment.grade && selectedAssignment.grade >= selectedAssignment.points * 0.8 ? 'A' : 
                         selectedAssignment.grade && selectedAssignment.grade >= selectedAssignment.points * 0.7 ? 'B' : 
                         selectedAssignment.grade && selectedAssignment.grade >= selectedAssignment.points * 0.6 ? 'C' : 
                         selectedAssignment.grade && selectedAssignment.grade >= selectedAssignment.points * 0.5 ? 'D' : 'F'}
                      </div>
                      <div className="text-sm text-yellow-600">เกรด</div>
                    </div>
                  </div>

                  {/* Teacher's Comments */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">ความคิดเห็นจากครู</h4>
                    <div className="bg-gray-50 rounded-lg p-4 border">
                      <p className="text-gray-700">
                        {selectedAssignment.grade && selectedAssignment.grade >= selectedAssignment.points * 0.8 
                          ? "ยอดเยี่ยม! งานมีคุณภาพสูงและตอบโจทย์ตามที่กำหนด เก็บรายละเอียดครบถ้วน" 
                          : selectedAssignment.grade && selectedAssignment.grade >= selectedAssignment.points * 0.6
                          ? "ดี งานส่วนใหญ่ถูกต้อง แต่ยังมีจุดที่ควรปรับปรุงเพิ่มเติม"
                          : "ควรทบทวนเนื้อหาและปรับปรุงงานให้ละเอียดมากขึ้น"}
                      </p>
                    </div>
                  </div>

                  {/* Detailed Feedback */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">รายละเอียดการให้คะแนน</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">ความถูกต้องของเนื้อหา</span>
                        <span className="font-semibold text-gray-900">
                          {selectedAssignment.grade ? Math.ceil(selectedAssignment.grade * 0.6) : 0}/{Math.ceil(selectedAssignment.points * 0.6)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">การนำเสนอและรูปแบบ</span>
                        <span className="font-semibold text-gray-900">
                          {selectedAssignment.grade ? Math.ceil(selectedAssignment.grade * 0.3) : 0}/{Math.ceil(selectedAssignment.points * 0.3)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700">การส่งตรงเวลา</span>
                        <span className="font-semibold text-gray-900">
                          {selectedAssignment.grade ? Math.floor(selectedAssignment.grade * 0.1) : 0}/{Math.floor(selectedAssignment.points * 0.1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setShowGradeModal(false)}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    ปิด
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notifications */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transform transition-all duration-300 ease-in-out ${
                notification.type === 'success' ? 'bg-green-50 border border-green-200' :
                notification.type === 'error' ? 'bg-red-50 border border-red-200' :
                notification.type === 'warning' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-blue-50 border border-blue-200'
              }`}
            >
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    {notification.type === 'success' && <CheckIcon className="h-6 w-6 text-green-400" />}
                    {notification.type === 'error' && <XCircle className="h-6 w-6 text-red-400" />}
                    {notification.type === 'warning' && <AlertTriangle className="h-6 w-6 text-yellow-400" />}
                    {notification.type === 'info' && <Info className="h-6 w-6 text-blue-400" />}
                  </div>
                  <div className="ml-3 w-0 flex-1">
                    <p className={`text-sm font-medium ${
                      notification.type === 'success' ? 'text-green-800' :
                      notification.type === 'error' ? 'text-red-800' :
                      notification.type === 'warning' ? 'text-yellow-800' :
                      'text-blue-800'
                    }`}>
                      {notification.title}
                    </p>
                    <p className={`mt-1 text-sm ${
                      notification.type === 'success' ? 'text-green-700' :
                      notification.type === 'error' ? 'text-red-700' :
                      notification.type === 'warning' ? 'text-yellow-700' :
                      'text-blue-700'
                    }`}>
                      {notification.message}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className={`rounded-md inline-flex ${
                        notification.type === 'success' ? 'text-green-400 hover:text-green-500' :
                        notification.type === 'error' ? 'text-red-400 hover:text-red-500' :
                        notification.type === 'warning' ? 'text-yellow-400 hover:text-yellow-500' :
                        'text-blue-400 hover:text-blue-500'
                      } focus:outline-none`}
                      onClick={() => removeNotification(notification.id)}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Exit Confirmation Modal */}
        {showExitConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">ยืนยันการออก</h3>
                </div>
                
                <p className="text-gray-600 mb-6">
                  คุณมีงานที่ยังไม่ได้บันทึก หากออกจากหน้านี้ข้อมูลจะหายไป คุณต้องการออกจริงหรือไม่?
                </p>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowExitConfirm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    ยกเลิก
                  </button>
                  <button
                    onClick={() => {
                      setShowExitConfirm(false);
                      setUploadedFiles([]);
                      setNotes('');
                      setShowUploadModal(false);
                      addNotification('info', 'ยกเลิกการส่งงาน', 'ข้อมูลที่ไม่ได้บันทึกถูกลบแล้ว');
                    }}
                    className="flex-1 px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    ออกจากหน้านี้
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