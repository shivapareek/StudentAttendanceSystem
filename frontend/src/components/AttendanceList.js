import React, { useState, useEffect } from 'react';
import { attendanceAPI, studentAPI } from '../services/api';

const AttendanceList = ({ onEditAttendance }) => {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [filters, setFilters] = useState({
    studentId: '',
    date: '',
    status: ''
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchAttendance();
    fetchStudents();
  }, []);

  // Fetch all attendance records
  const fetchAttendance = async (filterParams = {}) => {
    try {
      setLoading(true);
      const response = await attendanceAPI.getAllAttendance(filterParams);
      if (response.data.success) {
        setAttendance(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch attendance records');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await studentAPI.getAllStudents();
      if (response.data.success) {
        setStudents(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch students:', err);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters
  const applyFilters = () => {
    const filterParams = {};
    if (filters.studentId) filterParams.studentId = filters.studentId;
    if (filters.date) filterParams.date = filters.date;
    if (filters.status) filterParams.status = filters.status;
    
    fetchAttendance(filterParams);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      studentId: '',
      date: '',
      status: ''
    });
    fetchAttendance();
  };

  // Delete attendance record
  const handleDelete = async (attendanceId, studentName, date) => {
    if (!window.confirm(`Are you sure you want to delete attendance for ${studentName} on ${new Date(date).toLocaleDateString()}?`)) {
      return;
    }

    try {
      setDeleteLoading(attendanceId);
      const response = await attendanceAPI.deleteAttendance(attendanceId);
      if (response.data.success) {
        setAttendance(prev => prev.filter(record => record._id !== attendanceId));
        alert('Attendance record deleted successfully');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete attendance record');
    } finally {
      setDeleteLoading(null);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="card">
        <div className="flex justify-center items-center py-16">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="alert alert-danger flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
          <button 
            className="btn-primary btn-sm" 
            onClick={() => fetchAttendance()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary-600/20 rounded-lg">
              <svg className="w-6 h-6 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="card-title">Attendance Records</h3>
              <p className="text-gray-400 text-sm">
                View and manage all attendance records
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-primary-600/10 px-4 py-2 rounded-lg">
            <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-primary-400 font-semibold">{attendance.length} Records</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 p-4 bg-dark-700/50 rounded-lg border border-dark-600">
        <div className="flex items-center space-x-2 mb-4">
          <svg className="w-5 h-5 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          <h4 className="text-lg font-semibold text-white">Filters</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="form-group">
            <label className="form-label flex items-center space-x-2">
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span>Student</span>
            </label>
            <select
              name="studentId"
              className="form-select"
              value={filters.studentId}
              onChange={handleFilterChange}
            >
              <option value="">All Students</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} ({student.rollNo})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label flex items-center space-x-2">
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>Date</span>
            </label>
            <input
              type="date"
              name="date"
              className="form-input"
              value={filters.date}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label flex items-center space-x-2">
              <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Status</span>
            </label>
            <select
              name="status"
              className="form-select"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">&nbsp;</label>
            <div className="flex space-x-2">
              <button
                className="btn-primary btn-sm flex-1 flex items-center justify-center space-x-1"
                onClick={applyFilters}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                </svg>
                <span>Apply</span>
              </button>
              <button
                className="btn-secondary btn-sm flex-1 flex items-center justify-center space-x-1"
                onClick={clearFilters}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span>Clear</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {attendance.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-700/50 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No Attendance Records Found</h3>
          <p className="text-gray-400 mb-6">
            {Object.values(filters).some(filter => filter) 
              ? 'No records match your current filters' 
              : 'Start by marking attendance for your students'
            }
          </p>
          {Object.values(filters).some(filter => filter) && (
            <button 
              className="btn-primary" 
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                    </svg>
                    <span>Student</span>
                  </div>
                </th>
                <th>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Roll No</span>
                  </div>
                </th>
                <th>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.482 0zM7 12.324v.2a9 9 0 008.6 8.6 1 1 0 001-1V8.604L7.979 3.368a3 3 0 00-2.94 0L7 3.368v8.956z" />
                    </svg>
                    <span>Class</span>
                  </div>
                </th>
                <th>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>Date</span>
                  </div>
                </th>
                <th>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Status</span>
                  </div>
                </th>
                <th>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>Remarks</span>
                  </div>
                </th>
                <th>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span>Time</span>
                  </div>
                </th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((record) => (
                <tr key={record._id} className="group">
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {record.student?.name?.charAt(0).toUpperCase() || 'N'}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{record.student?.name || 'N/A'}</div>
                        <div className="text-sm text-gray-400">Student</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600/20 text-primary-400 border border-primary-600/30">
                      {record.student?.rollNo || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-200 font-medium">{record.student?.class || 'N/A'}</span>
                  </td>
                  <td>
                    <div className="text-sm text-gray-200 font-medium">
                      {formatDate(record.date)}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge status-${record.status.toLowerCase()}`}>
                      {record.status}
                    </span>
                  </td>
                  <td>
                    {record.remarks ? (
                      <div className="max-w-xs">
                        <span 
                          className="text-gray-300 text-sm cursor-help" 
                          title={record.remarks}
                        >
                          {record.remarks.length > 30 
                            ? record.remarks.substring(0, 30) + '...' 
                            : record.remarks
                          }
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">-</span>
                    )}
                  </td>
                  <td>
                    <div className="text-sm text-gray-400">
                      {formatTime(record.createdAt)}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center space-x-2">
                      <button
                        className="btn-warning btn-sm flex items-center space-x-1"
                        onClick={() => onEditAttendance(record)}
                        title="Edit Attendance"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        <span>Edit</span>
                      </button>
                      <button
                        className="btn-danger btn-sm flex items-center space-x-1"
                        onClick={() => handleDelete(record._id, record.student?.name, record.date)}
                        disabled={deleteLoading === record._id}
                        title="Delete Attendance"
                      >
                        {deleteLoading === record._id ? (
                          <>
                            <div className="spinner w-4 h-4"></div>
                            <span>Deleting...</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>Delete</span>
                          </>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AttendanceList;
