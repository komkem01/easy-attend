// Types สำหรับระบบเช็คชื่อและมอบหมายงาน

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'teacher' | 'student';
  avatar?: string;
  schoolId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface School {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Classroom {
  id: string;
  name: string;
  subject: string;
  description?: string;
  teacherId: string;
  teacher: User;
  schoolId?: string;
  school?: School;
  code: string; // รหัสสำหรับให้นักเรียนเข้าร่วม
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassroomStudent {
  id: string;
  classroomId: string;
  studentId: string;
  student: User;
  classroom: Classroom;
  enrolledAt: Date;
  isActive: boolean;
}

export interface AttendanceSession {
  id: string;
  classroomId: string;
  classroom: Classroom;
  title: string;
  description?: string;
  sessionDate: Date;
  startTime: Date;
  endTime: Date;
  isActive: boolean;
  allowLateCheck: boolean;
  lateThreshold: number; // นาที
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  session: AttendanceSession;
  studentId: string;
  student: User;
  status: AttendanceStatus;
  checkInTime?: Date;
  notes?: string;
  modifiedBy?: string; // ใครแก้ไข
  modifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Assignment {
  id: string;
  classroomId: string;
  classroom: Classroom;
  title: string;
  description: string;
  instructions?: string;
  dueDate: Date;
  maxScore?: number;
  attachments?: AssignmentFile[];
  isActive: boolean;
  allowLateSubmission: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AssignmentFile {
  id: string;
  assignmentId?: string;
  submissionId?: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
}

export type SubmissionStatus = 'pending' | 'submitted' | 'graded' | 'returned';

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  assignment: Assignment;
  studentId: string;
  student: User;
  content?: string;
  attachments?: AssignmentFile[];
  submittedAt?: Date;
  status: SubmissionStatus;
  score?: number;
  feedback?: string;
  gradedBy?: string;
  gradedAt?: Date;
  isLate: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  user: User;
  title: string;
  message: string;
  type: 'attendance' | 'assignment' | 'grade' | 'general';
  relatedId?: string; // ID ของ assignment หรือ attendance
  isRead: boolean;
  createdAt: Date;
}

// Dashboard Statistics
export interface ClassroomStats {
  totalStudents: number;
  totalSessions: number;
  totalAssignments: number;
  averageAttendance: number;
  recentAttendance: {
    date: string;
    present: number;
    absent: number;
    late: number;
    excused: number;
  }[];
  pendingSubmissions: number;
  gradingPending: number;
}

export interface StudentProgress {
  studentId: string;
  student: User;
  attendanceRate: number;
  totalSessions: number;
  presentSessions: number;
  lateSessions: number;
  absentSessions: number;
  excusedSessions: number;
  assignmentStats: {
    total: number;
    submitted: number;
    pending: number;
    graded: number;
    averageScore: number;
  };
  lastActivity: Date;
}

// Form Types
export interface CreateClassroomForm {
  name: string;
  subject: string;
  description?: string;
  schoolId?: string;
}

export interface CreateAttendanceSessionForm {
  title: string;
  description?: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  allowLateCheck: boolean;
  lateThreshold: number;
}

export interface CreateAssignmentForm {
  title: string;
  description: string;
  instructions?: string;
  dueDate: string;
  maxScore?: number;
  allowLateSubmission: boolean;
}

export interface UpdateAttendanceForm {
  [studentId: string]: {
    status: AttendanceStatus;
    notes?: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}