import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Student API functions
export const studentAPI = {
  // Get all students
  getAllStudents: () => api.get('/students'),
  
  // Get single student by ID
  getStudentById: (id) => api.get(`/students/${id}`),
  
  // Create new student
  createStudent: (studentData) => api.post('/students', studentData),
  
  // Update student
  updateStudent: (id, studentData) => api.put(`/students/${id}`, studentData),
  
  // Delete student
  deleteStudent: (id) => api.delete(`/students/${id}`),
};

// Attendance API functions
export const attendanceAPI = {
  // Get all attendance records
  getAllAttendance: (params = {}) => api.get('/attendance', { params }),
  
  // Get single attendance record by ID
  getAttendanceById: (id) => api.get(`/attendance/${id}`),
  
  // Create new attendance record
  createAttendance: (attendanceData) => api.post('/attendance', attendanceData),
  
  // Update attendance record
  updateAttendance: (id, attendanceData) => api.put(`/attendance/${id}`, attendanceData),
  
  // Delete attendance record
  deleteAttendance: (id) => api.delete(`/attendance/${id}`),
  
  // Get attendance records for specific student
  getStudentAttendance: (studentId, params = {}) => 
    api.get(`/attendance/student/${studentId}`, { params }),
};

export default api;
