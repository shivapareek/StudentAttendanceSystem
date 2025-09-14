import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import AttendanceForm from './components/AttendanceForm';
import AttendanceList from './components/AttendanceList';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('students');
  const [editingStudent, setEditingStudent] = useState(null);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [showStudentForm, setShowStudentForm] = useState(false);
  const [showAttendanceForm, setShowAttendanceForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle component mount animation
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle student form success
  const handleStudentSuccess = (response) => {
    alert(response.message);
    setShowStudentForm(false);
    setEditingStudent(null);
  };

  // Handle attendance form success
  const handleAttendanceSuccess = (response) => {
    alert(response.message);
    setShowAttendanceForm(false);
    setEditingAttendance(null);
  };

  // Handle edit student
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setShowStudentForm(true);
  };

  // Handle edit attendance
  const handleEditAttendance = (attendance) => {
    setEditingAttendance(attendance);
    setShowAttendanceForm(true);
  };

  // Handle cancel forms
  const handleCancelForms = () => {
    setShowStudentForm(false);
    setShowAttendanceForm(false);
    setEditingStudent(null);
    setEditingAttendance(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Unique Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Floating geometric elements */}
        <div className="floating-element w-32 h-32 top-20 left-20"></div>
        <div className="floating-element w-24 h-24 top-40 right-32"></div>
        <div className="floating-element w-40 h-40 bottom-32 left-1/4"></div>
        <div className="floating-element w-20 h-20 top-1/2 right-20"></div>
        <div className="floating-element w-28 h-28 bottom-20 right-1/3"></div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-blue-900/10"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Unique Header with Advanced Effects */}
        <header className="relative overflow-hidden">
          {/* Animated background with multiple layers */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/30 to-indigo-700/20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-cyan-500/5 to-transparent"></div>
          
          {/* Unique geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Unique animated title */}
              <div className="relative inline-block mb-6">
                <h1 className="text-6xl md:text-8xl font-black gradient-text mb-4 tracking-tight">
                  StudentHub
                </h1>
                {/* Unique underline effect */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-sm opacity-50"></div>
              </div>
              
              <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Revolutionary attendance management with 
                <span className="gradient-text font-semibold"> AI-powered insights</span> and 
                <span className="gradient-text font-semibold"> real-time analytics</span>
              </p>
              
              {/* Unique feature cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="glass-card p-6 rounded-2xl hover-lift group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Smart Tracking</h3>
                  <p className="text-slate-400 text-sm">AI-powered attendance with facial recognition</p>
                </div>
                
                <div className="glass-card p-6 rounded-2xl hover-lift group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Real-time Data</h3>
                  <p className="text-slate-400 text-sm">Live updates and instant notifications</p>
                </div>
                
                <div className="glass-card p-6 rounded-2xl hover-lift group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Secure & Private</h3>
                  <p className="text-slate-400 text-sm">Enterprise-grade security and privacy</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Unique Navigation with Advanced Effects */}
          <nav className="glass-effect rounded-3xl p-3 mb-12 hover-glow">
            <div className="flex justify-center space-x-4">
              <button
                className={`nav-link flex items-center space-x-3 ${activeTab === 'students' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('students');
                  setShowStudentForm(false);
                  setShowAttendanceForm(false);
                }}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-semibold">Student Portal</span>
              </button>
              
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>
              
              <button
                className={`nav-link flex items-center space-x-3 ${activeTab === 'attendance' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('attendance');
                  setShowStudentForm(false);
                  setShowAttendanceForm(false);
                }}
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold">Attendance Hub</span>
              </button>
            </div>
          </nav>

          {/* Students Section with Unique Layout */}
          {activeTab === 'students' && (
            <div className="space-y-8">
              {/* Unique Section Header */}
              {!showStudentForm && (
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold gradient-text">Student Management</h2>
                    <p className="text-slate-400 text-lg">Comprehensive student data management system</p>
                  </div>
                  <button
                    className="btn-primary flex items-center space-x-3 group"
                    onClick={() => setShowStudentForm(true)}
                  >
                    <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Add New Student</span>
                  </button>
                </div>
              )}

              {/* Student Form with Unique Animation */}
              {showStudentForm && (
                <div className="transform transition-all duration-500 ease-out">
                  <StudentForm
                    student={editingStudent}
                    onSuccess={handleStudentSuccess}
                    onCancel={handleCancelForms}
                  />
                </div>
              )}

              {/* Student List with Enhanced Design */}
              <div className="transform transition-all duration-700 ease-out">
                <StudentList onEditStudent={handleEditStudent} />
              </div>
            </div>
          )}

          {/* Attendance Section with Unique Layout */}
          {activeTab === 'attendance' && (
            <div className="space-y-8">
              {/* Unique Section Header */}
              {!showAttendanceForm && (
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-bold gradient-text">Attendance Hub</h2>
                    <p className="text-slate-400 text-lg">Advanced attendance tracking and analytics</p>
                  </div>
                  <button
                    className="btn-primary flex items-center space-x-3 group"
                    onClick={() => setShowAttendanceForm(true)}
                  >
                    <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span>Mark Attendance</span>
                  </button>
                </div>
              )}

              {/* Attendance Form with Unique Animation */}
              {showAttendanceForm && (
                <div className="transform transition-all duration-500 ease-out">
                  <AttendanceForm
                    attendance={editingAttendance}
                    onSuccess={handleAttendanceSuccess}
                    onCancel={handleCancelForms}
                  />
                </div>
              )}

              {/* Attendance List with Enhanced Design */}
              <div className="transform transition-all duration-700 ease-out">
                <AttendanceList onEditAttendance={handleEditAttendance} />
              </div>
            </div>
          )}

          {/* Unique Footer with Advanced Design */}
          <footer className="mt-20 py-12 border-t border-slate-700/30">
            <div className="text-center space-y-6">
              
              
              <div className="text-slate-500 text-sm">
                © 2024 StudentHub. Built with ❤️ using React & Tailwind CSS
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
