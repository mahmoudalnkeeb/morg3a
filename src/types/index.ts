export interface DatabaseConfig {
  host: string;
  port: string;
  user: string;
  password: string;
  database: string;
}

export interface CorsOptions {
  origin: string[];
  credentials: boolean;
}

export interface Config {
  database: DatabaseConfig;
  corsOptions: CorsOptions;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  courseId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  courseId: string;
  lessonId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  options?: string[];
  correctAnswer: string | string[];
  points: number;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  teacherId: string;
  studentIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  type: 'pdf' | 'doc' | 'text' | 'image';
  url: string;
  uploadedBy: string;
  courseId?: string;
  lessonId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invitation {
  id: string;
  email: string;
  role: 'student' | 'teacher';
  groupId?: string;
  courseId?: string;
  invitedBy: string;
  status: 'pending' | 'accepted' | 'rejected';
  expiresAt: Date;
  createdAt: Date;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdBy: string;
  assignedTo?: string;
  courseId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  iat?: number;
  exp?: number;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ErrorResponse;
  message?: string;
}

// Express Request extension
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}
